// API Base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

// Helper function to create headers
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  const token = getAuthToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

// Auth API
export const authApi = {
  register: async (username: string, password: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    })
    if (!response.ok) throw new Error("Registration failed")
    return response.json()
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) throw new Error("Login failed")
    return response.json()
  },
}

// Beastie API
export const beastieApi = {
  getMyBeasties: async () => {
    const response = await fetch(`${API_BASE_URL}/beasties`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch beasties")
    return response.json()
  },

  // adoptBeastie: async (name: string, type: string) => {
  //   const response = await fetch(`${API_BASE_URL}/beasties`, {
  //     method: "POST",
  //     headers: createHeaders(),
  //     body: JSON.stringify({ name, type }),
  //   })
  //   if (!response.ok) throw new Error("Failed to adopt beastie")
  //   return response.json()
  // },
    adoptBeastie: async (name: string, type: string, imageUrl?: string) => {
    const body: any = { name, type }
    if (imageUrl) {
      body.imageUrl = imageUrl
    }
    
    const response = await fetch(`${API_BASE_URL}/beasties`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error("Failed to adopt beastie")
    return response.json()
  },

  releaseBeastie: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/beasties/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to release beastie")
  },

  toggleTeam: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/beasties/${id}/team`, {
      method: "PATCH",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to toggle team")
    return response.json()
  },
}

// Quest API
export const questApi = {
  getActiveQuests: async () => {
    const response = await fetch(`${API_BASE_URL}/quests/active`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch active quests")
    return response.json()
  },

  startQuest: async (beastieId: number, x: number, y: number) => {
    const response = await fetch(`${API_BASE_URL}/quests/start/${beastieId}/${x}/${y}`, {
      method: "POST",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to start quest")
    return response.json()
  },

  completeQuest: async (beastieId: number) => {
    const response = await fetch(`${API_BASE_URL}/quests/complete/${beastieId}`, {
      method: "PATCH",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to complete quest")
    return response.json()
  },
}

// Task API
export const taskApi = {
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return response.json()
  },

    getAssignedTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/assigned`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch assigned tasks")
    return response.json()
  },

  assignTask: async (beastieId: number, taskId: number) => {
    const response = await fetch(`${API_BASE_URL}/tasks/assign/${beastieId}/${taskId}`, {
      method: "POST",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to assign task")
    return response.json()
  },

  completeTask: async (beastieId: number) => {
    const response = await fetch(`${API_BASE_URL}/tasks/complete/${beastieId}`, {
      method: "PATCH",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to complete task")
    return response.json()
  },
}

// Map API
export const mapApi = {
  getCurrentMap: async () => {
    const response = await fetch(`${API_BASE_URL}/map`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch map")
    return response.json()
  },

  randomizeMap: async () => {
    const response = await fetch(`${API_BASE_URL}/map/randomize`, {
      method: "POST",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to randomize map")
    return response.json()
  },

  clearSquare: async (x: number, y: number) => {
    const response = await fetch(`${API_BASE_URL}/map/clear/${x}/${y}`, {
      method: "DELETE",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to clear square")
    return response.json()
  },
}

// Inventory API
export const inventoryApi = {
  getMyInventory: async () => {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch inventory")
    return response.json()
  },

  consumeCandy: async (beastieId: number, candyType: string) => {
    const response = await fetch(`${API_BASE_URL}/inventory/consume`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({ beastieId, candyType }),
    })
    if (!response.ok) throw new Error("Failed to consume candy")
    return response.json()
  },
}

// Admin APIs
export const adminApi = {
  // Quest Management
  getAllQuests: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/quests`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch quests")
    return response.json()
  },

  createQuest: async (quest: any) => {
    const response = await fetch(`${API_BASE_URL}/admin/quests`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(quest),
    })
    if (!response.ok) throw new Error("Failed to create quest")
    return response.json()
  },

  updateQuest: async (id: number, quest: any) => {
    const response = await fetch(`${API_BASE_URL}/admin/quests/${id}`, {
      method: "PUT",
      headers: createHeaders(),
      body: JSON.stringify(quest),
    })
    if (!response.ok) throw new Error("Failed to update quest")
    return response.json()
  },

  deleteQuest: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/quests/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to delete quest")
  },

  // User Management
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  deleteUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to delete user")
  },

  // Beastie Management (Admin)
  getAllBeasties: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/beasties`, {
      headers: createHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch all beasties")
    return response.json()
  },

  renameBeastie: async (id: number, newName: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/beasties/${id}/rename`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({ newName }),
    })
    if (!response.ok) throw new Error("Failed to rename beastie")
    return response.json()
  },
}
