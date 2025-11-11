"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mapApi } from "@/lib/api"
import type { MapSquare } from "@/lib/types"

export function QuestMap() {
  const [map, setMap] = useState<MapSquare[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div>Loading map...</div>
  }

  // Create 5x5 grid
  const grid = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => map.find((square) => square.x === x && square.y === y)),
  )

  return (
    <div className="flex flex-col gap-2">
      {grid.map((row, y) => (
        <div key={y} className="flex gap-2">
          {row.map((square, x) => (
            <Card key={`${x}-${y}`} className="flex-1 aspect-square cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="text-xs text-muted-foreground">
                  ({square?.x}, {square?.y})
                </div>
                {square?.quest ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-sm line-clamp-2">{square.quest.name}</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {square.quest.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Lvl {square.quest.difficultyLevel}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Empty</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  )
}
