"use client";

import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const quote = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const fromLeft = (delay: number) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const fromRight = (delay: number) => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const climax = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 2.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function WishesSection() {
  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FDFBF7 0%, #FBF5EE 30%, #F5EDE3 60%, #F0E6DB 100%)",
        }}
      />

      <FloatingParticles count={14} />

      {/* Gradient blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-rose-soft/30 blur-[100px]"
          animate={{
            x: [0, 40, -20, 30, 0],
            y: [0, -30, 20, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-champagne/40 blur-[100px]"
          animate={{
            x: [0, -30, 20, -15, 0],
            y: [0, 20, -25, 15, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 max-w-md mx-auto px-8 text-center"
      >
        <motion.div
          variants={quote}
          className="text-7xl font-serif text-gold/60 leading-none select-none"
        >
          &ldquo;
        </motion.div>

        <motion.p
          variants={fromLeft(0.4)}
          className="text-2xl md:text-3xl font-serif text-graphite leading-snug mt-2"
        >
          Dziękujemy za każde wsparcie,
        </motion.p>

        <motion.p
          variants={fromRight(1.0)}
          className="text-3xl md:text-4xl font-serif text-graphite font-medium leading-snug mt-4"
        >
          każdy uśmiech,
        </motion.p>

        <motion.p
          variants={fromLeft(1.6)}
          className="text-2xl md:text-3xl font-serif text-graphite leading-snug mt-4"
        >
          każdą chwilę,
        </motion.p>

        <motion.p
          variants={fromRight(2.2)}
          className="text-3xl md:text-4xl font-serif text-graphite font-medium leading-snug mt-4"
        >
          która tworzy
        </motion.p>

        <motion.p
          variants={climax}
          className="text-4xl md:text-5xl font-serif text-graphite font-semibold leading-snug mt-6"
        >
          naszą rodzinę.
        </motion.p>

        <motion.div
          variants={quote}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 3.8 }}
          className="text-7xl font-serif text-gold/60 leading-none select-none mt-2"
        >
          &rdquo;
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 4.2, duration: 1, ease: "easeOut" }}
          className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
