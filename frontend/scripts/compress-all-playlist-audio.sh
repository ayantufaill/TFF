#!/usr/bin/env bash
# Saari playlist MP3s compress karta hai (metadata/cover hata ke).
# Target: sab 20 MB se kam (GitHub limit + fast loading).
# Chalao: ./scripts/compress-all-playlist-audio.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

if [ -x "$SCRIPT_DIR/ffmpeg-darwin/ffmpeg" ]; then
  FFMPEG="$SCRIPT_DIR/ffmpeg-darwin/ffmpeg"
elif command -v ffmpeg &>/dev/null; then
  FFMPEG="ffmpeg"
else
  echo "FFmpeg nahi mila. Install karo ya scripts/ffmpeg-darwin/ mein rakho."
  exit 1
fi

compress() {
  local f="$1"
  local rate="${2:-128k}"
  [ -f "$f" ] || return 0
  echo "Compressing $f at $rate..."
  "$FFMPEG" -y -i "$f" -vn -b:a "$rate" -map_metadata -1 -f mp3 "${f}.tmp" && mv "${f}.tmp" "$f" && echo "Done: $f"
}

# 20 MB target: bitrate = 160000/duration_sec (approx)
# Al-Baqarah 3h22m -> 12k | Al-Imran 1h27m -> 32k | An-Nisa 1h17m -> 36k
# Al-Maidah 1h07m -> 40k | Al-Anam 1h45m -> 26k | Al-A'raf 1h23m -> 32k
compress "public/audio/surah-al-baqarah/abdul-basit-abdul-samad.mp3" "12k"
compress "public/audio/surah-al-fatihah/islam-sobhi.mp3" "128k"
compress "public/audio/surah-al-imran/m-siddiq-al-manshawi.mp3" "32k"
compress "public/audio/surah-an-nisa/mahmood-ali-al-banna.mp3" "36k"
compress "public/audio/surah-al-maidah/mehmood-al-tablawi.mp3" "40k"
compress "public/audio/surah-al-anam/mehmood-al-hasri.mp3" "26k"
compress "public/audio/surah-al-a'raf/shahat-anwar.mp3" "32k"
compress "public/audio/surah-al-anfal/saud-al-shuraim.mp3" "128k"
compress "public/audio/surah-al-tawbah/abdullah-kahayyat.mp3" "64k"
compress "public/audio/surah-yunus/10 Yunus (Abdul Rashid Soufi).mp3" "32k"

echo "Sab compress ho gaye (target: 20 MB se kam). Ab: git add public/audio/**/*.mp3 && git commit -m 'Compress playlist audio under 20MB' && git push"