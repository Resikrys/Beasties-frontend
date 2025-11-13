"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authApi } from "@/lib/api"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authApi.login(username, password)
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("userRole", response.role)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-transparent backdrop-blur-sm border-2 border-white/40">
      <CardHeader>
        <CardTitle className="text-white drop-shadow-lg">Login to BEASTIES</CardTitle>
        <CardDescription className="text-white/90 drop-shadow">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="bg-[#ffff00] text-black px-2 py-1 rounded border-2 border-[#ff99cc] inline-block"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#ffff00]/30 border-[#ffff00]/50 text-black placeholder:text-black/60 focus:bg-[#ffff00]/40"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="bg-[#ffff00] text-black px-2 py-1 rounded border-2 border-[#ff99cc] inline-block"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#ffff00]/30 border-[#ffff00]/50 text-black placeholder:text-black/60 focus:bg-[#ffff00]/40"
            />
          </div>
          {error && <p className="text-sm text-red-600 font-semibold bg-white/80 px-3 py-1 rounded">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-[#ff99cc] hover:bg-[#ff80b3] text-[#00ffcc] font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-sm text-white drop-shadow">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#00ccff] hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
