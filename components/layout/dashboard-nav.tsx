"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Sparkles } from "lucide-react"

export function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="h-6 w-6" />
            BEASTIES
          </Link>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/beasties">My Beasties</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/map">Map</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/tasks">Tasks</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/inventory">Inventory</Link>
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
