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

  const getCardStyles = (candyType: string) => {
    switch (candyType) {
      case "BANANA":
        return {
          bg: "bg-yellow-400/30",
          hoverBg: "hover:bg-yellow-500/50",
          border: "border-yellow-500",
          buttonHover: "hover:bg-[#00ccff]"
        }
      case "RASPBERRY":
        return {
          bg: "bg-pink-400/30",
          hoverBg: "hover:bg-pink-500/50",
          border: "border-pink-500",
          buttonHover: "hover:bg-purple-500"
        }
      case "STRAWBERRY":
        return {
          bg: "bg-red-400/30",
          hoverBg: "hover:bg-red-500/50",
          border: "border-red-500",
          buttonHover: "hover:bg-[#00ffcc]"
        }
      default:
        return {
          bg: "",
          hoverBg: "",
          border: "border-gray-300",
          buttonHover: ""
        }
    }
  }

  if (loading) {
    return <div className="text-white text-center">Loading inventory...</div>
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
      {inventory.map((item) => {
        const styles = getCardStyles(item.candyType)
        return (
          <Card 
            key={item.id}
            className={`${styles.bg} ${styles.hoverBg} ${styles.border} border-4 transition-colors backdrop-blur-sm`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-black">{item.candyType} Candy</CardTitle>
                  <CardDescription className="text-gray-700">Use on your Beasties</CardDescription>
                </div>
                <Badge className="bg-black/80 text-white border-2 border-gray">{item.quantity}x</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-black font-medium">
                {item.candyType === "STRAWBERRY" && "Increases Strength +1"}
                {item.candyType === "BANANA" && "Increases Dexterity +1"}
                {item.candyType === "RASPBERRY" && "Increases Intelligence +1"}
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className={`w-full bg-black text-white border-2 border-sky-800 ${styles.buttonHover} transition-colors`}
                    variant="outline"
                  >
                    Use Candy
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#cc99ff] border-4 border-[#00ccff]">
                  <DialogHeader>
                    <DialogTitle className="text-black">Use {item.candyType} Candy</DialogTitle>
                    <DialogDescription className="text-gray-800">
                      Select a Beastie to give this candy to
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select value={selectedBeastie} onValueChange={setSelectedBeastie}>
                      <SelectTrigger className="border-2 border-pink-600 bg-pink-200">
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
                      className="w-full bg-fuchsia-950 text-white border-2 border-sky-800 hover:bg-[#00ffcc] hover:border-[#ff99cc] hover:text-[#ffff00] transition-colors"
                    >
                      {consumingCandy === item.candyType ? "Using..." : "Confirm"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
