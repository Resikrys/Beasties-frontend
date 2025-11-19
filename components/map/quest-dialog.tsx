"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { questApi } from "@/lib/api"
import type { Quest, Beastie, ActiveQuest } from "@/lib/types"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface QuestDialogProps {
  quest: Quest | null
  x: number
  y: number
  beasties: Beastie[]
  activeQuests: ActiveQuest[]
  onClose: () => void
}

export function QuestDialog({ quest, x, y, beasties, activeQuests, onClose }: QuestDialogProps) {
  const [selectedBeastieId, setSelectedBeastieId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const activeQuest = activeQuests.find(q => q.x === x && q.y === y)

  useEffect(() => {
    if (activeQuest) {
      const updateTimer = () => {
        const end = new Date(activeQuest.endTime).getTime()
        const now = Date.now()
        const remaining = Math.max(0, Math.floor((end - now) / 1000))
        setRemainingTime(remaining)
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [activeQuest])

  const handleSendBeastie = async () => {
    if (!selectedBeastieId || !quest) return

    setLoading(true)
    try {
      await questApi.startQuest(Number(selectedBeastieId), x, y)
      onClose()
    } catch (error: any) {
      alert(error.message || "Failed to start quest")
    } finally {
      setLoading(false)
    }
  }

  const handleCollectReward = async () => {
    if (!activeQuest) return

    setLoading(true)
    try {
      const result = await questApi.completeQuest(activeQuest.beastieId)
      alert(result)
      onClose()
    } catch (error: any) {
      alert(error.message || "Failed to complete quest")
    } finally {
      setLoading(false)
    }
  }

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case "COMBAT": return "border-red-500"
      case "EXPLORATION": return "border-yellow-500"
      case "PUZZLE": return "border-pink-500"
      default: return "border-white"
    }
  }

  const getRequiredBeastieType = (questType: string) => {
    switch (questType) {
      case "COMBAT": return "FIGHTER"
      case "EXPLORATION": return "EXPLORER"
      case "PUZZLE": return "SAGE"
      default: return ""
    }
  }

  const availableBeasties = quest 
    ? beasties.filter(b => 
        b.type === getRequiredBeastieType(quest.type) && 
        !b.isSad && 
        !activeQuests.some(q => q.beastieId === b.id)
      )
    : []

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!quest) return null

  const totalDuration = quest.durationMinutes * 60
  const progress = activeQuest ? ((totalDuration - remainingTime) / totalDuration) * 100 : 0

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={`bg-transparent backdrop-blur-md border-4 ${getQuestTypeColor(quest.type)} max-w-md`}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-black">{quest.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-black">{quest.description}</p>

          <div className="space-y-2">
            <p className="text-white"><strong>Type:</strong> {quest.type}</p>
            <p className="text-white"><strong>Difficulty:</strong> Level {quest.difficultyLevel}</p>
            <p className="text-white"><strong>Required Stat:</strong> {quest.requiredStat} ({quest.baseStatRequirement})</p>
          </div>

          {activeQuest ? (
            <div className="space-y-4">
              <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-400">
                <p className="font-bold mb-2">Quest in Progress: {activeQuest.beastieName}</p>
                <div className="space-y-2">
                  <Progress value={progress} className="h-4 bg-white border-2 border-black [&>div]:bg-pink-500" />
                  <p className="text-center text-black font-bold">{formatTime(remainingTime)} remaining</p>
                </div>
              </div>

              {remainingTime === 0 && (
                <Button
                  onClick={handleCollectReward}
                  disabled={loading}
                  className="w-full bg-[#4ecdc4] hover:bg-[#3ab5ac] text-yellow-400 border-2 border-black font-bold"
                >
                  {loading ? "Collecting..." : "Collect Reward"}
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-black font-bold">Select Beastie:</label>
                <Select value={selectedBeastieId} onValueChange={setSelectedBeastieId}>
                  <SelectTrigger className="bg-pink-100 border-2 border-pink-400">
                    <SelectValue placeholder="Choose a beastie..." />
                  </SelectTrigger>
                  <SelectContent className="bg-pink-50">
                    {availableBeasties.map((beastie) => (
                      <SelectItem key={beastie.id} value={beastie.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Image src={beastie.imageUrl || "/placeholder.svg"} alt={beastie.name} width={32} height={32} />
                          <span>{beastie.name} (Lvl {beastie.level})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSendBeastie}
                  disabled={!selectedBeastieId || loading}
                  className="flex-1 bg-[#4ecdc4] hover:bg-[#3ab5ac] text-yellow-400 border-2 border-black font-bold"
                >
                  {loading ? "Sending..." : "Send Beastie"}
                </Button>
                <Button
                  onClick={onClose}
                  variant="destructive"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white border-2 border-black font-bold"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
