// Auth Types
export interface User {
  id: number
  username: string
  role: "ROLE_USER" | "ROLE_ADMIN"
}

export interface AuthResponse {
  token: string
  username: string
  role: string
}

// Beastie Types
export type BeastieType = "EXPLORER" | "FIGHTER" | "SAGE"
export type Stat = "DEXTERITY" | "STRENGTH" | "INTELLIGENCE"

export interface Beastie {
  id: number
  name: string
  level: number
  type: BeastieType
  imageUrl: string
  dexterity: number
  strength: number
  intelligence: number
  stamina: number
  maxStamina: number
  inTeam: boolean
  sad: boolean
  ownerId: number
}

// Quest Types
export type QuestType = "EXPLORATION" | "COMBAT" | "PUZZLE"

export interface Quest {
  id: number
  name: string
  description: string
  type: QuestType
  difficultyLevel: number
  requiredStat: Stat
  baseStatRequirement: number
  minExpReward: number
  maxExpReward: number
  durationMinutes: number
}

// Task Types
export interface Task {
  id: number
  name: string
  description: string
  statToImprove: Stat
  improvementAmount: number
  durationMinutes: number
  staminaCost: number
}

// export interface AssignedTask {
//   id: number
//   beastie: Beastie
//   task: Task
//   startTime: string
//   endTime: string
//   isCompleted: boolean
// }
export interface AssignedTask {
  id: number
  beastieId: number
  taskId: number
  taskName: string
  statToImprove: Stat
  endTime: string
  remainingSeconds: number
}

// Map Types
export interface MapSquare {
  id: number
  xcoord: number
  ycoord: number
  questId: number | null
  questName: string
  questDifficulty: number
}

// Inventory Types
export type CandyType = "STRAWBERRY" | "BANANA" | "RASPBERRY"

export interface InventoryItem {
  id: number
  candyType: CandyType
  quantity: number
  userId: number
}

// Active Quest Types
export interface ActiveQuest {
  id: number
  beastieId: number
  beastieName: string
  questId: number
  questName: string
  questType: QuestType
  requiredStat: Stat
  difficultyLevel: number
  endTime: string
  durationMinutes: number
  x: number
  y: number
}
