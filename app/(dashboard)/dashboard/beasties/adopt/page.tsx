import { AdoptBeastieForm } from "@/components/beasties/adopt-beastie-form"

export default function AdoptBeastiePage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/beasties_form.webp')"
      }}
    >
      <AdoptBeastieForm />
    </div>
  )
}
