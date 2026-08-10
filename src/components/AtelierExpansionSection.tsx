"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  { id: "01", num: "01", titleEN: "Evening Dresses",        titleUA: "Вечірні Сукні",             category: "COUTURE",     noteEN: "Red carpet & gala silk gowns",          noteUA: "Кутюрні шовкові сукні для червоної доріжки",  yearEN: "2026",      yearUA: "2026" },
  { id: "02", num: "02", titleEN: "Cocktail Dresses",       titleUA: "Коктейльні Сукні",          category: "COUTURE",     noteEN: "Architectural reception silhouettes",    noteUA: "Архітектурні силуети для прийомів",            yearEN: "2026",      yearUA: "2026" },
  { id: "03", num: "03", titleEN: "Luxury Daywear",         titleUA: "Розкішний Денний Одяг",     category: "COUTURE",     noteEN: "Tailored silk & crepe daywear",          noteUA: "Витончений шовковий та креповий одяг",        yearEN: "2026",      yearUA: "2026" },
  { id: "04", num: "04", titleEN: "Business & Office",      titleUA: "Діловий та Офісний",        category: "COUTURE",     noteEN: "Executive wool suits & blazers",         noteUA: "Ексклюзивні вовняні костюми та блейзери",     yearEN: "2026",      yearUA: "2026" },
  { id: "05", num: "05", titleEN: "Winter Collections",     titleUA: "Зимові Колекції",           category: "SEASONAL",    noteEN: "Velvet coats & cashmere capes",          noteUA: "Оксамитові пальта та кашемірові накидки",     yearEN: "2026/27",   yearUA: "2026/27" },
  { id: "06", num: "06", titleEN: "Outerwear",              titleUA: "Верхній Одяг",              category: "SEASONAL",    noteEN: "Double-face cashmere outerwear",         noteUA: "Двосторонній кашеміровий верхній одяг",       yearEN: "2026",      yearUA: "2026" },
  { id: "07", num: "07", titleEN: "Knitwear",               titleUA: "Трикотаж",                  category: "SEASONAL",    noteEN: "Cashmere & merino rib knits",            noteUA: "Кашеміровий та мериносовий трикотаж",         yearEN: "Available", yearUA: "В наявності" },
  { id: "08", num: "08", titleEN: "Resort Wear",            titleUA: "Круїзна Колекція",          category: "SEASONAL",    noteEN: "Chiffon kaftans & linen sets",           noteUA: "Шифонові кафтани та лляні комплекти",         yearEN: "2027",      yearUA: "2027" },
  { id: "09", num: "09", titleEN: "Premium Accessories",    titleUA: "Преміальні Аксесуари",      category: "ACCESSORIES", noteEN: "Silk scarves & leather belts",           noteUA: "Шовкові хустки та шкіряні ремені",            yearEN: "2026",      yearUA: "2026" },
  { id: "10", num: "10", titleEN: "Luxury Handbags",        titleUA: "Розкішні Сумки",            category: "ACCESSORIES", noteEN: "Structured leather clutches",            noteUA: "Структуровані шкіряні клатчі",                yearEN: "2026",      yearUA: "2026" },
  { id: "11", num: "11", titleEN: "Footwear",               titleUA: "Взуття",                    category: "ACCESSORIES", noteEN: "Satin heels & leather boots",            noteUA: "Атласні туфлі та шкіряні чоботи",             yearEN: "2027",      yearUA: "2027" },
  { id: "12", num: "12", titleEN: "Fine Jewelry",           titleUA: "Ювелірні Вироби",           category: "ACCESSORIES", noteEN: "24K gold filigree & heirloom art",       noteUA: "Золота філігрань 24K та реліквії",             yearEN: "Signature", yearUA: "Авторська" },
];

