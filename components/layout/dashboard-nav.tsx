"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import Image from "next/image"

export function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  return (
    <nav className="border-b" style={{ backgroundColor: '#66ff99' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-2xl font-bold group transition-all"
          >
            <Image 
              src="assets/images/beasties_logo.webp" 
              alt="Beasties" 
              width={200} 
              height={60}
              className="h-12 w-auto group-hover:drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] transition-all"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4]"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4]"
            >
              <Link href="/dashboard/beasties">My Beasties</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4]"
            >
              <Link href="/dashboard/map">Map</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4]"
            >
              <Link href="/dashboard/tasks">Tasks</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4]"
            >
              <Link href="/dashboard/inventory">Inventory</Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-black hover:bg-[#4ecdc4]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
