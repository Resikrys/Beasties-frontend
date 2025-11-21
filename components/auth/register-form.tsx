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
import Image from "next/image"

export function RegisterForm() {
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
      const response = await authApi.register(username, password, "ROLE_USER")
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("userRole", response.role)
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Username may already exist.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-transparent backdrop-blur-sm border-2 border-white/40">
      <CardHeader>
        <CardTitle>Register for BEASTIES</CardTitle>
        <CardDescription>Create a new account to start your adventure</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white drop-shadow">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#ff99cc]/30 border-[#ff99cc]/50 text-black placeholder:text-black/60 focus:bg-[#ff99cc]/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white drop-shadow">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-[#ff99cc]/30 border-[#ff99cc]/50 text-black placeholder:text-black/60 focus:bg-[#ff99cc]/40"
            />
          </div>
          {error && <p className="text-sm text-red-600 font-semibold bg-white/80 px-3 py-1 rounded">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full mt-2 bg-[#ffff00] hover:bg-[#ffff33] text-[#00ccff] font-semibold"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
          <p className="text-sm text-white drop-shadow">
            Already have an account?{" "}
            <Link href="/login" className="text-[#ff99cc] hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
