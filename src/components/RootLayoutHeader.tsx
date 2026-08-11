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
  const [showNav, setShowNav] = useState(false);
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

  // 1. Scroll Hysteresis for Header Nav — Fades in on Screen 02 (> 350px) and stays visible 100% of the time down the page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setShowNav((prev) => {
            // Fade in when user reaches Screen 02 (scrolled past 350px)
            if (!prev && currentY > 350) return true;
            // Fade out ONLY when user scrolls all the way back to Screen 01 top (< 150px)
            if (prev && currentY < 150) return false;
            // Otherwise maintain current state continuously across all scroll directions
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          contain: "layout style",
          display: menuOpen ? "none" : "flex",
        }}
        className="w-full px-6 sm:px-12 py-4 sm:py-6 justify-between items-center pointer-events-none bg-transparent select-none"
      >
        {/* Top Left - Logo */}
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
          className={`transition-opacity duration-500 ease-out cursor-pointer ${
            showNav && !menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          title="VELORA"
        >
          <img
            src="/assets/logo.png"
            alt="VELORA"
            className={`h-24 sm:h-32 md:h-36 w-auto object-contain transition-all duration-300 ${
              isLightSection
                ? "filter brightness-0 saturate-100 drop-shadow-[0_2px_8px_rgba(201,160,99,0.3)]"
                : "filter brightness-110 drop-shadow-xl"
            }`}
          />
        </a>

        {/* Top Right - MENU Button */}
        <div className={`transition-opacity duration-500 ease-out ${
          showNav && !menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
          <button
            onClick={() => setMenuOpen(true)}
            className={`w-[140px] h-[52px] sm:w-[170px] sm:h-[62px] font-serif text-base sm:text-lg font-normal tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center rounded-none select-none relative overflow-hidden ${
              isLightSection
                ? "liquid-glass-light text-[#1C1A17] hover:border-[#A87B3F]/70"
                : "liquid-glass-heavy text-[#DCC8AA] hover:text-[#C9A063]"
            }`}
          >
            <span className="relative z-10">{t("menu")}</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay - Dark Theme (Impeccable Design & Spacing) */}
      <AnimatePresence>
        {menuOpen && (
        <motion.div
          key="menu-overlay"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#060803] text-[#F3EEE6] p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between overflow-y-auto"
        >
          
          {/* Top Header Row — Generous Luxury Spacing */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#C9A063]/25 pb-8 mb-4 sm:mb-8">
            {/* Top Left - CLOSE button & Language Switcher */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-[140px] h-[52px] liquid-glass-heavy text-[#DCC8AA] hover:text-[#C9A063] font-serif text-sm font-normal tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center rounded-none select-none relative overflow-hidden"
              >
                <span className="relative z-10">{t("close")}</span>
              </button>

              <LanguageSwitcher />
            </div>

            {/* Top Right - Contact Info */}
            <div className="text-left sm:text-right font-sans text-xs sm:text-sm text-[#DCC8AA]/90 leading-relaxed space-y-1">
              <div className="font-mono uppercase tracking-[0.25em] text-xs text-[#C9A063] font-semibold">{t("conciergeContact")}</div>
              <div className="space-y-0.5 font-sans">
                <a href="tel:+380777704178" className="font-semibold text-[#F3EEE6] hover:text-[#C9A063] transition-colors block">+380 7777 04178</a>
                <a href="tel:+61415779783" className="font-semibold text-[#F3EEE6] hover:text-[#C9A063] transition-colors block">+61415 779 783</a>
              </div>
              <a href="mailto:concierge@velora-couture.com" className="hover:text-[#C9A063] transition-colors font-medium text-[#DCC8AA] block pt-0.5">
                concierge@velora-couture.com
              </a>
            </div>
          </div>

          {/* Main Middle Navigation Links — Expanded vertical spacing & staggered entrance */}
          <motion.div
            className="my-auto py-8 sm:py-12 space-y-5 sm:space-y-7 md:space-y-8 max-w-5xl"
            variants={menuStagger}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={menuItem}
                className="flex items-center gap-5 sm:gap-8 group cursor-pointer"
              >
                {/* Roman Numeral */}
                <span className="font-mono text-xs sm:text-sm text-[#C9A063] font-semibold w-8 select-none">
                  {item.roman}
                </span>

                {/* Gold line accent */}
                <span className="h-[1px] w-0 group-hover:w-6 bg-[#C9A063]/60 transition-all duration-300 hidden sm:block" />

                {/* Clean Luxury Hover Text Link */}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, idx)}
                  className={`text-2xl sm:text-4xl md:text-5xl font-serif tracking-[0.05em] uppercase transition-colors duration-300 whitespace-normal sm:whitespace-nowrap nav-link-underline ${
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
          <div className="pt-8 border-t border-[#C9A063]/25 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-xs text-[#DCC8AA]/70 uppercase tracking-widest">
            <div className="text-left font-mono">
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
