"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSequenceLoaded, setIsSequenceLoaded] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // 1. Smooth percentage counter up to 95%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        const step = Math.random() * 8 + 3;
        return Math.min(prev + step, 95);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // 2. Preload critical video & sequence frame assets
  useEffect(() => {
    // Preload videos (Desktop & Mobile)
    const videoPaths = ["/assets/hero_video.mp4", "/assets/mob_hero_video.mp4"];
    let loadedVideos = 0;

    const checkVideos = () => {
      loadedVideos++;
      if (loadedVideos >= videoPaths.length) {
        setIsVideoLoaded(true);
      }
    };

    videoPaths.forEach((src) => {
      const vid = document.createElement("video");
      vid.src = src;
      vid.preload = "auto";
      vid.muted = true;
      vid.playsInline = true;
      vid.oncanplaythrough = checkVideos;
      vid.onloadeddata = checkVideos;
      vid.oncanplay = checkVideos;
      vid.onerror = checkVideos;
      vid.load();
    });

    // Preload initial batch of sequence frames (1st ~40 frames of 2nd screen)
    let loadedFrames = 0;
    const framesToPreload = 40;

    const checkFrames = () => {
      loadedFrames++;
      if (loadedFrames >= framesToPreload) {
        setIsSequenceLoaded(true);
      }
    };

    for (let i = 1; i <= framesToPreload; i++) {
      const img = new window.Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/assets/sequence/frame_${paddedIndex}.jpg`;
      img.onload = checkFrames;
      img.onerror = checkFrames;
    }
  }, []);

  // 3. Complete preloader when ready
  useEffect(() => {
    if (progress >= 95 && isVideoLoaded && isSequenceLoaded) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsFullyLoaded(true);
        setTimeout(() => {
          onComplete();
        }, 700);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, isVideoLoaded, isSequenceLoaded, onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {!isFullyLoaded && (
        <motion.div
          key="velora-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] w-full h-[100dvh] min-h-[700px] overflow-hidden flex flex-col items-center justify-center bg-[#060803] text-[#F3EEE6] select-none"
        >
          {/* Main Content Container — 100% pixel-perfect alignment with MainHero */}
          <div className="relative z-10 text-center max-w-6xl px-4 flex flex-col items-center justify-center space-y-8 sm:space-y-10">
            
            {/* Logo — Matched exactly to MainHero size and coordinates */}
            <div>
              <motion.div
                animate={{
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/assets/logo.png"
                  alt="VÉLORA"
                  className="h-56 sm:h-80 md:h-[24rem] lg:h-[28rem] w-auto object-contain filter brightness-110 drop-shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Percentage counter under logo — Matches dimensions of Request Catalog button */}
            <div className="min-h-[58px] sm:min-h-[66px] min-w-[260px] sm:min-w-[320px] flex flex-col items-center justify-center space-y-1">
              <span className="font-serif text-2xl sm:text-3xl text-[#C9A063] tracking-[0.2em] font-light block text-center">
                {displayProgress}%
              </span>
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#DCC8AA]/50 font-light block text-center">
                Haute Couture
              </span>
            </div>

          </div>

          {/* Minimal progress bar at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a1c18]">
            <div
              className="h-full bg-gradient-to-r from-[#C9A063]/60 via-[#C9A063] to-[#DCC8AA] transition-all duration-200 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
