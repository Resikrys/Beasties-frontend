"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { inventoryApi } from "@/lib/api"
import type { InventoryItem } from "@/lib/types"

export function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInventory()
  }, [])

  const loadInventory = async () => {
    try {
      const data = await inventoryApi.getMyInventory()
      setInventory(data)
    } catch (error) {
      console.error("Failed to load inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading inventory...</div>
  }

  if (inventory.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Your inventory is empty. Complete quests to earn candies!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventory.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{item.candyType} Candy</CardTitle>
                <CardDescription>Use on your Beasties</CardDescription>
              </div>
              <Badge>{item.quantity}x</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {item.candyType === "STRAWBERRY" && "Increases Strength +1"}
              {item.candyType === "BANANA" && "Increases Dexterity +1"}
              {item.candyType === "RASPBERRY" && "Increases Intelligence +1"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
