"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function Sparkle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: [0, 1, 0.3, 1, 0],
        scale: [0, 1, 0.6, 1, 0],
      }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
      </svg>
    </motion.div>
  );
}

function useSparkles(count: number) {
  return useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${8 + Math.random() * 84}%`,
      y: `${8 + Math.random() * 84}%`,
      size: 6 + Math.random() * 10,
      delay: 1.5 + Math.random() * 3,
    })),
  [count]);
}

export default function BuildUpSection() {
  const sparkles = useSparkles(18);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628] via-[#132744] to-[#0D1B30]" />

      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(196,162,101,0.15) 0%, transparent 60%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-1/3"
        style={{
          background: "radial-gradient(ellipse at 30% 0%, rgba(244,160,181,0.08) 0%, transparent 50%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {sparkles.map((s) => (
        <Sparkle key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
      ))}

      <div className="relative z-10 text-center px-8 flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-serif text-white/50 tracking-wide"
        >
          Mamy dla Ciebie
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-serif font-semibold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #F5E6B8 30%, #D4AF37 50%, #C9A96E 70%, #F5E6B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          niespodziankę
        </motion.p>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 120, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.0, duration: 1.0 }}
          className="text-2xl md:text-3xl font-serif text-white/50 italic"
        >
          przewiń dalej...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-2"
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(212,175,55,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M7 10l5 5 5-5" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
