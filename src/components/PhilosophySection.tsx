"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LuxuryCardTilt, AnimateOnScroll } from "@/components/AnimateOnScroll";

export function PhilosophySection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="philosophy"
      className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-16 lg:py-24 bg-[#F5EFE6] text-[#1C1A17] select-text shadow-2xl overflow-hidden"
    >
      {/* Background Model Photo Layer (Visible on Mobile & Tablet < lg) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none lg:hidden">
        <Image
          src="/assets/philosophy_model_v2.jpg"
          alt="VÉLORA Brand Philosophy Model"
          fill
          className="object-cover object-top opacity-20 filter brightness-95 saturate-110"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,239,230,0.85) 0%, rgba(245,239,230,0.72) 50%, rgba(245,239,230,0.92) 100%)",
          }}
        />
      </div>

      {/* Background Subtle Gold Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(201,160,99,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto my-auto flex items-center">

        {/* 2-Column Layout: Left Model Photo (Desktop) / Right Brand Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center w-full">

          {/* LEFT: High-Fashion Model Editorial (5 Cols) — Desktop Framed 3D Card */}
          <AnimateOnScroll preset="slideInLeft" className="lg:col-span-5 relative hidden lg:block">
            <LuxuryCardTilt maxTilt={6}>
              <div className="relative w-full h-[620px] lg:h-[680px] xl:h-[740px] shadow-2xl border border-[#C9A063]/40 overflow-hidden group animated-gold-border">
                <Image
                  src="/assets/philosophy_model_v2.jpg"
                  alt="VÉLORA Brand Philosophy Model Gown"
                  fill
                  className="object-cover object-top filter brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-[#C9A063]/40 m-3 pointer-events-none" />
              </div>
            </LuxuryCardTilt>

            {/* Gold Emblem Badge */}
            <div className="absolute -bottom-2 -right-3 bg-[#1C1A17] text-[#C9A063] px-5 py-3 border border-[#C9A063]/50 shadow-xl flex items-center space-x-3 z-10">
              <span className="font-serif text-xl font-light">V</span>
              <span className="h-4 w-[1px] bg-[#C9A063]/40" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase font-semibold">HAUTE COUTURE</span>
            </div>
          </AnimateOnScroll>

          {/* RIGHT: Brand Philosophy & 5 Pillars */}
          <AnimateOnScroll preset="slideInRight" delay={0.15} className="lg:col-span-7 space-y-4 sm:space-y-5">

            {/* Header Section */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-8 sm:w-10 bg-[#A87B3F]/60" />
                <span className="font-mono text-[11px] sm:text-xs text-[#A87B3F] tracking-[0.3em] uppercase font-semibold">
                  {t("philosophyEyebrow")}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1A17] tracking-[0.05em] uppercase leading-[1.15]">
                {t("philosophyTitle")}
              </h2>

              <p className="font-serif italic text-xs sm:text-base md:text-lg text-[#8C622D] font-light leading-relaxed">
                {t("philosophyQuote")}
              </p>
            </div>

            {/* 5 Pillars — Compact 2-Column Grid even on Mobile */}
            <div className="space-y-2 sm:space-y-3 pt-2.5 border-t border-[#A87B3F]/20">
              <span className="font-mono text-[11px] sm:text-xs text-[#A87B3F] uppercase tracking-[0.25em] font-semibold block mb-1.5">
                {t("womanCanBe")}
              </span>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-[#EFE8DC]/95 backdrop-blur-xs border border-[#A87B3F]/20 hover:border-[#A87B3F]/70 transition-all duration-200">
                  <span className="text-[#A87B3F] text-[10px] sm:text-xs mt-0.5 flex-shrink-0">✦</span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-[#1C1A17] uppercase tracking-wider font-semibold">{t("elegant")}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-[#6B6156] leading-snug font-light">{t("elegantDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-[#EFE8DC]/95 backdrop-blur-xs border border-[#A87B3F]/20 hover:border-[#A87B3F]/70 transition-all duration-200">
                  <span className="text-[#A87B3F] text-[10px] sm:text-xs mt-0.5 flex-shrink-0">✦</span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-[#1C1A17] uppercase tracking-wider font-semibold">{t("feminine")}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-[#6B6156] leading-snug font-light">{t("feminineDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-[#EFE8DC]/95 backdrop-blur-xs border border-[#A87B3F]/20 hover:border-[#A87B3F]/70 transition-all duration-200">
                  <span className="text-[#A87B3F] text-[10px] sm:text-xs mt-0.5 flex-shrink-0">✦</span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-[#1C1A17] uppercase tracking-wider font-semibold">{t("confident")}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-[#6B6156] leading-snug font-light">{t("confidentDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-[#EFE8DC]/95 backdrop-blur-xs border border-[#A87B3F]/20 hover:border-[#A87B3F]/70 transition-all duration-200">
                  <span className="text-[#A87B3F] text-[10px] sm:text-xs mt-0.5 flex-shrink-0">✦</span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-[#1C1A17] uppercase tracking-wider font-semibold">{t("seductive")}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-[#6B6156] leading-snug font-light">{t("seductiveDesc")}</p>
                  </div>
                </div>

                <div className="col-span-2 flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-[#EFE8DC]/95 backdrop-blur-xs border border-[#A87B3F]/20 hover:border-[#A87B3F]/70 transition-all duration-200">
                  <span className="text-[#A87B3F] text-[10px] sm:text-xs mt-0.5 flex-shrink-0">✦</span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-[#1C1A17] uppercase tracking-wider font-semibold">{t("powerful")}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-[#6B6156] leading-snug font-light">{pText(language, t("powerfulDesc"))}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Manifesto & Quote Banner */}
            <div className="space-y-3 pt-2.5 border-t border-[#A87B3F]/20">
              <p className="font-sans text-xs sm:text-sm text-[#4D453D] leading-relaxed">
                <strong className="text-[#1C1A17] font-semibold">VÉLORA</strong>{" "}
                {language === "UA" 
                  ? "створює моду для жінок, які не бояться бути помітними та незабутніми."
                  : "creates fashion for women who are not afraid to be seen and remembered."}
              </p>

              <div className="p-3 sm:p-4 bg-[#1C1A17] text-[#F3EEE6] border border-[#C9A063]/40 shadow-lg">
                <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#C9A063] font-light">
                  {language === "UA" 
                    ? "«Кожна жінка заслуговує відчувати себе красивою та впевненою.»"
                    : '"Every woman deserves to feel beautiful and confident."'}
                </p>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#DCC8AA]/70 tracking-[0.25em] uppercase block mt-1 font-semibold">
                  — {language === "UA" ? "МАНІФЕСТ АТЕЛЬЄ VÉLORA" : "VÉLORA ATELIER MANIFESTO"}
                </span>
              </div>
            </div>

          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function pText(lang: string, fallbackText: string) {
  return fallbackText;
}
