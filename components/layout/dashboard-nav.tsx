"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"
import Image from "next/image"

export function DashboardNav() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="border-b" style={{ backgroundColor: '#66ff99' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-2xl font-bold group transition-all"
            onClick={closeMobileMenu}
          >
            <Image 
              src="assets/images/beasties_logo.webp" 
              alt="Beasties" 
              width={200} 
              height={60}
              className="h-12 w-auto group-hover:drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] transition-all"
            />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" className="text-black hover:bg-[#4ecdc4]">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" className="text-black hover:bg-[#4ecdc4]">
              <Link href="/dashboard/beasties">My Beasties</Link>
            </Button>
            <Button asChild variant="ghost" className="text-black hover:bg-[#4ecdc4]">
              <Link href="/dashboard/map">Map</Link>
            </Button>
            <Button asChild variant="ghost" className="text-black hover:bg-[#4ecdc4]">
              <Link href="/dashboard/tasks">Tasks</Link>
            </Button>
            <Button asChild variant="ghost" className="text-black hover:bg-[#4ecdc4]">
              <Link href="/dashboard/inventory">Inventory</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="text-black hover:bg-[#4ecdc4] bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-black hover:bg-[#4ecdc4]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-2">
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
              onClick={closeMobileMenu}
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
              onClick={closeMobileMenu}
            >
              <Link href="/dashboard/beasties">My Beasties</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
              onClick={closeMobileMenu}
            >
              <Link href="/dashboard/map">Map</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
              onClick={closeMobileMenu}
            >
              <Link href="/dashboard/tasks">Tasks</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
              onClick={closeMobileMenu}
            >
              <Link href="/dashboard/inventory">Inventory</Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                handleLogout()
                closeMobileMenu()
              }}
              className="text-black hover:bg-[#4ecdc4] w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
