import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            BEASTIES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collect, train, and send your creatures on epic quests in this management adventure game
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Collect Beasties</CardTitle>
              <CardDescription>Adopt unique creatures with different types and stats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose from Explorers (dexterity), Fighters (strength), or Sages (intelligence) to build your perfect
                team
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complete Quests</CardTitle>
              <CardDescription>Send your team on adventures across the map</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Navigate a 5x5 grid map filled with exploration, combat, and puzzle quests to earn rewards
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level Up</CardTitle>
              <CardDescription>Train and improve your creatures</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Assign tasks, use candies, and gain experience to make your Beasties stronger
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
