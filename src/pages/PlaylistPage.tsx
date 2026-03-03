import { useRef, useState, useCallback } from 'react';
import { Play, Pause, Download } from 'lucide-react';

/* One audio per Surah, each from a different Qari.
 * Add your audio file in public/audio/surah-al-baqarah/ and set audioSrc.
 * For download before upload: use downloadUrl (e.g. Google Drive direct link). */
const DRIVE_AL_FATIHAH_ID = '15vZd-IpDYFia-YmbnOCneDFDmPNGx8oh';
const DRIVE_AL_BAQARAH_ID = '1LjCPDmsdyyu28G3Kp3rKB8hCP6PvP3nI';

const FALLBACK_SAMPLE_URL = 'https://raw.githubusercontent.com/mathiasbynens/small/master/mp3.mp3';

const RECITATIONS = [
  {
    id: 'al-fatihah-islam-sobhi',
    surahName: 'Surah Al-Fatihah',
    qariName: 'Islam Sobhi',
    qariImage: '/audio/surah-al-fatihah/islam-sobhi.png',
    audioSrc: '/audio/surah-al-fatihah/islam-sobhi.mp3',
  },
  {
    id: 'al-baqarah-abdul-basit',
    surahName: 'Surah Al-Baqarah',
    qariName: 'Abdul Basit Abdul Samad',
    qariImage: '/audio/surah-al-baqarah/abdul-basit.png',
    audioSrc: '/audio/surah-al-baqarah/abdul-basit-abdul-samad.mp3',
  },
  {
    id: 'al-imran-m-siddiq-al-manshawi',
    surahName: 'Surah Al-Imran',
    qariName: 'M. Siddiq Al-Manshawi',
    qariImage: '/audio/surah-al-imran/m-siddiq-al-manshawi.png',
    audioSrc: '/audio/surah-al-imran/m-siddiq-al-manshawi.mp3',
    // downloadUrl optional: agar Drive link ho to yahan add karein
  },
  {
    id: 'an-nisa-mahmood-ali-al-banna',
    surahName: 'Surah An-Nisa',
    qariName: 'Mahmood Ali Al Banna',
    qariImage: '/audio/surah-an-nisa/mahmood-ali-al-banna.png',
    audioSrc: '/audio/surah-an-nisa/mahmood-ali-al-banna.mp3',
    // downloadUrl optional: agar Drive link ho to yahan add karein
  },
  {
    id: 'al-maidah-mehmood-al-tablawi',
    surahName: "Surah Al-Ma'idah",
    qariName: 'Mehmood Al Tablawi',
    qariImage: '/audio/surah-al-maidah/mehmood-al-tablawi.png',
    audioSrc: '/audio/surah-al-maidah/mehmood-al-tablawi.mp3',
    // downloadUrl optional: agar Drive link ho to yahan add karein
  },
  {
    id: 'al-anam-mehmood-al-hasri',
    surahName: "Surah Al-An'am",
    qariName: 'Mehmood Al Hasri',
    qariImage: '/audio/surah-al-anam/mehmood-al-hasri.png',
    audioSrc: '/audio/surah-al-anam/mehmood-al-hasri.mp3',
    // downloadUrl optional: agar Drive link ho to yahan add karein
  },
];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function RecitationCard({
  number,
  surahName,
  qariName,
  qariImage,
  audioSrc,
  downloadUrl,
}: (typeof RECITATIONS)[0] & { number: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const showImage = qariImage && !imageError;

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      setPlaying(true);
      el.play().catch(() => {
        setPlaying(false);
        setAudioError(true);
      });
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (el) setCurrentTime(el.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      setDuration(el.duration);
      if (el.src.includes('small') || el.src.includes('mathiasbynens')) setAudioError(false);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = audioRef.current;
      if (!el || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      el.currentTime = x * duration;
    },
    [duration]
  );

  const handleDownload = useCallback(() => {
    const url = downloadUrl || audioSrc;
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${qariName.replace(/\s+/g, '-')}.mp3`;
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [downloadUrl, audioSrc, qariName]);

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Title row: subtle number + Surah name */}
      <h3 className="text-lg font-bold text-[#2C5F2D] px-4 pt-4 pb-1 flex items-center justify-center gap-2">
        <span className="text-[#C9A961] font-semibold tabular-nums">{number}.</span>
        <span>{surahName}</span>
      </h3>

      {/* Qari image + name (click to play) */}
      <button
        type="button"
        onClick={togglePlay}
        className="w-full block text-left focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-inset rounded-lg"
      >
        <div className="relative aspect-square max-h-32 sm:max-h-36 mx-auto bg-gray-100">
          {showImage ? (
            <img
              src={qariImage}
              alt={qariName}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2C5F2D]/10 to-[#C9A961]/10 text-[#2C5F2D] text-2xl font-bold">
              {surahName.slice(0, 1)}
            </div>
          )}
        </div>
        <p className="text-center font-semibold text-gray-800 pt-2 pb-3 px-4">{qariName}</p>
      </button>

      {/* Play bar: left = Download, then progress + time */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-[#C9A961]/20 text-[#2C5F2D] flex items-center justify-center hover:bg-[#C9A961]/30 transition-colors"
          title="Download"
          aria-label="Download audio"
        >
          <Download className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2C5F2D] text-white flex items-center justify-center hover:bg-[#1e4620] transition-colors"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <div
            className="flex-1 min-w-0 h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#C9A961] rounded-full transition-all duration-150"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>
          <span className="flex-shrink-0 text-xs text-gray-500 tabular-nums min-w-[7rem] text-right whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => {
          if (!usingFallback) {
            setUsingFallback(true);
            setAudioError(true);
            const el = audioRef.current;
            if (el && FALLBACK_SAMPLE_URL) {
              el.src = FALLBACK_SAMPLE_URL;
              el.load();
            }
          }
        }}
      />
    </div>
  );
}

export function PlaylistPage() {
  return (
    <div className="min-h-[60vh] pb-40 sm:pb-48 lg:pb-56">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white min-h-[14rem] sm:min-h-[16rem] flex flex-col justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Playlist
          </h1>
          <div className="inline-block w-24 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-4" aria-hidden />
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            One Surah, one audio — each in a different Qari&apos;s voice. Click the image or Surah to play; use the bar to seek. Download from the left.
          </p>
        </div>
      </section>

      <div className="h-10 sm:h-14 bg-[#FAF8F4]" aria-hidden />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {RECITATIONS.map((rec, index) => (
            <RecitationCard key={rec.id} number={index + 1} {...rec} />
          ))}
        </div>
        {RECITATIONS.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No recitations added yet. Add entries to the RECITATIONS array in PlaylistPage.tsx and place audio files in public/audio/.
          </p>
        )}
      </section>
      {/* Spacer so cards don't mix with footer */}
      <div className="h-16 sm:h-20 md:h-24 bg-[#FAF8F4]" aria-hidden />
    </div>
  );
}
