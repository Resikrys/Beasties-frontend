"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminApi } from "@/lib/api"
import type { User } from "@/lib/types"
import { Trash2, Pencil } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState<string>("ROLE_USER")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await adminApi.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error("Failed to load users:", error)
      alert("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await adminApi.deleteUser(id)
      alert("User deleted successfully!")
      loadUsers()
    } catch (error) {
      console.error("Failed to delete user:", error)

    alert("Failed to delete user")
    }
  }

  const handleEditRole = async () => {
    if (!selectedUser) return

    try {
      // Note: Backend doesn't have update user role endpoint yet
      alert("User role update endpoint not yet implemented in backend. Add PATCH /api/v1/admin/users/{id}/role")
      setIsEditOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Failed to update user role:", error)
      alert("Failed to update user role")
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setIsEditOpen(true)
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <>
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
              <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white"
                    onClick={() => openEditDialog(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Edit Role Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>Change the role for user: {selectedUser?.username}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">User Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROLE_USER">User</SelectItem>
                  <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEditRole} className="w-full">
              Update Role
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}
