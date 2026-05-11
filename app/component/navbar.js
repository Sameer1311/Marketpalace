"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  ShoppingBag,
  LogInIcon,
  LogOut,
  User2,
} from "lucide-react"

import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

/* ────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: Info },
  { href: "/contact", label: "Contact", Icon: Mail },
]

/* ────────────────────────────────────────────────────────────── */

const DesktopLink = ({ href, label, active }) => (
  <Link
    href={href}
    aria-current={active ? "page" : undefined}
    className={[
      "relative font-mono text-xs uppercase tracking-widest transition-all duration-300",
      "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left",
      "after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300",
      "hover:text-amber-400 hover:after:scale-x-100",
      active
        ? "text-amber-400 after:scale-x-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        : "text-white/50",
    ].join(" ")}
  >
    {label}
  </Link>
)

/* ────────────────────────────────────────────────────────────── */

const MobileLink = ({ href, label, Icon, active }) => (
  <SheetClose asChild>
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-3 rounded-none border-l-2 px-4 py-3",
        "font-mono text-xs uppercase tracking-widest transition-all duration-200",
        active
          ? "border-amber-500 bg-amber-500/5 text-amber-400"
          : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/[0.03] hover:text-white/70",
      ].join(" ")}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </Link>
  </SheetClose>
)

/* ────────────────────────────────────────────────────────────── */

const Navbar = () => {
  const pathname = usePathname()

  const { data: session } = useSession()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  /* Scroll backdrop */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Hide navbar on scroll down */

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "border-b border-white/[0.06] bg-neutral-950/90 backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      {/* Noise texture */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />

      {/* Top gradient line */}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <nav
        className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}

        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Marketplace Home"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 transition-transform duration-300 group-hover:scale-150" />

          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="font-['Bebas_Neue'] text-2xl leading-none tracking-wide text-white transition-colors duration-200 group-hover:text-amber-400"
          >
            Marketplace
          </motion.span>
        </Link>

        {/* ── Desktop Nav ── */}

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <DesktopLink
                href={href}
                label={label}
                active={pathname === href}
              />
            </li>
          ))}
        </ul>

        {/* ── Desktop Actions ── */}

        <div className="hidden items-center gap-3 md:flex">

          {/* User Info */}

          {session?.user && (
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
              <User2 className="h-4 w-4 text-amber-400" />

              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white/70">
                {session.user.name || session.user.email}
              </span>
            </div>
          )}

          {/* Login / Logout */}

          {session ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="gap-2 rounded-lg border-red-500/20 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-3 w-3" />

              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border-white/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-neutral-950"
              asChild
            >
              <Link href="/login">
                <LogInIcon className="h-3 w-3" />

                Login
              </Link>
            </Button>
          )}

          {/* Cart */}

          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg border-white/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-neutral-950"
            asChild
          >
            <Link href="/dashboard">
              <ShoppingBag className="h-3 w-3" />

              Your Cart
            </Link>
          </Button>
        </div>

        {/* ── Mobile Menu ── */}

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/50 hover:bg-white/5 hover:text-white md:hidden"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>

          {/* ── Mobile Drawer ── */}

          <SheetContent
            side="right"
            className="w-72 border-l border-white/[0.06] bg-neutral-950 p-0"
          >
            {/* Header */}

            <div className="flex h-16 items-center border-b border-white/[0.06] px-6">
              <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
                Marketplace
              </span>
            </div>

            {/* User */}

            {session?.user && (
              <div className="border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                    <User2 className="h-5 w-5 text-amber-400" />
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/70">
                      {session.user.name || "User"}
                    </p>

                    <p className="text-xs text-white/30">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Links */}

            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map(({ href, label, Icon }, index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MobileLink
                    href={href}
                    label={label}
                    Icon={Icon}
                    active={pathname === href}
                  />
                </motion.div>
              ))}
            </div>

            <Separator className="bg-white/[0.05]" />

            {/* Mobile Actions */}

            <div className="flex flex-col gap-3 p-4">

              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-white/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-white/60 hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                  asChild
                >
                  <Link href="/dashboard">
                    <ShoppingBag className="h-3.5 w-3.5" />

                    Your Cart
                  </Link>
                </Button>
              </SheetClose>

              {session ? (
                <Button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full gap-2 bg-red-500 font-mono text-[0.65rem] uppercase tracking-widest text-white hover:bg-red-400"
                >
                  <LogOut className="h-3.5 w-3.5" />

                  Logout
                </Button>
              ) : (
                <SheetClose asChild>
                  <Button
                    className="w-full gap-2 bg-amber-500 font-mono text-[0.65rem] uppercase tracking-widest text-neutral-950 hover:bg-amber-400"
                    asChild
                  >
                    <Link href="/login">
                      <LogInIcon className="h-3.5 w-3.5" />

                      Login
                    </Link>
                  </Button>
                </SheetClose>
              )}
            </div>

            {/* Footer */}

            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/15">
                © 2026 Marketplace
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar