"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskApi } from "@/lib/api"
import type { Task, Stat } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    statToImprove: "DEXTERITY" as Stat,
    improvementAmount: 1,
    durationMinutes: 30,
    staminaCost: 10,
  })

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAllTasks()
      setTasks(data)
    } catch (error) {
      console.error("Failed to load tasks:", error)
      alert("Failed to load tasks. Make sure admin endpoints are configured.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      // Note: Backend doesn't have create task endpoint yet
      alert("Task creation endpoint not yet implemented in backend. Add POST /api/v1/admin/tasks")
      setIsCreateOpen(false)
      resetForm()
    } catch (error) {
      console.error("Failed to create task:", error)
      alert("Failed to create task")
    }
  }

  const handleEdit = async () => {
    if (!selectedTask) return

    try {
      // Note: Backend doesn't have update task endpoint yet
      alert("Task update endpoint not yet implemented in backend. Add PUT /api/v1/admin/tasks/{id}")
      setIsEditOpen(false)
      setSelectedTask(null)
      resetForm()
    } catch (error) {
      console.error("Failed to update task:", error)
      alert("Failed to update task")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      // Note: Backend doesn't have delete task endpoint yet
      alert("Task deletion endpoint not yet implemented in backend. Add DELETE /api/v1/admin/tasks/{id}")
    } catch (error) {
      console.error("Failed to delete task:", error)
      alert("Failed to delete task")
    }
  }

  const openEditDialog = (task: Task) => {
    setSelectedTask(task)
    setFormData({
      name: task.name,
      description: task.description,
      statToImprove: task.statToImprove,
      improvementAmount: task.improvementAmount,
      durationMinutes: task.durationMinutes,
      staminaCost: task.staminaCost,
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      statToImprove: "DEXTERITY",
      improvementAmount: 1,
      durationMinutes: 30,
      staminaCost: 10,
    })
  }

  const getStatColor = (stat: Stat) => {
    switch (stat) {
      case "DEXTERITY":
        return "bg-yellow-500"
      case "STRENGTH":
        return "bg-red-500"
      case "INTELLIGENCE":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="text-white">Loading tasks...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new training task for Beasties</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Speed Training"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Improve agility and speed"
                />
              </div>
              <div>
                <Label htmlFor="statToImprove">Stat to Improve</Label>
                <Select
                  value={formData.statToImprove}
                  onValueChange={(value) => setFormData({ ...formData, statToImprove: value as Stat })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEXTERITY">Dexterity</SelectItem>
                    <SelectItem value="STRENGTH">Strength</SelectItem>
                    <SelectItem value="INTELLIGENCE">Intelligence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="improvementAmount">Improvement Amount</Label>
                  <Input
                    id="improvementAmount"
                    type="number"
                    min="1"
                    value={formData.improvementAmount}
                    onChange={(e) => setFormData({ ...formData, improvementAmount: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                  <Input
                    id="durationMinutes"
                    type="number"
                    min="1"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="staminaCost">Stamina Cost</Label>
                <Input
                  id="staminaCost"
                  type="number"
                  min="0"
                  value={formData.staminaCost}
                  onChange={(e) => setFormData({ ...formData, staminaCost: Number.parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-transparent backdrop-blur-sm border-2 border-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{task.name}</CardTitle>
                <Badge className={getStatColor(task.statToImprove)}>{task.statToImprove}</Badge>
              </div>
              <CardDescription className="text-gray-200">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm text-white">
                <div>
                  <p className="text-gray-300">Duration</p>
                  <p>{task.durationMinutes} min</p>
                </div>
                <div>
                  <p className="text-gray-300">Stamina Cost</p>
                  <p>{task.staminaCost}</p>
                </div>
                <div>
                  <p className="text-gray-300">Improvement</p>
                  <p>+{task.improvementAmount}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-white"
                  onClick={() => openEditDialog(task)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update task details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Task Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-statToImprove">Stat to Improve</Label>
              <Select
                value={formData.statToImprove}
                onValueChange={(value) => setFormData({ ...formData, statToImprove: value as Stat })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEXTERITY">Dexterity</SelectItem>
                  <SelectItem value="STRENGTH">Strength</SelectItem>
                  <SelectItem value="INTELLIGENCE">Intelligence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-improvementAmount">Improvement Amount</Label>
                <Input
                  id="edit-improvementAmount"
                  type="number"
                  min="1"
                  value={formData.improvementAmount}
                  onChange={(e) => setFormData({ ...formData, improvementAmount: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-durationMinutes">Duration (minutes)</Label>
                <Input
                  id="edit-durationMinutes"
                  type="number"
                  min="1"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-staminaCost">Stamina Cost</Label>
              <Input
                id="edit-staminaCost"
                type="number"
                min="0"
                value={formData.staminaCost}
                onChange={(e) => setFormData({ ...formData, staminaCost: Number.parseInt(e.target.value) })}
              />
            </div>
            <Button onClick={handleEdit} className="w-full">
              Update Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
