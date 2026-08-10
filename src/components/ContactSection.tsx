"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimateOnScroll, ParallaxReveal, LuxuryCardTilt } from "@/components/AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "SYDNEY",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full min-h-screen py-16 sm:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#060803] text-[#F3EEE6] flex items-center justify-center overflow-hidden select-text"
    >
      {/* Background Subtle Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,160,99,0.06) 0%, transparent 70%, #060803 100%)",
        }}
      />

      <div className="max-w-[1700px] mx-auto relative z-10 w-full space-y-10 sm:space-y-12">
        
        {/* Unified Top Header for the Section */}
        <ParallaxReveal yOffset={28} duration={0.9} className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <span className="h-[1px] w-12 bg-[#C9A063]/50" />
            <span className="font-sans text-xs sm:text-sm text-[#C9A063] tracking-[0.35em] uppercase font-semibold">
              {t("contactEyebrow")}
            </span>
            <span className="h-[1px] w-12 bg-[#C9A063]/50" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#F3EEE6] tracking-[0.06em] uppercase leading-tight">
            {t("contactTitle")}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#DCC8AA]/80 font-light leading-relaxed">
            {t("contactSub")}
          </p>
        </ParallaxReveal>

        {/* 2 Symmetrical Columns with Multi-Directional Entrances */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Leadership Atelier & Concierge Card (6 Cols) with Slide In Left */}
          <AnimateOnScroll preset="slideInLeft" className="lg:col-span-6 flex flex-col">
            <div className="bg-[#0D0F0A] border border-[#C9A063]/35 p-6 sm:p-8 flex flex-col justify-between h-full shadow-2xl space-y-6 animated-gold-border">
              
              <div className="space-y-6">
                <div className="border-b border-[#C9A063]/25 pb-4">
                  <span className="font-sans text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                    {language === "UA" ? "КЕРІВНИЦТВО АТЕЛЬЄ" : "ATELIER LEADERSHIP"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light mt-1">
                    {t("leadership")}
                  </h3>
                </div>

                {/* Founder Details */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Founder Image */}
                  <div className="sm:col-span-5 relative">
                    <LuxuryCardTilt maxTilt={6}>
                      <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#C9A063]/40 shadow-xl group animated-gold-border">
                        <Image
                          src="/assets/founder.jpg"
                          alt="WALID DIB — Founder & Creative Director of VÉLORA"
                          fill
                          className="object-cover object-top filter brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 border border-[#C9A063]/30 m-2 pointer-events-none" />
                      </div>
                    </LuxuryCardTilt>
                  </div>

                  {/* Founder Info */}
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <span className="font-sans text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.25em] block font-semibold">
                        {t("walidTitle")}
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light mt-0.5">
                        Walid Dib
                      </h4>
                    </div>

                    <p className="font-serif italic text-sm sm:text-base text-[#DCC8AA] font-light leading-relaxed">
                      {t("walidQuote")}
                    </p>

                    <div className="pt-2 border-t border-[#C9A063]/20 space-y-1 font-sans text-xs sm:text-sm">
                      <span className="text-[#C9A063] uppercase tracking-wider block font-semibold">{t("salonsLabel")}</span>
                      <span className="text-[#F3EEE6]/90 font-medium">{t("salons")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact Blocks with Active Hover */}
              <div className="pt-4 border-t border-[#C9A063]/25 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#060803] border border-[#C9A063]/25 hover:border-[#C9A063]/70 hover:bg-[#C9A063]/5 space-y-1 transition-all duration-300">
                  <span className="font-sans text-xs text-[#C9A063] uppercase tracking-wider block font-semibold">
                    {language === "UA" ? "Email Консьєржа" : "Direct Concierge Email"}
                  </span>
                  <span className="font-sans text-sm text-[#F3EEE6] block truncate font-medium">concierge@velora-couture.com</span>
                </div>
                <div className="p-4 bg-[#060803] border border-[#C9A063]/25 hover:border-[#C9A063]/70 hover:bg-[#C9A063]/5 space-y-1 transition-all duration-300">
                  <span className="font-sans text-xs text-[#C9A063] uppercase tracking-wider block font-semibold">
                    {language === "UA" ? "Приватний Запис" : "Private Appointments"}
                  </span>
                  <span className="font-sans text-sm text-[#F3EEE6] block font-medium">+1 (800) 835-6721</span>
                </div>
              </div>

            </div>
          </AnimateOnScroll>

          {/* RIGHT: Request Private Fitting Form Card (6 Cols) with Slide In Right */}
          <AnimateOnScroll preset="slideInRight" delay={0.15} className="lg:col-span-6 flex flex-col">
            <div className="bg-[#0D0F0A] border border-[#C9A063]/35 p-6 sm:p-8 flex flex-col justify-between h-full shadow-2xl space-y-6 animated-gold-border">
              
              <div className="border-b border-[#C9A063]/25 pb-4">
                <span className="font-sans text-xs sm:text-sm text-[#C9A063] uppercase tracking-[0.3em] block font-semibold">
                  {language === "UA" ? "ПРИВАТНІ ЗАМОВЛЕННЯ" : "BESPOKE RESERVATIONS"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] uppercase font-light mt-1">
                  {t("formTitle")}
                </h3>
              </div>

              {submitted ? (
                <div className="bg-[#060803] border border-[#C9A063]/40 p-8 text-center space-y-4 my-auto">
                  <span className="text-3xl">✨</span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#C9A063]">
                    {language === "UA" ? "Запит Отримано" : "Inquiry Received"}
                  </h4>
                  <p className="text-sm sm:text-base text-[#F3EEE6]/90 font-sans leading-relaxed">
                    {language === "UA" ? (
                      <>Дякуємо, <strong className="text-[#C9A063] font-semibold">{formData.name}</strong>. Ваш запит на приватну примірку для салону <strong className="text-[#C9A063] font-semibold">{formData.location}</strong> успішно надіслано. Старший консьєрж зв&apos;яжеться з вами протягом 24 годин.</>
                    ) : (
                      <>Thank you, <strong className="text-[#C9A063] font-semibold">{formData.name}</strong>. Your private fitting inquiry for our <strong className="text-[#C9A063] font-semibold">{formData.location}</strong> salon has been logged. Our Senior Concierge will contact you within 24 hours.</>
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-8 py-3.5 bg-[#C9A063] text-[#060803] font-serif text-sm uppercase tracking-widest font-semibold hover:bg-[#DCC8AA] transition-all duration-300 cursor-pointer luxury-shimmer-btn"
                  >
                    {language === "UA" ? "Надіслати Ще Один Запит" : "Submit Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                  <p className="font-sans text-sm sm:text-base text-[#DCC8AA]/90 leading-relaxed">
                    {t("formSub")}
                  </p>

                  <div className="space-y-3.5 my-auto">
                    <input
                      type="text"
                      required
                      placeholder={t("namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 focus:border-[#C9A063] px-4 py-3.5 text-sm sm:text-base text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(201,160,99,0.2)]"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input
                        type="email"
                        required
                        placeholder={t("emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#060803] border border-[#DCC8AA]/30 focus:border-[#C9A063] px-4 py-3.5 text-sm sm:text-base text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(201,160,99,0.2)]"
                      />

                      <input
                        type="tel"
                        placeholder={t("phonePlaceholder")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#060803] border border-[#DCC8AA]/30 focus:border-[#C9A063] px-4 py-3.5 text-sm sm:text-base text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(201,160,99,0.2)]"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-xs text-[#C9A063] uppercase tracking-wider block mb-1.5 font-semibold">
                        {t("preferredLocation")}
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#060803] border border-[#DCC8AA]/30 focus:border-[#C9A063] px-4 py-3.5 text-sm sm:text-base text-[#F3EEE6] focus:outline-none font-sans cursor-pointer transition-all duration-300"
                      >
                        <option value="SYDNEY">{language === "UA" ? "Сідней — Флагманський Салон" : "Sydney Flagship Salon"}</option>
                        <option value="DUBAI">{language === "UA" ? "Дубай — Приватний Люкс" : "Dubai Private Suite"}</option>
                        <option value="ODESA">{language === "UA" ? "Одеса — Головне Ательє" : "Odesa Master Atelier"}</option>
                        <option value="KYIV">{language === "UA" ? "Київ — Представницький Шоурум" : "Kyiv Showroom"}</option>
                        <option value="BESPOKE DIGITAL">{language === "UA" ? "Цифрова 3D-Примірка" : "Bespoke 3D Digital Fitting"}</option>
                      </select>
                    </div>

                    <textarea
                      rows={3}
                      placeholder={language === "UA" ? "Опишіть ваші побажання, дату заходу або індивідуальні вимоги..." : "Tell us about your wedding date, gown vision, or bespoke requirements..."}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#060803] border border-[#DCC8AA]/30 focus:border-[#C9A063] px-4 py-3.5 text-sm sm:text-base text-[#F3EEE6] placeholder-[#7A7A7A] focus:outline-none font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(201,160,99,0.2)]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#C9A063] text-[#060803] font-serif text-sm sm:text-base uppercase tracking-[0.2em] font-semibold hover:bg-[#DCC8AA] transition-all duration-300 cursor-pointer luxury-shimmer-btn shadow-lg"
                    >
                      {t("submitInquiry")}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </AnimateOnScroll>

        </div>

      </div>
    </section>
  );
}
