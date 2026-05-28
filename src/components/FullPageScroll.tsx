"use client";

import { motion, animate, useMotionValue } from "framer-motion";
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

const ANIMATION_DURATION = 0.7;
const ANIMATION_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const COOLDOWN_MS = 800;
const TOUCH_THRESHOLD = 50;

function useViewportHeight(
  containerRef: RefObject<HTMLDivElement | null>,
  currentSection: number,
  yOffset: ReturnType<typeof useMotionValue<number>>
) {
  useLayoutEffect(() => {
    const update = () => {
      const vh = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      const height = containerRef.current?.clientHeight ?? window.innerHeight;
      yOffset.set(Math.round(-currentSection * height));
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [containerRef, currentSection, yOffset]);
}

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

  useViewportHeight(containerRef, currentSection, yOffset);

  const getSectionHeight = useCallback(
    () => containerRef.current?.clientHeight ?? window.innerHeight,
    []
  );

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(sectionCount - 1, index));
      if (clamped === currentSection) return;

      isAnimating.current = true;
      setCurrentSection(clamped);

      const height = getSectionHeight();
      const target = Math.round(-clamped * height);
      animate(yOffset, target, {
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        onComplete: () => {
          yOffset.set(target);
          setTimeout(() => {
            isAnimating.current = false;
          }, COOLDOWN_MS - ANIMATION_DURATION * 1000);
        },
      });
    },
    [currentSection, sectionCount, getSectionHeight, yOffset]
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

    const onTouchMove = (e: TouchEvent) => {
      const delta = touchStartY.current - e.touches[0].clientY;
      const pullingDown = delta < -10;
      if (pullingDown && currentSection === 0) {
        return;
      }
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      if (delta > 0) next();
      else if (currentSection > 0) prev();
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
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [next, prev, currentSection]);

  const contextValue: FullPageContextValue = {
    currentSection,
    sectionCount,
    goTo,
    next,
    prev,
  };

  return (
    <FullPageContext.Provider value={contextValue}>
      <div ref={containerRef} className="h-screen-safe overflow-hidden relative">
        <motion.div style={{ y: yOffset }} className="will-change-transform">
          {Children.map(children, (child, index) => (
            <div key={index} className="h-screen-safe shrink-0 overflow-hidden">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </FullPageContext.Provider>
  );
}
