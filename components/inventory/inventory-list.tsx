"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { inventoryApi, beastieApi } from "@/lib/api"
import type { InventoryItem, Beastie } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [beasties, setBeasties] = useState<Beastie[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBeastie, setSelectedBeastie] = useState<string>("")
  const [consumingCandy, setConsumingCandy] = useState<string | null>(null)

  useEffect(() => {
    loadInventory()
    loadBeasties()
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

  const loadBeasties = async () => {
    try {
      const data = await beastieApi.getMyBeasties()
      setBeasties(data)
    } catch (error) {
      console.error("Failed to load beasties:", error)
    }
  }

  const handleConsumeCandy = async (candyType: string) => {
    if (!selectedBeastie) {
      alert("Please select a Beastie first")
      return
    }

    setConsumingCandy(candyType)
    try {
      await inventoryApi.consumeCandy(Number(selectedBeastie), candyType)
      await loadInventory()
      await loadBeasties()
      setSelectedBeastie("")
      alert("Candy consumed successfully!")
    } catch (error) {
      console.error("Failed to consume candy:", error)
      alert("Failed to consume candy")
    } finally {
      setConsumingCandy(null)
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
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {item.candyType === "STRAWBERRY" && "Increases Strength +1"}
              {item.candyType === "BANANA" && "Increases Dexterity +1"}
              {item.candyType === "RASPBERRY" && "Increases Intelligence +1"}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="default">
                  Use Candy
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Use {item.candyType} Candy</DialogTitle>
                  <DialogDescription>Select a Beastie to give this candy to</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Select value={selectedBeastie} onValueChange={setSelectedBeastie}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Beastie" />
                    </SelectTrigger>
                    <SelectContent>
                      {beasties.map((beastie) => (
                        <SelectItem key={beastie.id} value={beastie.id.toString()}>
                          {beastie.name} (Level {beastie.level})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleConsumeCandy(item.candyType)}
                    disabled={!selectedBeastie || consumingCandy === item.candyType}
                    className="w-full"
                  >
                    {consumingCandy === item.candyType ? "Using..." : "Confirm"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
