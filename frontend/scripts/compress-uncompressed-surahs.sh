#!/usr/bin/env bash
# Compress ALL local playlist MP3s (surah 13 + 16–30) to 64kbps.
# Requires: ffmpeg (e.g. brew install ffmpeg). Run from project root.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

FILES=(
  "public/audio/surah-ar-ra'd/13 Ar-Ra'd (Mashaari Alafasi).mp3"
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
  "public/audio/surah-al-shu'ara/26 Ash-Shu'ara (Khalifa Al Tunaiji).mp3"
  "public/audio/surah-an-naml/27 An-Naml (Nabil Al Rafai).mp3"
  "public/audio/surah-al-qasas/28 Al-Qasas (Omer Al Qazabari).mp3"
  "public/audio/surah-al-ankabut/29 Al-Ankabut (Salah Al Budair).mp3"
  "public/audio/surah-ar-rum/30 Ar-Rum (Salaj Bukatir).mp3"
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
  mv "$f" "$dir/${base}-original.mp3"
  mv "$tmp" "$f"
  echo "  Done → $(ls -lh "$f" | awk '{print $5}')"
done

echo "All done."
