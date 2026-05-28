"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import FloatingParticles from "./FloatingParticles";

const CONFETTI_COLORS = [
  "#D4AF37", "#C9A96E", "#E8D5B7",
  "#F4C6C0", "#E8BDB8", "#F0D5D0",
  "#D8C4A8", "#B8944A", "#C4A265",
];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
  shape: "square" | "rect" | "circle";
}

function useConfetti(count: number): ConfettiPiece[] {
  return useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 4 + Math.random() * 6,
      delay: 1.2 + Math.random() * 0.6,
      duration: 1.8 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 120,
      rotation: Math.random() * 720 - 360,
      shape: (["square", "rect", "circle"] as const)[Math.floor(Math.random() * 3)],
    })),
  [count]);
}

function ConfettiLayer({ pieces, isInView }: { pieces: ConfettiPiece[]; isInView: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "45%",
            width: p.shape === "rect" ? p.size * 1.8 : p.size,
            height: p.shape === "circle" ? p.size : p.size * 0.7,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "rect" ? 1 : 2,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0 }}
          animate={isInView ? {
            opacity: [0, 1, 1, 0.8, 0],
            y: [0, -200 - Math.random() * 150, -80 + Math.random() * 300],
            x: [0, p.drift * 0.6, p.drift],
            rotate: [0, p.rotation],
            scale: [0, 1.2, 1, 0.6],
          } : {}}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}

export default function CakeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px" });
  const confetti = useConfetti(50);

  return (
    <section
      ref={ref}
      className="relative h-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F5EDE3 0%, #FDFBF7 15%, #FDFBF7 85%, #FBF5EE 100%)",
        }}
      />

      <FloatingParticles count={12} />
      <ConfettiLayer pieces={confetti} isInView={isInView} />

      {/* Warm ambient glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/8 blur-[100px]"
          animate={isInView ? { opacity: [0, 1] } : {}}
          transition={{ duration: 2 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center justify-center h-full gap-[2.5vh] py-[3vh]">
        {/* Portrait with frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 w-[25vh]"
        >
          <div
            className="relative rounded-lg p-[0.8vh] shadow-2xl shadow-graphite/20"
            style={{
              background:
                "linear-gradient(145deg, #B8894A 0%, #96703A 15%, #C49A5C 30%, #A07840 50%, #C4A265 70%, #96703A 85%, #B8894A 100%)",
            }}
          >
            <div
              className="rounded-[4px] p-[2px]"
              style={{
                background:
                  "linear-gradient(145deg, #8B6332, #6B4C28, #8B6332)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)",
              }}
            >
              <div className="rounded-[2px] p-[2px] bg-gradient-to-br from-[#D4AF37] via-[#C9A96E] to-[#D4AF37]">
                <div className="rounded-sm overflow-hidden bg-white">
                  <img
                    src="/images/mama.png"
                    alt="Mama Aleksandra"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-sm" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-sm" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-sm" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-sm" />
          </div>

          <div className="absolute -inset-6 rounded-3xl bg-gold/8 blur-3xl -z-10" />
        </motion.div>

        {/* Cake PNG */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="relative z-10 w-[34vh]"
        >
          <img
            src="/images/cake.png"
            alt="Tort urodzinowy na 60-tkę"
            className="w-full h-auto mix-blend-multiply"
          />
        </motion.div>

        {/* Text below composition */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 1 }}
          className="text-[3.2vh] font-serif text-graphite text-center"
        >
          Wszystkiego najlepszego! ❤️
        </motion.h2>
      </div>
    </section>
  );
}
