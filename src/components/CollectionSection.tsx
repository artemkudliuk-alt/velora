"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ParallaxReveal, LuxuryCardTilt, AnimateOnScroll } from "@/components/AnimateOnScroll";

export interface CatalogItem {
  id: string;
  category: "HAUTE COUTURE" | "ATELIER EVENING" | "CONTEMPORARY KNIT" | "BRIDAL BESPOKE";
  name: string;
  subtitleEN: string;
  subtitleUA: string;
  descriptionEN: string;
  descriptionUA: string;
  priceEN: string;
  priceUA: string;
  silhouetteEN: string;
  silhouetteUA: string;
  fabricEN: string;
  fabricUA: string;
  fittingTimeEN: string;
  fittingTimeUA: string;
  image: string;
  accentColor: string;
}

export const MAIN_CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "look-01",
    category: "HAUTE COUTURE",
    name: "COBALT MAJESTY",
    subtitleEN: "Royal Cobalt Off-Shoulder Silk Gown",
    subtitleUA: "Королівська Кобальтова Шовкова Сукня з Відкритими Плечима",
    descriptionEN:
      "A breathtaking evening gown rendered in deep royal cobalt silk. Features a sculpted off-shoulder neckline, tailored corset bodice, and a fluid floor-length drape with subtle walking train.",
    descriptionUA:
      "Захоплива вечірня сукня з глибокого королівського кобальтового шовку. Скульптурний виріз з відкритими плечима, витончений корсетний ліф та струмливий поділ до підлоги з делікатним шлейфом.",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Sculpted Off-Shoulder Gown",
    silhouetteUA: "Скульптурна Сукня з Відкритими Плечима",
    fabricEN: "100% Italian Royal Silk Satin",
    fabricUA: "100% Італійський Шовковий Сатин",
    fittingTimeEN: "12-16 Business Days",
    fittingTimeUA: "12-16 Робочих Днів",
    image: "/assets/catalog/1.png",
    accentColor: "#C9A063",
  },
  {
    id: "look-02",
    category: "ATELIER EVENING",
    name: "RUBY VELOURS",
    subtitleEN: "Deep Burgundy Velvet Ruched Midi Gown",
    subtitleUA: "Винно-Бордова Оксамитова Сукня Міді з Драпуванням",
    descriptionEN:
      "Sensual evening midi silhouette in plush deep burgundy silk velvet. Designed with architectural draped ruching along the hips, a sophisticated cowl neck, and a refined side slit.",
    descriptionUA:
      "Чуттєвий вечірній силует міді з розкішного бордового шовкового оксамиту. Архітектурне драпування по лінії стегон, витончений комір-гойдалка та елегантний бічний розріз.",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Ruched Column Midi Gown",
    silhouetteUA: "Приталена Сукня Міді з Драпуванням",
    fabricEN: "French Silk Velvet & Stretch Crepe",
    fabricUA: "Французький Шовковий Оксамит та Стрейч-Креп",
    fittingTimeEN: "10-14 Business Days",
    fittingTimeUA: "10-14 Робочих Днів",
    image: "/assets/catalog/2.png",
    accentColor: "#DCC8AA",
  },
  {
    id: "look-03",
    category: "HAUTE COUTURE",
    name: "LUMINA OBSIDIAN",
    subtitleEN: "Midnight Black Single-Shoulder Cutout Gown",
    subtitleUA: "Обсидіаново-Чорна Сукня на Одне Плече з Вирізом",
    descriptionEN:
      "Dramatic single-shoulder gown in obsidian black matte silk. Highlights architectural waist cutout geometry, a fitted column drape, and a hand-tailored internal boned bustier.",
    descriptionUA:
      "Ефектна сукня на одне плече з матового обсидіанового шовку. Архітектурний геометричний виріз на талії, прямий спадаючий силует та внутрішній корсетний бюстьє ручної роботи.",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Asymmetrical Single-Shoulder Gown",
    silhouetteUA: "Асиметрична Сукня на Одне Плече",
    fabricEN: "Heavy Obsidian Matte Silk Crepe",
    fabricUA: "Важкий Матовий Шовковий Креп",
    fittingTimeEN: "14-20 Business Days",
    fittingTimeUA: "14-20 Робочих Днів",
    image: "/assets/catalog/3.png",
    accentColor: "#C9A063",
  },
  {
    id: "look-04",
    category: "BRIDAL BESPOKE",
    name: "SAPPHIRE NOCTURNE",
    subtitleEN: "Sapphire Blue Liquid Satin Draped Slip Gown",
    subtitleUA: "Сапфірово-Синя Сукня-Сліп з Рідкого Сатину",
    descriptionEN:
      "Ultra-chic liquid satin gown in brilliant sapphire blue. Features a delicate crossover halter strap, bias-cut flowing hemline, and an open back silhouette.",
    descriptionUA:
      "Ультравишукана сукня з рідкого сатину сяйливого сапфірового відтінку. Делікатна бретель-халтер хрест-навхрест, спадаючий поділ по косій та відкрита спина.",
    priceEN: "Upon Request",
    priceUA: "За Запитом",
    silhouetteEN: "Bias-Cut Liquid Satin Gown",
    silhouetteUA: "Сукня по Косій з Рідкого Сатину",
    fabricEN: "Pure Heavyweight Silk Satin",
    fabricUA: "100% Важкий Шовковий Сатин",
    fittingTimeEN: "10-14 Business Days",
    fittingTimeUA: "10-14 Робочих Днів",
    image: "/assets/catalog/4.png",
    accentColor: "#F3EEE6",
  },
];

