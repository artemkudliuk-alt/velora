import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/Jaku/.gemini/antigravity/brain/5c716b88-c947-4602-b856-aa85ee20bb73';
const destDir = path.resolve('public/assets/stepper');

const copyList = [
  {
    src: path.join(brainDir, 'velora_blue_right_1786292997018.jpg'),
    dest: path.join(destDir, 'card_01_royal_blue.jpg'),
  },
  {
    src: path.join(brainDir, 'velora_navy_left_1786293010244.jpg'),
    dest: path.join(destDir, 'card_02_midnight_tulle.jpg'),
  },
  {
    src: path.join(brainDir, 'velora_knit_right_1786293024095.jpg'),
    dest: path.join(destDir, 'card_03_chocolate_knit.jpg'),
  },
];

for (const item of copyList) {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.error(`Source not found: ${item.src}`);
  }
}
