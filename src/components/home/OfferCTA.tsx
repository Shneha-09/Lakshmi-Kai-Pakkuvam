"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

export default function OfferCTA() {
  return (
    <section className="py-14 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-800 rounded-3xl px-6 py-12 md:py-16 text-center relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Gift size={26} className="text-brown-800" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Try Our Combo Packs &amp; Save 20%
          </h2>
          <p className="text-cream-200 max-w-lg mx-auto mb-8">
            Get a curated mix of our most-loved pickles, podis, and thokku — perfect for gifting or stocking your pantry.
          </p>
          <Link
            href="/shop?category=Combo+Packs"
            className="inline-flex items-center gap-2 bg-gold-500 text-brown-800 px-7 py-3.5 rounded-xl font-semibold hover:bg-gold-400 transition-all duration-200 group"
          >
            Explore Combos
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
