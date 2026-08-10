import fs from 'fs';
import path from 'path';

const specs = [
  {
    name: 'RootLayoutHeader',
    file: 'src/components/RootLayoutHeader.tsx',
    model: 'scroll-responsive sticky/fixed navigation bar',
    desc: 'Fixed luxury header with menu trigger, brand logo, and shopping bag drawer trigger.',
    details: `
## DOM Structure
- \`header.fixed.top-0.left-0.w-full.z-50.px-8.py-6.flex.justify-between.items-center\`
  - Left: \`button\` (Menu icon + "MENU")
  - Center: \`a\` (VERO brand logo svg)
  - Right: \`button\` (Bag icon + "BAG (0)")

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
- Scroll threshold: On scroll > 50px, header gains subtle dark backdrop blur (\`backdrop-blur-md bg-[#0b0a09]/80\`).
`
  },
  {
    name: 'MainHero',
    file: 'src/components/MainHero.tsx',
    model: 'video background hero with animated typography',
    desc: 'Full-bleed luxury hero featuring wedding dress sculpture video background and high-editorial serif typography.',
    details: `
## DOM Structure
- \`section.relative.w-full.h-screen.overflow-hidden.flex.items-center.justify-center\`
  - Background Video: \`<video src="/assets/bea646a70445ada4b773c2621bc82183bbb837d6.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />\`
  - Overlay gradient: \`div.absolute.inset-0.bg-gradient-to-t.from-[#0b0a09].via-transparent.to-[#0b0a09]/40\`
  - Content container: \`div.relative.z-10.text-center.max-w-4xl.px-6\`
    - Title: "VERO" (\`font-serif text-7xl md:text-9xl font-light tracking-[0.2em] text-[#f4efe8]\`)
    - Subtitle: "Custom SCULPTURE of your WEDDING DRESS." (\`font-serif italic text-2xl md:text-4xl text-[#d4af37] mt-4\`)
    - Scroll Cue: Chevron icon with subtle pulse animation

## Assets
- Video: \`public/assets/bea646a70445ada4b773c2621bc82183bbb837d6.mp4\`
`
  },
  {
    name: 'DressDiscover',
    file: 'src/components/DressDiscover.tsx',
    model: 'scroll-triggered text reveal & studio manifesto',
    desc: 'Editorial manifesto section that fades and reveals words as the user scrolls down.',
    details: `
## DOM Structure
- \`section.py-32.px-8.max-w-5xl.mx-auto.text-center\`
  - Heading: "Vero is a luxury fine-art studio that transforms your wedding dress into a timeless sculpture... so that you become art."
  - Typography: \`font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed text-[#f4efe8]\`
  - Accent: Highlighting key phrases ("timeless sculpture", "you become art") in gold italic serif (\`text-[#d4af37] italic\`).
`
  },
  {
    name: 'FullSizeScrollerStepper',
    file: 'src/components/FullSizeScrollerStepper.tsx',
    model: 'interactive gallery scroller displaying sculpture transformations',
    desc: 'Large visual showcase of wedding dress sculptures with side-by-side dress & sculpture transformations.',
    details: `
## DOM Structure
- \`section.py-24.px-6.max-w-7xl.mx-auto\`
  - Gallery Grid / Carousel showcasing luxury sculptures
  - Sculpture Cards with parallax image hover & zoom effects
  - Images from \`public/assets/\` (\`47390300c18860bb900a2917240973e7b33110f0-1658x1926.png\`, \`a43a60914f1f76d948a2cf72a4c0e4759efda568-1104x1424.png\`, \`8d0d9c1168d88f934e97c750e95132558ebfb87e-1086x1448.png\`, \`bf1d31c49733d5cbb2153d3de56e842d333e76c7-1106x1422.png\`)
`
  },
  {
    name: 'MediaGridPush',
    file: 'src/components/MediaGridPush.tsx',
    model: 'editorial masonry gallery grid',
    desc: 'Editorial gallery grid displaying fine-art photography of wedding dresses and bespoke marble/bronze sculptures.',
    details: `
## DOM Structure
- \`section.py-24.px-8.max-w-7xl.mx-auto\`
  - Masonry grid layout (\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\`)
  - Editorial photographs with gold hover borders and soft captions
`
  },
  {
    name: 'RootLayoutFooter',
    file: 'src/components/RootLayoutFooter.tsx',
    model: 'luxury brand footer with newsletter & concierge contact',
    desc: 'Full luxury footer with private consultation booking inquiry, newsletter signup, and copyright.',
    details: `
## DOM Structure
- \`footer.bg-[#0b0a09].border-t.border-[#2b2723].py-24.px-8\`
  - Call to action: "Commission your sculpture" (\`font-serif text-4xl md:text-6xl text-[#f4efe8]\`)
  - Form: Private consultation email input with gold arrow button
  - Footer links: Studio, Process, FAQ, Press, Contact, Instagram
  - Bottom bar: "© VERO STUDIO. ALL RIGHTS RESERVED."
`
  }
];

const specDir = path.join(process.cwd(), 'docs', 'research', 'components');
fs.mkdirSync(specDir, { recursive: true });

specs.forEach(s => {
  let content = `# ${s.name} Specification\n\n`;
  content += `## Overview\n`;
  content += `- **Target file:** \`${s.file}\`\n`;
  content += `- **Interaction model:** ${s.model}\n`;
  content += `- **Description:** ${s.desc}\n\n`;
  content += s.details + `\n`;
  content += `## Responsive Behavior\n- Desktop (1440px): Full layout\n- Mobile (390px): Single column responsive layout\n`;

  const specPath = path.join(specDir, `${s.name}.spec.md`);
  fs.writeFileSync(specPath, content);
  console.log(`Created ${specPath}`);
});
