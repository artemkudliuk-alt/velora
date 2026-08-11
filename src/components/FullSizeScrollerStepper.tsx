"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface DressItem {
  id: string;
  categoryEN: string;
  categoryUA: string;
  name: string;
  subtitleEN: string;
  subtitleUA: string;
  descriptionEN: string;
  descriptionUA: string;
  image: string;
  alt: string;
  textPosition: "left" | "right";
  priceEN: string;
  priceUA: string;
  silhouetteEN: string;
  silhouetteUA: string;
  fabricEN: string;
  fabricUA: string;
}

const DRESSES: DressItem[] = [
  {
    id: "look-01-aura-nocturne",
    categoryEN: "VÉLORA HAUTE COUTURE",
    categoryUA: "VÉLORA HAUTE COUTURE",
    name: "AURA NOCTURNE",
    subtitleEN: "Midnight Tulle & Hand-Embroidered Lace Gown",
    subtitleUA: "Нічна Сукня з Нічного Тюлю та Мережива Ручної Роботи",
    descriptionEN:
      "A statement evening masterpiece featuring an architectural lace corset bodice, hand-sewn crystal beadwork, a multi-layered cascading midnight tulle skirt, and a daring high leg slit.",
    descriptionUA:
      "Вечірній шедевр із мереживним корсетним ліфом архітектурної форми, ручною вишивкою кришталевим бісером, багатошаровою каскадною спідницею з нічного тюлю та витонченим високим розрізом.",
    image: "/assets/stepper/3screen_1.png",
    alt: "AURA NOCTURNE - Midnight Navy Tulle Haute Couture Gown",
    textPosition: "right",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Sculptural Ballgown with Slit",
    silhouetteUA: "Кутюрна Бальна Сукня з Розрізом",
    fabricEN: "Midnight Navy Silk Tulle & French Lace",
    fabricUA: "Шовковий Тюль та Французьке Мереживо",
  },
  {
    id: "look-02-solaris-eclipse",
    categoryEN: "VÉLORA ATELIER",
    categoryUA: "VÉLORA ATELIER",
    name: "SOLARIS ECLIPSE",
    subtitleEN: "Ivory Silk Crepe & Gold Leaf Embroidery",
    subtitleUA: "Молочний Шовковий Креп та Золота Вишивка",
    descriptionEN:
      "Modern architectural elegance with a deep tailored plunge neckline, bespoke metallic gold floral filigree along the waistline, and an elongated fluid drape with high front slit.",
    descriptionUA:
      "Сучасна архітектурна елегантність із глибоким витонченим вирізом, металізованою золотою філігранню вздовж лінії талії та видовженим струмливим драпуванням із високим розрізом.",
    image: "/assets/stepper/3screen_2.jpeg",
    alt: "SOLARIS ECLIPSE - Ivory Silk Evening Gown with Gold Embroidery",
    textPosition: "left",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Column Sheath with Front Slit",
    silhouetteUA: "Сукня-Футляр із Переднім Розрізом",
    fabricEN: "Heavy Italian Silk Crepe & 24K Gold Thread",
    fabricUA: "Важкий Італійський Шовковий Креп та Золото 24K",
  },
  {
    id: "look-03-terra-contemporanea",
    categoryEN: "VÉLORA CONTEMPORARY",
    categoryUA: "VÉLORA CONTEMPORARY",
    name: "TERRA CONTEMPORANEA",
    subtitleEN: "Chocolate Mocha Ribbed Knit Column Dress",
    subtitleUA: "Сукня-Колона з В'язаного Шоколадного Трикотажу",
    descriptionEN:
      "Sophisticated day-to-evening silhouette rendered in ultra-soft ribbed knit. High mock neck with delicate micro-button detailing and an effortless side walking slit.",
    descriptionUA:
      "Витончений силует для дня та вечора з ультрам'якого трикотажу в рубчик. Високий комір із делікатними мікрогудзиками та елегантний бічний розріз для комфортної ходи.",
    image: "/assets/stepper/3screen_3.jpeg",
    alt: "TERRA CONTEMPORANEA - Chocolate Mocha Ribbed Knit Dress",
    textPosition: "right",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Fitted Column Midi Dress",
    silhouetteUA: "Приталена Сукня-Колона Міді",
    fabricEN: "70% Merino Wool, 30% Cashmere",
    fabricUA: "70% Вовна Меріноса, 30% Кашемір",
  },
];

