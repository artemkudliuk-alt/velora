import fs from 'fs';
import path from 'path';

const src = 'e:\\Velora\\Hero_video.mp4';
const dest = path.join(process.cwd(), 'public', 'assets', 'Hero_video.mp4');

fs.copyFileSync(src, dest);
console.log(`Successfully copied ${src} (${fs.statSync(dest).size} bytes) to ${dest}`);

// Remove old cloned video if present
const oldVideo = path.join(process.cwd(), 'public', 'assets', 'bea646a70445ada4b773c2621bc82183bbb837d6.mp4');
if (fs.existsSync(oldVideo)) {
  fs.unlinkSync(oldVideo);
  console.log("Removed old cloned video file.");
}
