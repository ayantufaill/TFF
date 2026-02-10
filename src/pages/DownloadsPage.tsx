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

function BookCover({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const url = getCoverUrl(src);
  if (failed) {
    return (
      <div className="w-full h-full rounded-lg bg-[#C9A961]/15 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-[#C9A961]" />
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      width={56}
      height={80}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

const BOOK_DOWNLOADS = [
  {
    title: 'Light of Faith',
    file: '/books/light-of-faith.pdf',
    tag: 'Start here',
    note: 'Gentle introduction to iman, hope and trust in Allah — ideal first read.',
    cover: 'books/covers/1.png',
  },
  {
    title: 'The New Muslims Guide',
    file: '/books/the-new-muslim-guide.pdf',
    tag: 'New Muslim',
    note: 'Step‑by‑step help for new reverts: the basics of belief, prayer and daily life.',
    cover: 'books/covers/2.png',
  },
  {
    title: 'Living Islam',
    file: '/books/living-islam.pdf',
    tag: 'Daily life',
    note: 'Shows how Islam beautifully shapes work, family, and personal routines.',
    cover: 'books/covers/3.png',
  },
  {
    title: 'Bow Before Allah',
    file: '/books/bow-before-allah.pdf',
    tag: 'Salah',
    note: 'Explains the meaning of salah, its movements and how to build khushu‘.',
    cover: 'books/covers/4.png',
  },
  {
    title: 'The Final Messenger ﷺ',
    file: '/books/the-final-messenger.pdf',
    tag: 'Seerah',
    note: 'Key events and lessons from the life of the Prophet ﷺ, made easy to follow.',
    cover: 'books/covers/5.png',
  },
  {
    title: 'The Gateway to Quran',
    file: '/books/the-gateway-to-quran.pdf',
    tag: 'Qur’an',
    note: 'A simple doorway into reading, understanding and reflecting on the Qur’an.',
    cover: 'books/covers/6.png',
  },
  {
    title: 'The Muslim Lifestyle',
    file: '/books/the-muslim-lifestyle.pdf',
    tag: 'Character',
    note: 'Covers manners, habits and routines for a balanced prophetic lifestyle.',
    cover: 'books/covers/7.png',
  },
  {
    title: 'Purification of Heart',
    file: '/books/purification-of-heart.pdf',
    tag: 'Tazkiyah',
    note: 'Talks about envy, arrogance, showing off and how to clean the heart from them.',
    cover: 'books/covers/8.png',
  },
  {
    title: 'Walking Together (Marriage and Community)',
    file: '/books/walking-together-marriage-and-community.pdf',
    tag: 'Family',
    note: 'Guidance for marriage, family ties and building a healthy Muslim community.',
    cover: 'books/covers/9.png',
  },
  {
    title: 'The Struggle Ends',
    file: '/books/the-struggle-ends.pdf',
    tag: 'Hope',
    note: 'Reminds the reader that every difficulty has an end, with sabr and tawakkul.',
    cover: 'books/covers/10.png',
  },
  {
    title: 'Islamic Manners',
    file: '/books/islamic-manners.pdf',
    tag: 'Manners',
    note: 'Practical etiquette with parents, guests, neighbours and the wider community.',
    cover: 'books/covers/11.png',
  },
  {
    title: 'Knowledge and Purpose',
    file: '/books/knowledge-and-purpose.pdf',
    tag: 'Purpose',
    note: 'Explains why we seek Islamic knowledge and how it gives direction to life.',
    cover: 'books/covers/12.png',
  },
  {
    title: 'Ramadan Made Easy',
    file: '/books/ramadan-made-easy.pdf',
    tag: 'Ramadan',
    note: 'Simple tips and checklists to prepare for, enjoy and benefit from Ramadan.',
    cover: 'books/covers/13.png',
  },
];

export function DownloadsPage() {
  return (
    <div className="min-h-[60vh] px-4 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C5F2D] mb-3 tracking-tight">
            Downloads
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Free, ready‑to‑use PDFs for new Muslims and families. Click the title to preview, or use
            the download button to save it.
          </p>
        </div>

        <div className="bg-white/80 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-gray-200/70 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {BOOK_DOWNLOADS.map((book) => (
              <div
                key={book.file}
                className="group flex items-start justify-between gap-3 rounded-xl border border-gray-200/80 bg-white/90 px-3 py-3 sm:px-4 sm:py-4 hover:border-[#C9A961]/60 hover:shadow-[0_10px_24px_rgba(44,95,45,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 sm:w-14 sm:h-20 rounded-lg overflow-hidden bg-[#C9A961]/10 flex-shrink-0 flex items-center justify-center">
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
                <a
                  href={book.file}
                  download
                  className="mt-1 inline-flex items-center justify-center rounded-full border border-[#C9A961]/70 bg-[#C9A961]/10 px-3 py-1 text-xs sm:text-[13px] font-medium text-[#2C5F2D] hover:bg-[#C9A961]/20 hover:border-[#C9A961] transition-colors whitespace-nowrap"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

