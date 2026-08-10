"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ParallaxReveal, LuxuryCardTilt, AnimateOnScroll } from "@/components/AnimateOnScroll";

export function PhilosophySection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="philosophy"
      className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 bg-[#F5EFE6] text-[#1C1A17] select-text shadow-2xl"
    >
      {/* Background Subtle Gold Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(201,160,99,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Full-height flex container */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto my-auto flex items-center">

        {/* 2-Column Layout: Left Model Photo / Right Brand Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">

          {/* LEFT: High-Fashion Model Editorial (5 Cols) with 3D Depth & Slide Entrance */}
          <AnimateOnScroll preset="slideInLeft" className="lg:col-span-5 relative hidden lg:block">
            <LuxuryCardTilt maxTilt={6}>
              <div className="relative w-full h-[650px] lg:h-[720px] xl:h-[780px] shadow-2xl border border-[#C9A063]/40 overflow-hidden group animated-gold-border">
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

          {/* RIGHT: Brand Philosophy & 5 Pillars with Slide In Right Entrance */}
          <AnimateOnScroll preset="slideInRight" delay={0.15} className="lg:col-span-7 space-y-5 sm:space-y-6">

            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-10 bg-[#A87B3F]/60" />
                <span className="font-mono text-xs sm:text-sm text-[#A87B3F] tracking-[0.35em] uppercase font-semibold">
                  {t("philosophyEyebrow")}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1A17] tracking-[0.06em] uppercase leading-[1.15]">
                {t("philosophyTitle")}
              </h2>

              <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#8C622D] font-light leading-relaxed">
                {t("philosophyQuote")}
              </p>
            </div>

            {/* 5 Pillars with Interactive Hover Micro-Movements */}
            <div className="space-y-3 pt-3 border-t border-[#A87B3F]/20">
              <span className="font-mono text-xs text-[#A87B3F] uppercase tracking-[0.3em] font-semibold block mb-2">
                {t("womanCanBe")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start space-x-3 p-3.5 bg-[#EFE8DC] border border-[#A87B3F]/20 hover:border-[#A87B3F]/80 hover:bg-[#E9E0D0] hover:translate-x-1.5 transition-all duration-300 cursor-default group/p">
                  <span className="text-[#A87B3F] text-xs mt-0.5 group-hover/p:scale-125 transition-transform duration-300">✦</span>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-[#1C1A17] uppercase tracking-wider font-medium">{t("elegant")}</h4>
                    <p className="font-sans text-xs text-[#6B6156]">{t("elegantDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-[#EFE8DC] border border-[#A87B3F]/20 hover:border-[#A87B3F]/80 hover:bg-[#E9E0D0] hover:translate-x-1.5 transition-all duration-300 cursor-default group/p">
                  <span className="text-[#A87B3F] text-xs mt-0.5 group-hover/p:scale-125 transition-transform duration-300">✦</span>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-[#1C1A17] uppercase tracking-wider font-medium">{t("feminine")}</h4>
                    <p className="font-sans text-xs text-[#6B6156]">{t("feminineDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-[#EFE8DC] border border-[#A87B3F]/20 hover:border-[#A87B3F]/80 hover:bg-[#E9E0D0] hover:translate-x-1.5 transition-all duration-300 cursor-default group/p">
                  <span className="text-[#A87B3F] text-xs mt-0.5 group-hover/p:scale-125 transition-transform duration-300">✦</span>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-[#1C1A17] uppercase tracking-wider font-medium">{t("confident")}</h4>
                    <p className="font-sans text-xs text-[#6B6156]">{t("confidentDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-[#EFE8DC] border border-[#A87B3F]/20 hover:border-[#A87B3F]/80 hover:bg-[#E9E0D0] hover:translate-x-1.5 transition-all duration-300 cursor-default group/p">
                  <span className="text-[#A87B3F] text-xs mt-0.5 group-hover/p:scale-125 transition-transform duration-300">✦</span>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-[#1C1A17] uppercase tracking-wider font-medium">{t("seductive")}</h4>
                    <p className="font-sans text-xs text-[#6B6156]">{t("seductiveDesc")}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-[#EFE8DC] border border-[#A87B3F]/20 hover:border-[#A87B3F]/80 hover:bg-[#E9E0D0] hover:translate-x-1.5 transition-all duration-300 cursor-default group/p">
                <span className="text-[#A87B3F] text-xs mt-0.5 group-hover/p:scale-125 transition-transform duration-300">✦</span>
                <div>
                  <h4 className="font-serif text-sm sm:text-base text-[#1C1A17] uppercase tracking-wider font-medium">{t("powerful")}</h4>
                  <p className="font-sans text-xs text-[#6B6156]">{t("powerfulDesc")}</p>
                </div>
              </div>
            </div>

            {/* Manifesto & Quote */}
            <div className="space-y-4 pt-3 border-t border-[#A87B3F]/20">
              <p className="font-sans text-xs sm:text-sm text-[#4D453D] leading-relaxed">
                <strong className="text-[#1C1A17] font-semibold text-sm sm:text-base">VÉLORA</strong>{" "}
                {language === "UA" 
                  ? "створює моду для жінок, які не бояться бути помітними та незабутніми."
                  : "creates fashion for women who are not afraid to be seen and remembered."}
              </p>

              <div className="p-4 sm:p-5 bg-[#1C1A17] text-[#F3EEE6] border border-[#C9A063]/40 shadow-lg">
                <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#C9A063] font-light">
                  {language === "UA" 
                    ? "«Кожна жінка заслуговує відчувати себе красивою та впевненою.»"
                    : '"Every woman deserves to feel beautiful and confident."'}
                </p>
                <span className="font-mono text-[10px] text-[#DCC8AA]/70 tracking-[0.25em] uppercase block mt-1 font-semibold">
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
