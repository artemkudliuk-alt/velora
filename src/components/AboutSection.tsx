"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const TOTAL_FRAMES = 361;

const DividerCenter = () => (
  <div className="flex items-center justify-center space-x-4 my-4 opacity-70">
    <div className="h-[1px] w-12 bg-[#DCC8AA]/30" />
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#C9A063"/>
    </svg>
    <div className="h-[1px] w-12 bg-[#DCC8AA]/30" />
  </div>
);

interface AnimatedCharacterProps {
  char: string;
  progress: MotionValue<number>;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
  className: string;
}

function AnimatedCharacter({
  char,
  progress,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  className,
}: AnimatedCharacterProps) {
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const blurVal = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [14, 0, 0, 14]
  );
  const filterStr = useTransform(blurVal, (v) => `blur(${v}px)`);
  const y = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [10, 0, 0, -10]
  );

  return (
    <motion.span style={{ opacity, filter: filterStr, y }} className={className}>
      {char}
    </motion.span>
  );
}

// Stage 1: Left-side character-by-character blur reveal & exit
function ScrollCharacterRevealStage1({ progress, language }: { progress: MotionValue<number>; language: string }) {
  const linesEN = [
    [
      { word: "VÉLORA", isBrand: true },
    ],
    [
      { word: "is", isBrand: false },
      { word: "a", isBrand: false },
      { word: "modern", isBrand: false },
    ],
    [
      { word: "women's", isBrand: false },
      { word: "fashion", isBrand: false },
      { word: "brand", isBrand: false },
    ],
    [
      { word: "created", isBrand: false },
      { word: "in", isBrand: false },
      { word: "Odesa,", isBrand: false },
      { word: "Ukraine.", isBrand: false },
    ],
  ];

  const linesUA = [
    [
      { word: "VÉLORA", isBrand: true },
    ],
    [
      { word: "—", isBrand: false },
      { word: "це", isBrand: false },
      { word: "сучасний", isBrand: false },
      { word: "бренд", isBrand: false },
    ],
    [
      { word: "жіночого", isBrand: false },
      { word: "одягу,", isBrand: false },
      { word: "створений", isBrand: false },
    ],
    [
      { word: "в", isBrand: false },
      { word: "Одесі,", isBrand: false },
      { word: "Україна.", isBrand: false },
    ],
  ];

  const lines = language === "UA" ? linesUA : linesEN;

  let charCounter = 0;
  const totalChars = 64;

  const dividerOpacity = useTransform(progress, [0.05, 0.09, 0.28, 0.32], [0, 1, 1, 0]);
  const dividerBlur = useTransform(progress, [0.05, 0.09, 0.28, 0.32], [10, 0, 0, 10]);
  const dividerFilter = useTransform(dividerBlur, (v) => `blur(${v}px)`);

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg text-center select-none space-y-2">
      <motion.div style={{ opacity: dividerOpacity, filter: dividerFilter }}>
        <DividerCenter />
      </motion.div>

      {lines.map((lineWords, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5">
          {lineWords.map((wordObj, wordIdx) => {
            const wordChars = Array.from(wordObj.word);
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {wordChars.map((char, charIdx) => {
                  const globalIdx = charCounter++;

                  const enterStart = 0.06 + (globalIdx / totalChars) * 0.14;
                  const enterEnd = enterStart + 0.035;

                  const exitStart = 0.27 + (globalIdx / totalChars) * 0.08;
                  const exitEnd = exitStart + 0.035;

                  const className = wordObj.isBrand
                    ? "font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#C9A063] font-normal tracking-[0.2em] uppercase inline-block drop-shadow-xl mb-1"
                    : "font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F3EEE6] font-light tracking-wide inline-block drop-shadow-md";

                  return (
                    <AnimatedCharacter
                      key={`${lineIdx}-${wordIdx}-${charIdx}-${globalIdx}`}
                      char={char}
                      progress={progress}
                      enterStart={enterStart}
                      enterEnd={enterEnd}
                      exitStart={exitStart}
                      exitEnd={exitEnd}
                      className={className}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Stage 2: Right-side character-by-character blur reveal & exit in 4 clean lines
function ScrollCharacterRevealStage2({ progress, language }: { progress: MotionValue<number>; language: string }) {
  const linesEN = [
    [
      { word: "The", highlight: true },
      { word: "brand", highlight: true },
      { word: "is", highlight: false },
      { word: "dedicated", highlight: false },
      { word: "to", highlight: false },
    ],
    [
      { word: "designing", highlight: false },
      { word: "elegant,", highlight: false },
      { word: "feminine,", highlight: false },
    ],
    [
      { word: "and", highlight: false },
      { word: "contemporary", highlight: false },
      { word: "dresses", highlight: false },
      { word: "for", highlight: false },
      { word: "women", highlight: false },
    ],
    [
      { word: "who", highlight: false },
      { word: "want", highlight: false },
      { word: "to", highlight: false },
      { word: "express", highlight: false },
      { word: "their", highlight: false },
      { word: "confidence,", highlight: true },
      { word: "beauty,", highlight: true },
      { word: "and", highlight: false },
      { word: "individuality.", highlight: true },
    ],
  ];

  const linesUA = [
    [
      { word: "Бренд", highlight: true },
      { word: "присвячений", highlight: true },
      { word: "створенню", highlight: false },
    ],
    [
      { word: "елегантних,", highlight: false },
      { word: "жіночних", highlight: false },
      { word: "та", highlight: false },
    ],
    [
      { word: "сучасних", highlight: false },
      { word: "суконь", highlight: false },
      { word: "для", highlight: false },
      { word: "жінок,", highlight: false },
    ],
    [
      { word: "які", highlight: false },
      { word: "прагнуть", highlight: false },
      { word: "підкреслити", highlight: false },
      { word: "впевненість,", highlight: true },
      { word: "красу", highlight: true },
      { word: "та", highlight: false },
      { word: "індивідуальність.", highlight: true },
    ],
  ];

  const lines = language === "UA" ? linesUA : linesEN;

  let charCounter = 0;
  const totalChars = 145;

  const dividerOpacity = useTransform(progress, [0.38, 0.42, 0.62, 0.66], [0, 1, 1, 0]);
  const dividerBlur = useTransform(progress, [0.38, 0.42, 0.62, 0.66], [10, 0, 0, 10]);
  const dividerFilter = useTransform(dividerBlur, (v) => `blur(${v}px)`);

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center select-none space-y-2">
      <motion.div style={{ opacity: dividerOpacity, filter: dividerFilter }}>
        <DividerCenter />
      </motion.div>

      {lines.map((lineWords, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3">
          {lineWords.map((wordObj, wordIdx) => {
            const wordChars = Array.from(wordObj.word);
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {wordChars.map((char, charIdx) => {
                  const globalIdx = charCounter++;

                  const enterStart = 0.39 + (globalIdx / totalChars) * 0.14;
                  const enterEnd = enterStart + 0.035;

                  const exitStart = 0.60 + (globalIdx / totalChars) * 0.08;
                  const exitEnd = exitStart + 0.035;

                  const className = wordObj.highlight
                    ? "font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#C9A063] font-normal tracking-wide inline-block drop-shadow-md"
                    : "font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F3EEE6] font-light tracking-wide inline-block drop-shadow-md";

                  return (
                    <AnimatedCharacter
                      key={`${lineIdx}-${wordIdx}-${charIdx}-${globalIdx}`}
                      char={char}
                      progress={progress}
                      enterStart={enterStart}
                      enterEnd={enterEnd}
                      exitStart={exitStart}
                      exitEnd={exitEnd}
                      className={className}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Stage 3: Lower-screen character-by-character blur reveal in 2 wide elegant lines
function ScrollCharacterRevealStage3({ progress, language }: { progress: MotionValue<number>; language: string }) {
  const linesEN = [
    [
      { word: "VÉLORA", isBrand: true },
      { word: "combines", isBrand: false },
      { word: "European", isBrand: false },
      { word: "elegance", isBrand: false },
      { word: "with", isBrand: false },
      { word: "modern", isBrand: false },
      { word: "feminine", isBrand: false },
      { word: "design,", isBrand: false },
    ],
    [
      { word: "creating", isBrand: false },
      { word: "pieces", isBrand: false },
      { word: "that", isBrand: false },
      { word: "are", isBrand: false },
      { word: "sophisticated,", isBrand: false },
      { word: "attractive,", isBrand: false },
      { word: "and", isBrand: false },
      { word: "unforgettable.", isBrand: false },
    ],
  ];

  const linesUA = [
    [
      { word: "VÉLORA", isBrand: true },
      { word: "поєднує", isBrand: false },
      { word: "європейську", isBrand: false },
      { word: "елегантність", isBrand: false },
      { word: "із", isBrand: false },
      { word: "сучасним", isBrand: false },
      { word: "жіночним", isBrand: false },
      { word: "дизайном,", isBrand: false },
    ],
    [
      { word: "створюючи", isBrand: false },
      { word: "вироби,", isBrand: false },
      { word: "що", isBrand: false },
      { word: "є", isBrand: false },
      { word: "витонченими,", isBrand: false },
      { word: "привабливими", isBrand: false },
      { word: "та", isBrand: false },
      { word: "незабутніми.", isBrand: false },
    ],
  ];

  const lines = language === "UA" ? linesUA : linesEN;

  let charCounter = 0;
  const totalChars = 145;

  const dividerOpacity = useTransform(progress, [0.70, 0.74, 0.94, 0.98], [0, 1, 1, 0]);
  const dividerBlur = useTransform(progress, [0.70, 0.74, 0.94, 0.98], [10, 0, 0, 10]);
  const dividerFilter = useTransform(dividerBlur, (v) => `blur(${v}px)`);

  return (
    <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl text-center select-none space-y-3 px-4">
      <motion.div style={{ opacity: dividerOpacity, filter: dividerFilter }}>
        <DividerCenter />
      </motion.div>

      {lines.map((lineWords, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5">
          {lineWords.map((wordObj, wordIdx) => {
            const wordChars = Array.from(wordObj.word);
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {wordChars.map((char, charIdx) => {
                  const globalIdx = charCounter++;

                  const enterStart = 0.71 + (globalIdx / totalChars) * 0.14;
                  const enterEnd = enterStart + 0.035;

                  const exitStart = 0.91 + (globalIdx / totalChars) * 0.06;
                  const exitEnd = exitStart + 0.035;

                  const className = wordObj.isBrand
                    ? "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#C9A063] font-normal tracking-[0.2em] uppercase inline-block drop-shadow-xl mb-1"
                    : "font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F3EEE6] font-light tracking-wide inline-block drop-shadow-md";

                  return (
                    <AnimatedCharacter
                      key={`${lineIdx}-${wordIdx}-${charIdx}-${globalIdx}`}
                      char={char}
                      progress={progress}
                      enterStart={enterStart}
                      enterEnd={enterEnd}
                      exitStart={exitStart}
                      exitEnd={exitEnd}
                      className={className}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function AboutSection() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload frames from /assets/sequence/frame_XXX.jpg
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const frameStep = 1;
    const targetFrames: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      targetFrames.push(i);
    }

    const totalToLoad = targetFrames.length;

    targetFrames.forEach((frameNumber) => {
      const img = new window.Image();
      const paddedIndex = String(frameNumber).padStart(3, "0");
      img.src = `/assets/sequence/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount >= Math.floor(totalToLoad * 0.2) && !imagesLoaded) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
      };

      loadedImages[frameNumber - 1] = img;
    });

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, []);

  const updateCanvasDimensions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const targetWidth = parent ? parent.clientWidth : window.innerWidth;
    const targetHeight = parent ? parent.clientHeight : window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.round(targetWidth * dpr);
    const displayHeight = Math.round(targetHeight * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  };

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    updateCanvasDimensions();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
    );
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  useEffect(() => {
    if (imagesLoaded && images[0]) {
      updateCanvasDimensions();
      drawFrame(0);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      updateCanvasDimensions();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(scrollYProgress.get() * (TOTAL_FRAMES - 1)))
      );
      drawFrame(frameIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Stage positions
  const stage1Opacity = useTransform(scrollYProgress, [0.04, 0.08, 0.28, 0.32], [0, 1, 1, 0]);
  const stage2Opacity = useTransform(scrollYProgress, [0.36, 0.40, 0.62, 0.66], [0, 1, 1, 0]);
  const stage3Opacity = useTransform(scrollYProgress, [0.69, 0.73, 0.94, 0.98], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative z-20 w-full h-[350vh] bg-[#060803] text-[#F3EEE6] shadow-2xl"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-[100dvh] sm:h-screen w-full overflow-hidden select-none bg-[#060803]">
        
        {/* Render Canvas for 72fps Frame Sequence of Dress on Mannequin */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-[1.03]"
        />

        {/* Cinematic Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(6,8,3,0.3) 0%, rgba(6,8,3,0.7) 70%, #060803 100%)",
          }}
        />

        {/* STAGE 1: Left-Screen Statement */}
        <motion.div
          style={{ opacity: stage1Opacity }}
          className="absolute inset-y-0 left-0 w-full sm:w-[65%] md:w-[55%] lg:w-[50%] z-20 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20"
        >
          <ScrollCharacterRevealStage1 progress={scrollYProgress} language={language} />
        </motion.div>

        {/* STAGE 2: Right-Screen Statement */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="absolute inset-y-0 right-0 w-full sm:w-[70%] md:w-[60%] lg:w-[52%] z-20 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20"
        >
          <ScrollCharacterRevealStage2 progress={scrollYProgress} language={language} />
        </motion.div>

        {/* STAGE 3: Lower-Screen Statement in 2 Wide Elegant Lines */}
        <motion.div
          style={{ opacity: stage3Opacity }}
          className="absolute inset-x-0 bottom-12 sm:bottom-16 md:bottom-20 z-20 flex items-center justify-center p-4 sm:p-8"
        >
          <ScrollCharacterRevealStage3 progress={scrollYProgress} language={language} />
        </motion.div>

      </div>
    </section>
  );
}
