"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Trash2,
  ShoppingBag,
  IndianRupee,
  CreditCard,
  ArrowRight,
} from "lucide-react"

import { useCart } from "../src/context/Contextapi"

export default function DashboardPage() {
  const { cartItems, removeFromCart } = useCart()

  /* Total Price */

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  )

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_35%)]" />

      {/* Noise Texture */}

      <div className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28">

        {/* Header */}

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-yellow-500">
              Marketplace Dashboard
            </p>

            <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">
              Your Cart
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40">
              Manage all your selected marketplace products in one place with a
              modern shopping experience.
            </p>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Total Products */}

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Products
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-yellow-500">
                    {cartItems.length}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                  <ShoppingBag className="h-7 w-7 text-yellow-500" />
                </div>
              </div>
            </motion.div>

            {/* Total Amount */}

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Total Amount
                  </p>

                  <h2 className="mt-2 flex items-center text-4xl font-black text-yellow-500">
                    <IndianRupee className="mr-1 h-7 w-7" />
                    {Math.floor(totalPrice * 83)}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                  <CreditCard className="h-7 w-7 text-yellow-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Empty State */}

        {cartItems.length === 0 ? (
          <div className="flex h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.03]">
              <ShoppingBag size={45} className="text-white/20" />
            </div>

            <h2 className="mt-8 text-3xl font-black uppercase">
              Your Cart Is Empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/40">
              Looks like you haven’t added any products yet. Explore the
              marketplace and start building your collection.
            </p>

            <Link
              href="/main_page"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-yellow-400"
            >
              Explore Marketplace

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Product Grid */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
                >

                  {/* Image */}

                  <div className="relative h-72 overflow-hidden bg-white">

                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}

                  <div className="space-y-5 p-6">

                    <div className="flex items-center justify-between">

                      <span className="rounded-full bg-yellow-500 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-black">
                        {item.category}
                      </span>

                      <span className="text-xs text-white/30">
                        Product
                      </span>
                    </div>

                    <h2 className="line-clamp-2 text-2xl font-black leading-tight">
                      {item.title}
                    </h2>

                    <p className="line-clamp-2 text-sm leading-relaxed text-white/40">
                      {item.description}
                    </p>

                    {/* Bottom */}

                    <div className="flex items-center justify-between border-t border-white/5 pt-5">

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                          Price
                        </p>

                        <h3 className="mt-1 flex items-center text-3xl font-black text-yellow-500">
                          <IndianRupee className="mr-1 h-5 w-5" />
                          {Math.floor(item.price * 83)}
                        </h3>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-xs uppercase tracking-[0.15em] text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={15} />

                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checkout Section */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8 backdrop-blur-xl"
            >

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-500">
                    Checkout Summary
                  </p>

                  <h2 className="mt-3 text-4xl font-black uppercase">
                    Ready To Checkout?
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                    Review your selected products and continue to secure payout
                    to complete your marketplace purchase.
                  </p>
                </div>

                {/* Right */}

                <div className="flex flex-col items-start gap-5 lg:items-end">

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Total Amount
                    </p>

                    <h3 className="mt-2 flex items-center text-5xl font-black text-yellow-500">
                      <IndianRupee className="mr-2 h-8 w-8" />
                      {Math.floor(totalPrice * 83)}
                    </h3>
                  </div>

                  <button
                    className="group flex items-center gap-3 rounded-2xl bg-yellow-500 px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-yellow-400"
                  >
                    <CreditCard className="h-4 w-4" />

                    Proceed To Payout

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </main>
  )
}