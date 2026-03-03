# FFmpeg se audio compress karke public/audio/ mein save karta hai (Windows).
# Pehle: Drive se file download karo ("Download anyway").
# PowerShell: .\scripts\compress-playlist-audio.ps1 "C:\path\to\2 Al-Baqarah (Abdul Basit Abdul Samad).mp3"

param([Parameter(Mandatory=$true)] [string]$InputPath)

$OutDir = Join-Path $PSScriptRoot "..\public\audio\surah-al-baqarah"
$OutFile = Join-Path $OutDir "abdul-basit-abdul-samad.mp3"

if (!(Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "FFmpeg nahi mila. Download: https://ffmpeg.org/download.html"
  exit 1
}

if (!(Test-Path $InputPath)) {
  Write-Host "File nahi mili: $InputPath"
  exit 1
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Write-Host "Compress ho raha hai (128 kbps)..."
& ffmpeg -y -i $InputPath -b:a 128k $OutFile
Write-Host "Done. Saved: $OutFile"
