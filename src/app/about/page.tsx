"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Heart, Users, Award } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
  {
    icon: Leaf,
    title: "Authentic Recipes",
    desc: "Every recipe traces back to our family kitchen, unchanged for three generations.",
  },
  {
    icon: Heart,
    title: "Made With Care",
    desc: "Small batches, hand-stirred, sun-dried the traditional way — never rushed.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "We source vegetables and spices from local farmers across Tamil Nadu.",
  },
  {
    icon: Award,
    title: "Quality Promise",
    desc: "Every jar is tasted and approved before it reaches your doorstep.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main>
        {/* Hero Banner */}
        <section className="relative h-[260px] md:h-[390px] w-full overflow-hidden">
          <Image
            src="/images/hero about.png"
            alt="Lakshmi Kai Pakkuvam about banner"
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-5 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
              
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro Story */}
        <section className="bg-cream-100 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">Our Journey</span>
              <h2 className="section-title mt-2">
                From a Family Kitchen to Yours
              </h2>

              <p className="text-brown-600 mt-5 leading-relaxed max-w-2xl mx-auto">
                Lakshmi Kai Pakkuvam began in 2018 in a small kitchen in Salem,
                Tamil Nadu, where our founder started preparing pickles and
                podis using her mother&apos;s recipes for friends and family.
                What started as jars shared at festivals has grown into a
                beloved homemade food brand — but the recipes, and the love
                behind them, haven&apos;t changed one bit.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story with image */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card-hover"
            >
              <Image
                src="/images/hero image.png"
                alt="Traditional cooking process"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">Our Kitchen</span>
              <h2 className="section-title mt-2 mb-5">
                Where Tradition Meets Care
              </h2>

              <p className="text-brown-600 leading-relaxed mb-4">
                Every jar of pickle starts the same way it did decades ago —
                fresh vegetables hand-cut, spices roasted and ground in small
                batches, and everything mixed with cold-pressed gingelly oil.
              </p>

              <p className="text-brown-600 leading-relaxed mb-4">
                We never use chemical preservatives or artificial colours.
                Instead, we rely on salt, oil, and time — the same three
                ingredients our grandmothers trusted to make pickles that last
                for months.
              </p>

              <p className="text-brown-600 leading-relaxed">
                Today, our kitchen team is made up mostly of women from our
                local community, each bringing their own family touches to
                recipes that are tested and loved by hundreds of households.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-subtitle">What We Stand For</span>
              <h2 className="section-title mt-2">Our Values</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className="w-14 h-14 bg-maroon-700/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <v.icon size={24} className="text-maroon-700" />
                  </div>

                  <h3 className="font-semibold text-brown-800 mb-2">
                    {v.title}
                  </h3>

                  <p className="text-brown-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-maroon-800 text-white">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6+", label: "Years of Tradition" },
              { value: "10,000+", label: "Happy Families" },
              { value: "25+", label: "Authentic Recipes" },
              { value: "100%", label: "Homemade Promise" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl md:text-4xl font-bold text-gold-400 mb-1">
                  {s.value}
                </p>
                <p className="text-cream-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}