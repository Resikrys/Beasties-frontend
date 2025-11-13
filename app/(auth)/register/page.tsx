import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url(assets/images/login_bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <RegisterForm />
    </div>
  )
}
