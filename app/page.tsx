import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image src="assets/images/login_bg.webp" alt="Background" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="assets/images/beasties_logo.webp"
              alt="BEASTIES"
              width={500}
              height={150}
              className="w-full max-w-lg"
              priority
            />
          </div>
          <p className="text-xl text-white drop-shadow-lg max-w-2xl mx-auto font-semibold">
            Collect, train, and send your creatures on epic quests in this management adventure game
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-[#ffff00] hover:bg-[#ffff00]/90 text-[#00ccff] font-bold">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" className="bg-[#ff99cc] hover:bg-[#ff99cc]/90 text-[#00ffcc] font-bold">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-white/20 backdrop-blur-sm border-white/40">
            <CardHeader>
              <CardTitle className="text-white">Collect Beasties</CardTitle>
              <CardDescription className="text-white/90">
                Adopt unique creatures with different types and stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Choose from Explorers (dexterity), Fighters (strength), or Sages (intelligence) to build your perfect
                team
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-white/40">
            <CardHeader>
              <CardTitle className="text-white">Complete Quests</CardTitle>
              <CardDescription className="text-white/90">Send your team on adventures across the map</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Navigate a 5x5 grid map filled with exploration, combat, and puzzle quests to earn rewards
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-white/40">
            <CardHeader>
              <CardTitle className="text-white">Level Up</CardTitle>
              <CardDescription className="text-white/90">Train and improve your creatures</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Assign tasks, use candies, and gain experience to make your Beasties stronger
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
