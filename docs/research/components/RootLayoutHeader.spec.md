# RootLayoutHeader Specification

## Overview
- **Target file:** `src/components/RootLayoutHeader.tsx`
- **Interaction model:** scroll-responsive sticky/fixed navigation bar
- **Description:** Fixed luxury header with menu trigger, brand logo, and shopping bag drawer trigger.


## DOM Structure
- `header.fixed.top-0.left-0.w-full.z-50.px-8.py-6.flex.justify-between.items-center`
  - Left: `button` (Menu icon + "MENU")
  - Center: `a` (VERO brand logo svg)
  - Right: `button` (Bag icon + "BAG (0)")

## Computed Styles
- position: fixed
- top: 0, left: 0, width: 100%
- height: 75px
- zIndex: 50
- color: #f4efe8
- fontFamily: "Plus Jakarta Sans", sans-serif
- textTransform: uppercase
- letterSpacing: 1.5px
- fontSize: 13px

## States & Behaviors
- Scroll threshold: On scroll > 50px, header gains subtle dark backdrop blur (`backdrop-blur-md bg-[#0b0a09]/80`).

## Responsive Behavior
- Desktop (1440px): Full layout
- Mobile (390px): Single column responsive layout
