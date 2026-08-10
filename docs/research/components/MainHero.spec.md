# MainHero Specification

## Overview
- **Target file:** `src/components/MainHero.tsx`
- **Interaction model:** video background hero with animated typography
- **Description:** Full-bleed luxury hero featuring wedding dress sculpture video background and high-editorial serif typography.


## DOM Structure
- `section.relative.w-full.h-screen.overflow-hidden.flex.items-center.justify-center`
  - Background Video: `<video src="/assets/bea646a70445ada4b773c2621bc82183bbb837d6.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />`
  - Overlay gradient: `div.absolute.inset-0.bg-gradient-to-t.from-[#0b0a09].via-transparent.to-[#0b0a09]/40`
  - Content container: `div.relative.z-10.text-center.max-w-4xl.px-6`
    - Title: "VERO" (`font-serif text-7xl md:text-9xl font-light tracking-[0.2em] text-[#f4efe8]`)
    - Subtitle: "Custom SCULPTURE of your WEDDING DRESS." (`font-serif italic text-2xl md:text-4xl text-[#d4af37] mt-4`)
    - Scroll Cue: Chevron icon with subtle pulse animation

## Assets
- Video: `public/assets/bea646a70445ada4b773c2621bc82183bbb837d6.mp4`

## Responsive Behavior
- Desktop (1440px): Full layout
- Mobile (390px): Single column responsive layout
