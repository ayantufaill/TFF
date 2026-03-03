# Audio files (Quran recitations)

Audio files here are used by the **Playlist** page. Each card = one Surah + one Qari (one audio per Surah, each in a different reciter’s voice).

## Where to put files

Use one folder per Surah, e.g.:

```
public/audio/surah-al-baqarah/
```

Put **one audio file per Qari** in that folder. In `src/pages/PlaylistPage.tsx` the `RECITATIONS` array links each card to an `audioSrc` (and optional `qariImage`, `downloadUrl`).

**Example for Al-Baqarah – Abdul Basit:**

- Audio: `public/audio/surah-al-baqarah/abdul-basit-abdul-samad.mp3`
- Qari photo (optional): `public/audio/surah-al-baqarah/abdul-basit.jpg`

Supported formats: MP3 (recommended), OGG, WAV, M4A.

---

## Removing the IslamicBulletin (or other) logo from the audio

If the file has embedded cover art/logo and you want a clean audio for the website:

1. **Using FFmpeg (recommended)**  
   Install [FFmpeg](https://ffmpeg.org/), then run:

   ```bash
   ffmpeg -i input_with_logo.mp3 -map 0:a -c copy -map_metadata -1 output_clean.mp3
   ```

   This keeps the audio stream and strips metadata (including embedded images). Use `output_clean.mp3` on the site.

2. **Using an audio editor**  
   Open the file in Audacity (or similar), export without cover art, or use “Metadata” / “ID3” options to remove attached pictures.

Then put the **cleaned** file in `public/audio/surah-al-baqarah/` and set `audioSrc` in `PlaylistPage.tsx` to that file path.

---

## Playlist page behaviour

- **One Surah = one audio** per card; **each audio = one Qari**.
- Card shows: Surah name (title), Qari photo, Qari name. Click on **picture or Surah name** to play/pause.
- **Play bar** under the card: **Download** on the left, then play/pause, progress bar, and time. Click the bar to seek.
- Until the file is in `public/audio/`, you can keep using a **Google Drive (or other) link** as `downloadUrl` so the Download button still works; set `audioSrc` to the site path once the cleaned file is uploaded.
