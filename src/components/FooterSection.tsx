"use client";

import React, { useState } from "react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { InstagramIcon, TwitterIcon, LinkedInIcon } from "@/components/icons";
import { useLanguage } from "@/context/LanguageContext";

export function FooterSection() {
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | "charter" | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <footer className="w-full bg-[#040503] border-t border-[#C9A063]/30 pt-16 sm:pt-20 pb-12 px-6 sm:px-12 md:px-16 text-sans text-[#DCC8AA]/80 relative z-30">
      <div className="max-w-[1500px] mx-auto flex flex-col items-center text-center space-y-10">
        
        {/* 1. Centered Logo Image */}
        <AnimateOnScroll preset="fadeUp" className="flex flex-col items-center space-y-3">
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
            className="inline-block group cursor-pointer"
            title="VÉLORA Haute Couture"
          >
            <img
              src="/assets/logo.png"
              alt="VÉLORA"
              className="h-56 sm:h-72 md:h-80 lg:h-[22rem] w-auto object-contain filter brightness-110 group-hover:scale-102 transition-transform duration-300 mx-auto"
            />
          </a>

          {/* 2. 4 Cities Centered Under Logo (No New York) */}
          <span className="font-sans text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.35em] font-semibold block">
            {t("cities")}
          </span>
        </AnimateOnScroll>

        {/* 3. Golden Line Separator */}
        <div className="w-full h-[1px] bg-[#C9A063]/25 max-w-5xl" />

        {/* 4. 2 Columns Listing All 8 Page Screens (I - VIII) */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-b border-[#C9A063]/20 pb-10">
          {/* Column 1: Screens I - IV */}
          <div className="space-y-3">
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#F3EEE6]/90 uppercase tracking-wider">
              <li>
                <a href="#" onClick={(e) => handleScroll(e, "#")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">I.</span>
                  <span>{language === "UA" ? "Головна / Герой Екран" : "Home / Hero Screen"}</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">II.</span>
                  <span>{language === "UA" ? "Про нас та Історія Ательє" : "About Us & Atelier Story"}</span>
                </a>
              </li>
              <li>
                <a href="#essence" onClick={(e) => handleScroll(e, "#essence")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">III.</span>
                  <span>{language === "UA" ? "Сутність VÉLORA (Лукбук)" : "Essence of VÉLORA (Lookbook)"}</span>
                </a>
              </li>
              <li>
                <a href="#collection" onClick={(e) => handleScroll(e, "#collection")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">IV.</span>
                  <span>{language === "UA" ? "Колекція Високої Моди" : "Haute Couture Collection"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Screens V - VIII */}
          <div className="space-y-3">
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#F3EEE6]/90 uppercase tracking-wider">
              <li>
                <a href="#atelier-directory" onClick={(e) => handleScroll(e, "#atelier-directory")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">V.</span>
                  <span>{language === "UA" ? "Каталог Лінійок Ательє" : "Atelier Lines Directory"}</span>
                </a>
              </li>
              <li>
                <a href="#investors" onClick={(e) => handleScroll(e, "#investors")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">VI.</span>
                  <span>{language === "UA" ? "Для Інвесторів та Зростання" : "Investor Relations & Growth"}</span>
                </a>
              </li>
              <li>
                <a href="#philosophy" onClick={(e) => handleScroll(e, "#philosophy")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">VII.</span>
                  <span>{language === "UA" ? "Маніфест Бренду та Філософія" : "Brand Manifesto & Philosophy"}</span>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hover:text-[#C9A063] transition-colors flex items-center space-x-3">
                  <span className="text-[#C9A063] font-mono text-xs w-6">VIII.</span>
                  <span>{language === "UA" ? "Приватні Зустрічі та Контакти" : "Private Appointments & Contact"}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Contact Details & Social Icons Under Directory */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-4xl font-sans text-xs sm:text-sm text-[#DCC8AA]/90">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[#C9A063] uppercase tracking-wider block font-semibold text-xs">{t("directLine")}</span>
            <a href="tel:+380777704178" className="text-[#F3EEE6] hover:text-[#C9A063] transition-colors font-medium text-sm sm:text-base block">+380 7777 04178</a>
            <a href="tel:+61415779783" className="text-[#F3EEE6] hover:text-[#C9A063] transition-colors font-medium text-sm sm:text-base block">+61415 779 783</a>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <span className="text-[#C9A063] uppercase tracking-wider block font-semibold text-xs">{t("emailLabel")}</span>
            <a href="mailto:concierge@velora-couture.com" className="text-[#F3EEE6] hover:text-[#C9A063] transition-colors block font-medium">
              concierge@velora-couture.com
            </a>
          </div>

          {/* Social Icons (Instagram, Twitter/X, LinkedIn) */}
          <div className="flex items-center space-x-4 pt-2 sm:pt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="VÉLORA Instagram"
              className="w-10 h-10 bg-[#0D0F0A] border border-[#C9A063]/30 hover:border-[#C9A063] text-[#DCC8AA] hover:text-[#C9A063] flex items-center justify-center transition-all duration-300 hover-lift"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              title="VÉLORA X / Twitter"
              className="w-10 h-10 bg-[#0D0F0A] border border-[#C9A063]/30 hover:border-[#C9A063] text-[#DCC8AA] hover:text-[#C9A063] flex items-center justify-center transition-all duration-300 hover-lift"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              title="VÉLORA LinkedIn"
              className="w-10 h-10 bg-[#0D0F0A] border border-[#C9A063]/30 hover:border-[#C9A063] text-[#DCC8AA] hover:text-[#C9A063] flex items-center justify-center transition-all duration-300 hover-lift"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 6. Golden Line Separator */}
        <div className="w-full h-[1px] bg-[#C9A063]/25 max-w-5xl" />

        {/* 7. Bottom Legal Bar with Pop-up Modals */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#DCC8AA]/60">
          <div>
            © {new Date().getFullYear()} {t("copyright")}
          </div>

          <div className="flex items-center space-x-6 uppercase tracking-wider">
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-[#C9A063] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t("terms")}
            </button>
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-[#C9A063] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t("privacy")}
            </button>
            <button
              onClick={() => setActiveModal("charter")}
              className="hover:text-[#C9A063] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t("charter")}
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Pop-up Modals for Legal Links */}
      {activeModal && (
        <div className="fixed inset-0 z-[150] bg-[#060803]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#0D0F0A] border border-[#C9A063]/40 p-6 sm:p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-6 relative shadow-2xl text-[#F3EEE6] rounded-none">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-[#DCC8AA] hover:text-[#C9A063] text-2xl cursor-pointer transition-colors"
            >
              ✕
            </button>

            {activeModal === "terms" && (
              <div className="space-y-4">
                <span className="font-sans text-xs text-[#C9A063] tracking-[0.3em] uppercase block font-semibold">
                  {language === "UA" ? "ПРАВОВИЙ СТАТУТ ДОМУ" : "MAISON LEGAL CHARTER"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                  {t("termsModalTitle")}
                </h3>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-relaxed border-t border-[#C9A063]/20 pt-4">
                  <p>{t("terms1")}</p>
                  <p>{t("terms2")}</p>
                  <p>{t("terms3")}</p>
                </div>
              </div>
            )}

            {activeModal === "privacy" && (
              <div className="space-y-4">
                <span className="font-sans text-xs text-[#C9A063] tracking-[0.3em] uppercase block font-semibold">
                  {language === "UA" ? "ГАРАНТІЯ ЗАХИСТУ ДАНИХ" : "DATA PROTECTION GUARANTEE"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                  {t("privacyModalTitle")}
                </h3>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-relaxed border-t border-[#C9A063]/20 pt-4">
                  <p>{t("privacy1")}</p>
                  <p>{t("privacy2")}</p>
                  <p>{t("privacy3")}</p>
                </div>
              </div>
            )}

            {activeModal === "charter" && (
              <div className="space-y-4">
                <span className="font-sans text-xs text-[#C9A063] tracking-[0.3em] uppercase block font-semibold">
                  {language === "UA" ? "ПРОТОКОЛ HAUTE COUTURE" : "HAUTE COUTURE PROTOCOL"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                  {t("charterModalTitle")}
                </h3>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#DCC8AA]/80 leading-relaxed border-t border-[#C9A063]/20 pt-4">
                  <p>{t("charter1")}</p>
                  <p>{t("charter2")}</p>
                  <p>{t("charter3")}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-3.5 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-serif text-sm uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              {t("closeDocument")}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
