"use client"

import { useState, useEffect } from "react"
import { BeastieList } from "@/components/beasties/beastie-list"
import { ActiveTeam } from "@/components/beasties/active-team"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from 'lucide-react'
import { beastieApi } from "@/lib/api"
import type { Beastie } from "@/lib/types"

export default function BeastiesPage() {
  const [beasties, setBeasties] = useState<Beastie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBeasties()
  }, [])

  const loadBeasties = async () => {
    try {
      const data = await beastieApi.getMyBeasties()
      setBeasties(data)
    } catch (error) {
      console.error("Failed to load beasties:", error)
    } finally {
      setLoading(false)
    }
  }

  const teamBeasties = beasties.filter((b) => b.inTeam)

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/images/beastie_type.webp')" }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">My Beasties</h1>
          <Button asChild className="bg-[#ffff00] hover:bg-[#ffff00]/90 text-[#00ccff]">
            <Link href="/dashboard/beasties/adopt">
              <Plus className="mr-2 h-4 w-4" />
              Adopt Beastie
            </Link>
          </Button>
        </div>

        {/* Active Team Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-4">Active Team</h2>
          {/* <ActiveTeam beasties={beasties} loading={loading} /> */}
          {/* <ActiveTeam beasties={beasties} loading={loading} onUpdate={loadBeasties} /> */}
          <ActiveTeam beasties={teamBeasties} loading={loading} onUpdate={loadBeasties} />
        </div>

        {/* All Beasties Section */}
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-4">All Beasties</h2>
          <BeastieList beasties={beasties} loading={loading} onUpdate={loadBeasties} />
        </div>
      </div>
    </div>
  )
}
