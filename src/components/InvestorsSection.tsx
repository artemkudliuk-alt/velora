"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ParallaxReveal, AnimateOnScroll } from "@/components/AnimateOnScroll";

export function InvestorsSection() {
  const { language, t } = useLanguage();
  const [investmentAmount, setInvestmentAmount] = useState<number>(250000);
  const [deckModalOpen, setDeckModalOpen] = useState<boolean>(false);
  const [calcModalOpen, setCalcModalOpen] = useState<boolean>(false);
  const [pillarsModalOpen, setPillarsModalOpen] = useState<boolean>(false);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", fund: "", email: "", phone: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectedReturn = Math.round(investmentAmount * 3.1);
  const capacityIncrease = Math.round((investmentAmount / 250000) * 450);
  const projectedRoiMultiplier = (2.8 + (investmentAmount / 1000000) * 0.7).toFixed(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const WHY_INVEST_ITEMS = [
    {
      id: "01",
      titleEN: "High-Margin Luxury Positioning",
      titleUA: "Високомаржинальний Сегмент Розкоші",
      descEN: "75%+ gross margins in rapidly growing global luxury sector.",
      descUA: "75%+ валової маржі у швидкозростаючому глобальному секторі розкоші.",
    },
    {
      id: "02",
      titleEN: "Clear International Strategy",
      titleUA: "Чітка Міжнародна Стратегія",
      descEN: "Direct roadmap targeting Sydney, Dubai, Odesa, and Kyiv.",
      descUA: "Пряма дорожня карта: Сідней, Дубай, Одеса та Київ.",
    },
    {
      id: "03",
      titleEN: "Scalable Hybrid Model & 3D Tech",
      titleUA: "Масштабована Гібридна Модель та 3D-Технології",
      descEN: "DTC digital fitting tech paired with luxury stockists.",
      descUA: "Цифрова примірка DTC у поєднанні з преміальними бутиками.",
    },
    {
      id: "04",
      titleEN: "Long-Term Brand Equity & Art",
      titleUA: "Довгострокова Цінність Бренду та Арт",
      descEN: "Gown preservation sculptures generating museum prestige.",
      descUA: "Музейні скульптури суконь, що створюють престиж спадщини.",
    },
  ] as const;

  const ROADMAP_ITEMS = [
    {
      id: "Y1",
      labelEN: "YEAR 1 · LAUNCH",    labelUA: "РІК 1 · СТАРТ",
      titleEN: "Foundation",          titleUA: "Фундамент",
      descEN: "First collection launch · E-commerce platform · Wholesale partnerships",
      descUA: "Запуск першої колекції · Онлайн-платформа · Оптові партнерства",
    },
    {
      id: "Y2",
      labelEN: "YEAR 2 · EXPANSION", labelUA: "РІК 2 · ЕКСПАНСІЯ",
      titleEN: "Gulf Markets",         titleUA: "Ринки Затоки",
      descEN: "Gulf market expansion · Production capacity · Intl exhibitions",
      descUA: "Експансія в країни Затоки · Збільшення потужностей · Міжнародні виставки",
    },
    {
      id: "Y3",
      labelEN: "YEAR 3 · SHOWROOMS", labelUA: "РІК 3 · ШОУРУМИ",
      titleEN: "Flagships",            titleUA: "Флагмани",
      descEN: "Flagship showroom · Accessories line · Global distribution",
      descUA: "Флагманський салон · Лінія аксесуарів · Світова дистрибуція",
    },
    {
      id: "Y45",
      labelEN: "YEARS 4–5 · MAISON", labelUA: "РОКИ 4–5 · КУТЮРНИЙ ДІМ",
      titleEN: "Global Brand",         titleUA: "Глобальний Бренд",
      descEN: "Flagship boutiques · Premium markets · Global lifestyle brand",
      descUA: "Флагманські бутики · Преміальні ринки · Світовий лайфстайл-бренд",
    },
  ] as const;

  return (
    <section
      id="investors"
      className="relative z-30 w-full min-h-screen py-12 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6] flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Loop Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <video
          src="/assets/investors_timelapse.mp4"
          poster="/assets/investors_bg.jpg"
          autoPlay loop muted playsInline
          className="w-full h-full object-cover filter brightness-90 saturate-90 scale-105"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(6,8,3,0.92) 0%, rgba(6,8,3,0.85) 50%, rgba(6,8,3,0.96) 100%)" }}
        />
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10 w-full space-y-8 sm:space-y-10">

        {/* ── 1. Top Section Header ───────────────────────────────────────────── */}
        <ParallaxReveal yOffset={24} duration={0.8} className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 justify-center">
            <span className="h-[1px] w-10 bg-[#C9A063]/60" />
            <span className="font-mono text-xs text-[#C9A063] tracking-[0.3em] uppercase font-semibold">
              {t("investorEyebrow")}
            </span>
            <span className="h-[1px] w-10 bg-[#C9A063]/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F3EEE6] tracking-[0.06em] uppercase leading-tight">
            {t("investorTitle")}
          </h2>
        </ParallaxReveal>

        {/* ── 2. Top Hero Model Editorial Feature (Woman Photo Prominently at Top) ── */}
        <AnimateOnScroll preset="fadeUp" delay={0.1} className="w-full">
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] border border-[#C9A063]/40 overflow-hidden group shadow-2xl animated-gold-border">
            <img
              src="/assets/investors_bg_new.jpg"
              alt="VÉLORA Haute Couture Model - Investor Relations"
              className="w-full h-full object-cover object-top filter brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060803] via-[#060803]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-[#C9A063]/30 m-3 pointer-events-none" />
            
            {/* Overlay Text on Model Image */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="space-y-1 max-w-xl">
                <span className="font-mono text-[10px] sm:text-xs text-[#C9A063] tracking-[0.3em] uppercase font-semibold block">
                  {language === "UA" ? "БРЕНД-СПАДЩИНА ТА КАПІТАЛ" : "BRAND EQUITY & CAPITAL HORIZONS"}
                </span>
                <h3 className="font-serif text-xl sm:text-3xl text-[#F3EEE6] uppercase font-light leading-snug">
                  {language === "UA" ? "Інвестиції в Архітектурну Моду VÉLORA" : "Investing in VÉLORA Haute Couture Architecture"}
                </h3>
              </div>
              <button
                onClick={() => { setDeckModalOpen(true); setSubmitted(false); }}
                className="px-6 py-3 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-none cursor-pointer flex-shrink-0 shadow-lg luxury-shimmer-btn"
              >
                {language === "UA" ? "ЗАПИТАТИ ПЕК" : "Request Pitch Deck"} →
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── 3. Minimalist Interactive Cards Grid (Information via Modals/Popups) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">

          {/* Card 1: Financial Calculator Modal Trigger */}
          <AnimateOnScroll preset="fadeUp" delay={0.15}>
            <button
              onClick={() => setCalcModalOpen(true)}
              className="w-full h-full text-left bg-[#0D0F0A]/90 hover:bg-[#C9A063]/10 border border-[#C9A063]/35 hover:border-[#C9A063] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 group cursor-pointer shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C9A063] tracking-[0.25em] uppercase font-semibold">01 · MODELING</span>
                  <span className="font-mono text-xs text-[#C9A063] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#F3EEE6] uppercase font-light group-hover:text-[#C9A063] transition-colors">
                  {t("calculatorTitle")}
                </h4>
                <p className="font-sans text-xs text-[#DCC8AA]/75 font-light leading-relaxed">
                  {language === "UA" ? "Симулятор дохідності ROI від $50k до $1M." : "Interactive ROI ROI calculator from $50k to $1M."}
                </p>
              </div>
              <div className="pt-4 border-t border-[#C9A063]/20 flex items-center justify-between font-mono text-xs text-[#C9A063]">
                <span>{projectedRoiMultiplier}x ROI Projected</span>
                <span className="underline uppercase tracking-wider">{language === "UA" ? "Відкрити Калькулятор" : "Open Calculator"}</span>
              </div>
            </button>
          </AnimateOnScroll>

          {/* Card 2: Why Invest Modal Trigger */}
          <AnimateOnScroll preset="fadeUp" delay={0.2}>
            <button
              onClick={() => setPillarsModalOpen(true)}
              className="w-full h-full text-left bg-[#0D0F0A]/90 hover:bg-[#C9A063]/10 border border-[#C9A063]/35 hover:border-[#C9A063] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 group cursor-pointer shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C9A063] tracking-[0.25em] uppercase font-semibold">02 · PROPOSITION</span>
                  <span className="font-mono text-xs text-[#C9A063] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#F3EEE6] uppercase font-light group-hover:text-[#C9A063] transition-colors">
                  {t("whyInvestTitle")}
                </h4>
                <p className="font-sans text-xs text-[#DCC8AA]/75 font-light leading-relaxed">
                  {language === "UA" ? "4 ключові переваги: маржинальність 75%+, 3D-технології." : "4 core pillars: 75%+ margins, 3D fitting tech & prestige."}
                </p>
              </div>
              <div className="pt-4 border-t border-[#C9A063]/20 flex items-center justify-between font-mono text-xs text-[#C9A063]">
                <span>75%+ Gross Margin</span>
                <span className="underline uppercase tracking-wider">{language === "UA" ? "Переглянути Огляд" : "View Pillars"}</span>
              </div>
            </button>
          </AnimateOnScroll>

          {/* Card 3: 5-Year Roadmap Modal Trigger */}
          <AnimateOnScroll preset="fadeUp" delay={0.25}>
            <button
              onClick={() => setRoadmapModalOpen(true)}
              className="w-full h-full text-left bg-[#0D0F0A]/90 hover:bg-[#C9A063]/10 border border-[#C9A063]/35 hover:border-[#C9A063] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 group cursor-pointer shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C9A063] tracking-[0.25em] uppercase font-semibold">03 · STRATEGY</span>
                  <span className="font-mono text-xs text-[#C9A063] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#F3EEE6] uppercase font-light group-hover:text-[#C9A063] transition-colors">
                  {language === "UA" ? "Стратегічна Карта" : "Strategic Roadmap"}
                </h4>
                <p className="font-sans text-xs text-[#DCC8AA]/75 font-light leading-relaxed">
                  {language === "UA" ? "План розвитку: Сідней, Дубай, Київ та оптові мережі." : "5-year growth timeline across Sydney, Gulf & Paris."}
                </p>
              </div>
              <div className="pt-4 border-t border-[#C9A063]/20 flex items-center justify-between font-mono text-xs text-[#C9A063]">
                <span>Years 1–5 Roadmap</span>
                <span className="underline uppercase tracking-wider">{language === "UA" ? "Читати Хронологію" : "View Roadmap"}</span>
              </div>
            </button>
          </AnimateOnScroll>

        </div>

      </div>

      {/* ── MODAL 1: Financial Calculator Popup ───────────────────────────────── */}
      {calcModalOpen && mounted && createPortal(
        <div
          onClick={() => setCalcModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-[#060803]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D0F0A] border border-[#C9A063]/40 w-[calc(100%-2rem)] max-w-xl p-6 sm:p-8 space-y-6 text-[#F3EEE6] shadow-2xl relative m-auto"
          >
            <button
              onClick={() => setCalcModalOpen(false)}
              className="absolute top-4 right-4 text-[#C9A063] hover:text-[#F3EEE6] text-xl font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b border-[#C9A063]/30 pb-3">
              <span className="font-mono text-xs text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                {language === "UA" ? "ФІНАНСОВЕ МОДЕЛЮВАННЯ" : "FINANCIAL MODELING"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light mt-1">
                {t("calculatorTitle")}
              </h3>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#DCC8AA]/80 uppercase tracking-wider block font-medium">
                  {t("targetCapital")}
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#C9A063] font-light block">
                  ${investmentAmount.toLocaleString()} USD
                </span>
              </div>

              <input
                type="range" min="50000" max="1000000" step="500"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#060803] border border-[#C9A063]/50 appearance-none cursor-pointer accent-[#C9A063]"
              />

              <div className="flex justify-between font-mono text-xs text-[#DCC8AA]/80 uppercase tracking-widest">
                <span>$50k Min</span>
                <span>$500k Growth</span>
                <span>$1M Lead</span>
              </div>
            </div>

            {/* 3 Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#C9A063]/30">
              <div className="bg-[#060803] border border-[#C9A063]/30 p-3 text-center">
                <span className="font-mono text-[10px] text-[#C9A063] uppercase tracking-wider block">3-Yr Return</span>
                <span className="font-serif text-lg text-[#F3EEE6] font-light block">${projectedReturn.toLocaleString()}</span>
                <span className="font-mono text-[9px] text-[#DCC8AA]/70 block">{projectedRoiMultiplier}x ROI</span>
              </div>
              <div className="bg-[#060803] border border-[#C9A063]/30 p-3 text-center">
                <span className="font-mono text-[10px] text-[#C9A063] uppercase tracking-wider block">Capacity</span>
                <span className="font-serif text-lg text-[#F3EEE6] font-light block">+{capacityIncrease}/yr</span>
                <span className="font-mono text-[9px] text-[#DCC8AA]/70 block">Gowns</span>
              </div>
              <div className="bg-[#060803] border border-[#C9A063]/30 p-3 text-center">
                <span className="font-mono text-[10px] text-[#C9A063] uppercase tracking-wider block">Salons</span>
                <span className="font-serif text-sm text-[#F3EEE6] font-light block">Sydney / Gulf</span>
                <span className="font-mono text-[9px] text-[#DCC8AA]/70 block">Direct</span>
              </div>
            </div>

            <button
              onClick={() => { setCalcModalOpen(false); setDeckModalOpen(true); setSubmitted(false); }}
              className="w-full py-3 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-none cursor-pointer"
            >
              {language === "UA" ? "ОТРИМАТИ ПОВНИЙ ФІНАНСОВИЙ ПЛАН" : "Get Complete Investment Plan"} →
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ── MODAL 2: Strategic Pillars Popup ──────────────────────────────────── */}
      {pillarsModalOpen && mounted && createPortal(
        <div
          onClick={() => setPillarsModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-[#060803]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D0F0A] border border-[#C9A063]/40 w-[calc(100%-2rem)] max-w-xl p-6 sm:p-8 space-y-5 text-[#F3EEE6] shadow-2xl relative m-auto"
          >
            <button
              onClick={() => setPillarsModalOpen(false)}
              className="absolute top-4 right-4 text-[#C9A063] hover:text-[#F3EEE6] text-xl font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b border-[#C9A063]/30 pb-3">
              <span className="font-mono text-xs text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                {language === "UA" ? "ЦІННІСНА ПРОПОЗИЦІЯ" : "VALUE PROPOSITION"}
              </span>
              <h3 className="font-serif text-2xl text-[#F3EEE6] uppercase font-light mt-1">
                {t("whyInvestTitle")}
              </h3>
            </div>

            <div className="space-y-4 divide-y divide-[#DCC8AA]/15">
              {WHY_INVEST_ITEMS.map((item) => (
                <div key={item.id} className="pt-3 space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-[#C9A063] font-bold">{item.id}</span>
                    <h4 className="font-serif text-base text-[#F3EEE6] uppercase font-medium">{language === "UA" ? item.titleUA : item.titleEN}</h4>
                  </div>
                  <p className="font-sans text-xs text-[#DCC8AA]/80 font-light pl-7">{language === "UA" ? item.descUA : item.descEN}</p>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── MODAL 3: 5-Year Roadmap Popup ──────────────────────────────────────── */}
      {roadmapModalOpen && mounted && createPortal(
        <div
          onClick={() => setRoadmapModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-[#060803]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D0F0A] border border-[#C9A063]/40 w-[calc(100%-2rem)] max-w-xl p-6 sm:p-8 space-y-5 text-[#F3EEE6] shadow-2xl relative m-auto"
          >
            <button
              onClick={() => setRoadmapModalOpen(false)}
              className="absolute top-4 right-4 text-[#C9A063] hover:text-[#F3EEE6] text-xl font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b border-[#C9A063]/30 pb-3">
              <span className="font-mono text-xs text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                {language === "UA" ? "5-РІЧНА СТРАТЕГІЧНА ДОРОЖНЯ КАРТА" : "5-YEAR STRATEGIC ROADMAP"}
              </span>
              <h3 className="font-serif text-2xl text-[#F3EEE6] uppercase font-light mt-1">
                {language === "UA" ? "Хронологія Зростання" : "Growth Timeline & Key Milestones"}
              </h3>
            </div>

            <div className="space-y-4 divide-[#DCC8AA]/15 divide-y">
              {ROADMAP_ITEMS.map((item) => (
                <div key={item.id} className="pt-3 space-y-1">
                  <span className="font-mono text-[10px] text-[#C9A063] tracking-[0.25em] uppercase font-semibold block">
                    {language === "UA" ? item.labelUA : item.labelEN}
                  </span>
                  <h4 className="font-serif text-base text-[#F3EEE6] uppercase font-medium">{language === "UA" ? item.titleUA : item.titleEN}</h4>
                  <p className="font-sans text-xs text-[#DCC8AA]/80 font-light">{language === "UA" ? item.descUA : item.descEN}</p>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── MODAL 4: Confidential Pitch Deck Form ──────────────────────────────── */}
      {deckModalOpen && mounted && createPortal(
        <div
          onClick={() => setDeckModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-[#060803]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D0F0A] border border-[#C9A063]/40 w-[calc(100%-2rem)] max-w-md p-6 sm:p-8 space-y-5 text-[#F3EEE6] shadow-2xl relative m-auto"
          >
            <button
              onClick={() => setDeckModalOpen(false)}
              className="absolute top-4 right-4 text-[#C9A063] hover:text-[#F3EEE6] text-xl font-mono cursor-pointer"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <span className="text-3xl">✨</span>
                <h4 className="font-serif text-2xl text-[#C9A063]">
                  {language === "UA" ? "Запит Успішно Зареєстровано" : "Memorandum Request Registered"}
                </h4>
                <p className="text-xs sm:text-sm text-[#F3EEE6]/90 font-sans">
                  {language === "UA"
                    ? `Дякуємо, ${formData.name}. Пакет інвестора буде надіслано на ${formData.email} протягом 12 годин.`
                    : `Thank you, ${formData.name}. The confidential investment memo will be delivered to ${formData.email} within 12 hours.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="border-b border-[#C9A063]/30 pb-3">
                  <span className="font-mono text-xs text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                    {language === "UA" ? "ПРИВАТНИЙ ДОСТУП" : "CONFIDENTIAL ACCESS"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F3EEE6] uppercase font-light mt-1">
                    {language === "UA" ? "Запит Інвестиційного Пакету" : "Request Pitch Deck & Memos"}
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <input
                    type="text" required placeholder={language === "UA" ? "Ваше Повне Ім'я" : "Full Name"}
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-[#060803] border border-[#C9A063]/40 text-[#F3EEE6] outline-none focus:border-[#C9A063]"
                  />
                  <input
                    type="text" placeholder={language === "UA" ? "Фонд / Офіс (Необов'язково)" : "Fund / Family Office (Optional)"}
                    value={formData.fund} onChange={(e) => setFormData({ ...formData, fund: e.target.value })}
                    className="w-full p-3 bg-[#060803] border border-[#C9A063]/40 text-[#F3EEE6] outline-none focus:border-[#C9A063]"
                  />
                  <input
                    type="email" required placeholder="Email"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-[#060803] border border-[#C9A063]/40 text-[#F3EEE6] outline-none focus:border-[#C9A063]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-none cursor-pointer"
                >
                  {language === "UA" ? "НАДІСЛАТИ ЗАПИТ" : "Submit Request"} →
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
