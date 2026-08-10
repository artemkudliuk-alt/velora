"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ParallaxReveal, AnimateOnScroll } from "@/components/AnimateOnScroll";

export function InvestorsSection() {
  const { language, t } = useLanguage();
  const [investmentAmount, setInvestmentAmount] = useState<number>(250000);
  const [deckModalOpen, setDeckModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", fund: "", email: "", phone: "" });
  const [openItem, setOpenItem] = useState<string | null>("01");
  const [openRoadmap, setOpenRoadmap] = useState<string | null>("Y1");
  const [isCardOpen, setIsCardOpen] = useState<boolean>(true);

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
      className="relative z-30 w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6] flex flex-col justify-center overflow-hidden"
    >
      {/* Loop Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/assets/investors_timelapse.mp4"
          poster="/assets/investors_bg.jpg"
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-65 sm:opacity-75 filter brightness-105 saturate-105 scale-105"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(6,8,3,0.85) 0%, rgba(6,8,3,0.55) 50%, rgba(6,8,3,0.92) 100%)" }}
        />
      </div>

      <div className="max-w-[1700px] mx-auto relative z-10 w-full space-y-10 sm:space-y-12">

        {/* Header */}
        <ParallaxReveal yOffset={30} duration={0.9} className="text-center space-y-3 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 justify-center">
            <span className="h-[1px] w-12 bg-[#C9A063]/60" />
            <span className="font-mono text-xs sm:text-sm text-[#C9A063] tracking-[0.35em] uppercase font-semibold">
              {t("investorEyebrow")}
            </span>
            <span className="h-[1px] w-12 bg-[#C9A063]/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F3EEE6] tracking-[0.06em] uppercase leading-tight">
            {t("investorTitle")}
          </h2>
        </ParallaxReveal>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-[1600px] mx-auto w-full">

          {/* LEFT: Financial Calculator */}
          <AnimateOnScroll preset="slideInLeft" className="lg:col-span-6 flex flex-col">
            <div className="bg-[#060803]/85 backdrop-blur-md border border-[#C9A063]/40 p-6 sm:p-10 space-y-8 flex flex-col justify-between rounded-none shadow-2xl h-full animated-gold-border">
              <div className="space-y-6">
                <div className="border-b border-[#C9A063]/30 pb-4">
                  <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                    {language === "UA" ? "ФІНАНСОВЕ МОДЕЛЮВАННЯ" : "FINANCIAL MODELING"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light mt-1">
                    {t("calculatorTitle")}
                  </h3>
                </div>

                {/* Slider */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs sm:text-sm text-[#DCC8AA]/80 uppercase tracking-wider font-medium block">
                      {t("targetCapital")}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#C9A063] font-light block">
                      ${investmentAmount.toLocaleString()} USD
                    </span>
                  </div>

                  <input
                    type="range" min="50000" max="1000000" step="500"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#060803] border border-[#C9A063]/50 appearance-none cursor-pointer accent-[#C9A063]"
                  />

                  <div className="flex justify-between font-mono text-xs sm:text-sm text-[#DCC8AA]/80 uppercase tracking-widest">
                    <span>{language === "UA" ? "$50k Базовий" : "$50k Min Tier"}</span>
                    <span>{language === "UA" ? "$500k Масштабування" : "$500k Growth"}</span>
                    <span>{language === "UA" ? "$1M Провідний" : "$1M Lead Tier"}</span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#C9A063]/30">

                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-3 sm:p-5 text-center flex flex-col items-center justify-center gap-1 transition-all duration-300">
                  <span className="font-mono text-[9px] sm:text-xs text-[#C9A063] uppercase tracking-widest block font-semibold leading-snug">
                    {language === "UA" ? "3-Річний\nДохід" : "3-Yr\nReturn"}
                  </span>
                  <span className="font-serif text-base sm:text-xl md:text-2xl text-[#F3EEE6] block font-light leading-none">
                    ${projectedReturn.toLocaleString()}
                  </span>
                  <span className="font-mono text-[9px] sm:text-xs text-[#DCC8AA]/75 block">
                    {projectedRoiMultiplier}x ROI
                  </span>
                </div>

                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-3 sm:p-5 text-center flex flex-col items-center justify-center gap-1 transition-all duration-300">
                  <span className="font-mono text-[9px] sm:text-xs text-[#C9A063] uppercase tracking-widest block font-semibold leading-snug">
                    {language === "UA" ? "Потуж-\nність" : "Capacity"}
                  </span>
                  <span className="font-serif text-base sm:text-xl md:text-2xl text-[#F3EEE6] block font-light leading-none">
                    +{capacityIncrease}/{language === "UA" ? "рік" : "yr"}
                  </span>
                  <span className="font-mono text-[9px] sm:text-xs text-[#DCC8AA]/75 block">
                    {language === "UA" ? "Суконь / Рік" : "Gowns\nScaling"}
                  </span>
                </div>

                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-3 sm:p-5 text-center flex flex-col items-center justify-center gap-1 transition-all duration-300">
                  <span className="font-mono text-[9px] sm:text-xs text-[#C9A063] uppercase tracking-widest block font-semibold leading-snug">
                    {language === "UA" ? "Флагмани" : "Flagships"}
                  </span>
                  <span className="font-serif text-sm sm:text-lg md:text-xl text-[#F3EEE6] block font-light leading-tight break-words">
                    {language === "UA" ? "Сідней /\nДубай" : "Sydney /\nDubai"}
                  </span>
                  <span className="font-mono text-[9px] sm:text-xs text-[#DCC8AA]/75 block">
                    {language === "UA" ? "Прямі Салони" : "Direct\nSalons"}
                  </span>
                </div>

              </div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT: Why Invest — collapsible card */}
          <AnimateOnScroll preset="slideInRight" delay={0.15} className="lg:col-span-6 flex flex-col">
            <div className="bg-[#060803]/85 backdrop-blur-md border border-[#C9A063]/40 p-6 sm:p-10 rounded-none shadow-2xl h-full animated-gold-border flex flex-col">

              {/* ── Collapsible header ── */}
              <motion.button
                onClick={() => setIsCardOpen((v) => !v)}
                whileTap={{ scale: 0.985 }}
                className="w-full text-left border-b border-[#C9A063]/30 pb-4 cursor-pointer group flex items-start justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block font-medium mb-1">
                    {language === "UA" ? "ЦІННІСНА ПРОПОЗИЦІЯ" : "VALUE PROPOSITION"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light group-hover:text-[#C9A063] transition-colors duration-300">
                    {t("whyInvestTitle")}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: isCardOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex-shrink-0 mt-2 transition-colors duration-300 ${
                    isCardOpen ? "text-[#C9A063]" : "text-[#DCC8AA]/40 group-hover:text-[#C9A063]/70"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </motion.button>

              {/* ── Collapsible body ── */}
              <AnimatePresence initial={false}>
                {isCardOpen && (
                  <motion.div
                    key="card-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pt-5 flex flex-col gap-0 flex-1">

                      {/* Accordion items 01–04 */}
                      <div className="divide-y divide-[#DCC8AA]/15">
                        {WHY_INVEST_ITEMS.map((item) => {
                          const isOpen = openItem === item.id;
                          const title = language === "UA" ? item.titleUA : item.titleEN;
                          const desc  = language === "UA" ? item.descUA  : item.descEN;
                          return (
                            <div key={item.id}>
                              <button
                                onClick={() => setOpenItem(isOpen ? null : item.id)}
                                className="w-full flex items-center justify-between py-3.5 gap-4 cursor-pointer group"
                              >
                                <div className="flex items-center space-x-4 text-left">
                                  <span className={`font-mono text-sm font-bold flex-shrink-0 transition-colors duration-300 ${
                                    isOpen ? "text-[#C9A063]" : "text-[#C9A063]/60 group-hover:text-[#C9A063]"
                                  }`}>{item.id}</span>
                                  <h4 className={`font-serif text-sm sm:text-base uppercase font-medium transition-colors duration-300 ${
                                    isOpen ? "text-[#C9A063]" : "text-[#F3EEE6] group-hover:text-[#C9A063]"
                                  }`}>{title}</h4>
                                </div>
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                  className={`flex-shrink-0 transition-colors duration-300 ${
                                    isOpen ? "text-[#C9A063]" : "text-[#DCC8AA]/35 group-hover:text-[#C9A063]/70"
                                  }`}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </motion.span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    key="desc"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/85 font-light leading-relaxed pl-9 pb-3.5">
                                      {desc}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pitch Deck Button */}
                      <div className="pt-5 mt-auto">
                        <button
                          onClick={() => { setDeckModalOpen(true); setSubmitted(false); }}
                          className="w-full py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold transition-all duration-300 rounded-none cursor-pointer t-btn-frame shadow-lg luxury-shimmer-btn group"
                        >
                          <span>{language === "UA" ? "ЗАПИТАТИ КОНФІДЕНЦІЙНИЙ МЕМОРАНДУМ" : "Request Confidential Pitch Deck"}</span>
                          <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </AnimateOnScroll>

        </div>{/* end 2-col grid */}

        {/* BOTTOM: 5-Year Roadmap Accordion */}
        <AnimateOnScroll preset="fadeUp" delay={0.25} className="w-full max-w-[1600px] mx-auto">
          <div className="bg-[#060803]/85 backdrop-blur-md border border-[#C9A063]/40 rounded-none shadow-2xl animated-gold-border overflow-hidden">

            <div className="border-b border-[#C9A063]/20 px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.35em] font-semibold">
                {language === "UA" ? "5-РІЧНА СТРАТЕГІЧНА ДОРОЖНЯ КАРТА" : "5-YEAR STRATEGIC ROADMAP"}
              </span>
              <span className="font-serif text-sm sm:text-base text-[#DCC8AA]/70 uppercase font-light">
                {language === "UA" ? "Хронологія Зростання" : "Growth Timeline & Key Milestones"}
              </span>
            </div>

            <div className="divide-y divide-[#DCC8AA]/10">
              {ROADMAP_ITEMS.map((year) => {
                const isOpen = openRoadmap === year.id;
                const label = language === "UA" ? year.labelUA : year.labelEN;
                const title = language === "UA" ? year.titleUA : year.titleEN;
                const desc  = language === "UA" ? year.descUA  : year.descEN;
                return (
                  <div key={year.id}>
                    <button
                      onClick={() => setOpenRoadmap(isOpen ? null : year.id)}
                      className="w-full flex items-center justify-between px-6 sm:px-8 py-4 cursor-pointer hover:bg-[#C9A063]/4 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-5 text-left">
                        <span className="font-mono text-[10px] sm:text-xs text-[#C9A063] tracking-[0.3em] uppercase font-semibold flex-shrink-0">
                          {label}
                        </span>
                        <span className={`font-serif text-sm sm:text-base uppercase font-medium transition-colors duration-300 ${
                          isOpen ? "text-[#C9A063]" : "text-[#F3EEE6] group-hover:text-[#C9A063]"
                        }`}>
                          {title}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex-shrink-0 transition-colors duration-300 ${
                          isOpen ? "text-[#C9A063]" : "text-[#DCC8AA]/30 group-hover:text-[#C9A063]/60"
                        }`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="roadmap-desc"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/80 font-light leading-relaxed px-6 sm:px-8 pb-4 pt-0.5">
                            {desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </AnimateOnScroll>

      </div>

      {/* ── Pitch Deck Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {deckModalOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#060803]/90 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setDeckModalOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0D0F0A] border border-[#C9A063]/50 p-8 sm:p-12 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setDeckModalOpen(false)}
                className="absolute top-4 right-4 text-[#DCC8AA]/60 hover:text-[#C9A063] transition-colors duration-200 cursor-pointer font-mono text-lg"
              >
                ✕
              </button>

              {!submitted ? (
                <div className="space-y-6">
                  <div className="space-y-2 border-b border-[#C9A063]/20 pb-5">
                    <span className="font-mono text-xs text-[#C9A063] uppercase tracking-[0.3em] block">
                      {language === "UA" ? "КОНФІДЕНЦІЙНИЙ ДОСТУП" : "Confidential Access"}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                      {language === "UA" ? "Запитати Меморандум" : "Request Pitch Deck"}
                    </h3>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {[
                      { key: "name",  labelEN: "Full Name",    labelUA: "Повне Ім'я",   type: "text" },
                      { key: "fund",  labelEN: "Fund / Company", labelUA: "Фонд / Компанія", type: "text" },
                      { key: "email", labelEN: "Email",         labelUA: "Email",         type: "email" },
                      { key: "phone", labelEN: "Phone",         labelUA: "Телефон",       type: "tel" },
                    ].map((field) => (
                      <div key={field.key} className="space-y-1">
                        <label className="font-mono text-xs text-[#DCC8AA]/80 uppercase tracking-wider">
                          {language === "UA" ? field.labelUA : field.labelEN}
                        </label>
                        <input
                          type={field.type}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          required
                          className="w-full bg-[#060803] border border-[#C9A063]/30 focus:border-[#C9A063] outline-none px-4 py-3 font-sans text-sm text-[#F3EEE6] placeholder-[#DCC8AA]/30 transition-colors duration-200"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer mt-2"
                    >
                      {language === "UA" ? "НАДІСЛАТИ ЗАПИТ" : "Submit Request"} →
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-5 py-6">
                  <div className="text-4xl">✦</div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#C9A063] uppercase font-light">
                      {language === "UA" ? "Запит Отримано" : "Request Received"}
                    </h3>
                    <p className="font-sans text-sm text-[#DCC8AA]/80 font-light">
                      {language === "UA"
                        ? "Наша команда зв'яжеться з вами протягом 24 годин."
                        : "Our team will contact you within 24 hours."}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeckModalOpen(false)}
                    className="font-mono text-xs text-[#C9A063] uppercase tracking-wider hover:text-[#DCC8AA] transition-colors cursor-pointer"
                  >
                    {language === "UA" ? "ЗАКРИТИ" : "CLOSE"} ✕
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
