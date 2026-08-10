"use client";

import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";

/* ─── Modern Luxury Physics: Crisp, lively, responsive ────────── */
const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -35, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.93, filter: "blur(5px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 75 },
  visible: { opacity: 1, x: 0 },
};

/* ─── Default transition presets ────────────────────────────── */
const crispSlide: Transition = { type: "tween", duration: 0.65, ease: luxuryEase };
const crispSpring: Transition = { type: "spring", stiffness: 220, damping: 24 };

export type AnimPreset =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeScale"
  | "popIn"
  | "slideInLeft"
  | "slideInRight";

const variantMap: Record<AnimPreset, Variants> = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeScale,
  popIn,
  slideInLeft,
  slideInRight,
};

const transitionMap: Record<AnimPreset, Transition> = {
  fadeUp: crispSlide,
  fadeDown: crispSlide,
  fadeLeft: crispSlide,
  fadeRight: crispSlide,
  fadeScale: crispSlide,
  popIn: crispSpring,
  slideInLeft: crispSlide,
  slideInRight: crispSlide,
};

/* ─── AnimateOnScroll wrapper ──────────────────────────────── */

interface AnimateOnScrollProps {
  children: React.ReactNode;
  preset?: AnimPreset;
  variants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "span" | "section" | "article" | "li" | "p" | "h1" | "h2" | "h3" | "h4";
}

export function AnimateOnScroll({
  children,
  preset = "fadeUp",
  variants,
  delay = 0,
  duration = 0.65,
  className,
  once = true,
  amount = 0.1,
  as = "div",
}: AnimateOnScrollProps) {
  const chosenVariants = variants ?? variantMap[preset];
  const baseTransition = transitionMap[preset];

  const transition: Transition = {
    ...baseTransition,
    ...(duration !== undefined ? { duration } : {}),
    delay,
    ease: luxuryEase,
  };

  const Component = motion[as] as React.ElementType;

  return (
    <Component
      variants={chosenVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={transition}
      className={className}
    >
      {children}
    </Component>
  );
}

/* ─── StaggerWrap — Staggers child entrances with dynamic flow ──── */

interface StaggerWrapProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerWrap({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  once = true,
  amount = 0.1,
}: StaggerWrapProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem — child of StaggerWrap ─────────────────── */

interface StaggerItemProps {
  children: React.ReactNode;
  preset?: AnimPreset;
  className?: string;
  duration?: number;
}

export function StaggerItem({
  children,
  preset = "fadeUp",
  className,
  duration = 0.6,
}: StaggerItemProps) {
  const chosenVariants = variantMap[preset];
  const baseTransition = transitionMap[preset];

  return (
    <motion.div
      variants={chosenVariants}
      transition={{
        ...(baseTransition as object),
        duration,
        ease: luxuryEase,
      } as unknown as Transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── ParallaxReveal — Multi-directional dynamic entrance on scroll ──── */

interface ParallaxRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
}

export function ParallaxReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  yOffset,
  duration = 0.65,
  once = true,
}: ParallaxRevealProps) {
  const finalDistance = distance ?? yOffset ?? 40;

  const initialMap = {
    up: { opacity: 0, y: finalDistance, filter: "blur(4px)" },
    down: { opacity: 0, y: -finalDistance, filter: "blur(4px)" },
    left: { opacity: 0, x: -finalDistance, filter: "blur(4px)" },
    right: { opacity: 0, x: finalDistance, filter: "blur(4px)" },
  };

  const targetMap = {
    up: { opacity: 1, y: 0, filter: "blur(0px)" },
    down: { opacity: 1, y: 0, filter: "blur(0px)" },
    left: { opacity: 1, x: 0, filter: "blur(0px)" },
    right: { opacity: 1, x: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      initial={initialMap[direction]}
      whileInView={targetMap[direction]}
      viewport={{ once, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── LuxuryCardTilt — 3D interactive pointer hover depth & glare ───────── */

interface LuxuryCardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  showGlare?: boolean;
}

export function LuxuryCardTilt({
  children,
  className = "",
  maxTilt = 8,
  showGlare = true,
}: LuxuryCardTiltProps) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!outerRef.current || !cardRef.current) return;
    const r = outerRef.current.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

    outerRef.current.classList.add("is-hover");
    cardRef.current.classList.add("is-tilting");

    cardRef.current.style.setProperty("--tilt-ry", ((px - 0.5) * maxTilt).toFixed(2) + "deg");
    cardRef.current.style.setProperty("--tilt-rx", ((0.5 - py) * maxTilt).toFixed(2) + "deg");
    cardRef.current.style.setProperty("--tilt-gx", (px * 100).toFixed(1) + "%");
    cardRef.current.style.setProperty("--tilt-gy", (py * 100).toFixed(1) + "%");
  };

  const handleReset = () => {
    if (!outerRef.current || !cardRef.current) return;
    outerRef.current.classList.remove("is-hover");
    cardRef.current.classList.remove("is-tilting");
    cardRef.current.style.setProperty("--tilt-rx", "0deg");
    cardRef.current.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <div
      ref={outerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleReset}
      className={`t-tilt ${className}`}
    >
      <div ref={cardRef} className="t-tilt-card w-full h-full">
        {children}
        {showGlare && <div className="t-tilt-glare" />}
      </div>
    </div>
  );
}

/* ─── HoverLift — lift and magnetic scale on hover ────────── */

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}

export function HoverLift({
  children,
  className,
  lift = -5,
  scale = 1.02,
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: lift, scale, boxShadow: "0 15px 45px rgba(201,160,99,0.18)" }}
      transition={{ type: "tween", duration: 0.25, ease: luxuryEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
