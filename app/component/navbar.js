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
} from "lucide-react"

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

        {/* ── Desktop CTA ── */}

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg border-white/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-neutral-950"
            asChild
          >
            <Link href="/login">
              <div className="relative">
                <LogInIcon className="h-3 w-3" />
              </div>

              Login
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg border-white/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-neutral-950"
            asChild
          >
            <Link href="/dashboard">
              <div className="relative">
                <ShoppingBag className="h-3 w-3" />

                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-black">
                  2
                </span>
              </div>

              Your cart 
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

          {/* ── Drawer ── */}

          <SheetContent
            side="right"
            className="w-72 border-l border-white/[0.06] bg-neutral-950 p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          >
            {/* Header */}

            <div className="flex h-16 items-center border-b border-white/[0.06] px-6">
              <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
                Marketplace
              </span>
            </div>

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

            {/* CTA */}

            <div className="p-4">
              <SheetClose asChild>
                <Button
                  className="w-full gap-2 bg-amber-500 font-mono text-[0.65rem] uppercase tracking-widest text-neutral-950 hover:bg-amber-400"
                  asChild
                >
                  <Link href="/shop">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Shop Now
                  </Link>
                </Button>
              </SheetClose>
            </div>

            {/* Footer */}

            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/15">
                © 2026 My App
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar