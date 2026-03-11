#!/usr/bin/env bash
# Compress playlist MP3s for Surahs 16–25 to ~64kbps (same as surahs 11–15).
# Requires: ffmpeg installed (e.g. brew install ffmpeg).
# Run from project root: bash scripts/compress-playlist-audio-16-25.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

# Surah 16–25: path to MP3 (relative to project root)
FILES=(
  "public/audio/surah-an-nahl/16 An-Nahl (Khalid Jalil).mp3"
  "public/audio/surah-al-isra/17 Al-Isra (Abdul Rehman Al sudais).mp3"
  "public/audio/surah-al-kahf/18 Al-Kahf (Abu Bakar Al Shatiri).mp3"
  "public/audio/surah-maryam/19 Maryam (Ahmad Al Tarablisi).mp3"
  "public/audio/surah ta-ha/20 Ta-Ha (Ra'ad Al Kurdi).mp3"
  "public/audio/surah-al-anbiya/21 Al-Anbiya (Faris Abbad).mp3"
  "public/audio/surah-al-hajj/22 Al-Hajj (Hani Al Rafai).mp3"
  "public/audio/surah-al-mu'minun/23 Al-Mu'minun (Mahir Al Muaiqli).mp3"
  "public/audio/surah-an-nur/24 An-Nur (Muhmmad Ayub).mp3"
  "public/audio/surah-al-furqan/25 Al-Furqan (Muhmmad Jibreel).mp3"
)

for f in "${FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "Skip (not found): $f"
    continue
  fi
  dir=$(dirname "$f")
  base=$(basename "$f" .mp3)
  tmp="$dir/${base}-compressed.mp3"
  echo "Compressing: $f"
  ffmpeg -y -i "$f" -vn -ar 44100 -ac 2 -b:a 64k "$tmp" 2>/dev/null
  mv "$tmp" "$f"
  echo "  Done → $(ls -lh "$f" | awk '{print $5}')"
done

echo "All done."
