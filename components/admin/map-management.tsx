"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mapApi } from "@/lib/api"
import { Shuffle } from "lucide-react"

export function MapManagement() {
  const [loading, setLoading] = useState(false)

  const handleRandomize = async () => {
    if (!confirm("This will replace all quests on the map. Continue?")) return

    setLoading(true)
    try {
      await mapApi.randomizeMap()
      alert("Map randomized successfully!")
    } catch (error) {
      console.error("Failed to randomize map:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Map Actions</CardTitle>
          <CardDescription>Manage the quest map for all players</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleRandomize} disabled={loading} className="w-full">
            <Shuffle className="mr-2 h-4 w-4" />
            {loading ? "Randomizing..." : "Randomize Map"}
          </Button>
          <p className="text-sm text-muted-foreground">
            This will generate a new set of random quests across the 5x5 map grid.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
