import { BeastieList } from "@/components/beasties/beastie-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function BeastiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Beasties</h1>
        <Button asChild>
          <Link href="/dashboard/beasties/adopt">
            <Plus className="mr-2 h-4 w-4" />
            Adopt Beastie
          </Link>
        </Button>
      </div>

      <BeastieList />
    </div>
  )
}
