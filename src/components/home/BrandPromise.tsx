"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Flame, Package, Heart } from "lucide-react";

const promises = [
  {
    icon: Leaf,
    title: "Pure Ingredients",
    desc: "Farm-fresh vegetables, cold-pressed oils, and hand-ground spices — nothing artificial, ever.",
  },
  {
    icon: Flame,
    title: "Traditional Methods",
    desc: "Slow-cooked in small batches using recipes passed down through three generations.",
  },
  {
    icon: Package,
    title: "Hygienic Packing",
    desc: "Sealed fresh in food-grade jars to lock in flavour and keep it shelf-stable for months.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    desc: "Every jar is packed by hand in our family kitchen — never a factory assembly line.",
  },
];

export default function BrandPromise() {
  return (
    <section className="relative py-14 sm:py-16 md:py-24 text-white overflow-hidden">
      <Image
        src="/images/Home/home3.png"
        alt="Lakshmi Kai Pakkuvam promise background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-brown-900/45" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-400 font-semibold text-sm tracking-widest uppercase">
            Our Promise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">
            Why Families Trust Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brown-700/80 backdrop-blur flex items-center justify-center mx-auto mb-4 border border-gold-500/25">
                <item.icon size={26} className="text-gold-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-cream-100 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}