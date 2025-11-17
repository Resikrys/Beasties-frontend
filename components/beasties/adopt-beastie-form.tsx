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

const IMAGE_OPTIONS = {
  FIGHTER: [
    { name: "Tiny", url: "/assets/images/beastie/tiny.png" },
    { name: "Rowley", url: "/assets/images/beastie/rowley.png" },
  ],
  EXPLORER: [
    { name: "Chubbs", url: "/assets/images/beastie/chubbs.png" },
    { name: "Dotts", url: "/assets/images/beastie/dotts.png" },
  ],
  SAGE: [
    { name: "Goldie", url: "/assets/images/beastie/goldie.png" },
    { name: "Cosmo", url: "/assets/images/beastie/cosmo.png" },
  ],
}

export function AdoptBeastieForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [type, setType] = useState<"EXPLORER" | "FIGHTER" | "SAGE">("EXPLORER")
  const [selectedImage, setSelectedImage] = useState<string>(IMAGE_OPTIONS.EXPLORER[0].url)
  const [loading, setLoading] = useState(false)

  //   const getPreviewImage = (type: string) => {
  //   const typeMap: Record<string, string> = {
  //     EXPLORER: "rowley",
  //     FIGHTER: "tiny",
  //     SAGE: "cosmo",
  //   }
  //   return `/assets/images/beastie/${typeMap[type]}.png`
  // }
  const handleTypeChange = (newType: "EXPLORER" | "FIGHTER" | "SAGE") => {
    setType(newType)
    setSelectedImage(IMAGE_OPTIONS[newType][0].url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // await beastieApi.adoptBeastie(name, type)
      await beastieApi.adoptBeastie(name, type, selectedImage)
      router.push("/dashboard/beasties")
    } catch (error) {
      console.error("Failed to adopt beastie:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl bg-pink-200/80 backdrop-blur-sm border-2 border-pink-300">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Adopt a New Beastie</CardTitle>
          <CardDescription className="text-gray-700">Choose a name, type, and appearance 
            for your new creature</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-3">
            <Label>Choose Appearance</Label>
            <div className="flex justify-center gap-4">
              {IMAGE_OPTIONS[type].map((option) => (
                <div
                  key={option.url}
                  onClick={() => setSelectedImage(option.url)}
                  className={`relative w-32 h-32 bg-white/80 rounded-lg p-2 cursor-pointer border-4 transition-all hover:scale-105 ${
                    selectedImage === option.url ? "border-blue-500 shadow-lg" : "border-gray-300"
                  }`}
                >
              <Image
                src={option.url || "/placeholder.svg"}
                    alt={option.name}
                    fill
                className="object-contain p-2"
              />
              <p className="text-center text-xs font-semibold mt-1 text-gray-700">{option.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter beastie name"
              className="bg-white/90"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={handleTypeChange}>
              <Card className="cursor-pointer bg-red-400/80 hover:bg-red-500/80 transition-colors border-red-600">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="FIGHTER" id="fighter" />
                  <div className="flex-1">
                    <Label htmlFor="fighter" className="cursor-pointer font-semibold text-white">
                      Fighter (Strength)
                    </Label>
                    <p className="text-sm text-white/90">
                      Powerful and strong. Strong against Explorers, weak against Sages.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer bg-yellow-400/80 hover:bg-yellow-500/80 transition-colors border-yellow-600">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="EXPLORER" id="explorer" />
                  <div className="flex-1">
                    <Label htmlFor="explorer" className="cursor-pointer font-semibold text-gray-800">
                      Explorer (Dexterity)
                    </Label>
                    <p className="text-sm text-gray-700">
                      Agile and quick. Strong against Sages, weak against Fighters.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer bg-pink-400/80 hover:bg-pink-500/80 transition-colors border-pink-600 mb-4">
                <CardContent className="flex items-start gap-4 pt-4">
                  <RadioGroupItem value="SAGE" id="sage" />
                  <div className="flex-1">
                    <Label htmlFor="sage" className="cursor-pointer font-semibold text-white">
                      Sage (Intelligence)
                    </Label>
                    <p className="text-sm text-white/90">
                      Wise and clever. Strong against Fighters, weak against Explorers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-sky-600 font-bold"
          >
            {loading ? "Adopting..." : "Adopt Beastie"}
          </Button>
          <Button 
            type="button" 
            onClick={() => router.back()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold"
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

