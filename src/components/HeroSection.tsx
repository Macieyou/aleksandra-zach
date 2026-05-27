"use client";

import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import { useFullPage } from "./FullPageScroll";

const line1 = "Dla wyjątkowej osoby...";

function AnimatedLetters({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { next } = useFullPage();

  /*
   * Choreography timeline (seconds):
   * 0.0  – top decorative line
   * 0.3  – "Dla wyjątkowej osoby..." letter by letter (~0.7s total)
   * 1.2  – "Aleksandra" scale-in
   * 1.7  – ❤️ bounce
   * 2.0  – Mama ◆ Żona ◆ Dyrektor (together)
   * 2.4  – bottom decorative line
   * 2.8  – "Przesuń niżej" scroll arrow
   */

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep navy gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0B1628 0%, #132744 30%, #0D1B30 60%, #0F2035 100%)",
        }}
      />

      {/* Warm golden glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(196,162,101,0.18) 0%, rgba(212,175,55,0.06) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 1.5, ease: "easeOut" }}
      >
        <FloatingParticles count={20} darkMode />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        {/* Top decorative line */}
        <motion.div
          className="mx-auto mb-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ delay: 0, duration: 1, ease: "easeOut" }}
        />

        {/* "Dla wyjątkowej osoby..." */}
        <div className="mb-5">
          <AnimatedLetters
            text={line1}
            delay={0.3}
            className="text-xl md:text-2xl text-white/70 tracking-[0.05em] font-light"
          />
        </div>

        {/* "Aleksandra" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2.0,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-6xl md:text-8xl font-serif tracking-tight"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #F5E6B8 30%, #D4AF37 50%, #C9A96E 70%, #F5E6B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Aleksandra
        </motion.h1>

        {/* ❤️ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2.6,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="mt-2 text-4xl md:text-5xl select-none"
        >
          ❤️
        </motion.div>

        {/* Mama ◆ Żona ◆ Dyrektor — one by one */}
        <div className="mt-5 flex items-center justify-center gap-4 text-[#D4AF37]/70">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.5, ease: "easeOut" }}
            className="text-base md:text-lg tracking-[0.2em] uppercase font-light"
          >Mama</motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.35, duration: 0.3 }}
            className="text-[#D4AF37]/40 select-none"
          >&#9830;</motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.5, ease: "easeOut" }}
            className="text-base md:text-lg tracking-[0.2em] uppercase font-light"
          >Żona</motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.75, duration: 0.3 }}
            className="text-[#D4AF37]/40 select-none"
          >&#9830;</motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.5, ease: "easeOut" }}
            className="text-base md:text-lg tracking-[0.2em] uppercase font-light"
          >Dyrektor</motion.span>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ delay: 4.1, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Scroll hint - animated arrow */}
      <motion.button
        onClick={next}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.85 }}
        transition={{ delay: 4.5, duration: 1.2 }}
      >
        <span className="text-white/60 text-xs font-sans tracking-[0.25em] uppercase">
          przewiń w dół
        </span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 10l5 5 5-5" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
