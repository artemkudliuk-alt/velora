import fs from 'fs';
import path from 'path';

const srcDir = 'e:/Velora';
const destDir = path.resolve('public/assets/stepper');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const copyMap = [
  { src: path.join(srcDir, '3screen_1.png'), dest: path.join(destDir, 'card_01_navy_tulle.png') },
  { src: path.join(srcDir, '3screen_2.jpeg'), dest: path.join(destDir, 'card_02_ivory_silk.jpg') },
  { src: path.join(srcDir, '3screen_3.jpeg'), dest: path.join(destDir, 'card_03_chocolate_knit.jpg') },
];

for (const item of copyMap) {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.error(`Missing: ${item.src}`);
  }
}
