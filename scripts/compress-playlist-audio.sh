#!/bin/bash
# FFmpeg se audio compress karke public/audio/ mein save karta hai.
# Pehle: Drive se file download karo ("Download anyway") aur is script ko path do.
#
# Use:
#   chmod +x scripts/compress-playlist-audio.sh
#   ./scripts/compress-playlist-audio.sh "/path/to/2 Al-Baqarah (Abdul Basit Abdul Samad).mp3"
#
# Ya file ko project ke root par rakho aur:
#   ./scripts/compress-playlist-audio.sh "2 Al-Baqarah (Abdul Basit Abdul Samad).mp3"

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INPUT="${1:-}"
OUT_DIR="$SCRIPT_DIR/../public/audio/surah-al-baqarah"
OUT_FILE="$OUT_DIR/abdul-basit-abdul-samad.mp3"

# Prefer project's downloaded FFmpeg (Mac), else system ffmpeg
if [ -x "$SCRIPT_DIR/ffmpeg-darwin/ffmpeg" ]; then
  FFMPEG="$SCRIPT_DIR/ffmpeg-darwin/ffmpeg"
elif command -v ffmpeg &> /dev/null; then
  FFMPEG="ffmpeg"
else
  echo "FFmpeg nahi mila. Run: curl -L -o scripts/ffmpeg-darwin/ffmpeg.zip https://evermeet.cx/ffmpeg/getrelease/ffmpeg/zip && unzip -o scripts/ffmpeg-darwin/ffmpeg.zip -d scripts/ffmpeg-darwin/"
  exit 1
fi

if [ -z "$INPUT" ]; then
  echo "Usage: $0 <path-to-downloaded-mp3>"
  echo "Example: $0 ~/Downloads/2\ Al-Baqarah\ \(Abdul\ Basit\ Abdul\ Samad\).mp3"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "File nahi mili: $INPUT"
  echo "Pehle Drive se download karo (Download anyway), phir path do."
  exit 1
fi

mkdir -p "$OUT_DIR"
echo "Compress ho raha hai (128 kbps, cover/logo hata rahe hain)..."
"$FFMPEG" -y -i "$INPUT" -vn -b:a 128k -map_metadata -1 "$OUT_FILE"
echo "Done. Saved: $OUT_FILE"
echo "Ab Playlist page refresh karo — audio yahin play hogi."
