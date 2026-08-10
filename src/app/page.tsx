"use client";

import React, { useState, useEffect } from "react";
import { RootLayoutHeader } from "@/components/RootLayoutHeader";
import { MainHero } from "@/components/MainHero";
import { AboutSection } from "@/components/AboutSection";
import { FullSizeScrollerStepper } from "@/components/FullSizeScrollerStepper";
import { CollectionSection } from "@/components/CollectionSection";
import { AtelierExpansionSection } from "@/components/AtelierExpansionSection";
import { InvestorsSection } from "@/components/InvestorsSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Prevent scroll until preloader finishes
  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [loadingComplete]);

  return (
    <main className="min-h-screen bg-[#060803] text-[#F3EEE6] relative selection:bg-[#C9A063] selection:text-[#060803]">
      {/* Preloader */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Header Overlay */}
      <RootLayoutHeader />

      {/* Screen 01: Fullscreen Hero with narrowing animation on scroll */}
      <MainHero />

      {/* Screen 02: About */}
      <AboutSection />

      {/* Screen 03: The Essence of VÉLORA (FullSizeScrollerStepper) */}
      <FullSizeScrollerStepper />

      {/* Screen 03.5 / Catalogue: Interactive Haute Couture Catalog */}
      <CollectionSection />

      {/* Atelier 12 Expansion Lines Showcase */}
      <AtelierExpansionSection />

      {/* Screen 04: Investors & Growth Roadmap */}
      <InvestorsSection />

      {/* Screen 05: Philosophy */}
      <PhilosophySection />

      {/* Screen 06: Contacts */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}



