"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mapApi, questApi } from "@/lib/api"
import type { MapSquare, Beastie, ActiveQuest } from "@/lib/types"
import { QuestDialog } from "./quest-dialog"

interface QuestMapProps {
  beasties: Beastie[]
  activeQuests: ActiveQuest[]
  onQuestComplete: () => void
}

export function QuestMap({ beasties, activeQuests, onQuestComplete }: QuestMapProps) {
  const [map, setMap] = useState<MapSquare[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSquare, setSelectedSquare] = useState<MapSquare | null>(null)

  useEffect(() => {
    loadMap()
  }, [activeQuests])

  const loadMap = async () => {
    try {
      const data = await mapApi.getCurrentMap()
      console.log("[v0] Map data loaded:", data)
      console.log("[v0] Active quests:", activeQuests)
      setMap(data)
    } catch (error) {
      console.error("Failed to load map:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSquareClick = (square: MapSquare | undefined) => {
    if (!square) return
    
    const activeQuest = activeQuests.find(q => q.x === square.xcoord && q.y === square.ycoord)
    console.log("[v0] Clicked square:", square, "Active quest found:", activeQuest)
    
    if (activeQuest && getProgressPercentage(activeQuest) < 100) {
      return
    }

    setSelectedSquare(square)
  }

  const handleCloseDialog = () => {
    setSelectedSquare(null)
    loadMap()
    onQuestComplete()
  }

  const getProgressPercentage = (activeQuest: ActiveQuest) => {
    const endTime = new Date(activeQuest.endTime).getTime()
    const now = Date.now()
    
    const questSquare = map.find(s => s.xcoord === activeQuest.x && s.ycoord === activeQuest.y)
    if (!questSquare) return 0
    
    const durationMinutes = 60 // TODO: Get this from quest template
    const totalDuration = durationMinutes * 60 * 1000 // Convert to milliseconds
    const startTime = endTime - totalDuration
    
    const elapsed = now - startTime
    
    const percentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    
    return percentage
  }

  const handleCollectQuest = async (activeQuest: ActiveQuest, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await questApi.completeQuest(activeQuest.beastieId)
      onQuestComplete()
    } catch (error) {
      console.error("Failed to collect quest reward:", error)
    }
  }

  if (loading) {
    return <div className="text-white">Loading map...</div>
  }

  const grid = Array.from({ length: 5 }, (_, yCoord) =>
    Array.from({ length: 5 }, (_, xCoord) => 
      map.find((square) => square.xcoord === xCoord && square.ycoord === yCoord)
    )
  )

  return (
    <>
      <div className="flex flex-col gap-2">
        {grid.map((row, yIndex) => (
          <div key={yIndex} className="flex gap-2">
            {row.map((square, xIndex) => {
              const isSelected = selectedSquare?.xcoord === square?.xcoord && selectedSquare?.ycoord === square?.ycoord
              const activeQuest = square ? activeQuests.find(q => q.x === square.xcoord && q.y === square.ycoord) : null
              const hasQuest = square && square.questId !== null
              
              const progress = activeQuest ? getProgressPercentage(activeQuest) : 0
              const isComplete = progress >= 100
              
              return (
                <Card
                  key={`${xIndex}-${yIndex}`}
                  className={`flex-1 aspect-square cursor-pointer transition-all bg-transparent backdrop-blur-sm
                    ${isSelected ? 'border-pink-400 border-4' : 'border-white border-2'}
                    ${!isSelected && !activeQuest && 'hover:border-yellow-400 hover:border-4'}
                    ${activeQuest && 'border-pink-400 border-4'}
                  `}
                  onClick={() => handleSquareClick(square)}
                >
                  <CardContent className="p-2 h-full flex flex-col justify-center items-center gap-1">
                    {hasQuest ? (
                      <>
                        <div className="text-center">
                          <p className="font-bold text-xs text-white drop-shadow line-clamp-1">
                            {activeQuest ? activeQuest.beastieName : square.questName}
                          </p>
                          <p className="text-xs text-white/80">Lvl {square.questDifficulty}</p>
                        </div>
                        
                        {activeQuest && (
                          <div className="w-full space-y-1">
                            <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-pink-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            
                            {isComplete && (
                              <Button 
                                size="sm"
                                className="w-full h-6 text-xs bg-green-500 hover:bg-green-600 text-white"
                                onClick={(e) => handleCollectQuest(activeQuest, e)}
                              >
                                Collect
                              </Button>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-white/50 text-xs">Empty</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ))}
      </div>

      {selectedSquare && (
        <QuestDialog
          square={selectedSquare}
          beasties={beasties}
          activeQuests={activeQuests}
          onClose={handleCloseDialog}
        />
      )}
    </>
  )
}
