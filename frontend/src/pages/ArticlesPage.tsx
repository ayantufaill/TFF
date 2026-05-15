import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

const ARTICLES: { file: string; title: string; tag: string; htmlSlug?: string }[] = [
  { file: 'Article 1 (40 Ethics of Rasulluah SAW).pdf', title: '40 Ethics of Rasulullah ﷺ', tag: 'Faith & Character', htmlSlug: '40-ethics-of-rasulullah' },
  { file: 'Article 2 (Life after Death in Islam).pdf', title: 'Life after Death in Islam', tag: 'Aqeedah', htmlSlug: 'life-after-death-in-islam' },
  { file: 'Article 3 Ramadan Checklist and planner.pdf', title: 'Ramadan Checklist and Planner', tag: 'Ramadan', htmlSlug: 'ramadan-checklist-and-planner' },
  { file: 'Article 4 Life after loss.pdf', title: 'Life After Loss', tag: 'Healing', htmlSlug: 'life-after-loss' },
  { file: 'Article 5 Restoring Dignity.pdf', title: 'Restoring Dignity', tag: 'Widows', htmlSlug: 'restoring-dignity' },
  { file: 'Article 6 From Dependency to Independence.pdf', title: 'From Dependency to Independence', tag: 'Empowerment', htmlSlug: 'from-dependency-to-independence' },
  { file: 'Article 7 The Silent Struggle of Widows.pdf', title: 'The Silent Struggle of Widows', tag: 'Widows', htmlSlug: 'the-silent-struggle-of-widows' },
  { file: 'Article 8 Emotional Healing for Widows.pdf', title: 'Emotional Healing for Widows', tag: 'Healing', htmlSlug: 'emotional-healing-for-widows' },
  { file: 'Article 9 How Community Support.pdf', title: 'How Community Support Helps', tag: 'Community', htmlSlug: 'how-community-support-helps' },
  { file: 'Article 10 Education as a Second Chance.pdf', title: 'Education as a Second Chance', tag: 'Education', htmlSlug: 'education-as-a-second-chance' },
  { file: 'Article 11 Breaking Social Stigma.pdf', title: 'Breaking Social Stigma', tag: 'Community', htmlSlug: 'breaking-social-stigma' },
  { file: 'Article 12 Sustainable Livelihoods for Widows.pdf', title: 'Sustainable Livelihoods for Widows', tag: 'Widows', htmlSlug: 'sustainable-livelihoods-for-widows' },
  { file: 'Article 13 Stories of Strength.pdf', title: 'Stories of Strength', tag: 'Stories', htmlSlug: 'stories-of-strength' },
  { file: 'Article 14 Beyond Shelter Holistic Care Orphaned Children.pdf', title: 'Beyond Shelter', tag: 'Orphans & Child Welfare', htmlSlug: 'beyond-shelter-holistic-care-orphaned-children' },
  { file: 'Article 15 Every Child Deserves a Future.pdf', title: 'Every Child Deserves a Future', tag: 'Orphans & Child Welfare', htmlSlug: 'every-child-deserves-a-future-reality-orphaned-children' },
  { file: 'Article 16 Importance of Education Breaking Cycle Poverty Orphans.pdf', title: 'The Importance of Education', tag: 'Orphans & Child Welfare', htmlSlug: 'importance-of-education-breaking-cycle-poverty-orphans' },
  { file: 'Article 17 Sponsoring an Orphan.pdf', title: 'Sponsoring an Orphan', tag: 'Orphans & Child Welfare', htmlSlug: 'sponsoring-an-orphan-how-one-act-can-change-lifetime' },
  { file: 'Article 18 Psychological Wellbeing of Orphans.pdf', title: 'Psychological Wellbeing of Orphans', tag: 'Orphans & Child Welfare', htmlSlug: 'psychological-wellbeing-orphans-emotional-care-matters' },
  { file: 'Article 19 Nutrition Health and Growth Orphans.pdf', title: 'Nutrition, Health, and Growth', tag: 'Orphans & Child Welfare', htmlSlug: 'nutrition-health-growth-meeting-basic-needs-orphans' },
  { file: 'Article 20 Mentorship Programs Orphan Development.pdf', title: 'Mentorship Programs', tag: 'Orphans & Child Welfare', htmlSlug: 'mentorship-programs-impact-orphan-development' },
  { file: 'Article 21 Protecting Orphans from Exploitation and Neglect.pdf', title: 'Protecting Orphans from Exploitation and Neglect', tag: 'Orphans & Child Welfare', htmlSlug: 'protecting-orphans-exploitation-neglect' },
  { file: 'Article 22 Community-Based Care Models for Orphan.pdf', title: 'Community-Based Care Models for Orphans', tag: 'Orphans & Child Welfare', htmlSlug: 'community-based-care-models-orphans' },
  { file: 'Article 23 Success Stories Orphans.pdf', title: 'Success Stories: Orphans', tag: 'Orphans & Child Welfare', htmlSlug: 'success-stories-orphans' },
];

function getArticleDisplayUrl(article: (typeof ARTICLES)[0]): string {
  if (article.htmlSlug) return `/articles/${article.htmlSlug}.html`;
  return `/articles/${encodeURIComponent(article.file)}`;
}
function getPdfUrl(article: (typeof ARTICLES)[0]): string {
  return `/articles/${encodeURIComponent(article.file)}`;
}

export function ArticlesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="min-h-[60vh] pb-40 sm:pb-48 lg:pb-56">
      {/* Hero-style header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] text-white shadow-[0_4px_0_0_rgba(0,0,0,0.06)] min-h-[17rem] sm:min-h-[20rem] lg:min-h-[24rem] flex flex-col justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Articles
          </h1>
          <div className="inline-block w-24 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-5" aria-hidden />
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Click a title to read the full article below. Only one article is open at a time.
          </p>
        </div>
      </section>

      {/* Cream strip – green aur cards ke beech; upar wala colour */}
      <div className="h-12 sm:h-16 lg:h-20 shrink-0 bg-[#FAF8F4]" aria-hidden />

      {/* Accordion list – zyada top/bottom padding taake pehla card green se, last card footer se alag rahe */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-36 lg:pb-44" id="articles-list">
        <div
          className="absolute inset-0 opacity-[0.98]"
          style={{
            backgroundImage: 'linear-gradient(165deg, #FAF8F4 0%, #F6F3ED 25%, #F9F7F2 50%, #F4F1EA 75%, #F2EFE7 100%)',
          }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-[#C9A961]/50 to-[#8B7355]/40 z-10" aria-hidden />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 sm:space-y-3">
            {ARTICLES.map((article, index) => {
              const isOpen = openIndex === index;
              const displayUrl = getArticleDisplayUrl(article);
              // const pdfUrl = getPdfUrl(article); // uncomment when enabling Download PDF
              const hasHtml = Boolean(article.htmlSlug);
              return (
                <article
                  key={article.file}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'border-[#C9A961]/60 bg-white shadow-[0_8px_24px_rgba(44,95,45,0.12)] ring-1 ring-[#C9A961]/20'
                      : 'border-gray-200/80 bg-white/90 hover:border-[#C9A961]/30 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                    }`}
                >
                  {/* Clickable title row – pushes content down when open */}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center gap-3 sm:gap-4 text-left px-4 sm:px-5 py-4 sm:py-5 focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-inset rounded-xl"
                    aria-expanded={isOpen}
                    aria-controls={`article-panel-${index}`}
                    id={`article-trigger-${index}`}
                  >
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${isOpen ? 'bg-[#C9A961]/20 text-[#C9A961]' : 'bg-[#C9A961]/10 text-[#C9A961]'
                        }`}
                      aria-hidden
                    >
                      <FileText className="w-5 h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block text-[11px] sm:text-xs font-semibold text-[#7b5b1f] bg-[#C9A961]/15 rounded-full px-2 py-0.5 mb-1.5">
                        {article.tag}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[#1B2A4A] leading-snug">
                        {article.title}
                      </h2>
                    </div>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isOpen ? 'bg-[#C9A961]/15 text-[#C9A961]' : 'bg-gray-100 text-gray-500'
                        }`}
                      aria-hidden
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {/* Dropdown/accordion panel – full article (PDF viewer) */}
                  <div
                    id={`article-panel-${index}`}
                    role="region"
                    aria-labelledby={`article-trigger-${index}`}
                    hidden={!isOpen}
                    className={`border-t border-gray-200/80 ${isOpen ? 'block' : 'hidden'}`}
                  >
                    <div className="p-2 sm:p-3 bg-[#FAFAF9]">
                      <div className="rounded-lg overflow-hidden border border-gray-200/80 bg-white shadow-inner min-h-[1000px]">
                        <iframe
                          title={article.title}
                          src={displayUrl}
                          className="w-full border-0"
                          style={{ height: '1000px', minHeight: '1000px' }}
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={displayUrl}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] hover:text-[#C9A961] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-offset-2 rounded-lg px-3 py-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          {hasHtml ? 'Open full article (page)' : 'Open full article'}
                        </a>
                        {/* Download PDF – commented for now
                        {hasHtml && (
                          <a
                            href={pdfUrl}
                            download
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1B2A4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-offset-2 rounded-lg px-3 py-1.5"
                          >
                            Download PDF
                          </a>
                        )}
                        */}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cream strip – last article aur footer ke beech; upar wala colour */}
      <div className="h-12 sm:h-16 lg:h-20 shrink-0 bg-[#FAF8F4]" aria-hidden />
    </div>
  );
}
