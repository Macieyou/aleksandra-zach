"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useFullPage } from "./FullPageScroll";
import FloatingParticles from "./FloatingParticles";

const SECTION_INDEX = 3;

export default function MemoriesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [progress, setProgress] = useState(0);
  const iconTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { currentSection } = useFullPage();

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    setShowIcon(true);
    clearTimeout(iconTimeout.current);
    iconTimeout.current = setTimeout(() => setShowIcon(false), 800);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentSection !== SECTION_INDEX && !video.paused) {
      video.pause();
      setIsPlaying(false);
    }
  }, [currentSection]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      video.currentTime = ratio * video.duration;
      setProgress(ratio);
    },
    [],
  );

  return (
    <section className="relative h-screen flex flex-col items-center justify-center gap-[2.5vh] py-[3vh] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FDFBF7 0%, #F5EDE3 40%, #EDE3D6 70%, #E4D8C8 100%)",
        }}
      />

      <FloatingParticles count={12} />

      <div className="relative z-10 text-center px-8 shrink-0">
        <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4" />
        <h2 className="text-3xl md:text-4xl font-serif text-graphite/60">
          Nasze wspomnienia 📽️
        </h2>
        <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4" />
      </div>

      <div className="relative z-10 w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-6 flex-1 min-h-0">
        <div
          className="relative h-full rounded-2xl overflow-hidden shadow-2xl shadow-graphite/15"
          style={{
            background:
              "linear-gradient(145deg, #B8894A 0%, #96703A 15%, #C49A5C 30%, #A07840 50%, #C4A265 70%, #96703A 85%, #B8894A 100%)",
            padding: "5px",
          }}
        >
          <div className="relative h-full rounded-[12px] overflow-hidden bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              preload="metadata"
              onClick={togglePlay}
            >
              <source src="/images/urodziny-60-ordinary.mp4" type="video/mp4" />
            </video>

            <AnimatePresence>
              {showIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isPlaying && progress === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 pb-2 px-2">
              <div className="flex justify-end gap-2">
                <a
                  href="/images/urodziny-60-ordinary.mp4"
                  download="wspomnienia.mp4"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/15 transition-transform active:scale-90"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </a>
              </div>
              <div
                className="h-4 cursor-pointer group flex items-end"
                onClick={handleProgressClick}
              >
                <div className="w-full h-[3px] rounded-full bg-white/20 group-hover:h-[5px] transition-all">
                  <div
                    className="h-full rounded-full bg-white/70"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
