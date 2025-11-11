"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/api"
import type { User } from "@/lib/types"
import { Trash2 } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await adminApi.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await adminApi.deleteUser(id)
      loadUsers()
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                </div>
                <Badge variant={user.role === "ROLE_ADMIN" ? "default" : "secondary"}>
                  {user.role.replace("ROLE_", "")}
                </Badge>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
