"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

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

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 180);

      // Detect if user is over the light Philosophy section
      const philosophyEl = document.getElementById("philosophy");
      if (philosophyEl) {
        const rect = philosophyEl.getBoundingClientRect();
        // Check if Philosophy section is currently occupying top header area
        setIsLightSection(rect.top <= 100 && rect.bottom >= 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-6 flex justify-between items-center pointer-events-none bg-transparent">
        {/* Top Left - Logo (Adapts filter for dark background contrast on light section) */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`transition-all duration-500 transform ${
            showNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          title="VELORA"
        >
          <img
            src="/assets/logo.png"
            alt="VELORA"
            className={`h-24 sm:h-32 md:h-36 w-auto object-contain transition-all duration-500 ${
              isLightSection
                ? "filter brightness-0 saturate-100 drop-shadow-[0_2px_8px_rgba(201,160,99,0.3)]"
                : "filter brightness-110 drop-shadow-xl"
            }`}
          />
        </a>

        {/* Top Right - MENU Button */}
        <div className={`transition-all duration-500 transform ${
          showNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
          {/* MENU Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`w-[140px] h-[52px] sm:w-[170px] sm:h-[62px] backdrop-blur-md font-serif text-base sm:text-lg font-normal tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer flex items-center justify-center rounded-none shadow-lg select-none ${
              isLightSection
                ? "bg-[#1C1A17] text-[#C9A063] border border-[#C9A063]/50 hover:bg-[#2b2723]"
                : "bg-[#141210]/70 text-[#DCC8AA] hover:text-[#C9A063] hover:bg-[#141210]/90 border border-[#2b2723]/60"
            }`}
          >
            {t("menu")}
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay - Dark Theme (Impeccable Design) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#060803] text-[#F3EEE6] p-6 sm:p-10 md:p-14 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
          
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C9A063]/20 pb-6">
            {/* Top Left - CLOSE button & Language Switcher */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-[130px] h-[48px] sm:w-[140px] sm:h-[52px] bg-transparent hover:bg-[#DCC8AA]/10 text-[#DCC8AA] hover:text-[#C9A063] font-serif text-xs sm:text-sm font-normal tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center rounded-none border border-[#DCC8AA]/30 select-none"
              >
                {t("close")}
              </button>

              <LanguageSwitcher />
            </div>

            {/* Top Right - Contact Info */}
            <div className="text-left sm:text-right font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-snug">
              <div className="font-semibold uppercase tracking-wider text-xs text-[#C9A063]">{t("conciergeContact")}</div>
              <div className="font-semibold text-[#F3EEE6] mt-0.5">+1 (800) 835-6721</div>
              <a href="mailto:concierge@velora-couture.com" className="hover:text-[#C9A063] transition-colors font-medium text-[#DCC8AA] block">
                concierge@velora-couture.com
              </a>
            </div>
          </div>

          {/* Main Middle Navigation Links with Restored 2-Line Sliding Hover Animation */}
          <div className="my-auto py-6 space-y-3 sm:space-y-4 max-w-5xl">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
              >
                {/* Roman Numeral */}
                <span className="font-sans text-xs sm:text-sm text-[#C9A063] font-semibold w-6 sm:w-8 select-none">
                  {item.roman}
                </span>

                {/* Clean Luxury Hover Text Link */}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, idx)}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight transition-colors duration-300 whitespace-normal sm:whitespace-nowrap ${
                    idx === activeItem
                      ? "text-[#C9A063] font-medium"
                      : "text-[#F3EEE6] hover:text-[#C9A063]"
                  }`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

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

        </div>
      )}
    </>
  );
}
