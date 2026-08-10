import fs from 'fs';
import path from 'path';

const outputTxtPath = 'C:\\Users\\Jaku\\.gemini\\antigravity\\brain\\5c716b88-c947-4602-b856-aa85ee20bb73\\.system_generated\\steps\\549\\output.txt';

let rawOutput = fs.readFileSync(outputTxtPath, 'utf8');
const match = rawOutput.match(/Execution result:\r?\n"(.*)"/s);
let jsonStr = match ? match[1] : null;

if (jsonStr) {
    jsonStr = jsonStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
} else {
    const firstBrace = rawOutput.indexOf('{');
    const lastBrace = rawOutput.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
        jsonStr = rawOutput.substring(firstBrace, lastBrace + 1);
    }
}

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Failed to parse JSON:", e.message);
  process.exit(1);
}

console.log("Extracted fonts:", data.fonts);

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const allUrls = new Set();
data.images.forEach(img => { if (img.src) allUrls.add(img.src); });
data.videos.forEach(v => { if (v.src) allUrls.add(v.src); if (v.poster) allUrls.add(v.poster); });
data.backgroundImages.forEach(bg => {
    const m = bg.url.match(/url\(['"]?(.*?)['"]?\)/);
    if (m && m[1]) allUrls.add(m[1]);
});

console.log(`Downloading ${allUrls.size} assets to public/assets/ ...`);

async function downloadFile(url) {
    try {
        if (url.startsWith('data:')) return;
        const parsed = new URL(url);
        let filename = path.basename(parsed.pathname);
        if (!filename || filename.length > 80 || !filename.includes('.')) {
            filename = `asset_${Math.random().toString(36).substring(2, 9)}.jpg`;
        }
        filename = filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const dest = path.join(assetsDir, filename);

        const res = await fetch(url);
        if (!res.ok) {
            console.log(`Failed to download ${url}: ${res.status}`);
            return;
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log(`Saved ${filename} (${buffer.length} bytes)`);
    } catch (e) {
        console.log(`Error downloading ${url}:`, e.message);
    }
}

async function main() {
    const queue = Array.from(allUrls);
    const workers = Array(4).fill(0).map(async () => {
        while (queue.length > 0) {
            const item = queue.shift();
            if (item) await downloadFile(item);
        }
    });
    await Promise.all(workers);
    console.log("All asset downloads complete!");
}

main();
