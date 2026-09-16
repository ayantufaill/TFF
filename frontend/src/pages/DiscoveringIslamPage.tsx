import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  Sparkles,
  Sun,
  Scale,
  CalendarDays,
  MapPin,
  BookOpen,
  Users,
  ScrollText,
  Moon,
  Compass,
  MessageCircleQuestion,
  Heart,
  HandHeart,
  PlayCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { submitMentorRequest } from '../services/mentorRequestService';
import '../styles/premium-home.css';
import heroImg from '../assets/home/impact-widows.jpg';
import communityImg from '../assets/home/gallery-1.jpg';
import learningImg from '../assets/home/gallery-2.jpg';
import patternBg from '../assets/home/pattern-bg.jpg';

const PILLARS = [
  { arabic: 'الشهادة', term: 'Shahada', translation: 'Declaration of Faith', icon: Heart, description: 'Bearing witness that there is no god worthy of worship but Allah, and Muhammad ﷺ is His Messenger — the gateway into Islam.' },
  { arabic: 'الصلاة', term: 'Salah', translation: 'Prayer', icon: Sun, description: 'Five daily prayers that pause the day for remembrance, gratitude, and a direct connection with Allah.' },
  { arabic: 'الزكاة', term: 'Zakat', translation: 'Charity', icon: Scale, description: 'Giving a portion of one’s wealth to those in need — purifying wealth and strengthening community.' },
  { arabic: 'الصوم', term: 'Sawm', translation: 'Fasting in Ramadan', icon: CalendarDays, description: 'Fasting from dawn to sunset during Ramadan, building self-discipline and empathy for those who go without.' },
  { arabic: 'الحج', term: 'Hajj', translation: 'Pilgrimage', icon: MapPin, description: 'A once-in-a-lifetime pilgrimage to Makkah for those who are able — a journey of unity and devotion.' },
];

const ARTICLES = [
  { arabic: 'الله', term: 'Allah', icon: Sparkles, description: 'Belief in One God — without partners, without equals.' },
  { arabic: 'الملائكة', term: 'The Angels', icon: Moon, description: 'Belief in beings created by Allah to carry out His command.' },
  { arabic: 'الكتب', term: 'The Books', icon: BookOpen, description: 'Belief in the scriptures revealed by Allah, including the Qur’an.' },
  { arabic: 'الرسل', term: 'The Prophets', icon: Users, description: 'Belief in every messenger sent by Allah, from Adam to Muhammad ﷺ.' },
  { arabic: 'اليوم الآخر', term: 'The Day of Judgment', icon: ScrollText, description: 'Belief that this life ends and every soul answers for it.' },
  { arabic: 'القدر', term: 'Divine Decree', icon: Compass, description: 'Belief that all things unfold by Allah’s knowledge and wisdom.' },
];

const JOURNEY = [
  { title: 'Curiosity & Questions', body: 'You start with questions — about God, purpose, or Islam itself. We meet you with patience, not pressure, and answer honestly.' },
  { title: 'Learning & Conversation', body: 'One-on-one conversations, free books, and daily reflections help you explore at your own pace, in your own time.' },
  { title: 'Meeting the Community', body: 'You’re welcomed into gatherings, halaqas, and iftars — meeting real people who once stood exactly where you stand now.' },
  { title: 'Taking Shahada', body: 'When you’re ready — and only when you’re ready — we support you in making the declaration of faith, witnessed with warmth, not spectacle.' },
  { title: 'Ongoing Support & Mentorship', body: 'Your journey continues. A mentor, a community, and real resources stay with you long after your first day.' },
];

const SUPPORT_PROGRAMS = [
  { title: 'One-on-One Mentorship', description: 'Paired with a caring, knowledgeable mentor for honest conversations, at your pace and never with judgment.', icon: HandHeart },
  { title: 'Community Iftars & Gatherings', description: 'Regular gatherings and iftars where you’ll meet others walking the same path and feel embraced by community.', icon: Users },
  { title: 'Starter Resource Kit', description: 'Free books and guides — including The New Muslim Guide — to help you learn clearly, at your own pace.', icon: BookOpen },
  { title: 'Ongoing Halaqas', description: 'Regular study circles and recorded sessions, so your learning never has to stop between visits.', icon: PlayCircle },
];

