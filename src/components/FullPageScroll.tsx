"use client";

import { motion, animate, useMotionValue } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const ANIMATION_DURATION = 0.7;
const ANIMATION_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const COOLDOWN_MS = 800;
const TOUCH_THRESHOLD = 50;

interface FullPageContextValue {
  currentSection: number;
  sectionCount: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const FullPageContext = createContext<FullPageContextValue>({
  currentSection: 0,
  sectionCount: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
});

export function useFullPage() {
  return useContext(FullPageContext);
}

interface FullPageScrollProps {
  children: ReactNode;
  sectionCount: number;
}

export default function FullPageScroll({
  children,
  sectionCount,
}: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const yOffset = useMotionValue(0);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(sectionCount - 1, index));
      if (clamped === currentSection) return;

      isAnimating.current = true;
      setCurrentSection(clamped);

      const target = -clamped * window.innerHeight;
      animate(yOffset, target, {
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        onComplete: () => {
          setTimeout(() => {
            isAnimating.current = false;
          }, COOLDOWN_MS - ANIMATION_DURATION * 1000);
        },
      });
    },
    [currentSection, sectionCount, yOffset]
  );

  const next = useCallback(
    () => goTo(currentSection + 1),
    [currentSection, goTo]
  );
  const prev = useCallback(
    () => goTo(currentSection - 1),
    [currentSection, goTo]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 5) return;
      if (e.deltaY > 0) next();
      else prev();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      if (delta > 0) next();
      else prev();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [next, prev]);

  useEffect(() => {
    const onResize = () => {
      const target = -currentSection * window.innerHeight;
      yOffset.set(target);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentSection, yOffset]);

  const contextValue: FullPageContextValue = {
    currentSection,
    sectionCount,
    goTo,
    next,
    prev,
  };

  return (
    <FullPageContext.Provider value={contextValue}>
      <div ref={containerRef} className="h-screen overflow-hidden relative">
        <motion.div style={{ y: yOffset }}>
          {children}
        </motion.div>

      </div>
    </FullPageContext.Provider>
  );
}
