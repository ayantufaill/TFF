/**
 * Drive se audio download karke public/audio/surah-al-baqarah/ mein save karta hai.
 * Ek baar chalao: node scripts/download-playlist-audio.js
 * Uske baad Playlist page par audio waheen play hogi.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DRIVE_FILE_ID = '1LjCPDmsdyyu28G3Kp3rKB8hCP6PvP3nI';
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
const OUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'surah-al-baqarah');
const OUT_FILE = path.join(OUT_DIR, 'abdul-basit-abdul-samad.mp3');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function download(url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(OUT_FILE);
    function doRequest(link, redirectCount) {
      const parsed = new URL(link);
      const req = https.get(
        {
          hostname: parsed.hostname,
          path: parsed.pathname + parsed.search,
          headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectCount < 5) {
            res.resume();
            return doRequest(res.headers.location, redirectCount + 1);
          }
          const ct = (res.headers['content-type'] || '').toLowerCase();
          if (ct.includes('text/html')) {
            file.close();
            fs.unlink(OUT_FILE, () => {});
            reject(new Error('Google Drive ne file ki jagah HTML bheja. File bari hai ya link restricted hai. Manually download karke public/audio/surah-al-baqarah/abdul-basit-abdul-samad.mp3 mein rakhein.'));
            return;
          }
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log('Done. File save hui:', OUT_FILE);
            resolve();
          });
        }
      );
      req.on('error', reject);
    }
    doRequest(url, 0);
  });
}

download(DOWNLOAD_URL).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
