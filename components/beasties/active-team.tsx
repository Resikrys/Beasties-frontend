"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Beastie } from "@/lib/types"
import Image from "next/image"
import { Frown } from 'lucide-react'

interface ActiveTeamProps {
  beasties: Beastie[]
  loading: boolean
}

export function ActiveTeam({ beasties, loading }: ActiveTeamProps) {
  const getBeastieImage = (type: string) => {
    const typeMap: Record<string, string> = {
      EXPLORER: "rowley",
      FIGHTER: "tiny",
      SAGE: "cosmo",
    }
    return `/images/beastie/${typeMap[type] || "rowley"}.png`
  }

  const getTypeName = (type: string) => {
    const typeNames: Record<string, string> = {
      EXPLORER: "Explorer",
      FIGHTER: "Fighter",
      SAGE: "Sage",
    }
    return typeNames[type] || type
  }

  // Create array of 5 slots
  const slots = Array.from({ length: 5 }, (_, i) => beasties[i] || null)

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
                {/* Beastie Image */}
                <div className="relative w-full h-24 mb-2">
                  <Image
                    src={getBeastieImage(beastie.type) || "/placeholder.svg"}
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
