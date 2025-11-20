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
import { Textarea } from "@/components/ui/textarea"
import { adminApi } from "@/lib/api"
import type { Quest, QuestType, Stat } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

export function QuestManagement() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "EXPLORATION" as QuestType,
    difficultyLevel: 1,
    requiredStat: "DEXTERITY" as Stat,
    baseStatRequirement: 10,
    minExpReward: 50,
    maxExpReward: 100,
    durationMinutes: 60,
  })

  useEffect(() => {
    loadQuests()
  }, [])

  const loadQuests = async () => {
    try {
      const data = await adminApi.getAllQuests()
      setQuests(data)
    } catch (error) {
      console.error("Failed to load quests:", error)
      alert("Failed to load quests. Make sure admin endpoints are configured.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      await adminApi.createQuest(formData)
      alert("Quest created successfully!")
      setIsCreateOpen(false)
      resetForm()
      loadQuests()
    } catch (error) {
      console.error("Failed to create quest:", error)
      alert("Failed to create quest")
    }
  }

  const handleEdit = async () => {
    if (!selectedQuest) return

    try {
      await adminApi.updateQuest(selectedQuest.id, { ...formData, id: selectedQuest.id })
      alert("Quest updated successfully!")
      setIsEditOpen(false)
      setSelectedQuest(null)
      resetForm()
      loadQuests()
    } catch (error) {
      console.error("Failed to update quest:", error)
      alert("Failed to update quest")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quest?")) return

    try {
      await adminApi.deleteQuest(id)
      alert("Quest deleted successfully!")
      loadQuests()
    } catch (error) {
      console.error("Failed to delete quest:", error)
      alert("Failed to delete quest")
    }
  }

  const openEditDialog = (quest: Quest) => {
    setSelectedQuest(quest)
    setFormData({
      name: quest.name,
      description: quest.description,
      type: quest.type,
      difficultyLevel: quest.difficultyLevel,
      requiredStat: quest.requiredStat,
      baseStatRequirement: quest.baseStatRequirement,
      minExpReward: quest.minExpReward,
      maxExpReward: quest.maxExpReward,
      durationMinutes: quest.durationMinutes,
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "EXPLORATION",
      difficultyLevel: 1,
      requiredStat: "DEXTERITY",
      baseStatRequirement: 10,
      minExpReward: 50,
      maxExpReward: 100,
      durationMinutes: 60,
    })
  }

  const getTypeColor = (type: QuestType) => {
    switch (type) {
      case "EXPLORATION":
        return "bg-yellow-500"
      case "COMBAT":
        return "bg-red-500"
      case "PUZZLE":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="text-white">Loading quests...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quest</DialogTitle>
              <DialogDescription>Add a new quest to the game</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Quest Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ancient Temple Exploration"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explore the mysterious ancient temple..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Quest Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as QuestType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXPLORATION">Exploration</SelectItem>
                      <SelectItem value="COMBAT">Combat</SelectItem>
                      <SelectItem value="PUZZLE">Puzzle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficultyLevel">Difficulty Level (1-5)</Label>
                  <Input
                    id="difficultyLevel"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.difficultyLevel}
                    onChange={(e) => setFormData({ ...formData, difficultyLevel: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="requiredStat">Required Stat</Label>
                  <Select
                    value={formData.requiredStat}
                    onValueChange={(value) => setFormData({ ...formData, requiredStat: value as Stat })}
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
                <div>
                  <Label htmlFor="baseStatRequirement">Base Stat Requirement</Label>
                  <Input
                    id="baseStatRequirement"
                    type="number"
                    min="1"
                    value={formData.baseStatRequirement}
                    onChange={(e) => setFormData({ ...formData, baseStatRequirement: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minExpReward">Min EXP Reward</Label>
                  <Input
                    id="minExpReward"
                    type="number"
                    min="0"
                    value={formData.minExpReward}
                    onChange={(e) => setFormData({ ...formData, minExpReward: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxExpReward">Max EXP Reward</Label>
                  <Input
                    id="maxExpReward"
                    type="number"
                    min="0"
                    value={formData.maxExpReward}
                    onChange={(e) => setFormData({ ...formData, maxExpReward: Number.parseInt(e.target.value) })}
                  />
                </div>
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
              <Button onClick={handleCreate} className="w-full">
                Create Quest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <Card key={quest.id} className="bg-transparent backdrop-blur-sm border-2 border-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-black">{quest.name}</CardTitle>
                  <CardDescription className="text-black">{quest.description}</CardDescription>
                </div>
                <Badge className={getTypeColor(quest.type)}>{quest.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm text-black">
                <div>
                  <p className="text-black">Difficulty</p>
                  <p>Level {quest.difficultyLevel}</p>
                </div>
                <div>
                  <p className="text-black">Duration</p>
                  <p>{quest.durationMinutes} min</p>
                </div>
                <div>
                  <p className="text-black">Required Stat</p>
                  <p>{quest.requiredStat}</p>
                </div>
                <div>
                  <p className="text-black">Base Requirement</p>
                  <p>{quest.baseStatRequirement}</p>
                </div>
                <div>
                  <p className="text-black">EXP Reward</p>
                  <p>
                    {quest.minExpReward}-{quest.maxExpReward}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-black"
                  onClick={() => openEditDialog(quest)}
                >
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Quest</DialogTitle>
            <DialogDescription>Update quest details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Quest Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Quest Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as QuestType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXPLORATION">Exploration</SelectItem>
                    <SelectItem value="COMBAT">Combat</SelectItem>
                    <SelectItem value="PUZZLE">Puzzle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-difficultyLevel">Difficulty Level (1-5)</Label>
                <Input
                  id="edit-difficultyLevel"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.difficultyLevel}
                  onChange={(e) => setFormData({ ...formData, difficultyLevel: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-requiredStat">Required Stat</Label>
                <Select
                  value={formData.requiredStat}
                  onValueChange={(value) => setFormData({ ...formData, requiredStat: value as Stat })}
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
              <div>
                <Label htmlFor="edit-baseStatRequirement">Base Stat Requirement</Label>
                <Input
                  id="edit-baseStatRequirement"
                  type="number"
                  min="1"
                  value={formData.baseStatRequirement}
                  onChange={(e) => setFormData({ ...formData, baseStatRequirement: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-minExpReward">Min EXP Reward</Label>
                <Input
                  id="edit-minExpReward"
                  type="number"
                  min="0"
                  value={formData.minExpReward}
                  onChange={(e) => setFormData({ ...formData, minExpReward: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-maxExpReward">Max EXP Reward</Label>
                <Input
                  id="edit-maxExpReward"
                  type="number"
                  min="0"
                  value={formData.maxExpReward}
                  onChange={(e) => setFormData({ ...formData, maxExpReward: Number.parseInt(e.target.value) })}
                />
              </div>
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
            <Button onClick={handleEdit} className="w-full">
              Update Quest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
