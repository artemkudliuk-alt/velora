# FullSizeScrollerStepper Specification

## Overview
- **Target file:** `src/components/FullSizeScrollerStepper.tsx`
- **Interaction model:** scroll-driven sticky card stacking with horizontal clip-path unmasking and active bullet stepper
- **Color tokens:** Obsidian `#0D0D0D`, Gold `#C9A063`, Sand `#DCC8AA`, Ivory `#F3EEE6`

## DOM Structure
- `section.relative.w-full.h-[320vh].bg-[#0D0D0D]` (Scroll container)
  - `div.sticky.top-0.h-screen.w-full.overflow-hidden.flex.flex-col.justify-between` (Sticky viewport)
    - `div.header`:
      - Uptitle: *the* **ESSENCE** *of* **VÉLORA**
      - Main Title: *where* **INNOVATION** *meets* **CRAFTSMANSHIP**
    - `div.cardContainer.relative.w-full.flex-1.overflow-hidden`:
      - Card 1: `/assets/stepper/card_01_dress.jpg` + Label: *From* **DRESS,**
      - Card 2: `/assets/stepper/card_02_data.jpg` + Label: *to* **DATA,**
      - Card 3: `/assets/stepper/card_03_sculpture.jpg` + Label: *to* **SCULPTURE.**
    - `div.bottomBar.flex.items-center.justify-between`:
      - Active Step Label
      - 3 Diamond/Circle Stepper Bullets

## Responsive Behavior
- Desktop (1440px): Full cinematic viewport with horizontal unmasking clip-path.
- Mobile (390px): Optimized full-height cards with touch scroll.
