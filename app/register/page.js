"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Mail,
  Lock,
  ArrowRight,
  User,
} from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import  { useRouter } from "next/navigation"
export default function Registration() {
  // States
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!name || !email || !password) {
    return toast.error("All fields are required")
  }

  if (password.length < 6) {
    return toast.error(
      "Password must be at least 6 characters"
    )
  }

  try {
    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        data.message || "Registration failed"
      )
    }

    toast.success(
      "Account created successfully 🚀"
    )

    setName("")
    setEmail("")
    setPassword("")

    router.push("/login")

  } catch (error) {
    console.error(error)

    toast.error(error.message)
  } finally {
    setLoading(false)
  }
}
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute bottom-[10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      {/* Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >

          <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl">

            {/* Header */}
            <CardHeader className="space-y-3 text-center">

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg"
              >
                <User className="h-6 w-6 text-white" />
              </motion.div>

              <div>
                <CardTitle className="text-3xl font-bold tracking-tight text-white">
                  Create Account
                </CardTitle>

                <CardDescription className="mt-2 text-gray-400">
                  Join the marketplace and start exploring
                </CardDescription>
              </div>
            </CardHeader>

            {/* Form */}
            <CardContent>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="h-11 rounded-lg border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-11 rounded-lg border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-11 rounded-lg border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-purple-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="group h-11 w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Register

                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator className="bg-white/10" />

                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#09090B] px-2 text-xs text-gray-500">
                    OR
                  </span>
                </div>

                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}