import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Users</h1>
      <UserManagement />
    </div>
  )
}
