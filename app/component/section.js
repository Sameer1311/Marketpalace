"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ShoppingCart,
  Star,
} from "lucide-react"

import { toast } from "sonner"

import { getProducts } from "../services/product_api"
import { Button } from "@/components/ui/button"
import { useCart } from "../src/context/Contextapi"

const ProductSection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const data = await getProducts()

        setProducts(data)
      } catch (error) {
        console.error(error)

        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-yellow-500">
              Curated Collection
            </p>

            <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Featured <br />
              <span className="text-yellow-500">
                Products
              </span>
            </h2>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-yellow-400">
            {products.length} Products
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]"
              >
                <div className="h-[320px] bg-white/5" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-20 rounded bg-white/10" />

                  <div className="h-5 w-full rounded bg-white/10" />

                  <div className="h-5 w-2/3 rounded bg-white/10" />

                  <div className="h-4 w-full rounded bg-white/10" />

                  <div className="h-4 w-1/2 rounded bg-white/10" />

                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-8 w-20 rounded bg-white/10" />

                    <div className="h-10 w-28 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]"
                >

                  {/* Big Background Number */}
                  <span className="absolute right-4 top-0 text-[120px] font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-yellow-500/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Product Image */}
                  <div className="relative h-[320px] overflow-hidden bg-white">

                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Category */}
                    <span className="absolute bottom-0 left-0 bg-yellow-500 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black">
                      {product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col space-y-5 p-6">

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-3">

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={11}
                              fill={
                                star <= Math.round(product.rating.rate)
                                  ? "#eab308"
                                  : "transparent"
                              }
                              stroke={
                                star <= Math.round(product.rating.rate)
                                  ? "#eab308"
                                  : "rgba(255,255,255,0.2)"
                              }
                            />
                          ))}
                        </div>

                        <span className="text-xs text-white/40">
                          {product.rating.rate}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="line-clamp-2 text-lg font-medium leading-snug text-white/90">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/35">
                      {product.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">

                      {/* Price */}
                      <div className="text-3xl font-black tracking-tight text-yellow-500">
                        ${product.price}
                      </div>

                      {/* Cart Button */}
                      <Button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 transition-all hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
                      >
                        <ShoppingCart size={12} />
                        Cart
                      </Button>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-yellow-500/30" />
                </motion.div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/30 md:flex-row">

              <span>
                Showing{" "}
                <span className="text-yellow-500">
                  {products.length}
                </span>{" "}
                products
              </span>

              <span>
                Premium marketplace experience
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ProductSection