"use client";

import Image from "next/image";
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
        className="relative max-w-7xl mx-auto h-[320px] md:h-[420px] rounded-[32px] overflow-hidden bg-[#7a001f]"
      >
        {/* Background Image */}
        <Image
          src="/images/Home/Home2.png"
          alt="Combo Packs Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />

        {/* Decorative Glow */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <Gift size={30} className="text-brown-900" strokeWidth={2.2} />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Try Our Combo Packs &amp; Save 20%
          </h2>

          <p className="max-w-2xl text-cream-100 text-base md:text-lg leading-relaxed mb-8">
            Get a curated mix of our most-loved pickles, Karuvadu, podis and
            homemade specialties — perfect for gifting or stocking your pantry.
          </p>

          <Link
            href="/shop?category=Combo+Packs"
            className="inline-flex items-center gap-2 bg-gold-500 text-brown-900 px-8 py-4 rounded-xl font-semibold hover:bg-gold-400 transition-all duration-300 group shadow-lg"
          >
            Explore Combos
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}