"use client";

import React, { useState } from "react";
import { ArrowIcon } from "./icons";

export function RootLayoutFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer id="contact" className="bg-[#0b0a09] border-t border-[#2b2723] py-28 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column - Brand & Statement */}
        <div className="lg:col-span-6 space-y-8">
          <span className="font-serif text-5xl md:text-7xl font-extralight tracking-[0.25em] text-[#f4efe8] block">
            VERO
          </span>
          <p className="font-serif italic text-2xl md:text-3xl text-[#d4af37] font-light max-w-lg leading-relaxed">
            Commission your private wedding dress sculpture.
          </p>
          <p className="font-sans text-xs md:text-sm text-[#a39b8e] max-w-md font-light leading-relaxed">
            Vero accepts a limited number of private sculpture commissions each year to ensure uncompromising craftsmanship and artistic devotion.
          </p>
        </div>

        {/* Right Column - Concierge Inquiry Form & Links */}
        <div className="lg:col-span-6 space-y-12">
          <div className="bg-[#141210] border border-[#2b2723] p-8 md:p-10 rounded-3xl shadow-xl">
            <h3 className="font-serif text-2xl font-light text-[#f4efe8] mb-2">
              Private Concierge Inquiry
            </h3>
            <p className="font-sans text-xs text-[#a39b8e] mb-6">
              Enter your email to receive our private atelier catalogue & commission dossier.
            </p>

            {submitted ? (
              <div className="p-4 bg-[#221f1c] border border-[#d4af37]/40 rounded-xl text-xs text-[#d4af37] tracking-wider uppercase font-sans">
                ✓ Thank you. Our studio director will reach out to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#0b0a09] border border-[#2b2723] px-5 py-3.5 rounded-full text-xs text-[#f4efe8] placeholder-[#a39b8e]/60 focus:outline-none focus:border-[#d4af37] transition-colors font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#d4af37] text-black rounded-full hover:bg-[#f4efe8] transition-colors flex items-center justify-center group"
                >
                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4 text-xs font-sans uppercase tracking-[0.2em] text-[#a39b8e]">
            <div className="space-y-3">
              <span className="text-[#d4af37] text-[10px]">Studio</span>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Philosophy</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Process</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Materials</a>
            </div>
            <div className="space-y-3">
              <span className="text-[#d4af37] text-[10px]">Information</span>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Commissions</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">FAQ</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Press</a>
            </div>
            <div className="space-y-3">
              <span className="text-[#d4af37] text-[10px]">Social</span>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Instagram</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Pinterest</a>
              <a href="#" className="block hover:text-[#f4efe8] transition-colors">Vogue Atelier</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-[#2b2723]/60 flex flex-col sm:flex-row justify-between items-center text-[11px] font-sans uppercase tracking-[0.2em] text-[#a39b8e] gap-4">
        <div>© {new Date().getFullYear()} VERO STUDIO. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#f4efe8] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#f4efe8] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
