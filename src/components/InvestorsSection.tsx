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

  const projectedReturn = Math.round(investmentAmount * 3.1);
  const capacityIncrease = Math.round((investmentAmount / 250000) * 450);
  const projectedRoiMultiplier = (2.8 + (investmentAmount / 1000000) * 0.7).toFixed(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="investors"
      className="relative z-30 w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6] flex flex-col justify-center overflow-hidden"
    >
      {/* Loop Video Background with Light Vignette Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/assets/investors_timelapse.mp4"
          poster="/assets/investors_bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-65 sm:opacity-75 filter brightness-105 saturate-105 scale-105"
        />
        {/* Light Gradient Overlay so Video is Visible & Text Reads Comfortably */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,8,3,0.85) 0%, rgba(6,8,3,0.55) 50%, rgba(6,8,3,0.92) 100%)",
          }}
        />
      </div>

      <div className="max-w-[1700px] mx-auto relative z-10 w-full space-y-10 sm:space-y-12">
        
        {/* Clear Prominent Top Header */}
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

        {/* 2-Column Main Section with Dynamic Directional Entrances */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-[1600px] mx-auto w-full">
          
          {/* LEFT: Financial Calculator (6 Cols) with Slide In Left */}
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-mono text-sm sm:text-base text-[#DCC8AA] uppercase tracking-wider font-medium">
                      {t("targetCapital")}
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#C9A063] font-light">
                      ${investmentAmount.toLocaleString()} USD
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="500"
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

              {/* 3 Prominent Metric Cards with Active Hover Effects */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#C9A063]/30">
                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-4 text-center space-y-1 transition-all duration-300">
                  <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                    {language === "UA" ? "3-Річний Дохід" : "3-Yr Return"}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F3EEE6] block font-light">
                    ${projectedReturn.toLocaleString()}
                  </span>
                  <span className="font-mono text-xs text-[#DCC8AA]/80 block">
                    {projectedRoiMultiplier}x ROI
                  </span>
                </div>

                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-4 text-center space-y-1 transition-all duration-300">
                  <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                    {language === "UA" ? "Потужність" : "Capacity"}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F3EEE6] block font-light">
                    +{capacityIncrease}/{language === "UA" ? "рік" : "yr"}
                  </span>
                  <span className="font-mono text-xs text-[#DCC8AA]/80 block">
                    {language === "UA" ? "Суконь / Рік" : "Gowns Scaling"}
                  </span>
                </div>

                <div className="bg-[#0D0F0A]/90 border border-[#C9A063]/30 hover:border-[#C9A063] hover:bg-[#C9A063]/10 p-4 text-center space-y-1 transition-all duration-300">
                  <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                    {language === "UA" ? "Флагмани" : "Flagships"}
                  </span>
                  <span className="font-serif text-lg sm:text-xl md:text-2xl text-[#F3EEE6] block font-light truncate">
                    {language === "UA" ? "Сідней/Дубай" : "Sydney/Dubai"}
                  </span>
                  <span className="font-mono text-xs text-[#DCC8AA]/80 block">
                    {language === "UA" ? "Прямі Салони" : "Direct Salons"}
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT: "Why Invest in VELORA?" Info & Value Drivers with Slide In Right */}
          <AnimateOnScroll preset="slideInRight" delay={0.15} className="lg:col-span-6 flex flex-col">
            <div className="bg-[#060803]/85 backdrop-blur-md border border-[#C9A063]/40 p-6 sm:p-10 space-y-6 flex flex-col justify-between rounded-none shadow-2xl h-full animated-gold-border">
            <div className="space-y-5">
              <div className="border-b border-[#C9A063]/30 pb-4">
                <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block font-medium">
                  {language === "UA" ? "ЦІННІСНА ПРОПОЗИЦІЯ" : "VALUE PROPOSITION"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                  {t("whyInvestTitle")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 border-b border-[#DCC8AA]/20 pb-3">
                  <span className="font-mono text-sm sm:text-base text-[#C9A063] font-bold pt-0.5">01</span>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F3EEE6] uppercase font-medium">
                      {language === "UA" ? "Високомаржинальний Сегмент Розкоші" : "High-Margin Luxury Positioning"}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/90 font-light leading-relaxed">
                      {language === "UA" ? "75%+ валової маржі у швидкозростаючому глобальному секторі розкоші." : "75%+ gross margins in rapidly growing global luxury sector."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-b border-[#DCC8AA]/20 pb-3">
                  <span className="font-mono text-sm sm:text-base text-[#C9A063] font-bold pt-0.5">02</span>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F3EEE6] uppercase font-medium">
                      {language === "UA" ? "Чітка Міжнародна Стратегія" : "Clear International Strategy"}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/90 font-light leading-relaxed">
                      {language === "UA" ? "Пряма дорожня карта: Сідней, Дубай, Одеса та Київ." : "Direct roadmap targeting Sydney, Dubai, Odesa, and Kyiv."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-b border-[#DCC8AA]/20 pb-3">
                  <span className="font-mono text-sm sm:text-base text-[#C9A063] font-bold pt-0.5">03</span>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F3EEE6] uppercase font-medium">
                      {language === "UA" ? "Масштабована Гібридна Модель та 3D-Технології" : "Scalable Hybrid Model & Proprietary 3D Tech"}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/90 font-light leading-relaxed">
                      {language === "UA" ? "Цифрова примірка DTC у поєднанні з преміальними бутиками." : "DTC digital fitting tech paired with luxury stockists."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pb-1">
                  <span className="font-mono text-sm sm:text-base text-[#C9A063] font-bold pt-0.5">04</span>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F3EEE6] uppercase font-medium">
                      {language === "UA" ? "Довгострокова Цінність Бренду та Арт-Скульптури" : "Long-Term Brand Equity & Art Sculptures"}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/90 font-light leading-relaxed">
                      {language === "UA" ? "Музейні скульптури суконь, що створюють престиж спадщини." : "Gown preservation sculptures generating museum prestige."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pitch Deck Action Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  setDeckModalOpen(true);
                  setSubmitted(false);
                }}
                className="w-full py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold transition-all duration-300 rounded-none cursor-pointer t-btn-frame shadow-lg luxury-shimmer-btn group"
              >
                <span>{language === "UA" ? "ЗАПИТАТИ КОНФІДЕНЦІЙНИЙ МЕМОРАНДУМ" : "Request Confidential Pitch Deck"}</span>
                <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

      </div>

      {/* BOTTOM: 5-Year Growth Roadmap with FadeUp Entrance */}
      <AnimateOnScroll preset="fadeUp" delay={0.25} className="w-full max-w-[1600px] mx-auto">
        <div className="bg-[#060803]/85 backdrop-blur-md border border-[#C9A063]/40 p-6 sm:p-8 space-y-5 rounded-none shadow-2xl animated-gold-border">
          <div className="border-b border-[#C9A063]/30 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.35em] font-semibold">
              {language === "UA" ? "5-РІЧНА СТРАТЕГІЧНА ДОРОЖНЯ КАРТА" : "5-YEAR STRATEGIC ROADMAP"}
            </span>
            <span className="font-serif text-base sm:text-lg text-[#F3EEE6] uppercase font-light">
              {language === "UA" ? "Хронологія Зростання та Ключові Етапи" : "Growth Timeline & Key Milestones"}
            </span>
          </div>

          {/* Single Row 4-Column Timeline Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left pt-2">
            
            {/* Year 1 */}
            <div className="border-l-2 border-[#C9A063] pl-4 space-y-1.5">
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                {language === "UA" ? "РІК 1 • СТАРТ" : "YEAR 1 • LAUNCH"}
              </span>
              <h5 className="font-serif text-sm sm:text-base text-[#F3EEE6] uppercase font-medium">
                {language === "UA" ? "Фундамент" : "Foundation"}
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#DCC8AA] font-light leading-relaxed">
                {language === "UA" ? "Запуск першої колекції • Онлайн-платформа • Оптові партнерства" : "First collection launch • E-commerce platform • Wholesale partnerships"}
              </p>
            </div>

            {/* Year 2 */}
            <div className="border-l-2 border-[#C9A063] pl-4 space-y-1.5">
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                {language === "UA" ? "РІК 2 • ЕКСПАНСІЯ" : "YEAR 2 • EXPANSION"}
              </span>
              <h5 className="font-serif text-sm sm:text-base text-[#F3EEE6] uppercase font-medium">
                {language === "UA" ? "Ринки Затоки" : "Gulf Markets"}
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#DCC8AA] font-light leading-relaxed">
                {language === "UA" ? "Експансія в країни Затоки • Збільшення потужностей • Міжнародні виставки" : "Gulf market expansion • Production capacity • Intl exhibitions"}
              </p>
            </div>

            {/* Year 3 */}
            <div className="border-l-2 border-[#C9A063] pl-4 space-y-1.5">
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                {language === "UA" ? "РІК 3 • ШОУРУМИ" : "YEAR 3 • SHOWROOMS"}
              </span>
              <h5 className="font-serif text-sm sm:text-base text-[#F3EEE6] uppercase font-medium">
                {language === "UA" ? "Флагмани" : "Flagships"}
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#DCC8AA] font-light leading-relaxed">
                {language === "UA" ? "Флагманський салон • Лінія аксесуарів • Світова дистрибуція" : "Flagship showroom • Accessories line • Global distribution"}
              </p>
            </div>

            {/* Years 4-5 */}
            <div className="border-l-2 border-[#C9A063] pl-4 space-y-1.5">
              <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-wider block font-semibold">
                {language === "UA" ? "РОКИ 4–5 • КУТЮРНИЙ ДІМ" : "YEARS 4–5 • MAISON"}
              </span>
              <h5 className="font-serif text-sm sm:text-base text-[#F3EEE6] uppercase font-medium">
                {language === "UA" ? "Глобальний Бренд" : "Global Brand"}
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#DCC8AA] font-light leading-relaxed">
                {language === "UA" ? "Флагманські бутики • Преміальні ринки • Світовий лайфстайл-бренд" : "Flagship boutiques • Luxury markets • Global lifestyle brand"}
              </p>
            </div>

          </div>
        </div>
      </AnimateOnScroll>

      </div>

      {/* Confidential Pitch Deck Request Modal Form */}
      <AnimatePresence>
        {deckModalOpen && (
          <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0D0F0A] border border-[#C9A063]/40 rounded-none max-w-xl w-full p-6 sm:p-10 relative text-[#F3EEE6] shadow-2xl my-8"
            >
              <button
                onClick={() => setDeckModalOpen(false)}
                className="absolute top-5 right-5 text-[#7A7A7A] hover:text-[#C9A063] text-lg transition-colors cursor-pointer w-8 h-8 border border-[#DCC8AA]/20 rounded-none flex items-center justify-center"
              >
                ✕
              </button>

              <div className="border-b border-[#C9A063]/25 pb-4 space-y-1 pr-10">
                <span className="font-mono text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block">
                  {language === "UA" ? "КОНФІДЕНЦІЙНЕ ІНВЕСТИЦІЙНЕ ДОСЬЄ" : "CONFIDENTIAL INVESTOR DOSSIER"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light">
                  {t("deckModalTitle")}
                </h3>
              </div>

              {submitted ? (
                <div className="pt-8 text-center space-y-4">
                  <span className="text-3xl block">🏛️</span>
                  <h4 className="font-serif text-xl text-[#C9A063] uppercase tracking-wide">
                    {language === "UA" ? "Доступ до Досьє Надано" : "Dossier Access Granted"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F3EEE6]/90 font-sans leading-relaxed">
                    {language === "UA" ? (
                      <>Дякуємо, <strong className="text-[#C9A063]">{formData.name}</strong>. Конфіденційну фінансову модель надіслано на пошту <strong className="text-[#C9A063]">{formData.email}</strong>. Наша команда зв'яжеться з вами найближчим часом.</>
                    ) : (
                      <>Thank you, <strong className="text-[#C9A063]">{formData.name}</strong>. The confidential Financial Model has been dispatched to <strong className="text-[#C9A063]">{formData.email}</strong>. Our team will connect shortly.</>
                    )}
                  </p>
                  <button
                    onClick={() => setDeckModalOpen(false)}
                    className="mt-4 px-8 py-3 bg-[#C9A063] text-[#060803] font-mono text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-[#DCC8AA] transition-colors rounded-none"
                  >
                    {language === "UA" ? "Закрити Вікно" : "Close Investor Window"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="pt-6 space-y-4">
                  <p className="font-sans text-xs sm:text-sm text-[#DCC8AA]/90 leading-relaxed">
                    {t("deckModalDesc")}
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder={language === "UA" ? "Ваше Повне Ім'я *" : "Your Full Name *"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 px-4 py-3 text-xs sm:text-sm text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                    />
                    <input
                      type="text"
                      placeholder={language === "UA" ? "Інвестиційний Фонд / Офіс (Опціонально)" : "Investment Fund / Family Office (Optional)"}
                      value={formData.fund}
                      onChange={(e) => setFormData({ ...formData, fund: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 px-4 py-3 text-xs sm:text-sm text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder={language === "UA" ? "Робоча Електронна Пошта *" : "Institutional / Work Email Address *"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 px-4 py-3 text-xs sm:text-sm text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                    />
                    <input
                      type="tel"
                      placeholder={language === "UA" ? "Телефон / Telegram (Опціонально)" : "Phone / Telegram (Optional)"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 px-4 py-3 text-xs sm:text-sm text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none focus:border-[#C9A063] font-sans rounded-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C9A063] hover:bg-[#DCC8AA] text-[#060803] font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-colors rounded-none cursor-pointer"
                  >
                    {t("requestDeck")}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