const GROUPS: { id: ExpansionLine["category"]; labelEN: string; labelUA: string }[] = [
  { id: "COUTURE",     labelEN: "Couture Lines",  labelUA: "Кутюрні Лінії" },
  { id: "SEASONAL",    labelEN: "Seasonal Lines", labelUA: "Сезонні Лінії" },
  { id: "ACCESSORIES", labelEN: "Accessories",    labelUA: "Аксесуари"     },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export function AtelierExpansionSection() {
  const { language, t } = useLanguage();
  // All groups closed by default
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative z-30 w-full pt-16 sm:pt-24 pb-24 sm:pb-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6]">
      <div className="max-w-[860px] mx-auto space-y-12">

        {/* ── Centered Header ─────────────────────────────────────────── */}
        <ParallaxReveal yOffset={24} duration={0.85}>
          <div className="text-center space-y-5 pb-10">
            <div className="flex items-center justify-center space-x-3">
              <span className="h-[1px] w-10 bg-[#C9A063]/50" />
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] tracking-[0.35em] uppercase font-semibold">
                {t("atelierEyebrow")}
              </span>
              <span className="h-[1px] w-10 bg-[#C9A063]/50" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F3EEE6] uppercase tracking-[0.06em] leading-[1.18]">
              {t("atelierTitle")}
            </h2>
          </div>
        </ParallaxReveal>

        {/* ── Accordion Groups ─────────────────────────────────────────── */}
        <div className="divide-y divide-[#DCC8AA]/12">
          {GROUPS.map((group) => {
            const isOpen = openGroups.has(group.id);
            const lines = EXPANSION_LINES.filter((l) => l.category === group.id);
            const label = language === "UA" ? group.labelUA : group.labelEN;

            return (
              <div key={group.id} className="overflow-hidden">

                {/* Group Toggle Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-2 sm:px-4 py-5 sm:py-6 cursor-pointer transition-colors duration-300 hover:bg-[#C9A063]/4 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-[10px] sm:text-xs text-[#C9A063] tracking-[0.3em] uppercase font-semibold">
                      {group.id}
                    </span>
                    <span className="font-serif text-base sm:text-lg md:text-xl font-light uppercase tracking-[0.1em] text-[#F3EEE6] group-hover:text-[#C9A063] transition-colors duration-300">
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="font-mono text-[10px] text-[#DCC8AA]/40 tracking-widest">
                      {String(lines.length).padStart(2, "0")}
                    </span>
                    <span className={`transition-colors duration-300 ${isOpen ? "text-[#C9A063]" : "text-[#DCC8AA]/35 group-hover:text-[#C9A063]/70"}`}>
                      <Chevron open={isOpen} />
                    </span>
                  </div>
                </button>

                {/* Collapsible Item List */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="divide-y divide-[#DCC8AA]/8 pb-2">
                        {lines.map((line) => {
                          const isHov = hoveredId === line.id;
                          const title = language === "UA" ? line.titleUA : line.titleEN;
                          const note  = language === "UA" ? line.noteUA  : line.noteEN;
                          const year  = language === "UA" ? line.yearUA  : line.yearEN;

                          return (
                            <div
                              key={line.id}
                              onMouseEnter={() => setHoveredId(line.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              className={`relative py-3.5 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                                isHov ? "pl-5 bg-[#C9A063]/[0.04]" : "pl-2 sm:pl-4"
                              }`}
                            >
                              <div className="flex items-center space-x-5 flex-1 min-w-0 pr-4">
                                <span className={`font-sans text-xs tracking-widest font-semibold flex-shrink-0 transition-colors duration-300 ${
                                  isHov ? "text-[#C9A063]" : "text-[#C9A063]/55"
                                }`}>
                                  {line.num}
                                </span>
                                <div className="space-y-0.5 min-w-0">
                                  <h3 className={`font-serif text-sm sm:text-base md:text-lg font-light uppercase tracking-wide transition-colors duration-300 ${
                                    isHov ? "text-[#C9A063]" : "text-[#F3EEE6]"
                                  }`}>
                                    {title}
                                  </h3>
                                  <p className="font-sans text-[11px] sm:text-xs text-[#DCC8AA]/65 font-light">
                                    {note}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 flex-shrink-0">
                                <span className="font-sans text-xs text-[#DCC8AA]/45 tracking-wider uppercase hidden sm:inline-block">
                                  {year}
                                </span>
                                <span className={`font-sans text-sm text-[#C9A063] transition-all duration-300 ${
                                  isHov ? "translate-x-1.5 opacity-100" : "opacity-20"
                                }`}>
                                  →
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Centered "Open Full Archive Page" Button — placed below list, 2x smaller */}
        <div className="pt-6 sm:pt-8 flex justify-center">
          <Link
            href="/catalog"
            className="group relative inline-flex items-center space-x-2.5 px-5 py-2.5 bg-transparent border border-[#C9A063]/60 text-[#F3EEE6] hover:bg-[#C9A063] hover:text-[#060803] transition-all duration-300 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold rounded-none cursor-pointer shadow-md luxury-shimmer-btn"
          >
            <span>{language === "UA" ? "Відкрити Повний Каталог" : "Open Full Archive Page"}</span>
            <span className="text-[#C9A063] group-hover:text-[#060803] group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
