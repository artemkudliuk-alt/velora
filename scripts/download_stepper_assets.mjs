import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.resolve('public/assets/stepper');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const assets = [
  {
    name: 'card_01_dress.jpg',
    url: 'https://cdn.sanity.io/images/xei5vqg0/production/cfe716ebeb9d1a0676a59f41aa92b2e678dce13c-2887x1800.jpg?w=1920&q=85&auto=format'
  },
  {
    name: 'card_02_data.jpg',
    url: 'https://cdn.sanity.io/images/xei5vqg0/production/457833e548c061d08e21f99cae765b488c1489b1-1843x1003.jpg?w=1920&q=85&auto=format'
  },
  {
    name: 'card_03_sculpture.jpg',
    url: 'https://cdn.sanity.io/images/xei5vqg0/production/62dddffa9563718a6437deb91cb2a91ceb0e01f2-2975x1800.jpg?w=1920&q=85&auto=format'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading stepper card assets...');
  for (const item of assets) {
    const dest = path.join(outDir, item.name);
    console.log(`Downloading ${item.name}...`);
    await download(item.url, dest);
    console.log(`Saved ${dest}`);
  }
  console.log('All assets downloaded successfully!');
}

run();
