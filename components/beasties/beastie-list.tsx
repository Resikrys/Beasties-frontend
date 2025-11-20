"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { beastieApi } from "@/lib/api"
import type { Beastie } from "@/lib/types"
import { Trash2, Frown } from 'lucide-react'
import Image from "next/image"

interface BeastieListProps {
  beasties: Beastie[]
  loading: boolean
  onUpdate: () => void
}

export function BeastieList({ beasties, loading, onUpdate }: BeastieListProps) {
  const handleToggleTeam = async (id: number) => {
    try {
      await beastieApi.toggleTeam(id)
      onUpdate()
    } catch (error) {
      console.error("Failed to toggle team:", error)
    }
  }

  const handleRelease = async (id: number) => {
    if (!confirm("Are you sure you want to release this Beastie?")) return

    try {
      await beastieApi.releaseBeastie(id)
      onUpdate()
    } catch (error) {
      console.error("Failed to release beastie:", error)
    }
  }

  const handleCheerUp = async (id: number) => {
    try {
      await beastieApi.cheerUp(id)
      onUpdate()
    } catch (error) {
      console.error("Failed to cheer up beastie:", error)
    }
  }

  // const getBeastieImage = (type: string) => {
  //   const typeMap: Record<string, string> = {
  //     EXPLORER: "rowley",
  //     FIGHTER: "tiny",
  //     SAGE: "cosmo",
  //   }
  //   return `/assets/images/beastie/${typeMap[type] || "rowley"}.png`
  // }

  if (loading) {
    return <div className="text-white text-center">Loading your Beasties...</div>
  }

  if (beasties.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <p className="text-white">You don't have any Beasties yet. Adopt one to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beasties.map((beastie) => (
        <Card
          key={beastie.id}
          className="bg-pink-500/20 backdrop-blur-sm border-t-4 border-l-4 border-b-4 border-r-4 border-t-sky-400 border-l-sky-400 border-b-cyan-400 border-r-cyan-400"
        >
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <CardTitle className="text-black">{beastie.name}</CardTitle>
              {beastie.sad && <Frown className="h-5 w-5 text-purple-600" />}
            </div>
            <div className="relative w-full h-48 mb-2">
              <Image
                src={beastie.imageUrl || "/placeholder.svg"}
                alt={beastie.name}
                fill
                className="object-contain"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-black font-medium">Level {beastie.level}</span>
              <Badge variant="secondary" className="bg-white/50">
                {beastie.type}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="font-bold text-red-600">STR</p>
                <p className="text-red-600 font-semibold">{beastie.strength}</p>
              </div>
              <div>
                <p className="font-bold text-yellow-500">DEX</p>
                <p className="text-yellow-500 font-semibold">{beastie.dexterity}</p>
              </div>
              <div>
                <p className="font-bold text-pink-600">INT</p>
                <p className="text-pink-600 font-semibold">{beastie.intelligence}</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium text-black">
                Stamina: {beastie.stamina}/{beastie.maxStamina}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            {beastie.sad ? (
              <Button
                variant="default"
                className="flex-1 bg-purple-500 hover:bg-purple-600"
                onClick={() => handleCheerUp(beastie.id)}
              >
                Cheer Up
              </Button>
            ) : (
            <Button
              variant={beastie.inTeam ? "secondary" : "default"}
              className="flex-1"
              onClick={() => handleToggleTeam(beastie.id)}
            >
              {beastie.inTeam ? "Remove from Team" : "Add to Team"}
            </Button>
            )}
            <Button variant="destructive" size="icon" onClick={() => handleRelease(beastie.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}