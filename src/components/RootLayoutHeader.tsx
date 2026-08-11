"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const menuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};
const menuItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function RootLayoutHeader() {
  const { t } = useLanguage();
  // Header logo & MENU button are permanently visible across all screens and scroll directions
  const [showNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [isLightSection, setIsLightSection] = useState(false);

  const menuItems = [
    { roman: "I.", label: t("home"), href: "#" },
    { roman: "II.", label: t("about"), href: "#about" },
    { roman: "III.", label: t("essence"), href: "#essence" },
    { roman: "IV.", label: t("collection"), href: "#collection" },
    { roman: "V.", label: t("directory"), href: "#atelier-directory" },
    { roman: "VI.", label: t("investors"), href: "#investors" },
    { roman: "VII.", label: t("philosophy"), href: "#philosophy" },
    { roman: "VIII.", label: t("appointments"), href: "#contact" },
  ];

  // 2. Off-main-thread IntersectionObserver for Philosophy Light Section detection (Zero layout thrashing on Android)
  useEffect(() => {
    const philosophyEl = document.getElementById("philosophy");
    if (!philosophyEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLightSection(entry.isIntersecting);
      },
      { rootMargin: "-60px 0px -75% 0px", threshold: 0 }
    );

    observer.observe(philosophyEl);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    setActiveItem(idx);
    setMenuOpen(false);

    if (href.startsWith("#")) {
      e.preventDefault();
      if (href === "#" || href === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header 
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, contain: "layout style" }}
        className="w-full px-4 sm:px-12 py-3 sm:py-6 flex justify-between items-center pointer-events-none bg-transparent select-none"
      >
        {/* Top Left - Logo (Adapts filter for dark background contrast on light section) */}
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
          className="opacity-100 pointer-events-auto cursor-pointer transition-all duration-300"
          title="VELORA"
        >
          <img
            src="/assets/logo.png"
            alt="VELORA"
            className={`h-14 sm:h-20 md:h-28 w-auto object-contain transition-all duration-300 ${
              isLightSection
                ? "filter brightness-0 saturate-100 drop-shadow-[0_2px_8px_rgba(201,160,99,0.3)]"
                : "filter brightness-110 drop-shadow-xl"
            }`}
          />
        </a>

        {/* Top Right - MENU Button */}
        <div className="opacity-100 pointer-events-auto transition-all duration-300">
          {/* MENU Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`w-[110px] h-[44px] sm:w-[170px] sm:h-[62px] font-serif text-sm sm:text-lg font-normal tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center rounded-none select-none relative overflow-hidden ${
              isLightSection
                ? "liquid-glass-light text-[#1C1A17] hover:border-[#A87B3F]/70"
                : "liquid-glass-heavy text-[#DCC8AA] hover:text-[#C9A063]"
            }`}
          >
            <span className="relative z-10">{t("menu")}</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay - Dark Theme (Impeccable Design) */}
      <AnimatePresence>
        {menuOpen && (
        <motion.div
          key="menu-overlay"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#060803] text-[#F3EEE6] p-6 sm:p-10 md:p-14 flex flex-col justify-between overflow-y-auto"
        >
          
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C9A063]/20 pb-6">
            {/* Top Left - CLOSE button & Language Switcher */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-[130px] h-[48px] sm:w-[140px] sm:h-[52px] liquid-glass-heavy text-[#DCC8AA] hover:text-[#C9A063] font-serif text-xs sm:text-sm font-normal tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center rounded-none select-none relative overflow-hidden"
              >
                <span className="relative z-10">{t("close")}</span>
              </button>

              <LanguageSwitcher />
            </div>

            {/* Top Right - Contact Info */}
            <div className="text-left sm:text-right font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-snug">
              <div className="font-semibold uppercase tracking-wider text-xs text-[#C9A063]">{t("conciergeContact")}</div>
              <div className="space-y-0.5 mt-0.5">
                <a href="tel:+380777704178" className="font-semibold text-[#F3EEE6] hover:text-[#C9A063] transition-colors block">+380 7777 04178</a>
                <a href="tel:+61415779783" className="font-semibold text-[#F3EEE6] hover:text-[#C9A063] transition-colors block">+61415 779 783</a>
              </div>
              <a href="mailto:concierge@velora-couture.com" className="hover:text-[#C9A063] transition-colors font-medium text-[#DCC8AA] block mt-1">
                concierge@velora-couture.com
              </a>
            </div>
          </div>

          {/* Main Middle Navigation Links — Staggered blur-up entrance */}
          <motion.div
            className="my-auto py-6 space-y-3 sm:space-y-4 max-w-5xl"
            variants={menuStagger}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={menuItem}
                className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
              >
                {/* Roman Numeral */}
                <span className="font-sans text-xs sm:text-sm text-[#C9A063] font-semibold w-6 sm:w-8 select-none">
                  {item.roman}
                </span>

                {/* Gold line accent */}
                <span className="h-[1px] w-0 group-hover:w-5 bg-[#C9A063]/50 transition-all duration-300 hidden sm:block" />

                {/* Clean Luxury Hover Text Link */}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, idx)}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight transition-colors duration-300 whitespace-normal sm:whitespace-nowrap nav-link-underline ${
                    idx === activeItem
                      ? "text-[#C9A063] font-medium"
                      : "text-[#F3EEE6] hover:text-[#C9A063]"
                  }`}
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Right - Footer Sublinks */}
          <div className="pt-6 border-t border-[#C9A063]/20 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-xs text-[#DCC8AA]/70 uppercase tracking-wider">
            <div className="text-left">
              VÉLORA HAUTE COUTURE MAISON • DIRECTORY
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" onClick={(e) => handleNavClick(e, "#about", 1)} className="hover:text-[#C9A063] transition-colors">
                {t("about")}
              </a>
              <a href="#investors" onClick={(e) => handleNavClick(e, "#investors", 5)} className="hover:text-[#C9A063] transition-colors">
                {t("investors")}
              </a>
              <a href="#philosophy" onClick={(e) => handleNavClick(e, "#philosophy", 6)} className="hover:text-[#C9A063] transition-colors">
                {t("philosophy")}
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact", 7)} className="hover:text-[#C9A063] transition-colors">
                {t("appointments")}
              </a>
            </div>
          </div>

        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
