import { useState } from 'react';
import { BookOpen } from 'lucide-react';

// Build absolute URL for cover so it works in dev and with base: './'
function getCoverUrl(relativePath: string): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
  }
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return base === './' ? path : `${base.replace(/\/$/, '')}${path}`;
}

const COVER_W = 64;
const COVER_H = 85;

/** Get Google Drive direct download URL from a view/share link (one-click download). */
function getDriveDownloadUrl(viewUrl: string): string {
  const match = viewUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  return viewUrl;
}

/** Start download in a hidden iframe so no new tab or extra page appears. */
function startDownload(url: string, onStarted?: () => void) {
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('sandbox', 'allow-downloads'); // stop Drive from redirecting our page
  document.body.appendChild(iframe);
  iframe.src = url;
  onStarted?.();
  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch {
      // already removed
    }
  }, 3000);
}

function BookCover({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const url = getCoverUrl(src);
  if (failed) {
    return (
      <div className="rounded-lg bg-[#C9A961]/15 flex items-center justify-center flex-shrink-0" style={{ width: COVER_W, height: COVER_H }}>
        <BookOpen className="w-5 h-5 text-[#C9A961]" />
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      width={COVER_W}
      height={COVER_H}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover rounded-lg flex-shrink-0"
      style={{ width: COVER_W, height: COVER_H }}
      onError={() => setFailed(true)}
    />
  );
}

const BOOK_DOWNLOADS = [
  {
    title: 'Light of Faith',
    file: 'https://drive.google.com/file/d/1M9bi34Rc6_moPbppjDD2l98hcSmQjyYg/view?usp=drive_link',
    tag: 'Start here',
    note: 'Gentle introduction to iman, hope and trust in Allah — ideal first read.',
    cover: 'covers/1.png',
  },
  {
    title: 'The New Muslims Guide',
    file: 'https://drive.google.com/file/d/13gbIDTvL7DjZ_TOzkqXXo-Ps5DHSokGD/view?usp=drive_link',
    tag: 'New Muslim',
    note: 'Step‑by‑step help for new reverts: the basics of belief, prayer and daily life.',
    cover: 'covers/2.png',
  },
  {
    title: 'Living Islam',
    file: 'https://drive.google.com/file/d/1YOZ5o4VWeWTBHuUKY7CStPtsC68zOoaK/view?usp=drive_link',
    tag: 'Daily life',
    note: 'Shows how Islam beautifully shapes work, family, and personal routines.',
    cover: 'covers/3.png',
  },
  {
    title: 'Bow Before Allah',
    file: 'https://drive.google.com/file/d/1jdHtlhrfRtAdNlgTe2LhmQsH2aesRjHl/view?usp=drive_link',
    tag: 'Salah',
    note: 'Explains the meaning of salah, its movements and how to build khushu‘.',
    cover: 'covers/4.png',
  },
  {
    title: 'The Final Messenger ﷺ',
    file: 'https://drive.google.com/file/d/1JLkXjyulXNLGmdkct89-r-2V0AsZD7qW/view?usp=drive_link',
    tag: 'Seerah',
    note: 'Key events and lessons from the life of the Prophet ﷺ, made easy to follow.',
    cover: 'covers/5.png',
  },
  {
    title: 'The Gateway to Quran',
    file: 'https://drive.google.com/file/d/1CDHlGdiUicK-pH4UJZZLOI8gRqtfPTai/view?usp=drive_link',
    tag: 'Qur’an',
    note: 'A simple doorway into reading, understanding and reflecting on the Qur’an.',
    cover: 'covers/6.png',
  },
  {
    title: 'The Muslim Lifestyle',
    file: 'https://drive.google.com/file/d/1yudypcC8_yYXGetTgs1S07IgY8LagbTZ/view?usp=drive_link',
    tag: 'Character',
    note: 'Covers manners, habits and routines for a balanced prophetic lifestyle.',
    cover: 'covers/7.png',
  },
  {
    title: 'Purification of Heart',
    file: 'https://drive.google.com/file/d/13uHJEY1T2U0_lIVeU3DI21nvE1l99FzH/view?usp=drive_link',
    tag: 'Tazkiyah',
    note: 'Talks about envy, arrogance, showing off and how to clean the heart from them.',
    cover: 'covers/8.png',
  },
  {
    title: 'Walking Together (Marriage and Community)',
    file: 'https://drive.google.com/file/d/1XXdirVBG_ulReYf56Bua-hL-Upw3J5zS/view?usp=drive_link',
    tag: 'Family',
    note: 'Guidance for marriage, family ties and building a healthy Muslim community.',
    cover: 'covers/9.png',
  },
  {
    title: 'The Struggle Ends',
    file: 'https://drive.google.com/file/d/1ipBZf0-1x1igyHloTV_rJDx_RoaUVM09/view?usp=drive_link',
    tag: 'Hope',
    note: 'Reminds the reader that every difficulty has an end, with sabr and tawakkul.',
    cover: 'covers/10.png',
  },
  {
    title: 'Islamic Manners',
    file: 'https://drive.google.com/file/d/1RCPxd-3F94o99BMcrkYhRN3VAcBfvfoE/view?usp=drive_link',
    tag: 'Manners',
    note: 'Practical etiquette with parents, guests, neighbours and the wider community.',
    cover: 'covers/11.png',
  },
  {
    title: 'Knowledge and Purpose',
    file: 'https://drive.google.com/file/d/1FUbodc2vVhyPMMOwO3isVJo44aib7TQL/view?usp=drive_link',
    tag: 'Purpose',
    note: 'Explains why we seek Islamic knowledge and how it gives direction to life.',
    cover: 'covers/12.png',
  },
  {
    title: 'Ramadan Made Easy',
    file: 'https://drive.google.com/file/d/1FKR2L1Mt67-1lJNrzBgGMS8ScN1ba8qr/view?usp=drive_link',
    tag: 'Ramadan',
    note: 'Simple tips and checklists to prepare for, enjoy and benefit from Ramadan.',
    cover: 'covers/13.png',
  },
];

export function DownloadsPage() {
  const [preparingId, setPreparingId] = useState<string | null>(null);

  const handleDownload = (book: { file: string }) => {
    const url = getDriveDownloadUrl(book.file);
    startDownload(url, () => setPreparingId(book.file));
    setTimeout(() => setPreparingId(null), 2500);
  };

  return (
    <div className="min-h-[60vh]">
      {/* Hero – Articles jaisa green banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white shadow-[0_4px_0_0_rgba(0,0,0,0.06)] min-h-[17rem] sm:min-h-[20rem] lg:min-h-[24rem] flex flex-col justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Downloads
          </h1>
          <div className="inline-block w-24 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-5" aria-hidden />
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Click the title to preview, or use the download button to save it. Downloads may take a few seconds to start.
          </p>
        </div>
      </section>

      {/* Cream strip – green aur content ke beech */}
      <div className="h-12 sm:h-16 lg:h-20 shrink-0 bg-[#FAF8F4]" aria-hidden />

      {/* Content – cards */}
      <div className="px-4 pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-36 lg:pb-40 mb-16 sm:mb-20 lg:mb-24 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {BOOK_DOWNLOADS.map((book) => (
              <div
                key={book.file}
                className="group flex items-start justify-between gap-3 rounded-[24px] border border-gray-200/80 bg-white px-3 py-3 sm:px-4 sm:py-4 hover:border-[#C9A961]/60 hover:shadow-[0_10px_24px_rgba(44,95,45,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg overflow-hidden bg-[#C9A961]/10 flex-shrink-0 flex items-center justify-center" style={{ width: COVER_W, height: COVER_H }}>
                    {book.cover ? (
                      <BookCover src={book.cover.startsWith('/') ? book.cover : `/${book.cover}`} alt={book.title} />
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#C9A961]/15 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#C9A961]" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <a
                      href={book.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-[#2C5F2D] group-hover:text-[#1f3f21] hover:underline underline-offset-2"
                    >
                      {book.title}
                    </a>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {book.tag ? (
                        <span className="inline-flex items-center rounded-full bg-[#C9A961]/15 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#7b5b1f]">
                          {book.tag}
                        </span>
                      ) : null}
                      <span className="text-[11px] sm:text-xs text-gray-500">
                        {book.note || 'PDF download'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload(book)}
                  disabled={preparingId === book.file}
                  className="mt-1 inline-flex items-center justify-center rounded-full border border-[#C9A961]/70 bg-[#C9A961]/10 px-3 py-1 text-xs sm:text-[13px] font-medium text-[#2C5F2D] hover:bg-[#C9A961]/20 hover:border-[#C9A961] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  {preparingId === book.file ? 'Preparing…' : 'Download'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

