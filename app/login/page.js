"use client"
import {useState , useEffect} from "react"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

   const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    console.log(result)

    if (result?.error) {
      console.error("Login error:", result.error)
      toast.error("Invalid email or password")
    } else {
      toast.success("Login successful")
      router.push("/main_page")
    }
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong")
  }
}
    
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
            
          <Card className="border-white/10 rounded-lg bg-white/5 backdrop-blur-2xl">
            <CardHeader className="space-y-3 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg"
              >
                <Lock className="h-6 w-6 text-white" />
              </motion.div>

              <div>
                <CardTitle className="text-3xl font-bold tracking-tight text-white">
                  Welcome Back
                </CardTitle>

                <CardDescription className="mt-2 text-gray-400">
                  Login to continue exploring the marketplace
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-5">
                
                <div className="space-y-2">
                

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <Input
                      type="email"
                      value={email}
                      onChange ={(e)=>setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-11 border-white/10 rounded-lg bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
                    />
                  </div>
                </div>

                
                <div className="space-y-2">
                

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <Input
                      type="password"
                      value={password}
                      onChange ={(e)=>setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 border-white/10 rounded-lg bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                

                
                <Button onClick={handleLogin} className="group h-11 w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90">
                  Login
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <div className="relative">
                  <Separator className="bg-white/10" />

                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#09090B] px-2 text-xs text-gray-500">
                    OR
                  </span>
                </div>

                {/* Register */}
                <p className="text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="cursor-pointer font-medium text-cyan-400 transition hover:text-cyan-300">
                    Create Account
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