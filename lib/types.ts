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
  isSad: boolean
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

export interface AssignedTask {
  id: number
  beastie: Beastie
  task: Task
  startTime: string
  endTime: string
  isCompleted: boolean
}

// Map Types
export interface MapSquare {
  id: number
  x: number
  y: number
  quest: Quest | null
}

// Inventory Types
export type CandyType = "STRAWBERRY" | "BANANA" | "RASPBERRY"

export interface InventoryItem {
  id: number
  candyType: CandyType
  quantity: number
  userId: number
}
