"use client"

import Image from "next/image"
import { Trash2, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "../src/context/Contextapi"
import Link from "next/link"

export default function DashboardPage() {
  const { cartItems, removeFromCart } = useCart()

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-5xl font-black uppercase">
              Cart Products
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
            <ShoppingBag size={18} className="text-yellow-500" />

            <span className="text-sm text-yellow-400">
              {cartItems.length} Items
            </span>
          </div>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="flex h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <ShoppingBag size={60} className="text-white/20" />

            <h2 className="mt-5 text-2xl font-bold">
              No Products Added
            </h2>

            <p className="mt-2 text-white/40">
              Add products from marketplace <Link href="/" className="text-yellow-500 hover:underline">
                to see them here
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]"
              >
                {/* Image */}
                <div className="relative h-72 bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-8"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 p-5">
                  <span className="inline-block rounded-full bg-yellow-500 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-black">
                    {item.category}
                  </span>

                  <h2 className="line-clamp-2 text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="line-clamp-2 text-sm text-white/40">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-3xl font-black text-yellow-500">
                      ${item.price}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}