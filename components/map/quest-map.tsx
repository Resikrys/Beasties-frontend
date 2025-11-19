"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  }, [])

  const loadMap = async () => {
    try {
      const data = await mapApi.getCurrentMap()
      console.log("[v0] Map data loaded:", data)
      setMap(data)
    } catch (error) {
      console.error("Failed to load map:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSquareClick = (square: MapSquare | undefined) => {
    if (!square) return
    
    console.log("[v0] Square clicked:", square)
    const hasActiveQuest = activeQuests.some(q => q.xcoord === square.xcoord && q.ycoord === square.ycoord)
    
    if (hasActiveQuest) {
      console.log("[v0] Square has active quest")
    }

    setSelectedSquare(square)
  }

  const handleCloseDialog = () => {
    setSelectedSquare(null)
    loadMap()
    onQuestComplete()
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
              const hasActiveQuest = square ? activeQuests.some(q => q.xcoord === square.xcoord && q.ycoord === square.ycoord) : false
              const hasQuest = square && square.questId !== null
              
              return (
                <Card
                  key={`${xIndex}-${yIndex}`}
                  className={`flex-1 aspect-square cursor-pointer transition-all bg-transparent backdrop-blur-sm
                    ${isSelected ? 'border-pink-400 border-4' : 'border-white border-2'}
                    ${!isSelected && 'hover:border-yellow-400 hover:border-4'}
                  `}
                  onClick={() => handleSquareClick(square)}
                >
                  <CardContent className="p-2 h-full flex flex-col justify-center items-center">
                    {hasQuest ? (
                      <div className="text-center">
                        <p className="font-bold text-sm text-white drop-shadow line-clamp-1">
                          {hasActiveQuest ? "In Progress" : square.questName}
                        </p>
                        <p className="text-xs text-white/80">Lvl {square.questDifficulty}</p>
                      </div>
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