export function CollectionSection() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);
  const [modalMode, setModalMode] = useState<"details" | "order">("details");
  const [selectedSize, setSelectedSize] = useState<string>("S (36)");
  const [selectedColor, setSelectedColor] = useState<string>("ATELIER ORIGINAL");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });

  const categories = [
    { id: "ALL", label: language === "UA" ? "УСІ ОБРАЗИ" : "ALL PIECES" },
    { id: "HAUTE COUTURE", label: language === "UA" ? "ВИСОКА МОДА" : "HAUTE COUTURE" },
    { id: "ATELIER EVENING", label: language === "UA" ? "ВЕЧІРНІ СУКНІ" : "ATELIER EVENING" },
    { id: "CONTEMPORARY KNIT", label: language === "UA" ? "СУЧАСНИЙ ТРИКОТАЖ" : "CONTEMPORARY KNIT" },
    { id: "BRIDAL BESPOKE", label: language === "UA" ? "ВЕСІЛЬНИЙ КУТЮР" : "BRIDAL BESPOKE" },
  ];

  const sizes = [
    "XS (34)",
    "S (36)",
    "M (38)",
    "L (40)",
    language === "UA" ? "ІНДИВІДУАЛЬНИЙ (МІРКИ)" : "BESPOKE (CUSTOM)",
  ];

  const colors = [
    language === "UA" ? "ОРИГІНАЛ АТЕЛЬЄ" : "ATELIER ORIGINAL",
    language === "UA" ? "ОБСИДІАНОВИЙ ЧОРНИЙ" : "OBSIDIAN BLACK",
    language === "UA" ? "КОРОЛІВСЬКИЙ КОБАЛЬТ" : "ROYAL COBALT",
    language === "UA" ? "СМАРАГДОВИЙ" : "EMERALD GREEN",
    language === "UA" ? "ВЛАСНИЙ ВІДТІНОК" : "CUSTOM DYE",
  ];

  const filteredItems = MAIN_CATALOG_ITEMS.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  const activeIndex = activeItem
    ? MAIN_CATALOG_ITEMS.findIndex((i) => i.id === activeItem.id)
    : -1;

  const handlePrevItem = () => {
    if (activeIndex === -1) return;
    const prevIdx = (activeIndex - 1 + MAIN_CATALOG_ITEMS.length) % MAIN_CATALOG_ITEMS.length;
    setActiveItem(MAIN_CATALOG_ITEMS[prevIdx]);
    setFormSubmitted(false);
  };

  const handleNextItem = () => {
    if (activeIndex === -1) return;
    const nextIdx = (activeIndex + 1) % MAIN_CATALOG_ITEMS.length;
    setActiveItem(MAIN_CATALOG_ITEMS[nextIdx]);
    setFormSubmitted(false);
  };

  // Keyboard navigation for modal (Left / Right / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "ArrowLeft") handlePrevItem();
      if (e.key === "ArrowRight") handleNextItem();
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, activeIndex]);

  const handleOpenModal = (item: CatalogItem, mode: "details" | "order") => {
    setActiveItem(item);
    setModalMode(mode);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="collection"
      className="relative z-30 w-full min-h-screen py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6] border-t border-[#C9A063]/25"
    >
      <div className="max-w-[1800px] mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
        
        {/* Centered Section Header with Generous Breathing Room */}
        <ParallaxReveal yOffset={32} duration={0.9} className="space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-4 justify-center">
            <span className="h-[1px] w-12 bg-[#C9A063]/50" />
            <span className="font-mono text-xs sm:text-sm text-[#C9A063] tracking-[0.35em] uppercase font-semibold">
              {language === "UA" ? "АРХІВ ТА КАТАЛОГ VÉLORA" : "VÉLORA ARCHIVE & CATALOGUE"}
            </span>
            <span className="h-[1px] w-12 bg-[#C9A063]/50" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F3EEE6] tracking-[0.06em] uppercase leading-[1.15] sm:leading-[1.18] lg:leading-[1.2]">
            {language === "UA" ? "Колекція Високої Моди" : "Haute Couture Collection"}
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#DCC8AA]/85 font-light leading-relaxed tracking-wide max-w-2xl pt-2">
            {language === "UA"
              ? "Ознайомтеся з ексклюзивними виробами, вечірніми сукнями та сучасною розкішшю, створеними для вашого силуету. Кожна сукня виготовляється вручну в нашому одеському ательє."
              : "Explore bespoke creations, evening gowns, and contemporary luxury tailored to your individual silhouette. Every piece is handcrafted in our Odesa atelier."}
          </p>
        </ParallaxReveal>

        {/* Centered Category Filter Tabs — Single Row Alignment */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 lg:gap-4 border-b border-[#DCC8AA]/15 pb-8 overflow-x-auto whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 rounded-none cursor-pointer border whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-[#C9A063] text-[#060803] border-[#C9A063] font-medium shadow-[0_0_20px_rgba(201,160,99,0.25)]"
                    : "bg-transparent text-[#DCC8AA]/70 border-[#DCC8AA]/20 hover:border-[#C9A063]/60 hover:text-[#F3EEE6]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Catalog Grid: 4 MAIN PAGE CARDS with Alternating Directional Entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredItems.map((item, idx) => {
            const subtitle = language === "UA" ? item.subtitleUA : item.subtitleEN;
            const description = language === "UA" ? item.descriptionUA : item.descriptionEN;
            const price = language === "UA" ? item.priceUA : item.priceEN;
            const silhouette = language === "UA" ? item.silhouetteUA : item.silhouetteEN;
            const fabric = language === "UA" ? item.fabricUA : item.fabricEN;
            const fittingTime = language === "UA" ? item.fittingTimeUA : item.fittingTimeEN;
            const slidePreset = idx % 2 === 0 ? "slideInLeft" : "slideInRight";

            return (
              <AnimateOnScroll key={item.id} preset={slidePreset} delay={0.1 + (idx % 2) * 0.15} className="h-full">
                <LuxuryCardTilt maxTilt={6} className="h-full">
                  <motion.div
                    layout
                    className="group relative bg-[#0D0F0A] border border-[#C9A063]/30 hover:border-[#C9A063] transition-all duration-400 flex flex-col justify-between rounded-none overflow-hidden hover:shadow-[0_20px_55px_rgba(201,160,99,0.25)] h-full animated-gold-border"
                  >
                  {/* Product Image Area */}
                  <div
                    onClick={() => handleOpenModal(item, "details")}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] lg:h-[480px] bg-[#060803] border-b border-[#C9A063]/25 overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />

                    {/* Top Category Tag Badge */}
                    <div className="absolute top-4 left-4 bg-[#060803]/90 backdrop-blur-md px-4 py-1.5 border border-[#C9A063]/40 rounded-none z-10">
                      <span className="font-mono text-xs text-[#C9A063] tracking-widest uppercase font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Price Tag Badge */}
                    <div className="absolute top-4 right-4 bg-[#060803]/90 backdrop-blur-md px-4 py-1.5 border border-[#C9A063]/40 rounded-none z-10">
                      <span className="font-mono text-xs text-[#DCC8AA] tracking-wider uppercase font-medium">
                        {price}
                      </span>
                    </div>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(item, "details");
                        }}
                        className="group/hoverbtn px-8 py-4 bg-[#060803]/90 backdrop-blur-md text-[#F3EEE6] border border-[#C9A063]/70 hover:border-[#C9A063] hover:bg-[#C9A063]/25 text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 rounded-none cursor-pointer flex items-center space-x-3 luxury-shimmer-btn"
                      >
                        <span className="font-semibold">{language === "UA" ? "Деталі Образу" : "View Details"}</span>
                        <span className="text-[#C9A063] text-base group-hover/hoverbtn:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between bg-[#0D0F0A]">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-[#DCC8AA]/70 tracking-wider uppercase">
                          {language === "UA" ? `Термін: ${fittingTime}` : `Fitting: ${fittingTime}`}
                        </span>
                      </div>

                      {/* Clickable Title Opens Detail Page Modal */}
                      <h3
                        onClick={() => handleOpenModal(item, "details")}
                        className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EEE6] hover:text-[#C9A063] transition-colors tracking-wide uppercase cursor-pointer inline-block"
                      >
                        {item.name}
                      </h3>

                      <p className="font-serif italic text-sm text-[#DCC8AA]/90">
                        {subtitle}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-[#F3EEE6]/80 font-light leading-relaxed pt-1">
                        {description}
                      </p>
                    </div>

                    {/* Specs & CTAs Bar */}
                    <div className="pt-4 border-t border-[#DCC8AA]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1 font-mono text-xs text-[#C9A063]/90 tracking-wider uppercase">
                        <div>◆ {language === "UA" ? "СИЛУЕТ:" : "SILHOUETTE:"} {silhouette}</div>
                        <div className="text-[#DCC8AA]/70">◆ {language === "UA" ? "ТКАНИНА:" : "FABRIC:"} {fabric}</div>
                      </div>

                      <div className="flex items-center space-x-6 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleOpenModal(item, "details")}
                          className="group/btn relative inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#F3EEE6] hover:text-[#C9A063] transition-colors cursor-pointer py-1"
                        >
                          <span className="font-semibold">{language === "UA" ? "Деталі" : "View Details"}</span>
                          <span className="text-[#C9A063] text-sm group-hover/btn:translate-x-2 transition-transform duration-300">
                            →
                          </span>
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A063]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </LuxuryCardTilt>
            </AnimateOnScroll>
          );
          })}
        </div>

        {/* Centered "View Full Archive" Button */}
        <div className="pt-8 flex justify-center">
          <Link
            href="/catalog"
            className="group relative inline-flex items-center space-x-4 px-10 py-5 bg-transparent border border-[#C9A063] text-[#F3EEE6] hover:bg-[#C9A063] hover:text-[#060803] transition-all duration-300 font-mono text-xs uppercase tracking-[0.3em] font-semibold rounded-none cursor-pointer shadow-lg luxury-shimmer-btn"
          >
            <span>{language === "UA" ? "Відкрити Повний Каталог" : "Open Full Archive Page"}</span>
            <span className="text-[#C9A063] group-hover:text-[#060803] group-hover:translate-x-3 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* Product Detail & Bespoke Order Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0D0F0A] border border-[#C9A063]/40 rounded-none max-w-5xl w-full p-6 sm:p-8 md:p-10 relative text-[#F3EEE6] shadow-2xl my-8"
            >
              {/* Modal Top Controls */}
              <div className="absolute top-5 right-5 flex items-center space-x-3 z-20">
                <button
                  onClick={handlePrevItem}
                  title="Previous Piece"
                  className="px-3 py-1.5 border border-[#DCC8AA]/30 hover:border-[#C9A063] hover:text-[#C9A063] text-xs font-mono uppercase transition-colors rounded-none cursor-pointer flex items-center space-x-1"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">{language === "UA" ? "ПОПЕРЕДНЯ" : "PREV"}</span>
                </button>
                <span className="font-mono text-xs text-[#C9A063]">
                  {activeIndex + 1}/{MAIN_CATALOG_ITEMS.length}
                </span>
                <button
                  onClick={handleNextItem}
                  title="Next Piece"
                  className="px-3 py-1.5 border border-[#DCC8AA]/30 hover:border-[#C9A063] hover:text-[#C9A063] text-xs font-mono uppercase transition-colors rounded-none cursor-pointer flex items-center space-x-1"
                >
                  <span className="hidden sm:inline">{language === "UA" ? "НАСТУПНА" : "NEXT"}</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-[#7A7A7A] hover:text-[#C9A063] text-lg transition-colors cursor-pointer w-8 h-8 border border-[#DCC8AA]/20 rounded-none flex items-center justify-center ml-2"
                >
                  ✕
                </button>
              </div>

              {/* Modal Header */}
              <div className="border-b border-[#C9A063]/25 pb-4 space-y-1 pr-36">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-[#C9A063] tracking-[0.3em] uppercase">
                    {activeItem.category}
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F3EEE6] uppercase tracking-wide">
                  {activeItem.name}
                </h3>
                <p className="font-serif italic text-sm text-[#DCC8AA]">
                  {language === "UA" ? activeItem.subtitleUA : activeItem.subtitleEN}
                </p>
              </div>

              {/* Modal Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-6">
                
                {/* Left Column: Photo */}
                <div className="md:col-span-5 relative aspect-[3/4] bg-[#060803] border border-[#C9A063]/30 overflow-hidden flex items-center justify-center shadow-inner">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#060803]/90 px-3.5 py-1.5 border border-[#C9A063]/40">
                    <span className="font-mono text-xs text-[#C9A063] uppercase tracking-widest">
                      {language === "UA" ? activeItem.priceUA : activeItem.priceEN}
                    </span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {modalMode === "details" ? (
                    <div className="space-y-6">
                      
                      {/* Specifications Table */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        <div className="bg-[#060803] border border-[#DCC8AA]/15 p-3.5 rounded-none space-y-1">
                          <span className="text-[#C9A063] font-mono uppercase tracking-wider block text-[10px]">
                            {language === "UA" ? "Архітектура Силуету:" : "Silhouette Architecture:"}
                          </span>
                          <span className="text-[#F3EEE6] font-medium">
                            {language === "UA" ? activeItem.silhouetteUA : activeItem.silhouetteEN}
                          </span>
                        </div>
                        <div className="bg-[#060803] border border-[#DCC8AA]/15 p-3.5 rounded-none space-y-1">
                          <span className="text-[#C9A063] font-mono uppercase tracking-wider block text-[10px]">
                            {language === "UA" ? "Тканина та Оздоблення:" : "Fabric & Craftsmanship:"}
                          </span>
                          <span className="text-[#F3EEE6] font-medium">
                            {language === "UA" ? activeItem.fabricUA : activeItem.fabricEN}
                          </span>
                        </div>
                        <div className="bg-[#060803] border border-[#DCC8AA]/15 p-3.5 rounded-none space-y-1">
                          <span className="text-[#C9A063] font-mono uppercase tracking-wider block text-[10px]">
                            {language === "UA" ? "Термін Виготовлення:" : "Tailoring Timeline:"}
                          </span>
                          <span className="text-[#F3EEE6] font-medium">
                            {language === "UA" ? activeItem.fittingTimeUA : activeItem.fittingTimeEN}
                          </span>
                        </div>
                        <div className="bg-[#060803] border border-[#DCC8AA]/15 p-3.5 rounded-none space-y-1">
                          <span className="text-[#C9A063] font-mono uppercase tracking-wider block text-[10px]">
                            {language === "UA" ? "Примірка в Ательє:" : "Atelier Fitting:"}
                          </span>
                          <span className="text-[#F3EEE6] font-medium">
                            {language === "UA" ? "Ательє в Одесі та Салони" : "Odesa Atelier & Showrooms"}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Size Selection */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-[#C9A063] uppercase tracking-widest">
                            {language === "UA" ? "Оберіть Розмір / Мірки:" : "Select Size / Measure:"}
                          </span>
                          <span className="font-mono text-[10px] text-[#DCC8AA]/60">
                            {language === "UA" ? `Обрано: ${selectedSize}` : `Active: ${selectedSize}`}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              className={`px-3 py-1.5 text-xs font-mono uppercase rounded-none border transition-colors cursor-pointer ${
                                selectedSize === sz
                                  ? "bg-[#C9A063] text-[#060803] border-[#C9A063] font-medium"
                                  : "bg-[#060803] text-[#DCC8AA] border-[#DCC8AA]/25 hover:border-[#C9A063]"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Color Selection */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-[#C9A063] uppercase tracking-widest">
                            {language === "UA" ? "Палітра Кольорів Ательє:" : "Atelier Color Palette:"}
                          </span>
                          <span className="font-mono text-[10px] text-[#DCC8AA]/60">
                            {language === "UA" ? `Обрано: ${selectedColor}` : `Selected: ${selectedColor}`}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {colors.map((clr) => (
                            <button
                              key={clr}
                              onClick={() => setSelectedColor(clr)}
                              className={`px-3 py-1.5 text-[11px] font-mono uppercase rounded-none border transition-colors cursor-pointer ${
                                selectedColor === clr
                                  ? "bg-[#C9A063] text-[#060803] border-[#C9A063] font-medium"
                                  : "bg-[#060803] text-[#DCC8AA] border-[#DCC8AA]/25 hover:border-[#C9A063]"
                              }`}
                            >
                              {clr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Design Notes */}
                      <div className="space-y-1.5 border-l border-[#C9A063]/40 pl-4 py-1">
                        <span className="font-mono text-xs text-[#C9A063] uppercase tracking-widest block">
                          {language === "UA" ? "Нотатки Архітектури Дизайну:" : "Design Architecture Notes:"}
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-[#F3EEE6]/85 font-light leading-relaxed">
                          {language === "UA" ? activeItem.descriptionUA : activeItem.descriptionEN}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setModalMode("order")}
                          className="flex-1 py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none cursor-pointer text-center"
                        >
                          {language === "UA" ? `Замовити Індивідуальний Пошив (${selectedSize})` : `Request Bespoke Tailoring (${selectedSize})`}
                        </button>
                        <button
                          onClick={() => setActiveItem(null)}
                          className="py-4 px-6 border border-[#DCC8AA]/30 text-[#DCC8AA] font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors rounded-none cursor-pointer"
                        >
                          {language === "UA" ? "Закрити Вікно" : "Close Product Page"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formSubmitted ? (
                        <div className="p-8 bg-[#060803] border border-[#C9A063] text-center space-y-4 rounded-none">
                          <span className="text-3xl block">✨</span>
                          <h4 className="font-serif text-xl text-[#C9A063] uppercase tracking-wide">
                            {language === "UA" ? "Запит на Пошиття Отримано" : "Bespoke Inquiry Received"}
                          </h4>
                          <p className="text-xs text-[#F3EEE6]/80 font-sans leading-relaxed">
                            {language === "UA" ? (
                              <>Дякуємо. Старший кутюр'є ательє розгляне ваш запит на виріб <strong className="text-[#C9A063]">{activeItem.name}</strong> (Розмір: {selectedSize}, Колір: {selectedColor}) та зв'яжеться з вами протягом 15 хвилин для узгодження мірок або запису в салон.</>
                            ) : (
                              <>Thank you. Our senior atelier couturier will review your request for <strong className="text-[#C9A063]">{activeItem.name}</strong> (Size: {selectedSize}, Color: {selectedColor}) and reach out within 15 minutes to arrange private measurements or a showroom fitting.</>
                            )}
                          </p>
                          <button
                            onClick={() => setActiveItem(null)}
                            className="mt-4 px-8 py-3 bg-[#C9A063] text-[#060803] font-mono text-xs uppercase tracking-widest font-medium hover:bg-[#DCC8AA] transition-colors rounded-none"
                          >
                            {language === "UA" ? "Повернутися до Каталогу" : "Return to Catalogue"}
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="flex items-center justify-between border-b border-[#DCC8AA]/15 pb-2">
                            <span className="font-mono text-xs text-[#C9A063] uppercase tracking-widest">
                              {language === "UA" ? `Запит на Індивідуальну Примірку (${selectedSize} • ${selectedColor})` : `Bespoke Fitting Request (${selectedSize} • ${selectedColor})`}
                            </span>
                            <button
                              type="button"
                              onClick={() => setModalMode("details")}
                              className="font-mono text-[10px] text-[#DCC8AA] hover:text-[#C9A063] uppercase tracking-wider"
                            >
                              ← {language === "UA" ? "Назад до Деталей" : "Back to Details"}
                            </button>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              required
                              placeholder={language === "UA" ? "Ваше Повне Ім'я" : "Your Full Name"}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[#060803] border border-[#DCC8AA]/25 px-4 py-3 text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                            />
                            <input
                              type="tel"
                              required
                              placeholder={language === "UA" ? "Телефон / WhatsApp / Telegram" : "Phone / WhatsApp / Telegram"}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-[#060803] border border-[#DCC8AA]/25 px-4 py-3 text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                            />
                            <input
                              type="email"
                              placeholder={language === "UA" ? "Електронна Пошта" : "Email Address"}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-[#060803] border border-[#DCC8AA]/25 px-4 py-3 text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                            />
                            <textarea
                              rows={3}
                              placeholder={language === "UA" ? `Мірки для ${selectedSize}, дата події або побажання щодо кольору...` : `Measurements for ${selectedSize}, event date, or custom color preferences...`}
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              className="w-full bg-[#060803] border border-[#DCC8AA]/25 px-4 py-3 text-xs text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none cursor-pointer"
                          >
                            {language === "UA" ? `Надіслати Запит (${selectedSize})` : `Submit Bespoke Inquiry (${selectedSize})`}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
