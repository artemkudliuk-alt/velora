"use client";

import React from "react";

export function DressDiscover() {
  return (
    <section id="discover" className="py-36 px-8 max-w-5xl mx-auto text-center relative z-10 border-b border-[#2b2723]/40">
      <div className="inline-block px-4 py-1.5 rounded-full border border-[#2b2723] text-[11px] uppercase tracking-[0.3em] text-[#d4af37] mb-10">
        Studio Philosophy
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extralight leading-[1.3] text-[#f4efe8] tracking-wide">
        Vero is a luxury fine-art studio that transforms your wedding dress into a{" "}
        <span className="italic font-normal text-[#d4af37]">timeless sculpture</span>.
      </h2>

      <p className="font-sans text-sm md:text-base text-[#a39b8e] font-light max-w-2xl mx-auto mt-10 leading-relaxed tracking-wider">
        Preserving the emotional memory, delicate lace, and fluid contours of your bridal gown into handcrafted bronze, marble, and archival porcelain fine art.
      </p>

      <div className="mt-14 font-serif italic text-2xl md:text-4xl text-[#d4af37] tracking-wider">
        "...so that you become art."
      </div>
    </section>
  );
}
