"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { beastieApi } from "@/lib/api"
import Image from "next/image"

export function AdoptBeastieForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [type, setType] = useState<"EXPLORER" | "FIGHTER" | "SAGE">("EXPLORER")
  const [loading, setLoading] = useState(false)

    const getPreviewImage = (type: string) => {
    const typeMap: Record<string, string> = {
      EXPLORER: "rowley",
      FIGHTER: "tiny",
      SAGE: "cosmo",
    }
    return `/assets/images/beastie/${typeMap[type]}.png`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await beastieApi.adoptBeastie(name, type)
      router.push("/dashboard/beasties")
    } catch (error) {
      console.error("Failed to adopt beastie:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Adopt a New Beastie</CardTitle>
          <CardDescription>Choose a name and type for your new creature</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
                    <div className="flex justify-center">
            <div className="relative w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4">
              <Image
                src={getPreviewImage(type) || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter beastie name"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={(value: any) => setType(value)}>
              <Card className="cursor-pointer hover:bg-accent">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="EXPLORER" id="explorer" />
                  <div className="flex-1">
                    <Label htmlFor="explorer" className="cursor-pointer font-semibold">
                      Explorer (Dexterity)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Agile and quick. Strong against Sages, weak against Fighters.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-accent">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="FIGHTER" id="fighter" />
                  <div className="flex-1">
                    <Label htmlFor="fighter" className="cursor-pointer font-semibold">
                      Fighter (Strength)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Powerful and strong. Strong against Explorers, weak against Sages.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-accent">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="SAGE" id="sage" />
                  <div className="flex-1">
                    <Label htmlFor="sage" className="cursor-pointer font-semibold">
                      Sage (Intelligence)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Wise and clever. Strong against Fighters, weak against Explorers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Adopting..." : "Adopt Beastie"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
