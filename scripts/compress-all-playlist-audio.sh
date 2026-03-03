#!/usr/bin/env bash
# Saari playlist MP3s compress karta hai (metadata/cover hata ke) — GitHub 100 MB limit ke liye.
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

# Al-Baqarah lambi hai — 80k se under 100 MB
compress "public/audio/surah-al-baqarah/abdul-basit-abdul-samad.mp3" "80k"
# Baaki 128k
compress "public/audio/surah-al-fatihah/islam-sobhi.mp3" "128k"
compress "public/audio/surah-al-imran/m-siddiq-al-manshawi.mp3" "128k"
compress "public/audio/surah-an-nisa/mahmood-ali-al-banna.mp3" "128k"
compress "public/audio/surah-al-maidah/mehmood-al-tablawi.mp3" "128k"
compress "public/audio/surah-al-anam/mehmood-al-hasri.mp3" "128k"

echo "Sab compress ho gaye. Ab: git add public/audio/**/*.mp3 && git commit -m 'Add compressed playlist audio' && git push"