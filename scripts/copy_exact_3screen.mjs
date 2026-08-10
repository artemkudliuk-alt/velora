import fs from 'fs';
import path from 'path';

const srcDir = 'e:/Velora';
const destDirs = [
  path.resolve('public/assets/stepper'),
  path.resolve('public/assets'),
];

for (const destDir of destDirs) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(path.join(srcDir, '3screen_1.png'), path.join(destDir, '3screen_1.png'));
  fs.copyFileSync(path.join(srcDir, '3screen_2.jpeg'), path.join(destDir, '3screen_2.jpeg'));
  fs.copyFileSync(path.join(srcDir, '3screen_3.jpeg'), path.join(destDir, '3screen_3.jpeg'));
  console.log(`Copied exact 3screen files to ${destDir}`);
}
