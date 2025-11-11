"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/api"
import type { Quest } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

export function QuestManagement() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuests()
  }, [])

  const loadQuests = async () => {
    try {
      const data = await adminApi.getAllQuests()
      setQuests(data)
    } catch (error) {
      console.error("Failed to load quests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quest?")) return

    try {
      await adminApi.deleteQuest(id)
      loadQuests()
    } catch (error) {
      console.error("Failed to delete quest:", error)
    }
  }

  if (loading) {
    return <div>Loading quests...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Quest
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <Card key={quest.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{quest.name}</CardTitle>
                  <CardDescription>{quest.description}</CardDescription>
                </div>
                <Badge>{quest.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Difficulty</p>
                  <p>Level {quest.difficultyLevel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p>{quest.durationMinutes} min</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Required Stat</p>
                  <p>{quest.requiredStat}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Base Requirement</p>
                  <p>{quest.baseStatRequirement}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(quest.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
