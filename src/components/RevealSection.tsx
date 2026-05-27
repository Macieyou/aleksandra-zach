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
      delay: 0.3 + Math.random() * 0.5,
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

function TicketCard() {
  return (
    <div className="relative w-[320px] md:w-[380px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-graphite/30">
        {/* === MAIN TICKET BODY === */}
        <div className="bg-[#1B2A4A] relative">
          {/* Italian flag stripe */}
          <div className="flex h-1.5">
            <div className="flex-1 bg-[#009246]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#CE2B37]" />
          </div>

          {/* Header: Bella Vita Air + Title */}
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className="text-xl text-[#C9A96E] italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Bella Vita Air
                </h3>
                <p className="text-[10px] text-[#C9A96E]/60 tracking-wider mt-0.5">
                  Żyj pięknie. Podróżuj lekko.
                </p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
                  Bilet urodzinowy
                </div>
                <div
                  className="text-lg text-[#C9A96E] font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  60. Urodziny
                </div>
              </div>
            </div>
          </div>

          {/* Route card */}
          <div className="mx-4 mb-4 bg-white/95 rounded-xl p-5">
            {/* City codes */}
            <div className="flex items-center justify-between mb-5">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Warszawa
                </p>
                <p className="text-3xl font-bold text-[#1B2A4A] tracking-wide">
                  WAW
                </p>
              </div>

              <div className="flex-1 mx-4 relative flex items-center justify-center h-6">
                <div className="w-full h-px bg-gray-200 absolute" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A] absolute left-0" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A] absolute right-0" />
                <motion.span
                  className="absolute text-[#1B2A4A] text-base"
                  animate={{ x: [-30, 30, -30] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✈
                </motion.span>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Włochy
                </p>
                <p className="text-3xl font-bold text-[#1B2A4A] tracking-wide">
                  ITA
                </p>
              </div>
            </div>

            {/* Details rows */}
            <div className="space-y-3 text-sm">
              <DetailRow icon="👤" label="Pasażer" value="Aleksandra Zach + 1" />
              <DetailRow icon="📍" label="Kierunek" value="Włochy lub gdziekolwiek chcesz" />
              <DetailRow icon="📅" label="Data" value="28 maja 2026" />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-dashed border-gray-200" />

            {/* Bottom details grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <MiniDetail label="Lot" value="MAMA60" />
              <MiniDetail label="Brama" value="G60" />
              <MiniDetail label="Miejsca" value="1A i 1B" />
              <MiniDetail label="Klasa" value="PRIMA" />
            </div>
          </div>

          {/* Bottom golden stripe */}
          <div className="h-1 bg-gradient-to-r from-[#C9A96E]/60 via-[#C9A96E] to-[#C9A96E]/60" />

          {/* Footer */}
          <div className="px-5 py-3 flex items-center justify-center">
            <p className="text-sm text-[#C9A96E]/80 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Szczęśliwej podróży! ♡
            </p>
          </div>

          {/* Italian flag bottom stripe */}
          <div className="flex h-1">
            <div className="flex-1 bg-[#009246]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#CE2B37]" />
          </div>
        </div>
      </div>

      {/* Glow behind card */}
      <div className="absolute -inset-8 rounded-3xl bg-[#C9A96E]/15 blur-3xl -z-10" />
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs mt-0.5">{icon}</span>
      <div>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          {label}:
        </span>
        <p className="text-[#1B2A4A] font-medium text-[13px] leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-[12px] font-bold text-[#1B2A4A] leading-tight">
        {value}
      </p>
    </div>
  );
}

export default function RevealSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-150px" });
  const confetti = useConfetti(50);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Warm lemon-tinted gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #FFFCE8 0%, #FFF8D6 20%, #FFF3C4 45%, #F5E6B8 65%, #C9A96E33 100%)",
        }}
      />

      {/* Warm ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/15 blur-[120px]" />
      </div>

      <FloatingParticles count={30} />
      <ConfettiLayer pieces={confetti} isInView={isInView} />

      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-[3vh] py-[3vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center shrink-0"
        >
          <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4" />
          <p className="text-2xl md:text-3xl font-serif text-graphite italic">
            Czas na włoską przygodę 🍕
          </p>
          <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <TicketCard />
        </motion.div>
      </div>
    </section>
  );
}
