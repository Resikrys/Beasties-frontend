import { QuestMap } from "@/components/map/quest-map"

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Quest Map</h1>
      <QuestMap />
    </div>
  )
}
