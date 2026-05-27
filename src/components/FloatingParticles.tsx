"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const COLORS_LIGHT = [
  "#C9A96E", "#D4AF37", "#B8944A",
  "#E8D5B7", "#D8C4A8",
  "#F0D5D0", "#E8BDB8", "#F4C6C0",
];

const COLORS_DARK = [
  "#D4AF37", "#E8C84B", "#F5E6B8",
  "#C9A96E", "#FFFFFF",
  "#F0D5D0", "#E8BDB8", "#D4AF37",
];

type Shape = "balloon" | "heart" | "sparkle";
const SHAPES: Shape[] = ["balloon", "balloon", "heart", "heart", "sparkle"];

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  rotate: number;
  shape: Shape;
}

function BalloonSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className="w-full h-full">
      <ellipse cx="20" cy="18" rx="14" ry="17" fill={color} />
      <ellipse cx="15" cy="12" rx="4" ry="5" fill="white" opacity="0.25" />
      <polygon points="16,34 20,38 24,34" fill={color} />
      <path d="M20 38 Q22 45 18 52 Q21 48 20 55" stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
    </svg>
  );
}

function HeartSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path
        d="M16 28l-1.8-1.6C6.4 19.4 2 15.5 2 10.5 2 6.4 5.4 3 9.5 3c2.3 0 4.5 1.1 6.5 3 2-1.9 4.2-3 6.5-3C26.6 3 30 6.4 30 10.5c0 5-4.4 8.9-12.2 15.9L16 28z"
        fill={color}
      />
      <path
        d="M10 8c-1.5 0-3 1-3 3 0 1.2.6 2 1.2 2.8"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"
      />
    </svg>
  );
}

function SparkleSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path
        d="M16 2 L18.5 12.5 L29 16 L18.5 19.5 L16 30 L13.5 19.5 L3 16 L13.5 12.5 Z"
        fill={color}
      />
      <path
        d="M16 2 L18.5 12.5 L29 16 L18.5 19.5 L16 30 L13.5 19.5 L3 16 L13.5 12.5 Z"
        fill="white"
        opacity="0.25"
      />
    </svg>
  );
}

function ShapeSvg({ shape, color }: { shape: Shape; color: string }) {
  switch (shape) {
    case "balloon": return <BalloonSvg color={color} />;
    case "heart": return <HeartSvg color={color} />;
    case "sparkle": return <SparkleSvg color={color} />;
  }
}

const VIEWBOX_ASPECT: Record<Shape, { w: number; h: number }> = {
  balloon: { w: 40, h: 60 },
  heart: { w: 32, h: 32 },
  sparkle: { w: 32, h: 32 },
};

function generateItems(count: number, darkMode: boolean): FloatingItem[] {
  const colors = darkMode ? COLORS_DARK : COLORS_LIGHT;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.35 + 0.3,
    duration: Math.random() * 12 + 14,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.2 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: (Math.random() - 0.5) * 20,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }));
}

export default function FloatingParticles({ count = 25, darkMode = false }: { count?: number; darkMode?: boolean }) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    setItems(generateItems(count, darkMode));
  }, [count, darkMode]);

  if (items.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => {
        const aspect = VIEWBOX_ASPECT[item.shape];
        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: aspect.w * item.scale,
              height: aspect.h * item.scale,
            }}
            animate={{
              y: [0, -30, -10, -45, 0],
              x: [0, 10, -6, 8, 0],
              rotate: [item.rotate, item.rotate + 6, item.rotate - 4, item.rotate + 3, item.rotate],
              opacity: [item.opacity, item.opacity * 1.6, item.opacity, item.opacity * 1.4, item.opacity],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShapeSvg shape={item.shape} color={item.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
