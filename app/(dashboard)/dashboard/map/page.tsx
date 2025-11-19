"use client"

import { useState, useEffect } from "react"
import { QuestMap } from "@/components/map/quest-map"
import { beastieApi, questApi } from "@/lib/api"
import type { Beastie, ActiveQuest } from "@/lib/types"
import Image from "next/image"
import { Frown } from 'lucide-react'

export default function MapPage() {
  const [beasties, setBeasties] = useState<Beastie[]>([])
  const [activeQuests, setActiveQuests] = useState<ActiveQuest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [beastiesData, questsData] = await Promise.all([
        beastieApi.getMyBeasties(),
        questApi.getActiveQuests(),
      ])
      setBeasties(beastiesData)
      setActiveQuests(questsData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const teamBeasties = beasties.filter((b) => b.inTeam)

  const getBeastieStatus = (beastie: Beastie) => {
    const hasActiveQuest = activeQuests.some((q) => q.beastieId === beastie.id)
    if (beastie.isSad) return "sad"
    if (hasActiveQuest) return "quest"
    return "available"
  }

  const getBorderColor = (status: string) => {
    switch (status) {
      case "available":
        return "border-yellow-400"
      case "quest":
        return "border-pink-400"
      case "sad":
        return "border-blue-400"
      default:
        return "border-white"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/images/forest.webp')" }}>
        <p className="text-white text-2xl">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/assets/images/forest.webp')" }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">Quest Map</h1>

        {/* Active Team Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-4">Active Team</h2>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => {
              const beastie = teamBeasties[index]
              if (!beastie) {
                return (
                  <div
                    key={index}
                    className="aspect-square border-4 border-yellow-400 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                  >
                    <p className="text-white/50">Empty</p>
                  </div>
                )
              }

              const status = getBeastieStatus(beastie)
              return (
                <div
                  key={beastie.id}
                  className={`aspect-square border-4 ${getBorderColor(status)} bg-white/30 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center justify-center transition-all`}
                >
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={beastie.imageUrl || "/placeholder.svg"}
                      alt={beastie.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm text-white drop-shadow flex items-center justify-center gap-1">
                      {beastie.name}
                      {beastie.isSad && <Frown className="w-4 h-4 text-purple-500" />}
                    </p>
                    <p className="text-xs text-white/90">{beastie.type}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quest Map */}
        <QuestMap
          beasties={teamBeasties}
          activeQuests={activeQuests}
          onQuestComplete={loadData}
        />
      </div>
    </div>
  )
}