const FAQS = [
  { q: 'Do I have to change my name?', a: 'No. Changing your name is entirely optional and a personal choice, not a requirement. Some new Muslims choose a name with a meaning they connect with; many simply keep their given name. There is no right answer — only your own.' },
  { q: 'What happens after I take Shahada?', a: 'Nothing outward changes in an instant except your intention before Allah. What does happen is that you’re no longer walking alone: we pair you with a mentor, welcome you into our community, and continue learning alongside you at whatever pace feels right.' },
  { q: 'Will I lose my family or friends?', a: 'We won’t pretend this is never hard — some relationships take time to adjust, and that’s a real part of many people’s journeys. What we can promise is that you won’t navigate it alone. Our mentors have walked this path and are there to support those conversations with you.' },
  { q: 'Do I need to know Arabic to practice Islam?', a: 'No. You can learn and pray in your own language from day one. Arabic phrases used in prayer are learned gradually, with patient support from a mentor — never all at once, and never as a barrier to starting.' },
  { q: 'How soon do I have to start praying five times a day?', a: 'There is no deadline and no pressure. Faith is built one habit at a time. Your mentor will help you build toward the five daily prayers gradually, celebrating each step rather than expecting perfection from the first day.' },
  { q: 'Is there a formal process to become Muslim?', a: 'It’s simpler than many expect: a sincere declaration of faith, the Shahada, is all that’s required. There’s no paperwork and no gatekeeping. When you’re ready, we’re glad to help you take that step in a way that feels warm and personal to you.' },
  { q: 'What if I still have doubts or questions after taking Shahada?', a: 'That’s completely normal. Faith is a journey, not a single moment — questions are part of it, not a failure of it. Your mentor and our community remain available to you for as long as you need, with no question considered too small.' },
];

function useDiscoveringIslamSEO() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Discovering Islam | The Two Fingers Foundation';

    const origin = window.location.origin;
    const url = `${origin}/discovering-islam`;
    const description =
      'Curious about Islam or newly Muslim? The Two Fingers Foundation walks alongside you with warmth and without pressure — mentorship, community, and real answers.';

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prevContent = el.getAttribute('content');
      el.setAttribute('content', content);
      return { el, created, prevContent };
    };

    const metaEntries = [
      upsertMeta('name', 'description', description),
      upsertMeta('property', 'og:title', 'Discovering Islam | The Two Fingers Foundation'),
      upsertMeta('property', 'og:description', description),
      upsertMeta('property', 'og:url', url),
      upsertMeta('property', 'og:type', 'website'),
      upsertMeta('property', 'og:image', `${origin}/logo.png`),
    ];

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    const prevCanonicalHref = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    return () => {
      document.title = prevTitle;
      metaEntries.forEach(({ el, created, prevContent }) => {
        if (created) el.remove();
        else if (prevContent !== null) el.setAttribute('content', prevContent);
      });
      if (canonical) {
        if (canonicalCreated) canonical.remove();
        else if (prevCanonicalHref !== null) canonical.setAttribute('href', prevCanonicalHref);
      }
    };
  }, []);
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.35a9.96 9.96 0 0 0 4.91 1.29h.01c5.52 0 10-4.48 10-10s-4.48-9.94-10.01-9.94Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.05.8.81-2.97-.2-.3a8.19 8.19 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.19-8.27 8.19Zm4.52-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

const initialMentorForm = { name: '', contact: '', message: '' };

