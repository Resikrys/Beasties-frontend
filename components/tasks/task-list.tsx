"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { taskApi } from "@/lib/api"
import type { Task } from "@/lib/types"

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAllTasks()
      setTasks(data)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.name}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Improves:</span>
              <Badge variant="secondary">{task.statToImprove}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Improvement:</span>
              <span>+{task.improvementAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration:</span>
              <span>{task.durationMinutes} min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Stamina Cost:</span>
              <span>{task.staminaCost}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Assign to Beastie</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
