"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";

export function MainHero() {
  const { t, language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Use window scrollY directly so scroll values are absolute and never reset when the section leaves the viewport
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Continuous side narrowing of video from top (0px) to 650px of scroll — Enabled on Mobile & Desktop
  const paddingInline = useTransform(
    scrollY,
    [0, 650],
    isMobile ? ["0%", "12%"] : ["0%", "20%"],
    { clamp: true }
  );
  const borderRadius = "0px";

  // Opacity & Scale of center content (logo + request button fade out cleanly in first 50px of scroll)
  const heroContentOpacity = useTransform(scrollY, [0, 50], [1, 0], { clamp: true });
  const heroContentScale = useTransform(scrollY, [0, 50], [1, 0.96], { clamp: true });
  const heroContentDisplay = useTransform(scrollY, (val) => (val > 60 ? "none" : "flex"));
  const heroPointerEvents = useTransform(scrollY, (val) => (val > 50 ? "none" : "auto"));

  const handleCatalogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative w-full h-[100dvh] sm:h-screen min-h-[600px] sm:min-h-[700px] overflow-hidden flex flex-col items-center justify-center bg-[#060803]">
      
      {/* Hero Video Background with continuous side narrowing across entire scroll */}
      <motion.div
        style={{
          paddingLeft: paddingInline,
          paddingRight: paddingInline,
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
        className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none"
      >
        <motion.div
          style={{ borderRadius }}
          className="w-full h-full relative overflow-hidden transition-all duration-75 shadow-2xl"
        >
          {/* Mobile video — portrait crop, full height */}
          <video
            key="hero-video-mobile"
            src="/assets/mob_hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
            className="absolute inset-0 w-full h-full object-cover object-[center_top] opacity-85 filter brightness-95 saturate-95 block md:hidden"
          />
          {/* Desktop video */}
          <video
            key="hero-video-desktop"
            src="/assets/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
            className="absolute inset-0 w-full h-full object-cover opacity-85 filter brightness-95 saturate-95 hidden md:block"
          />
        </motion.div>
      </motion.div>

      {/* Center Content: Main Center Logo & Request Catalog Button (Fades out cleanly and stays hidden on scroll down) */}
      <motion.div
        style={{
          opacity: heroContentOpacity,
          scale: heroContentScale,
          display: heroContentDisplay,
          pointerEvents: heroPointerEvents,
        }}
        className="relative z-10 text-center max-w-6xl px-4 flex flex-col items-center justify-center space-y-8 sm:space-y-10"
      >
        {/* Main Center Logo Image — Instant display (no initial reveal animation) */}
        <div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === "/" && window.scrollY === 0) {
                window.location.reload();
              } else {
                window.location.href = "/";
              }
            }}
            className="cursor-pointer group select-none block"
            title="VÉLORA Haute Couture"
          >
            <img
              src="/assets/logo.png"
              alt="VÉLORA"
              className="h-56 sm:h-80 md:h-[24rem] lg:h-[28rem] w-auto object-contain filter brightness-110 drop-shadow-2xl group-hover:scale-102 transition-transform duration-500"
            />
          </a>
        </div>

        {/* REQUEST CATALOG Button — Single-line generous luxury padding */}
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 sm:px-12 py-4 sm:py-5 min-h-[58px] sm:min-h-[66px] min-w-[260px] sm:min-w-[320px] whitespace-nowrap bg-[#0D0D0D]/75 hover:bg-[#0D0D0D]/95 backdrop-blur-md text-[#DCC8AA] hover:text-[#C9A063] border border-[#DCC8AA]/25 hover:border-[#C9A063]/70 font-serif text-sm sm:text-base font-normal tracking-[0.22em] uppercase leading-none transition-all duration-300 cursor-pointer flex items-center justify-center rounded-none shadow-lg select-none hover:shadow-[0_0_25px_rgba(201,160,99,0.25)]"
          >
            {t("requestCatalog")}
          </button>
        </div>
      </motion.div>

      {/* Bottom Center Scroll Cue */}
      <motion.div
        style={{
          opacity: heroContentOpacity,
          display: heroContentDisplay,
          pointerEvents: heroPointerEvents,
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <div>
          <ChevronIcon className="w-4 h-4 text-[#DCC8AA]" />
        </div>
      </motion.div>

      {/* Interactive Catalog Request Modal (Portal to document.body for exact viewport centering) */}
      {modalOpen && mounted && createPortal(
        <div 
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-[#0D0D0D]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D0D0D] border border-[#C9A063]/30 rounded-none w-[calc(100%-2rem)] max-w-md p-5 sm:p-8 space-y-5 relative text-[#F3EEE6] shadow-[0_10px_40px_rgba(0,0,0,0.8)] m-auto box-border"
          >
            {/* Prominent Luxury Close Cross Button */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-[#060803] border border-[#C9A063]/30 hover:border-[#C9A063] text-[#DCC8AA] hover:text-[#C9A063] transition-all cursor-pointer z-20 group select-none"
            >
              <svg className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9A063] block font-semibold pr-8">
              {language === "UA" ? "КОЛЕКЦІЯ АТЕЛЬЄ VÉLORA" : "VÉLORA Atelier Collection"}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F3EEE6] uppercase tracking-wide pr-6">
              {t("catalogTitle")}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-relaxed break-words">
              {t("catalogDesc")}
            </p>

            {submitted ? (
              <div className="p-4 bg-[#060803] border border-[#C9A063]/40 text-xs sm:text-sm text-[#C9A063] tracking-wider uppercase font-sans font-medium text-center">
                {language === "UA" 
                  ? "✓ Дякуємо! Каталог VÉLORA надіслано на вашу електронну пошту."
                  : "✓ Thank you! The VÉLORA catalog has been sent to your email."}
              </div>
            ) : (
              <form onSubmit={handleCatalogSubmit} className="space-y-4 pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === "UA" ? "Введіть вашу електронну пошту" : "Enter your email address"}
                  required
                  className="w-full bg-[#060803] border border-[#DCC8AA]/30 px-4 py-3.5 text-sm text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans box-border"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A063] text-[#060803] font-serif text-sm uppercase tracking-[0.2em] hover:bg-[#DCC8AA] transition-colors font-semibold cursor-pointer select-none"
                >
                  {t("sendRequest")}
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
