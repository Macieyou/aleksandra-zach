"use client";

import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

export default function EndingSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FDFBF7 0%, #FBF2EA 30%, #F5E8DC 60%, #F0DFD2 100%)",
        }}
      />

      <FloatingParticles count={16} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 text-center px-8 space-y-6 flex flex-col items-center"
      >
        {/* Decorative line */}
        <motion.div
          className="mx-auto h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <h2 className="text-5xl md:text-6xl font-serif text-graphite">
          Kochamy Cię
        </h2>

        {/* Pulsing heart */}
        <motion.div
          className="text-5xl select-none flex justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="text-xl md:text-2xl font-serif text-graphite/60 italic"
        >
          — Paulinka, Krzyś i Bartuś
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