export function FullSizeScrollerStepper() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [crossfadeFrom, setCrossfadeFrom] = useState<number | null>(null);
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [modalMode, setModalMode] = useState<"order" | "details">("order");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", comment: "" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active step for counter & navigation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveStep(0);
    } else if (latest < 0.65) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  // -------------------------------------------------------------
  // Card 2 Horizontal Unmasking (0.26 -> 0.44)
  // -------------------------------------------------------------
  const progress2 = useTransform(scrollYProgress, [0.26, 0.44], [0, 1]);
  const clipPath2 = useTransform(
    progress2,
    (p) => `polygon(${(1 - p) * 100}% 0%, 100% 0%, 100% 100%, ${(1 - p) * 100}% 100%)`
  );
  const scale2 = useTransform(progress2, [0, 1], [1.06, 1.00]);
  const filter2 = useTransform(
    progress2,
    [0, 1],
    [
      "grayscale(0%) contrast(1.03) brightness(0.92)",
      "grayscale(0%) contrast(1.03) brightness(0.92)",
    ]
  );

  // -------------------------------------------------------------
  // Card 3 Horizontal Unmasking (0.58 -> 0.74)
  // -------------------------------------------------------------
  const progress3 = useTransform(scrollYProgress, [0.58, 0.74], [0, 1]);
  const clipPath3 = useTransform(
    progress3,
    (p) => `polygon(${(1 - p) * 100}% 0%, 100% 0%, 100% 100%, ${(1 - p) * 100}% 100%)`
  );
  const scale3 = useTransform(progress3, [0, 1], [1.06, 1.00]);
  const filter3 = useTransform(
    progress3,
    [0, 1],
    [
      "grayscale(0%) contrast(1.03) brightness(0.92)",
      "grayscale(0%) contrast(1.03) brightness(0.92)",
    ]
  );

  // -------------------------------------------------------------
  // Synchronized Text Physics (Smooth Luxury Blur & Dissolve Waves)
  // -------------------------------------------------------------
  // TEXT 1 (Right): Full 100% solid opacity across Slide 1 rest zone, dissolves out by 0.26
  const text1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.26], [1, 1, 0]);
  const text1X = useTransform(
    scrollYProgress,
    [0, 0.20, 0.26],
    shouldReduceMotion ? [0, 0, 0] : [0, 0, -35]
  );
  const text1Filter = useTransform(
    scrollYProgress,
    [0, 0.20, 0.26],
    ["blur(0px)", "blur(0px)", "blur(10px)"]
  );
  const text1Pointer = useTransform(text1Opacity, (o) => (o > 0.08 ? "auto" : "none"));
  const text1Display = useTransform(text1Opacity, (o) => (o <= 0.005 ? "none" : "flex"));

  // TEXT 2 (Left): Smoothly blurs and fades in ONLY after Slide 2 wave arrives (0.38 -> 0.46), solid until 0.56
  const text2Opacity = useTransform(scrollYProgress, [0.38, 0.46, 0.56, 0.62], [0, 1, 1, 0]);
  const text2X = useTransform(
    scrollYProgress,
    [0.38, 0.46, 0.56, 0.62],
    shouldReduceMotion ? [0, 0, 0, 0] : [-35, 0, 0, -35]
  );
  const text2Filter = useTransform(
    scrollYProgress,
    [0.38, 0.46, 0.56, 0.62],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );
  const text2Pointer = useTransform(text2Opacity, (o) => (o > 0.08 ? "auto" : "none"));
  const text2Display = useTransform(text2Opacity, (o) => (o <= 0.005 ? "none" : "flex"));

  // TEXT 3 (Right): Smoothly blurs and fades in fully as Slide 3 arrives (0.68 -> 0.76)
  const text3Opacity = useTransform(scrollYProgress, [0.68, 0.76, 1], [0, 1, 1]);
  const text3X = useTransform(
    scrollYProgress,
    [0.68, 0.76, 1],
    shouldReduceMotion ? [0, 0, 0] : [35, 0, 0]
  );
  const text3Filter = useTransform(
    scrollYProgress,
    [0.68, 0.76, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)"]
  );
  const text3Pointer = useTransform(text3Opacity, (o) => (o > 0.08 ? "auto" : "none"));
  const text3Display = useTransform(text3Opacity, (o) => (o <= 0.005 ? "none" : "flex"));

  const handleOpenModal = (dress: DressItem, mode: "order" | "details") => {
    setSelectedDress(dress);
    setModalMode(mode);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleStepButtonClick = (newStep: number) => {
    if (newStep === activeStep || newStep < 0 || newStep >= DRESSES.length) return;
    const fromStep = activeStep;
    setCrossfadeFrom(fromStep);

    const el = containerRef.current;
    if (!el) return;
    const progressTargets = [0.04, 0.50, 0.88];
    const scrollTarget = el.offsetTop + (el.offsetHeight - window.innerHeight) * progressTargets[newStep];
    
    // Instant jump so the underlying layer is placed at target step without sweeping
    window.scrollTo({ top: scrollTarget, behavior: "instant" as ScrollBehavior });
    setActiveStep(newStep);

    // Clear crossfade after smooth dissolve
    setTimeout(() => {
      setCrossfadeFrom(null);
    }, 600);
  };

  const handlePrev = () => handleStepButtonClick(activeStep - 1);
  const handleNext = () => handleStepButtonClick(activeStep + 1);

  return (
    <section
      id="essence"
      ref={containerRef}
      className="relative z-30 w-full h-[340vh] bg-[#000000] border-t border-[#C9A063]/25 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#000000]">
        
        {/* Fullscreen Background Images Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#000000]">
          
          {/* Card 1 — Mobile vertical portrait / Desktop horizontal landscape */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Mobile Vertical Photo */}
            <Image
              src="/assets/stepper/3screen_1_mob.jpg"
              alt={DRESSES[0].alt}
              fill
              priority
              className="object-cover object-center brightness-[0.90] contrast-[1.02] block md:hidden"
            />
            {/* Desktop Horizontal Photo */}
            <Image
              src={DRESSES[0].image}
              alt={DRESSES[0].alt}
              fill
              priority
              className="object-cover object-[28.3%_15%] brightness-[0.90] contrast-[1.02] hidden md:block"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-black/75 via-black/35 to-transparent pointer-events-none" />
            {/* Mobile: strong bottom gradient so text area is readable */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none hidden md:block" />
          </div>

          {/* Card 2 — Mobile vertical portrait / Desktop horizontal landscape */}
          <motion.div
            style={{ clipPath: clipPath2 }}
            className="absolute inset-0 w-full h-full will-change-[clip-path]"
          >
            <motion.div
              style={{ scale: scale2, filter: filter2 }}
              className="relative w-full h-full will-change-transform"
            >
              {/* Mobile Vertical Photo */}
              <Image
                src="/assets/stepper/3screen_2_mob.jpg"
                alt={DRESSES[1].alt}
                fill
                priority
                className="object-cover object-center block md:hidden"
              />
              {/* Desktop Horizontal Photo */}
              <Image
                src={DRESSES[1].image}
                alt={DRESSES[1].alt}
                fill
                priority
                className="object-cover object-[55.5%_15%] hidden md:block"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none md:hidden" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none hidden md:block" />
            </motion.div>
          </motion.div>

          {/* Card 3 — Mobile vertical portrait / Desktop horizontal landscape */}
          <motion.div
            style={{ clipPath: clipPath3 }}
            className="absolute inset-0 w-full h-full will-change-[clip-path]"
          >
            <motion.div
              style={{ scale: scale3, filter: filter3 }}
              className="relative w-full h-full will-change-transform"
            >
              {/* Mobile Vertical Photo */}
              <Image
                src="/assets/stepper/3screen_3_mob.jpg"
                alt={DRESSES[2].alt}
                fill
                priority
                className="object-cover object-center block md:hidden"
              />
              {/* Desktop Horizontal Photo */}
              <Image
                src={DRESSES[2].image}
                alt={DRESSES[2].alt}
                fill
                priority
                className="object-cover object-[55.2%_15%] hidden md:block"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none md:hidden" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none hidden md:block" />
            </motion.div>
          </motion.div>

        </div>

        {/* TEXT 1: AURA NOCTURNE — Desktop RIGHT aligned */}
        <motion.div
          style={{
            opacity: text1Opacity,
            x: text1X,
            filter: text1Filter,
            pointerEvents: text1Pointer,
            display: text1Display,
          }}
          className="absolute bottom-28 sm:pb-32 md:pb-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-5 right-5 md:left-auto md:right-12 lg:right-20 xl:right-28 w-auto md:w-[48%] lg:w-[44%] xl:w-[42%] z-20 flex flex-col items-start md:items-end text-left md:text-right"
        >
          <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl space-y-3 md:space-y-5 flex flex-col md:items-end">
            <div className="flex items-center space-x-3 opacity-90 justify-start md:justify-end">
              <span className="font-mono text-[10px] md:text-[13px] text-[#C9A063] tracking-[0.32em] uppercase">
                {language === "UA" ? DRESSES[0].categoryUA : DRESSES[0].categoryEN}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl md:text-5xl lg:text-6xl xl:text-[4rem] font-light text-[#F3EEE6] tracking-[0.08em] uppercase leading-none drop-shadow-2xl">
                {DRESSES[0].name}
              </h3>
              <p className="font-serif italic text-sm md:text-lg lg:text-[1.3rem] text-[#DCC8AA] font-light tracking-wide">
                {language === "UA" ? DRESSES[0].subtitleUA : DRESSES[0].subtitleEN}
              </p>
            </div>

            <div className="space-y-2 border-l md:border-l-0 md:border-r border-[#C9A063]/40 pl-3 md:pl-0 md:pr-5 py-1">
              <p className="font-sans text-[11px] md:text-sm text-[#F3EEE6]/85 font-light leading-relaxed tracking-wide">
                {language === "UA" ? DRESSES[0].descriptionUA : DRESSES[0].descriptionEN}
              </p>
              <div className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-x-4 justify-start md:justify-end">
                <span className="font-mono text-[10px] md:text-xs text-[#C9A063] tracking-widest uppercase">
                  ◆ {language === "UA" ? DRESSES[0].fabricUA : DRESSES[0].fabricEN}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-[#DCC8AA]/70 tracking-wider">
                  ◆ {language === "UA" ? DRESSES[0].silhouetteUA : DRESSES[0].silhouetteEN}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center space-x-6 justify-start md:justify-end">
              <button
                onClick={() => handleOpenModal(DRESSES[0], "order")}
                className="group relative inline-flex items-center space-x-2 text-[11px] md:text-sm uppercase tracking-[0.22em] text-[#F3EEE6] hover:text-[#C9A063] transition-colors cursor-pointer py-1"
              >
                <span className="font-medium">
                  {language === "UA" ? "Замовити Образ" : "Order Bespoke Piece"}
                </span>
                <span className="text-[#C9A063] text-sm group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A063] group-hover:bg-[#F3EEE6] transition-colors" />
              </button>
              <button
                onClick={() => handleOpenModal(DRESSES[0], "details")}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#DCC8AA]/70 hover:text-[#DCC8AA] transition-colors cursor-pointer font-light hover:underline underline-offset-8 decoration-[#DCC8AA]/40"
              >
                {language === "UA" ? "Деталі Образу" : "View Details"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* TEXT 2: SOLARIS ECLIPSE — Desktop LEFT aligned */}
        <motion.div
          style={{
            opacity: text2Opacity,
            x: text2X,
            filter: text2Filter,
            pointerEvents: text2Pointer,
            display: text2Display,
          }}
          className="absolute bottom-28 sm:pb-32 md:pb-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-5 right-5 md:right-auto md:left-12 lg:left-20 xl:left-28 w-auto md:w-[48%] lg:w-[44%] xl:w-[42%] z-20 flex flex-col items-start text-left"
        >
          <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl space-y-3 md:space-y-5 flex flex-col items-start">
            <div className="flex items-center space-x-3 opacity-90 justify-start">
              <span className="font-mono text-[10px] md:text-[13px] text-[#C9A063] tracking-[0.32em] uppercase">
                {language === "UA" ? DRESSES[1].categoryUA : DRESSES[1].categoryEN}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl md:text-5xl lg:text-6xl xl:text-[4rem] font-light text-[#F3EEE6] tracking-[0.08em] uppercase leading-none drop-shadow-2xl">
                {DRESSES[1].name}
              </h3>
              <p className="font-serif italic text-sm md:text-lg lg:text-[1.3rem] text-[#DCC8AA] font-light tracking-wide">
                {language === "UA" ? DRESSES[1].subtitleUA : DRESSES[1].subtitleEN}
              </p>
            </div>

            <div className="space-y-2 border-l border-[#C9A063]/40 pl-3 md:pl-5 py-1">
              <p className="font-sans text-[11px] md:text-sm text-[#F3EEE6]/85 font-light leading-relaxed tracking-wide">
                {language === "UA" ? DRESSES[1].descriptionUA : DRESSES[1].descriptionEN}
              </p>
              <div className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-x-4 justify-start">
                <span className="font-mono text-[10px] md:text-xs text-[#C9A063] tracking-widest uppercase">
                  ◆ {language === "UA" ? DRESSES[1].fabricUA : DRESSES[1].fabricEN}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-[#DCC8AA]/70 tracking-wider">
                  ◆ {language === "UA" ? DRESSES[1].silhouetteUA : DRESSES[1].silhouetteEN}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center space-x-6 justify-start">
              <button
                onClick={() => handleOpenModal(DRESSES[1], "order")}
                className="group relative inline-flex items-center space-x-2 text-[11px] md:text-sm uppercase tracking-[0.22em] text-[#F3EEE6] hover:text-[#C9A063] transition-colors cursor-pointer py-1"
              >
                <span className="font-medium">
                  {language === "UA" ? "Замовити Образ" : "Order Bespoke Piece"}
                </span>
                <span className="text-[#C9A063] text-sm group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A063] group-hover:bg-[#F3EEE6] transition-colors" />
              </button>
              <button
                onClick={() => handleOpenModal(DRESSES[1], "details")}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#DCC8AA]/70 hover:text-[#DCC8AA] transition-colors cursor-pointer font-light hover:underline underline-offset-8 decoration-[#DCC8AA]/40"
              >
                {language === "UA" ? "Деталі Образу" : "View Details"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* TEXT 3: TERRA CONTEMPORANEA — Desktop RIGHT aligned */}
        <motion.div
          style={{
            opacity: text3Opacity,
            x: text3X,
            filter: text3Filter,
            pointerEvents: text3Pointer,
            display: text3Display,
          }}
          className="absolute bottom-28 sm:pb-32 md:pb-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-5 right-5 md:left-auto md:right-12 lg:right-20 xl:right-28 w-auto md:w-[48%] lg:w-[44%] xl:w-[42%] z-20 flex flex-col items-start md:items-end text-left md:text-right"
        >
          <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl space-y-3 md:space-y-5 flex flex-col md:items-end">
            <div className="flex items-center space-x-3 opacity-90 justify-start md:justify-end">
              <span className="font-mono text-[10px] md:text-[13px] text-[#C9A063] tracking-[0.32em] uppercase">
                {language === "UA" ? DRESSES[2].categoryUA : DRESSES[2].categoryEN}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl md:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-light text-[#F3EEE6] tracking-[0.06em] uppercase leading-none drop-shadow-2xl">
                {DRESSES[2].name}
              </h3>
              <p className="font-serif italic text-sm md:text-lg lg:text-[1.3rem] text-[#DCC8AA] font-light tracking-wide">
                {language === "UA" ? DRESSES[2].subtitleUA : DRESSES[2].subtitleEN}
              </p>
            </div>

            <div className="space-y-2 border-l md:border-l-0 md:border-r border-[#C9A063]/40 pl-3 md:pl-0 md:pr-5 py-1">
              <p className="font-sans text-[11px] md:text-sm text-[#F3EEE6]/85 font-light leading-relaxed tracking-wide">
                {language === "UA" ? DRESSES[2].descriptionUA : DRESSES[2].descriptionEN}
              </p>
              <div className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-x-4 justify-start md:justify-end">
                <span className="font-mono text-[10px] md:text-xs text-[#C9A063] tracking-widest uppercase">
                  ◆ {language === "UA" ? DRESSES[2].fabricUA : DRESSES[2].fabricEN}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-[#DCC8AA]/70 tracking-wider">
                  ◆ {language === "UA" ? DRESSES[2].silhouetteUA : DRESSES[2].silhouetteEN}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center space-x-6 justify-start md:justify-end">
              <button
                onClick={() => handleOpenModal(DRESSES[2], "order")}
                className="group relative inline-flex items-center space-x-2 text-[11px] md:text-sm uppercase tracking-[0.22em] text-[#F3EEE6] hover:text-[#C9A063] transition-colors cursor-pointer py-1"
              >
                <span className="font-medium">
                  {language === "UA" ? "Замовити Образ" : "Order Bespoke Piece"}
                </span>
                <span className="text-[#C9A063] text-sm group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A063] group-hover:bg-[#F3EEE6] transition-colors" />
              </button>
              <button
                onClick={() => handleOpenModal(DRESSES[2], "details")}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#DCC8AA]/70 hover:text-[#DCC8AA] transition-colors cursor-pointer font-light hover:underline underline-offset-8 decoration-[#DCC8AA]/40"
              >
                {language === "UA" ? "Деталі Образу" : "View Details"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Soft Crossfade Overlay on Button Click (In-Place Dissolve Wave) */}
        <AnimatePresence>
          {crossfadeFrom !== null && (
            <motion.div
              key={`crossfade-${crossfadeFrom}`}
              initial={{ opacity: 1, filter: "blur(0px)" }}
              animate={{ opacity: 0, filter: "blur(8px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-25 pointer-events-none overflow-hidden"
            >
              {/* Previous Image */}
              <div className="absolute inset-0 w-full h-full">
                {/* Mobile Previous Image */}
                <Image
                  src={
                    crossfadeFrom === 0
                      ? "/assets/stepper/3screen_1_mob.jpg"
                      : crossfadeFrom === 1
                      ? "/assets/stepper/3screen_2_mob.jpg"
                      : "/assets/stepper/3screen_3_mob.jpg"
                  }
                  alt={DRESSES[crossfadeFrom].alt}
                  fill
                  priority
                  className="object-cover object-center brightness-[0.90] contrast-[1.02] block md:hidden"
                />
                {/* Desktop Previous Image */}
                <Image
                  src={DRESSES[crossfadeFrom].image}
                  alt={DRESSES[crossfadeFrom].alt}
                  fill
                  priority
                  className="object-cover object-center brightness-[0.90] contrast-[1.02] hidden md:block"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className={`absolute inset-y-0 ${
                    crossfadeFrom === 1
                      ? "left-0 w-full md:w-3/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                      : "right-0 w-full md:w-3/5 bg-gradient-to-l from-black/75 via-black/35 to-transparent"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Previous Text */}
              <div
                className={`absolute inset-y-0 ${
                  crossfadeFrom === 1
                    ? "left-0 w-full md:w-[54%] lg:w-[52%] xl:w-[50%] pl-6 sm:pl-12 md:pl-16 lg:pl-20 pr-6 sm:pr-10"
                    : "right-0 w-full md:w-[54%] lg:w-[52%] xl:w-[50%] pl-6 sm:pl-10 md:pl-12 lg:pl-14 pr-6 sm:pr-10"
                } flex items-center justify-start`}
              >
                <div className="max-w-lg lg:max-w-xl xl:max-w-2xl w-full space-y-5 sm:space-y-6 text-left pt-20 sm:pt-14 md:pt-0 -translate-y-2 sm:-translate-y-6 md:-translate-y-8">
                  <div className="flex items-center space-x-3 opacity-90">
                    <span className="font-mono text-xs sm:text-[13px] text-[#C9A063] tracking-[0.32em] uppercase">
                      {language === "UA" ? DRESSES[crossfadeFrom].categoryUA : DRESSES[crossfadeFrom].categoryEN}
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] text-[#F3EEE6] uppercase leading-none">
                      {DRESSES[crossfadeFrom].name}
                    </h3>
                    <p className="font-sans italic text-xs sm:text-sm md:text-base text-[#DCC8AA]/90 font-light tracking-wide">
                      {language === "UA" ? DRESSES[crossfadeFrom].subtitleUA : DRESSES[crossfadeFrom].subtitleEN}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#F3EEE6]/85 font-light leading-relaxed tracking-wide max-w-xl line-clamp-3 sm:line-clamp-4">
                    {language === "UA" ? DRESSES[crossfadeFrom].descriptionUA : DRESSES[crossfadeFrom].descriptionEN}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                    <div className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#C9A063] text-[#060803] font-serif text-xs sm:text-sm uppercase tracking-[0.2em] font-medium rounded-none">
                      {language === "UA" ? "Замовити Образ →" : "Order Bespoke Piece →"}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#DCC8AA]/70 font-light">
                      {language === "UA" ? "Деталі Образу" : "View Details"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Floating Step Nav */}
        <div className="absolute bottom-8 sm:bottom-10 inset-x-0 mx-auto w-fit z-30 pointer-events-auto">
          <div className="flex items-center space-x-6">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              disabled={activeStep === 0}
              className={`w-11 h-11 rounded-full border border-[#DCC8AA]/25 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeStep === 0
                  ? "opacity-20 cursor-not-allowed border-transparent text-[#7A7A7A]"
                  : "hover:border-[#C9A063] hover:bg-[#C9A063]/15 text-[#F3EEE6] hover:text-[#C9A063]"
              }`}
              title="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Minimalist Look Counter */}
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#DCC8AA] uppercase drop-shadow-md">
              0{activeStep + 1} <span className="text-[#C9A063]/60">/</span> 03
            </span>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              disabled={activeStep === DRESSES.length - 1}
              className={`w-11 h-11 rounded-full border border-[#DCC8AA]/25 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeStep === DRESSES.length - 1
                  ? "opacity-20 cursor-not-allowed border-transparent text-[#7A7A7A]"
                  : "hover:border-[#C9A063] hover:bg-[#C9A063]/15 text-[#F3EEE6] hover:text-[#C9A063]"
              }`}
              title="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Modal: Order / Details */}
      {selectedDress && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6 select-text overflow-y-auto">
          <div className="bg-[#000000] border border-[#C9A063]/30 rounded-2xl max-w-2xl w-full p-5 sm:p-8 md:p-10 relative animate-in zoom-in-95 duration-200 text-[#F3EEE6] shadow-2xl my-auto py-6 sm:py-8 max-h-none sm:max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDress(null)}
              className="absolute top-5 right-5 text-[#7A7A7A] hover:text-[#C9A063] text-2xl transition-colors cursor-pointer w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="border-b border-[#DCC8AA]/20 pb-4 space-y-1">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A063] block font-mono">
                {language === "UA" ? selectedDress.categoryUA : selectedDress.categoryEN}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F3EEE6]">
                {selectedDress.name}
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#DCC8AA]">
                {language === "UA" ? selectedDress.subtitleUA : selectedDress.subtitleEN}
              </p>
            </div>

            {/* Modal Body: Details Mode */}
            {modalMode === "details" && (
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="bg-white/5 border border-[#DCC8AA]/10 p-4 rounded-xl space-y-1">
                    <span className="text-[#7A7A7A] uppercase tracking-wider block text-[10px]">
                      {language === "UA" ? "Силует:" : "Silhouette:"}
                    </span>
                    <span className="text-[#F3EEE6] font-medium">
                      {language === "UA" ? selectedDress.silhouetteUA : selectedDress.silhouetteEN}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-[#DCC8AA]/10 p-4 rounded-xl space-y-1">
                    <span className="text-[#7A7A7A] uppercase tracking-wider block text-[10px]">
                      {language === "UA" ? "Тканина та Оздоблення:" : "Fabric & Craft:"}
                    </span>
                    <span className="text-[#F3EEE6] font-medium">
                      {language === "UA" ? selectedDress.fabricUA : selectedDress.fabricEN}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-[#C9A063] uppercase tracking-wider block font-mono">
                    {language === "UA" ? "Архітектура Виробу:" : "Piece Architecture:"}
                  </span>
                  <p className="font-sans text-xs text-[#F3EEE6]/80 leading-relaxed font-light">
                    {language === "UA" ? selectedDress.descriptionUA : selectedDress.descriptionEN}
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => setModalMode("order")}
                    className="w-full py-3.5 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#0D0D0D] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer text-center"
                  >
                    {language === "UA" ? "Перейти до Замовлення" : "Proceed to Bespoke Inquiry"}
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Order Mode */}
            {modalMode === "order" && (
              <div className="space-y-4 pt-4">
                {formSubmitted ? (
                  <div className="p-6 bg-white/5 border border-[#C9A063]/50 rounded-xl text-center space-y-3">
                    <span className="text-2xl">✨</span>
                    <h4 className="font-serif text-lg text-[#C9A063]">
                      {language === "UA" ? "Запит Успішно Отримано" : "Inquiry Received Successfully"}
                    </h4>
                    <p className="text-xs text-[#F3EEE6]/70 leading-relaxed">
                      {language === "UA"
                        ? "Дякуємо. Старший кутюр'є VÉLORA зв'яжеться з вами протягом 15 хвилин для узгодження індивідуальних мірок та деталей примірки."
                        : "Thank you. A senior VÉLORA couturier will contact you within 15 minutes to arrange private measurements and a private fitting appointment."}
                    </p>
                    <button
                      onClick={() => setSelectedDress(null)}
                      className="mt-4 px-6 py-2.5 bg-[#C9A063] text-[#0D0D0D] text-xs uppercase tracking-wider font-medium rounded-full hover:bg-[#DCC8AA] transition-colors"
                    >
                      {language === "UA" ? "Закрити Вікно" : "Close Window"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <p className="font-sans text-xs text-[#7A7A7A] leading-relaxed">
                      {language === "UA"
                        ? "Введіть контактні дані для оформлення індивідуального пошиття або запису на примірку в ательє."
                        : "Enter your contact details to request bespoke couture tailoring or a private showroom appointment."}
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder={language === "UA" ? "Ваше Повне Ім'я" : "Your Full Name"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-[#DCC8AA]/20 px-4 py-3 rounded-lg text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans"
                      />
                      <input
                        type="tel"
                        required
                        placeholder={language === "UA" ? "Телефон / WhatsApp / Telegram" : "Phone Number / WhatsApp / Telegram"}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-[#DCC8AA]/20 px-4 py-3 rounded-lg text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans"
                      />
                      <input
                        type="email"
                        placeholder={language === "UA" ? "Електронна Пошта" : "Email Address"}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-[#DCC8AA]/20 px-4 py-3 rounded-lg text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans"
                      />
                      <textarea
                        rows={2}
                        placeholder={language === "UA" ? "Особливі побажання щодо розміру, мірок або дати примірки" : "Special sizing requests, measurements, or preferred fitting date"}
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full bg-white/5 border border-[#DCC8AA]/20 px-4 py-3 rounded-lg text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#0D0D0D] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer text-center"
                      >
                        {language === "UA" ? "Надіслати Запит" : "Submit Bespoke Inquiry"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalMode("details")}
                        className="py-3.5 px-4 bg-transparent border border-[#DCC8AA]/30 text-[#DCC8AA] text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                      >
                        {language === "UA" ? "Деталі" : "Piece Details"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
