"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskApi, beastieApi } from "@/lib/api"
import type { Task, Beastie, AssignedTask } from "@/lib/types"
import { Frown } from 'lucide-react'

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [beasties, setBeasties] = useState<Beastie[]>([])
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedBeastieId, setSelectedBeastieId] = useState<string>("")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showRewardDialog, setShowRewardDialog] = useState(false)
  const [rewardMessage, setRewardMessage] = useState("")

  useEffect(() => {
    loadData()
    // Refresh every 5 seconds to update progress bars
    const interval = setInterval(loadAssignedTasks, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      await Promise.all([loadTasks(), loadBeasties(), loadAssignedTasks()])
    } finally {
      setLoading(false)
    }
  }

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAllTasks()
      setTasks(data)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    }
  }

  const loadBeasties = async () => {
    try {
      const data = await beastieApi.getMyBeasties()
      setBeasties(data)
    } catch (error) {
      console.error("Failed to load beasties:", error)
    }
  }

  const loadAssignedTasks = async () => {
    try {
      const data = await taskApi.getAssignedTasks()
      setAssignedTasks(data)
    } catch (error) {
      console.error("Failed to load assigned tasks:", error)
    }
  }

  const handleAssignClick = (task: Task) => {
    setSelectedTask(task)
    setSelectedBeastieId("")
    setShowAssignDialog(true)
  }

  const handleAssignTask = async () => {
    if (!selectedTask || !selectedBeastieId) return

    try {
      await taskApi.assignTask(Number(selectedBeastieId), selectedTask.id)
      await loadData()
      setShowAssignDialog(false)
    } catch (error) {
      console.error("Failed to assign task:", error)
    }
  }

  const handleCollectReward = async (beastieId: number) => {
    try {
      const result = await taskApi.completeTask(beastieId)
      
      // Check if extra candy was awarded
      if (result.extraCandyAwarded) {
        setRewardMessage(`Congratulations! You earned an extra ${result.candyType} candy!`)
        setShowRewardDialog(true)
      }
      
      await loadData()
    } catch (error) {
      console.error("Failed to collect reward:", error)
    }
  }

  const getTaskColors = (stat: string) => {
    switch (stat) {
      case "DEXTERITY":
        return {
          bg: "bg-yellow-400/30",
          bgHover: "bg-yellow-500/50",
          border: "border-yellow-400",
          buttonHover: "hover:bg-sky-400"
        }
      case "INTELLIGENCE":
        return {
          bg: "bg-pink-400/30",
          bgHover: "bg-pink-500/50",
          border: "border-pink-400",
          buttonHover: "hover:bg-purple-500"
        }
      case "STRENGTH":
        return {
          bg: "bg-red-400/30",
          bgHover: "bg-red-500/50",
          border: "border-red-400",
          buttonHover: "hover:bg-emerald-400"
        }
      default:
        return {
          bg: "bg-black/30",
          bgHover: "bg-white/50",
          border: "border-white",
          buttonHover: "hover:bg-blue-500"
        }
    }
  }

  const getProgressPercentage = (assignedTask: AssignedTask) => {
    if (assignedTask.remainingSeconds <= 0) return 100
    const task = tasks.find(t => t.id === assignedTask.taskId)
    if (!task) return 0
    const totalSeconds = task.durationMinutes * 60
    const elapsed = totalSeconds - assignedTask.remainingSeconds
    return Math.min(100, Math.max(0, (elapsed / totalSeconds) * 100))
  }

  const getBeastieAssignedTask = (beastieId: number) => {
    return assignedTasks.find(at => at.beastieId === beastieId)
  }

  const getAvailableBeasties = (task: Task) => {
    return beasties.filter(b => {
      const hasTask = assignedTasks.some(at => at.beastieId === b.id)
      const hasEnoughStamina = b.stamina >= task.staminaCost
      return !hasTask && hasEnoughStamina
    })
  }

  if (loading) {
    return <div className="text-white text-center">Loading tasks...</div>
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          const colors = getTaskColors(task.statToImprove)
          
          return (
            <Card 
              key={task.id} 
              className={`${colors.bg} ${colors.border} border-2 backdrop-blur-sm transition-all duration-300 hover:${colors.bgHover}`}
            >
              <CardHeader>
                <CardTitle className="text-white drop-shadow-md">{task.name}</CardTitle>
                <CardDescription className="text-gray-100">{task.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>Improves:</span>
                  <Badge variant="secondary" className="bg-white/80">{task.statToImprove}</Badge>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Improvement:</span>
                  <span className="font-bold">+{task.improvementAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Duration:</span>
                  <span className="font-bold">{task.durationMinutes} min</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Stamina Cost:</span>
                  <span className="font-bold">{task.staminaCost}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${colors.buttonHover} transition-colors`}
                  onClick={() => handleAssignClick(task)}
                  disabled={getAvailableBeasties(task).length === 0}
                >
                  Assign to Beastie
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Assigned Tasks Section */}
      {assignedTasks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Tasks in Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedTasks.map((assignedTask) => {
              const beastie = beasties.find(b => b.id === assignedTask.beastieId)
              const task = tasks.find(t => t.id === assignedTask.taskId)
              if (!beastie || !task) return null
              
              const colors = getTaskColors(task.statToImprove)
              const progress = getProgressPercentage(assignedTask)
              const isComplete = progress >= 100

              return (
                <Card 
                  key={assignedTask.id}
                  className={`${colors.bg} ${colors.border} border-2 backdrop-blur-sm`}
                >
                  <CardHeader>
                    <CardTitle className="text-white drop-shadow-md flex items-center gap-2">
                      {beastie.name}
                      {beastie.sad && <Frown className="w-5 h-5 text-purple-500" />}
                    </CardTitle>
                    <CardDescription className="text-gray-100">{task.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white">
                        <span>Progress</span>
                        <span>{Math.floor(progress)}%</span>
                      </div>
                      <div className="w-full h-4 bg-white border-2 border-black rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-400 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {!isComplete && (
                      <p className="text-sm text-white">
                        Time remaining: {Math.floor(assignedTask.remainingSeconds / 60)}m {assignedTask.remainingSeconds % 60}s
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-yellow-300 hover:bg-yellow-400 text-white"
                      onClick={() => handleCollectReward(beastie.id)}
                      disabled={!isComplete}
                    >
                      {isComplete ? "Collect Reward" : "In Progress..."}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Assign Task Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="bg-[#cc99ff] border-4 border-sky-400">
          <DialogHeader>
            <DialogTitle className="text-2xl">Assign Task: {selectedTask?.name}</DialogTitle>
            <DialogDescription className="text-gray-700">
              Select a Beastie to perform this task
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={selectedBeastieId} onValueChange={setSelectedBeastieId}>
              <SelectTrigger className="border-2 border-pink-600 bg-pink-200">
                <SelectValue placeholder="Choose a Beastie" />
              </SelectTrigger>
              <SelectContent>
                {selectedTask && getAvailableBeasties(selectedTask).map((beastie) => (
                  <SelectItem key={beastie.id} value={beastie.id.toString()}>
                    {beastie.name} (Stamina: {beastie.stamina}/{beastie.maxStamina})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleAssignTask}
              disabled={!selectedBeastieId}
              className="bg-fuchsia-950 text-white border-2 border-sky-800 hover:bg-cyan-500 hover:border-pink-400 hover:text-yellow-400 border-2 transition-all"
            >
              Assign Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reward Dialog */}
      <Dialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
        <DialogContent className="bg-[#fffacd] border-4 border-pink-400">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Bonus Reward!</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-lg text-gray-800">
            {rewardMessage}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowRewardDialog(false)} className="w-full">
              Awesome!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
