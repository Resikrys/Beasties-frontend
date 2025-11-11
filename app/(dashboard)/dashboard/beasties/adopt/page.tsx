import { AdoptBeastieForm } from "@/components/beasties/adopt-beastie-form"

export default function AdoptBeastiePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Adopt a New Beastie</h1>
      <AdoptBeastieForm />
    </div>
  )
}
