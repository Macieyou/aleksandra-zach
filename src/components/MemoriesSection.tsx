"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useFullPage } from "./FullPageScroll";
import FloatingParticles from "./FloatingParticles";

const SECTION_INDEX = 3;

export default function MemoriesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { currentSection } = useFullPage();

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setHasStarted(false);
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
    <section className="relative h-full flex flex-col items-center justify-center gap-[2.5vh] py-[3vh] overflow-hidden">
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
          Nasze wspomnienia
        </h2>
        <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4" />
      </div>

      <div className="relative z-10 w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-6 flex-1 min-h-0">
        <div
          className="relative h-full rounded-2xl overflow-hidden shadow-2xl shadow-graphite/15"
          style={{
            background:
              "linear-gradient(145deg, #B8894A 0%, #96703A 15%, #C49A5C 30%, #A07840 50%, #C4A265 70%, #96703A 85%, #B8894A 100%)",
            padding: "6px",
          }}
        >
          <div className="h-full rounded-[10px] p-[10px] bg-white">
            <div className="relative h-full rounded-[6px] overflow-hidden bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              preload="metadata"
              poster="/images/urodziny-60-ordinary-poster.png"
              onClick={togglePlay}
            >
              <source src="/images/urodziny-60-ordinary.mp4" type="video/mp4" />
            </video>

            {!isPlaying && !hasStarted && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center border border-white/30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {!isPlaying && hasStarted && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center border border-white/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                </div>
              </div>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = videoRef.current;
                    if (!video) return;
                    video.muted = !video.muted;
                    setIsMuted(!isMuted);
                  }}
                  className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/15 transition-transform active:scale-90"
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-3.98zM14 3.23v.06c0 .38.25.71.61.85C17.18 5.18 19 7.69 19 10.63c0 2.94-1.82 5.45-4.39 6.49-.36.14-.61.47-.61.85v.06c0 .63.63 1.08 1.22.85C18.6 17.74 21 14.47 21 10.63s-2.4-7.11-5.78-8.4c-.59-.23-1.22.23-1.22.86z" />
                    </svg>
                  )}
                </button>
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
      </div>
    </section>
  );
}
