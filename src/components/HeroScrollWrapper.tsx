"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroScrollWrapper({
  heroContent,
  children,
}: {
  heroContent: React.ReactNode;
  children: React.ReactNode;
}) {
  const { scrollY } = useScroll();

  // 1. Padding on left & right: 0px at top -> 64px when scrolled 500px
  const paddingInline = useTransform(scrollY, [0, 500], ["0px", "64px"]);

  // 2. Height of video section: 100vh at top -> 500px when scrolled 500px
  const height = useTransform(scrollY, [0, 500], ["100vh", "500px"]);

  // 3. Border radius: 0px at top -> 24px when scrolled 500px
  const borderRadius = useTransform(scrollY, [0, 500], ["0px", "24px"]);

  return (
    <div className="relative w-full bg-[#0D0D0D]">
      {/* Hero Video Container (Full 100vh at scroll 0, narrows on scroll) */}
      <motion.div
        style={{
          paddingLeft: paddingInline,
          paddingRight: paddingInline,
        }}
        className="w-full flex justify-center"
      >
        <motion.div
          style={{
            height,
            borderRadius,
          }}
          className="w-full max-w-[1400px] relative overflow-hidden shadow-2xl transition-all duration-75"
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* Section 02 & Rest of Page (Positioned below 100vh, appears on scroll) */}
      <div className="relative w-full bg-[#0D0D0D]">
        {children}
      </div>
    </div>
  );
}
