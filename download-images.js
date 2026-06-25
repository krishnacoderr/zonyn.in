import fs from 'fs';
import https from 'https';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const images = [
  { url: "https://lh3.googleusercontent.com/d/1bmrorPTVK8w8fBt94X92-Ajog23ZuaDz", dest: "portfolio-1.jpg" },
  { url: "https://lh3.googleusercontent.com/d/1H6UYgdBkhNcCN68viV1YCMpWwApFJjf6", dest: "portfolio-2.jpg" },
  { url: "https://lh3.googleusercontent.com/d/16jt67xosNmkHfSFueqQWWx4OTybN-G66", dest: "portfolio-3.jpg" },
  { url: "https://lh3.googleusercontent.com/d/1eSRakO8Ep2GdfUx9AhWhZOcqhXZ-l0c7", dest: "showcase-mockup.png" },
  { url: "https://lh3.googleusercontent.com/d/1qA7TWLuLp5KgryjG5YeklCY85cJpMHdq", dest: "logo-icon.png" },
  { url: "https://lh3.googleusercontent.com/d/14Esy9PljNx4gUMxpV5uvxNuHsQ-63pqD", dest: "logo-text.png" }
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    // If file already exists and has size > 0, we can skip downloading to save time/bandwidth
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`Using cached file for ${path.basename(destPath)}`);
      return resolve();
    }

    const file = fs.createWriteStream(destPath);
    const request = (targetUrl) => {
      https.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          request(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${targetUrl}' (${response.statusCode})`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    };
    request(url);
  });
}

async function main() {
  console.log("Downloading images from Google Drive to local /public...");
  for (const img of images) {
    const destPath = path.join(publicDir, img.dest);
    try {
      await download(img.url, destPath);
      console.log(`Successfully downloaded/verified: ${img.dest}`);
    } catch (err) {
      console.warn(`Warning: Could not download ${img.dest} (${err.message}). The build will continue.`);
    }
  }
}

main();
