"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Beastie } from "@/lib/types"
import Image from "next/image"
import { Frown, X } from 'lucide-react'
import { beastieApi } from "@/lib/api"
import { useState } from "react"

interface ActiveTeamProps {
  beasties: Beastie[]
  loading: boolean
  onUpdate: () => void
}

export function ActiveTeam({ beasties, loading, onUpdate }: ActiveTeamProps) {
  console.log(beasties)
  // export function ActiveTeam({ beasties, loading }: ActiveTeamProps) {
  const [removing, setRemoving] = useState<number | null>(null)

  const getTypeName = (type: string) => {
    const typeNames: Record<string, string> = {
      EXPLORER: "Explorer",
      FIGHTER: "Fighter",
      SAGE: "Sage",
    }
    return typeNames[type] || type
  }

  const handleRemoveFromTeam = async (beastieId: number) => {
    try {
      setRemoving(beastieId)
      await beastieApi.toggleTeam(beastieId)
      onUpdate()
    } catch (error) {
      console.error("Failed to remove from team:", error)
    } finally {
      setRemoving(null)
    }
  }

  // const teamBeasties = beasties.filter((b) => b.isInTeam)

  // Create array of 5 slots
  const slots = Array.from({ length: 5 }, (_, i) => beasties[i] || null)
  // const slots = Array.from({ length: 5 }, (_, i) => teamBeasties[i] || null)

  if (loading) {
    return <div className="text-white text-center">Loading team...</div>
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {slots.map((beastie, index) => (
        <Card
          key={index}
          className="bg-transparent border-4 border-yellow-400 hover:bg-white/10 transition-colors"
        >
          <CardContent className="p-4 flex flex-col items-center justify-center min-h-[200px]">
            {beastie ? (
              <>
                     <div className="w-full flex justify-end mb-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromTeam(beastie.id)}
                    disabled={removing === beastie.id}
                    className="h-6 w-6 p-0 hover:bg-red-500/20"
                  >
                    <X className="h-4 w-4 bg-white text-red-500 border-solid rounded-full" />
                  </Button>
                </div>
                {/* Beastie Image */}
                <div className="relative w-full h-24 mb-2">
                  <Image
                    src={beastie.imageUrl || "/placeholder.svg"}
                    alt={beastie.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Beastie Name with Sad Icon */}
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-white font-bold text-sm text-center">{beastie.name}</p>
                  {beastie.isSad && <Frown className="h-4 w-4 text-purple-600" />}
                </div>
                {/* Beastie Type */}
                <p className="text-yellow-300 text-xs">{getTypeName(beastie.type)}</p>
              </>
            ) : (
              <p className="text-white/50 text-xs">Empty Slot</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
