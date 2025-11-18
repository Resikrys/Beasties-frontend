import { InventoryList } from "@/components/inventory/inventory-list"

export default function InventoryPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets//images/inventory_bg.webp')" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">My Inventory</h1>
        <InventoryList />
      </div>
    </div>
  )
}
