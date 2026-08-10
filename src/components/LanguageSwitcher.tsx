"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function UKFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="32" height="21" className="rounded-[3px] shadow-sm border border-white/20" {...props}>
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 L60,0 v30 z M30,15 L0,30 v-30 z M30,15 L0,0 h60 z M30,15 L60,30 h-60 z"/>
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#t)"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

export function UkraineFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="32" height="21" className="rounded-[3px] shadow-sm border border-white/20" {...props}>
      <rect width="60" height="15" fill="#0057B7" />
      <rect y="15" width="60" height="15" fill="#FFD700" />
    </svg>
  );
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center space-x-3 bg-transparent p-0 border-none select-none ${className}`}>
      {/* English Flag Button */}
      <button
        onClick={() => setLanguage("EN")}
        title="English"
        className={`bg-transparent p-0 border-none cursor-pointer transition-all duration-300 ${
          language === "EN"
            ? "grayscale-0 opacity-100 scale-105 drop-shadow-[0_2px_8px_rgba(201,160,99,0.4)]"
            : "grayscale opacity-40 hover:grayscale-0 hover:opacity-85 hover:scale-105"
        }`}
      >
        <UKFlag />
      </button>

      {/* Ukrainian Flag Button */}
      <button
        onClick={() => setLanguage("UA")}
        title="Українська"
        className={`bg-transparent p-0 border-none cursor-pointer transition-all duration-300 ${
          language === "UA"
            ? "grayscale-0 opacity-100 scale-105 drop-shadow-[0_2px_8px_rgba(201,160,99,0.4)]"
            : "grayscale opacity-40 hover:grayscale-0 hover:opacity-85 hover:scale-105"
        }`}
      >
        <UkraineFlag />
      </button>
    </div>
  );
}
