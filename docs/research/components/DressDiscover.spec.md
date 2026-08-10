# DressDiscover Specification

## Overview
- **Target file:** `src/components/DressDiscover.tsx`
- **Interaction model:** scroll-triggered text reveal & studio manifesto
- **Description:** Editorial manifesto section that fades and reveals words as the user scrolls down.


## DOM Structure
- `section.py-32.px-8.max-w-5xl.mx-auto.text-center`
  - Heading: "Vero is a luxury fine-art studio that transforms your wedding dress into a timeless sculpture... so that you become art."
  - Typography: `font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed text-[#f4efe8]`
  - Accent: Highlighting key phrases ("timeless sculpture", "you become art") in gold italic serif (`text-[#d4af37] italic`).

## Responsive Behavior
- Desktop (1440px): Full layout
- Mobile (390px): Single column responsive layout
