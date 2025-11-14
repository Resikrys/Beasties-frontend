"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Map, ListTodo, Package, Shield } from 'lucide-react'

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin from localStorage or JWT token
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        // Decode JWT to check if user is admin
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsAdmin(payload.role === "ADMIN" || payload.authorities?.includes("ROLE_ADMIN"))
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [])

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/assets/images/fruits_bg.webp)' }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-sm"
            style={{
              borderTop: '4px solid #ffff00',
              borderLeft: '4px solid #ffff00',
              borderBottom: '4px solid #ff99cc',
              borderRight: '4px solid #ff99cc'
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow">
                <Sparkles className="h-5 w-5" />
                My Beasties
              </CardTitle>
              <CardDescription className="text-gray-100">View and manage your creature collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/beasties">View Beasties</Link>
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-sm"
            style={{
              borderTop: '4px solid #00ccff',
              borderLeft: '4px solid #00ccff',
              borderBottom: '4px solid #00ffcc',
              borderRight: '4px solid #00ffcc'
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow">
                <Map className="h-5 w-5" />
                Quest Map
              </CardTitle>
              <CardDescription className="text-gray-100">Explore the 5x5 map and start quests</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/map">View Map</Link>
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-sm"
            style={{
              borderTop: '4px solid #ffff00',
              borderLeft: '4px solid #ffff00',
              borderBottom: '4px solid #00ccff',
              borderRight: '4px solid #00ccff'
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow">
                <ListTodo className="h-5 w-5" />
                Tasks
              </CardTitle>
              <CardDescription className="text-gray-100">Assign training tasks to your Beasties</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/tasks">View Tasks</Link>
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-sm"
            style={{
              borderTop: '4px solid #00ffcc',
              borderLeft: '4px solid #00ffcc',
              borderBottom: '4px solid #ff99cc',
              borderRight: '4px solid #ff99cc'
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow">
                <Package className="h-5 w-5" />
                Inventory
              </CardTitle>
              <CardDescription className="text-gray-100">Check your items and candies</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/inventory">View Inventory</Link>
              </Button>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white drop-shadow">
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
                <CardDescription className="text-gray-100">Manage quests, tasks, and users (Admin only)</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
