"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Shield } from "lucide-react"

export function AdminNav() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/admin" className="flex items-center gap-2 text-2xl font-bold">
            <Shield className="h-6 w-6" />
            Admin Panel
          </Link>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/admin">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/quests">Quests</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/users">Users</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/map">Map</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Game
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
