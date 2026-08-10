"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxReveal } from "@/components/AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";

interface ExpansionLine {
  id: string;
  num: string;
  titleEN: string;
  titleUA: string;
  category: "COUTURE" | "SEASONAL" | "ACCESSORIES";
  noteEN: string;
  noteUA: string;
  yearEN: string;
  yearUA: string;
}

const EXPANSION_LINES: ExpansionLine[] = [
  { id: "01", num: "01", titleEN: "Evening Dresses", titleUA: "Вечірні Сукні", category: "COUTURE", noteEN: "Red carpet & gala silk gowns", noteUA: "Кутюрні шовкові сукні для червоної доріжки", yearEN: "2026", yearUA: "2026" },
  { id: "02", num: "02", titleEN: "Cocktail Dresses", titleUA: "Коктейльні Сукні", category: "COUTURE", noteEN: "Architectural reception silhouettes", noteUA: "Архітектурні силуети для прийомів", yearEN: "2026", yearUA: "2026" },
  { id: "03", num: "03", titleEN: "Luxury Daywear", titleUA: "Розкішний Денний Одяг", category: "COUTURE", noteEN: "Tailored silk & crepe daywear", noteUA: "Витончений шовковий та креповий одяг", yearEN: "2026", yearUA: "2026" },
  { id: "04", num: "04", titleEN: "Business & Office Fashion", titleUA: "Діловий та Офісний Стиль", category: "COUTURE", noteEN: "Executive wool suits & blazers", noteUA: "Ексклюзивні вовняні костюми та блейзери", yearEN: "2026", yearUA: "2026" },
  
  { id: "05", num: "05", titleEN: "Winter Collections", titleUA: "Зимові Колекції", category: "SEASONAL", noteEN: "Velvet coats & cashmere capes", noteUA: "Оксамитові пальта та кашемірові накидки", yearEN: "2026/27", yearUA: "2026/27" },
  { id: "06", num: "06", titleEN: "Outerwear", titleUA: "Верхній Одяг", category: "SEASONAL", noteEN: "Double-face cashmere outerwear", noteUA: "Двосторонній кашеміровий верхній одяг", yearEN: "2026", yearUA: "2026" },
  { id: "07", num: "07", titleEN: "Knitwear", titleUA: "Трикотаж", category: "SEASONAL", noteEN: "Cashmere & merino rib knits", noteUA: "Кашеміровий та мериносовий трикотаж в рубчик", yearEN: "Available", yearUA: "В наявності" },
  { id: "08", num: "08", titleEN: "Resort Wear", titleUA: "Круїзна Колекція", category: "SEASONAL", noteEN: "Chiffon kaftans & linen sets", noteUA: "Шифонові кафтани та лляні комплекти", yearEN: "2027", yearUA: "2027" },

  { id: "09", num: "09", titleEN: "Premium Accessories", titleUA: "Преміальні Аксесуари", category: "ACCESSORIES", noteEN: "Silk scarves & leather belts", noteUA: "Шовкові хустки та шкіряні ремені", yearEN: "2026", yearUA: "2026" },
  { id: "10", num: "10", titleEN: "Luxury Handbags", titleUA: "Розкішні Сумки", category: "ACCESSORIES", noteEN: "Structured leather clutches", noteUA: "Структуровані шкіряні клатчі", yearEN: "2026", yearUA: "2026" },
  { id: "11", num: "11", titleEN: "Footwear", titleUA: "Взуття", category: "ACCESSORIES", noteEN: "Satin heels & leather boots", noteUA: "Атласні туфлі на підборах та шкіряні чоботи", yearEN: "2027", yearUA: "2027" },
  { id: "12", num: "12", titleEN: "Fine Jewelry & Sculptures", titleUA: "Ювелірні Вироби та Скульптури", category: "ACCESSORIES", noteEN: "24K gold filigree & heirloom art", noteUA: "Золота філігрань 24K та сімейні реліквії", yearEN: "Signature", yearUA: "Авторська" },
];

