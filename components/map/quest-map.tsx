"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mapApi, questApi } from "@/lib/api"
import type { MapSquare, Beastie, Quest, ActiveQuest } from "@/lib/types"
import { QuestDialog } from "./quest-dialog"

interface QuestMapProps {
  beasties: Beastie[]
  activeQuests: ActiveQuest[]
  onQuestComplete: () => void
}

export function QuestMap({ beasties, activeQuests, onQuestComplete }: QuestMapProps) {
  const [map, setMap] = useState<MapSquare[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSquare, setSelectedSquare] = useState<{ x: number; y: number; quest: Quest | null } | null>(null)

  useEffect(() => {
    loadMap()
  }, [])

  const loadMap = async () => {
    try {
      const data = await mapApi.getCurrentMap()
      setMap(data)
    } catch (error) {
      console.error("Failed to load map:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSquareClick = (square: MapSquare | undefined) => {
    if (!square) return
    
    // Check if there's an active quest on this square
    const hasActiveQuest = activeQuests.some(q => q.x === square.x && q.y === square.y)
    if (hasActiveQuest) {
      // Show the active quest progress
      setSelectedSquare({ x: square.x, y: square.y, quest: square.quest })
      return
    }

    // Only show quest dialog if square has a quest
    if (square.quest) {
      setSelectedSquare({ x: square.x, y: square.y, quest: square.quest })
    }
  }

  const handleCloseDialog = () => {
    setSelectedSquare(null)
    loadMap()
    onQuestComplete()
  }

  if (loading) {
    return <div className="text-white">Loading map...</div>
  }

  // Create 5x5 grid
  const grid = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => map.find((square) => square.x === x && square.y === y)),
  )

  return (
    <>
      <div className="flex flex-col gap-2">
        {grid.map((row, y) => (
          <div key={y} className="flex gap-2">
            {row.map((square, x) => {
              const isSelected = selectedSquare?.x === square?.x && selectedSquare?.y === square?.y
              const hasActiveQuest = activeQuests.some(q => q.x === square?.x && q.y === square?.y)
              
              return (
                <Card
                  key={`${x}-${y}`}
                  className={`flex-1 aspect-square cursor-pointer transition-all bg-transparent backdrop-blur-sm
                    ${isSelected ? 'border-pink-400 border-4' : 'border-white border-2'}
                    ${!isSelected && 'hover:border-yellow-400 hover:border-4'}
                  `}
                  onClick={() => handleSquareClick(square)}
                >
                  <CardContent className="p-2 h-full flex flex-col justify-center items-center">
                    {square?.quest ? (
                      <div className="text-center">
                        <p className="font-bold text-sm text-white drop-shadow line-clamp-1">
                          {hasActiveQuest ? "In Progress" : square.quest.name}
                        </p>
                        <p className="text-xs text-white/80">{square.quest.type}</p>
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
          quest={selectedSquare.quest}
          x={selectedSquare.x}
          y={selectedSquare.y}
          beasties={beasties}
          activeQuests={activeQuests}
          onClose={handleCloseDialog}
        />
      )}
    </>
  )
}
