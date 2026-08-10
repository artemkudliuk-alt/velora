import fs from 'fs';
import path from 'path';

async function fetchSvg(url, destName) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      const dest = path.join(process.cwd(), 'public', destName);
      fs.writeFileSync(dest, text);
      console.log(`Saved ${destName} (${text.length} bytes)`);
    } else {
      console.log(`Failed to fetch ${url}: ${res.status}`);
    }
  } catch (e) {
    console.error(`Error fetching ${url}:`, e.message);
  }
}

fetchSvg('https://www.verostudio.com/icons.svg', 'icons.svg');
fetchSvg('https://www.verostudio.com/brand.svg', 'brand.svg');