export function AtelierExpansionSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const tabs = [
    { id: "ALL", label: language === "UA" ? "УСІ ЛІНІЇ (12)" : "ALL LINES (12)" },
    { id: "COUTURE", label: language === "UA" ? "КУТЮР (4)" : "COUTURE (4)" },
    { id: "SEASONAL", label: language === "UA" ? "СЕЗОННІ (4)" : "SEASONAL (4)" },
    { id: "ACCESSORIES", label: language === "UA" ? "АКСЕСУАРИ (4)" : "ACCESSORIES (4)" },
  ];

  const filteredLines = EXPANSION_LINES.filter(
    (line) => activeTab === "ALL" || line.category === activeTab
  );

  return (
    <section className="relative z-30 w-full pt-16 sm:pt-24 pb-24 sm:pb-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6]">
      <div className="max-w-[1600px] mx-auto space-y-12">
        
        {/* Minimalist Top Header Bar with Generous Breathing Room */}
        <ParallaxReveal yOffset={24} duration={0.85}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 border-b border-[#C9A063]/20 pb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-10 bg-[#C9A063]/50" />
                <span className="font-mono text-xs sm:text-sm text-[#C9A063] tracking-[0.35em] uppercase font-semibold">
                  {t("atelierEyebrow")}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F3EEE6] uppercase tracking-[0.06em] leading-[1.18]">
                {t("atelierTitle")}
              </h2>
            </div>

            {/* Sleek Minimalist Category Filter Pills — Single Row Alignment */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap pb-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 sm:px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap flex-shrink-0 transition-all duration-300 rounded-none cursor-pointer border ${
                      isActive
                        ? "bg-[#C9A063] text-[#060803] border-[#C9A063] font-medium shadow-[0_0_20px_rgba(201,160,99,0.25)]"
                        : "bg-transparent text-[#DCC8AA]/70 border-[#DCC8AA]/15 hover:border-[#C9A063]/50 hover:text-[#F3EEE6]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ParallaxReveal>

        {/* Sleek 2-Column Typographic Directory List with Instant & Animated Filter Transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          <AnimatePresence mode="popLayout">
            {filteredLines.map((line, index) => {
              const isHovered = hoveredId === line.id;
              const title = language === "UA" ? line.titleUA : line.titleEN;
              const note = language === "UA" ? line.noteUA : line.noteEN;
              const year = language === "UA" ? line.yearUA : line.yearEN;

              return (
                <motion.div
                  key={line.id}
                  layout
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredId(line.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative border-b border-[#DCC8AA]/15 py-5 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    isHovered ? "translate-x-2.5 bg-[#C9A063]/5 pl-3 pr-2" : ""
                  }`}
                >
                  <div className="flex items-center space-x-6 flex-1 min-w-0 pr-4">
                    {/* Index Number */}
                    <span className={`font-sans text-xs sm:text-sm tracking-widest font-semibold transition-all duration-300 ${
                      isHovered ? "text-[#C9A063] scale-110" : "text-[#C9A063]/80"
                    }`}>
                      {line.num}
                    </span>

                    {/* Title & Hover Note */}
                    <div className="space-y-0.5 min-w-0">
                      <h3
                        className={`font-serif text-lg sm:text-xl font-light uppercase tracking-wide transition-colors truncate ${
                          isHovered ? "text-[#C9A063]" : "text-[#F3EEE6]"
                        }`}
                      >
                        {title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/80 font-light truncate">
                        {note}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Badge & Arrow */}
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="font-sans text-xs text-[#DCC8AA]/70 tracking-wider uppercase hidden sm:inline-block">
                      {year}
                    </span>
                    <span
                      className={`font-sans text-base text-[#C9A063] transition-all duration-300 ${
                        isHovered ? "translate-x-2 opacity-100 scale-125" : "opacity-30"
                      }`}
                    >
                      →
                    </span>
                  </div>

                  {/* Active hairline hover glow indicator */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C9A063] transition-all duration-300 ${
                      isHovered ? "w-full shadow-[0_0_10px_rgba(201,160,99,0.8)]" : "w-0"
                    }`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
