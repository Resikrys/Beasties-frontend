"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { beastieApi } from "@/lib/api"
import type { Beastie } from "@/lib/types"
import { Trash2, Users } from "lucide-react"

export function BeastieList() {
  const [beasties, setBeasties] = useState<Beastie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBeasties()
  }, [])

  const loadBeasties = async () => {
    try {
      const data = await beastieApi.getMyBeasties()
      setBeasties(data)
    } catch (error) {
      console.error("Failed to load beasties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTeam = async (id: number) => {
    try {
      await beastieApi.toggleTeam(id)
      loadBeasties()
    } catch (error) {
      console.error("Failed to toggle team:", error)
    }
  }

  const handleRelease = async (id: number) => {
    if (!confirm("Are you sure you want to release this Beastie?")) return

    try {
      await beastieApi.releaseBeastie(id)
      loadBeasties()
    } catch (error) {
      console.error("Failed to release beastie:", error)
    }
  }

  if (loading) {
    return <div>Loading your Beasties...</div>
  }

  if (beasties.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">You don't have any Beasties yet. Adopt one to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beasties.map((beastie) => (
        <Card key={beastie.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{beastie.name}</CardTitle>
                <CardDescription>Level {beastie.level}</CardDescription>
              </div>
              <Badge variant={beastie.isInTeam ? "default" : "secondary"}>{beastie.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="font-medium">STR</p>
                <p>{beastie.strength}</p>
              </div>
              <div>
                <p className="font-medium">DEX</p>
                <p>{beastie.dexterity}</p>
              </div>
              <div>
                <p className="font-medium">INT</p>
                <p>{beastie.intelligence}</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium">
                Stamina: {beastie.stamina}/{beastie.maxStamina}
              </p>
            </div>
            {beastie.isSad && (
              <Badge variant="destructive" className="w-full justify-center">
                Sad (Skip next quest)
              </Badge>
            )}
            {beastie.isInTeam && <Badge className="w-full justify-center">In Team</Badge>}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant={beastie.isInTeam ? "secondary" : "default"}
              className="flex-1"
              onClick={() => handleToggleTeam(beastie.id)}
            >
              <Users className="mr-2 h-4 w-4" />
              {beastie.isInTeam ? "Remove from Team" : "Add to Team"}
            </Button>
            <Button variant="destructive" size="icon" onClick={() => handleRelease(beastie.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