export function DiscoveringIslamPage() {
  useDiscoveringIslamSEO();

  const [form, setForm] = useState(initialMentorForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const updateField = (field: keyof typeof initialMentorForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      await submitMentorRequest(form);
      setStatus('success');
      setForm(initialMentorForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* ================= Hero ================= */}
      <section className="relative isolate overflow-hidden bg-tff-navy-gradient pt-32 pb-24 text-white md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '480px' }}
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-tff-gold/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 right-0 -z-10 h-[340px] w-[340px] rounded-full bg-tff-gold/15 blur-3xl"
        />

        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-tff-gold/40 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-tff-gold-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tff-gold" />
              Discovering Islam
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">
              Every Journey to Faith Begins With{' '}
              <span className="italic text-tff-gold-soft">a Single Question.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Whatever brought you here — curiosity, a question, or a decision already in your
              heart — The Two Fingers Foundation walks alongside you with warmth, patience, and
              no pressure at all.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-tff-gold-gradient px-6 py-3.5 font-semibold text-tff-navy-deep shadow-tff-gold">
                Discover Islam
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-tff-elegant">
                <img
                  src={heroImg}
                  alt="A woman quietly focused on her work, a moment of calm reflection"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tff-navy-deep/60 via-transparent to-transparent" />
              </div>
              <div className="glass-dark absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-4 md:left-8 md:right-8">
                <p className="text-xs uppercase tracking-widest text-tff-gold-soft">Your Journey</p>
                <p className="mt-1 font-display text-xl text-white">Curiosity. Guidance. Community.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= What Is Islam ================= */}
      <section id="what-is-islam" className="py-20 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">What Is Islam</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
              A faith of <span className="italic text-tff-navy/60">submission and peace.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-500">
              <p>
                Islam means submission to the One God — Allah — in peace. Muslims believe Allah
                created the universe, sent guidance through prophets across history, and that
                every life has a purpose: to worship Him, to do good, and to prepare for what
                comes after.
              </p>
              <p>
                It isn’t a faith of extremes. Islam asks for sincerity, not perfection — a
                heart turned toward its Creator, lived out in honesty, mercy, and care for
                others.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-tff-elegant">
              <img
                src={learningImg}
                alt="Children learning together in a classroom, hands raised"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">A Way of Life</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
              Community, <span className="italic text-tff-navy/60">not isolation.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-500">
              <p>
                Islam is built on clarity, mercy, and balance — and it is never meant to be
                walked alone. Whether you are simply curious or already certain in your heart,
                you are welcomed into a real community of people who will stand beside you.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-tff-elegant">
              <img
                src={communityImg}
                alt="Volunteers and community members supporting one another"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Five Pillars ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">The Foundation of Practice</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                The Five Pillars <span className="italic text-tff-navy/60">of Islam.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.term} delay={(i % 5) * 80} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                <div className="group hover-lift relative h-full overflow-hidden rounded-3xl border border-tff-navy/10 bg-white p-8">
                  <span className="glass-card grid h-14 w-14 place-items-center rounded-2xl text-tff-gold shadow-tff-soft">
                    <pillar.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-arabic text-2xl text-tff-navy">{pillar.arabic}</p>
                  <h3 className="mt-1 font-display text-xl text-tff-navy">{pillar.term}</h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-tff-gold">{pillar.translation}</p>
                  <div className="mt-4 divider-gold" />
                  <p className="mt-4 leading-relaxed text-gray-500">{pillar.description}</p>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-tff-gold/10 transition-all duration-500 group-hover:scale-125"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Six Articles of Faith ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">The Foundation of Belief</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                The Six Articles <span className="italic text-tff-navy/60">of Faith.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article, i) => (
              <Reveal key={article.term} delay={(i % 3) * 80}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tff-navy/10 bg-white p-8 hover-lift">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-tff-gold/10 text-tff-gold">
                    <article.icon className="h-5 w-5" />
                  </span>
                  <p dir="rtl" lang="ar" className="mt-5 font-arabic text-2xl leading-[1.9] text-tff-navy">
                    {article.arabic}
                  </p>
                  <p className="mt-3 text-sm italic text-tff-navy/60">{article.term}</p>
                  <div className="mt-4 divider-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{article.description}</p>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-tff-gold/10 transition-all duration-500 group-hover:scale-125"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Your Journey ================= */}
      <section className="relative isolate overflow-hidden bg-tff-navy-gradient py-20 text-white md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '480px' }}
        />
        <div
          aria-hidden
          className="absolute -top-24 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-tff-gold/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px] rounded-full bg-tff-gold/15 blur-3xl"
        />

        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold-soft">Your Journey</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                What walking this path <span className="italic text-white/70">actually looks like.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 space-y-10 md:space-y-0">
            <ol className="relative md:grid md:grid-cols-5 md:gap-6">
              <div aria-hidden className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-tff-gold/40 to-transparent md:block md:left-0 md:right-0 md:top-5 md:h-px md:w-full md:bg-gradient-to-r" />
              {JOURNEY.map((step, i) => (
                <li key={step.title} className="relative">
                  <Reveal delay={i * 100}>
                    <div className="flex gap-5 md:block md:pt-14">
                      <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tff-gold-gradient font-display text-lg font-semibold text-tff-navy-deep shadow-tff-gold md:absolute md:left-0 md:top-0">
                        {i + 1}
                      </span>
                      <div className="glass-dark rounded-2xl p-5 md:p-6">
                        <h3 className="font-display text-lg text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= Shahada Spotlight ================= */}
      <section className="relative overflow-hidden bg-tff-cream py-24 md:py-36">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '520px' }}
        />
        <div className="container-page relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">The Declaration of Faith</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-tff-navy md:text-4xl">
                The Shahada
              </h2>
              <div className="mx-auto mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-tff-gold/50" />
                <span className="text-tff-gold">✦</span>
                <span className="h-px w-10 bg-tff-gold/50" />
              </div>

              <p className="font-arabic mt-10 text-3xl leading-[2.2] text-tff-navy md:text-4xl" dir="rtl" lang="ar">
                أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ
              </p>
              <p className="mt-6 italic text-gray-500">
                Ash-hadu al-la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah.
              </p>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-gray-600">
                "I bear witness that there is no god worthy of worship except Allah, and I bear
                witness that Muhammad is the Messenger of Allah."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= New Muslim Support Program ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Support Program</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                You won’t walk this <span className="italic text-tff-navy/60">alone.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_PROGRAMS.map((program, i) => (
              <Reveal key={program.title} delay={(i % 4) * 100}>
                <div className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-tff-navy/10 bg-white">
                  <div className="flex h-32 items-center justify-center bg-tff-gold/5">
                    <program.icon className="h-8 w-8 text-tff-gold" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg text-tff-navy">{program.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{program.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Common Questions</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Real questions, <span className="italic text-tff-navy/60">answered personally.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                Tap any question to send it straight to us on WhatsApp — we'll answer you directly.
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="mx-auto mt-12 max-w-3xl divide-y divide-tff-navy/10 rounded-[28px] border border-tff-navy/10 bg-white px-6 shadow-tff-soft md:px-10">
              {FAQS.map((faq) => (
                <div key={faq.q} className="flex items-center justify-between gap-4 py-6">
                  <span className="flex items-start gap-3 font-display text-lg text-tff-navy">
                    <MessageCircleQuestion className="mt-1 h-5 w-5 shrink-0 text-tff-gold" />
                    {faq.q}
                  </span>
                  <a
                    href={`https://wa.me/923454491979?text=${encodeURIComponent(`Hello, I'm reaching out via The Two Fingers Foundation website (Discovering Islam page) regarding the following question:\n\n"${faq.q}"\n\nI would appreciate your response. Thank you.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask us on WhatsApp: ${faq.q}`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Cross-link band =================
      <section className="border-y border-tff-navy/10 bg-white py-14">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:gap-14">
              <Link to="/playlist" className="group flex items-center gap-2 text-tff-navy transition-colors hover:text-tff-gold">
                <PlayCircle className="h-5 w-5 text-tff-gold" />
                <span className="font-medium">Watch and listen</span>
              </Link>
              <span className="hidden h-6 w-px bg-tff-navy/10 sm:block" aria-hidden />
              <Link to="/downloads" className="group flex items-center gap-2 text-tff-navy transition-colors hover:text-tff-gold">
                <BookOpen className="h-5 w-5 text-tff-gold" />
                <span className="font-medium">Read and learn</span>
              </Link>
              <span className="hidden h-6 w-px bg-tff-navy/10 sm:block" aria-hidden />
              <Link to="/articles" className="group flex items-center gap-2 text-tff-navy transition-colors hover:text-tff-gold">
                <ScrollText className="h-5 w-5 text-tff-gold" />
                <span className="font-medium">Real stories</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      ================= Final CTA =================
      <section id="mentor-form" className="bg-tff-navy-gradient py-20 text-white md:py-32">
        <div className="container-page grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold-soft">Let’s Talk</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Ready when <span className="italic text-white/70">you are.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              No question is too small, and there is no pressure to decide anything today. Leave
              your details and a mentor will reach out to you personally.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="glass-dark rounded-[28px] p-8">
              {status === 'success' ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-tff-gold-soft" />
                  <h3 className="font-display text-xl text-white">JazakAllah Khair!</h3>
                  <p className="mt-2 text-white/70">
                    We’ve received your message. A mentor will reach out to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="mentor-name" className="text-white/90">Name *</Label>
                    <Input
                      id="mentor-name"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-contact" className="text-white/90">Email or WhatsApp *</Label>
                    <Input
                      id="mentor-contact"
                      value={form.contact}
                      onChange={(e) => updateField('contact', e.target.value)}
                      placeholder="you@example.com or +1 555 000 0000"
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-message" className="text-white/90">Message (optional)</Label>
                    <Textarea
                      id="mentor-message"
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Share as much or as little as you’d like"
                      rows={3}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-300">Please fill in your name and a way to reach you.</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-full bg-tff-gold-gradient py-6 text-sm font-semibold text-tff-navy-deep hover:opacity-90"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Speak With a Mentor'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      */}
    </div>
  );
}
