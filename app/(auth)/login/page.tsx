import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
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
      <LoginForm />
    </div>
  )
}
