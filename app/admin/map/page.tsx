import { MapManagement } from "@/components/admin/map-management"

export default function AdminMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Map Management</h1>
      <MapManagement />
    </div>
  )
}
