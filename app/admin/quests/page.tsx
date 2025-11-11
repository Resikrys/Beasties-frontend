import { QuestManagement } from "@/components/admin/quest-management"

export default function AdminQuestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Quests</h1>
      <QuestManagement />
    </div>
  )
}
