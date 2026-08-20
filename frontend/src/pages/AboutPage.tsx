import { Link } from 'react-router';
import { Reveal } from '../components/Reveal';
import '../styles/premium-home.css';
import heroImg from '../assets/home/about-hero.jpg';
import whoWeAreImg from '../assets/home/about-who-we-are.jpg';
import patternBg from '../assets/home/pattern-bg.jpg';

const VALUES = [
  {
    title: 'Faith-Centered Service',
    description: 'Every initiative is grounded in sincerity, accountability, and Islamic ethics.',
  },
  {
    title: 'Dignity Before Dependency',
    description: 'We prioritize empowerment over short-term relief.',
  },
  {
    title: 'Knowledge with Purpose',
    description: 'Education is the foundation of personal and community development.',
  },
  {
    title: 'Transparency & Trust',
    description: 'We maintain integrity in operations, finances, and partnerships.',
  },
  {
    title: 'Compassion in Action',
    description: 'We believe service is not optional; it is a responsibility.',
  },
  {
    title: 'Excellence',
    description: 'Committed to the highest standards in all we do.',
  },
];

const WHY_TFF = [
  {
    title: 'Structured Support, Not Random Charity',
    description:
      'Many charitable efforts provide temporary relief. TFF develops structured programs that guide beneficiaries toward long-term stability, education, and self-reliance.',
  },
  {
    title: 'Faith and Practical Development Combined',
    description:
      'We address both spiritual and material needs. Our model integrates Islamic guidance with real-world solutions, creating balanced growth.',
  },
  {
    title: 'Scalable Impact Through Education',
    description:
      'Through booklets, training programs, digital platforms, and community initiatives, TFF builds systems that expand impact beyond one-time interventions.',
  },
];

export function AboutPage() {
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
              About the Foundation
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] md:text-6xl">
              About <span className="text-tff-gold">The Two Fingers</span>{' '}
              <span className="italic text-white/70">Foundation.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Dedicated to serving humanity with compassion, dignity, and unwavering
              commitment to Islamic values.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/#programs"
                className="rounded-full bg-tff-gold-gradient px-6 py-3.5 font-semibold text-tff-navy-deep shadow-tff-gold transition-transform hover:-translate-y-0.5"
              >
                Explore Programs →
              </a>
              <Link
                to="/volunteer"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-medium text-white backdrop-blur-sm transition-colors hover:border-tff-gold hover:text-tff-gold-soft"
              >
                Volunteer With Us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-tff-elegant">
                <img src={heroImg} alt="Two hands reaching out to help one another" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-tff-navy-deep/60 via-transparent to-transparent" />
              </div>
              <div className="glass-dark absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-4 md:left-8 md:right-8">
                <p className="text-xs uppercase tracking-widest text-tff-gold-soft">Our Promise</p>
                <p className="mt-1 font-display text-xl text-white">Dignity. Faith. Community.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Who We Are ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-tff-elegant">
              <img src={whoWeAreImg} alt="Children in a classroom benefiting from education support" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Who We Are</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
              A faith-centered{' '}
              <span className="italic text-tff-navy/60">humanitarian initiative.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-500">
              <p>
                The Two Fingers Foundation (TFF) is a faith-centered humanitarian initiative
                committed to restoring dignity, strengthening communities, and guiding
                vulnerable individuals toward stability and purpose.
              </p>
              <p>
                We serve widows, orphans, and new Muslims through structured support systems
                that combine compassion with education. Our approach goes beyond temporary
                relief. We focus on empowerment, character development, and sustainable
                transformation rooted in Islamic values.
              </p>
              <p>
                TFF was established on the belief that real change requires both spiritual
                guidance and practical support. We work to build individuals who are confident
                in faith, equipped with knowledge, and supported by community.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Mission & Vision ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Mission &amp; Vision</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Two commitments. <span className="italic text-tff-navy/60">One purpose.</span>
              </h2>
              <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-tff-gold/50" />
                <span className="text-tff-gold">✦</span>
                <span className="h-px w-10 bg-tff-gold/50" />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] bg-tff-navy-gradient p-10 text-white shadow-tff-elegant">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-[0.14] mix-blend-screen"
                  style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '420px' }}
                />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold-soft">Our Vision</p>
                <h3 className="mt-4 font-display text-2xl leading-snug md:text-3xl">
                  No widow abandoned. No orphan forgotten. No new Muslim alone.
                </h3>
                <div className="divider-gold mt-6 mb-6" />
                <div className="space-y-3 text-white/75">
                  <p>
                    To build a world where no widow feels abandoned, no orphan feels
                    forgotten, and no new Muslim walks alone.
                  </p>
                  <p>
                    We envision communities strengthened by compassion, guided by faith, and
                    empowered through knowledge.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-[28px] border border-tff-navy/10 bg-white p-10 shadow-tff-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Our Mission</p>
                <h3 className="mt-4 font-display text-2xl leading-snug text-tff-navy md:text-3xl">
                  Turning charity into sustainable impact.
                </h3>
                <div className="mt-6 mb-6 h-px bg-tff-navy/10" />
                <ul className="space-y-4">
                  {[
                    'To provide structured support programs for widows, orphans, and new Muslims.',
                    'To develop educational resources that make Islamic knowledge accessible and practical.',
                    'To nurture individuals who grow in faith, dignity, and independence.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tff-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Our Values ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Our Values</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                The principles <span className="italic text-tff-navy/60">that shape every decision.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 100}>
                <div className="hover-lift h-full rounded-2xl border border-tff-navy/10 bg-white p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-tff-gold-gradient font-display text-lg font-semibold text-tff-navy-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-5 font-display text-xl text-tff-navy">{v.title}</h4>
                  <p className="mt-2 leading-relaxed text-gray-500">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Why TFF ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">Why TFF</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                A different <span className="italic text-tff-navy/60">kind of charity.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {WHY_TFF.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-tff-navy/10 bg-white p-8">
                  <p className="font-display text-4xl font-semibold text-tff-gold/70">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h4 className="mt-3 font-display text-xl text-tff-navy">{item.title}</h4>
                  <div className="mt-4 mb-4 h-px bg-tff-navy/10" />
                  <p className="leading-relaxed text-gray-500">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= A Message from the Founder ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                A Message From The Founder
              </p>
              <span className="mt-4 block font-display text-6xl leading-none text-tff-gold/30">“</span>
              <h2 className="-mt-4 font-display text-3xl leading-snug text-tff-navy md:text-4xl">
                Compassion must be organized{' '}
                <span className="italic text-tff-navy/60">to create real change.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-lg leading-relaxed text-gray-500 md:text-center">
                <p>
                  Our communities face challenges that require more than sympathy. They require
                  structure, sincerity, and sustained effort. TFF is our commitment to serving
                  with responsibility and excellence.
                </p>
                <p>
                  I invite you not just to support this mission, but to become part of it.
                  Together, we can transform lives with faith, dignity, and purpose.
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-tff-gold/50" />
                <p className="font-display text-lg text-tff-navy">
                  Mr. Ashar Azeem
                  <span className="ml-2 text-sm font-sans text-gray-500">
                    · Founder, The Two Fingers Foundation
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Closing note ================= */}
      <section className="pb-20 md:pb-32">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[28px] border border-tff-gold/25 bg-white px-8 py-12 text-center shadow-tff-soft md:flex-row md:justify-between md:text-left">
              <div>
                <p className="font-display text-2xl text-tff-navy">
                  Now that you know our story — <span className="italic text-tff-navy/60">see it in action.</span>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  TFF runs entirely on volunteers; we do not accept or collect monetary donations.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
                <a
                  href="/#programs"
                  className="rounded-full bg-tff-gold-gradient px-6 py-3 font-semibold text-tff-navy-deep shadow-tff-gold transition-transform hover:-translate-y-0.5"
                >
                  See Our Programs →
                </a>
                <Link
                  to="/volunteer"
                  className="rounded-full border border-tff-navy/15 px-6 py-3 font-medium text-tff-navy transition-colors hover:border-tff-gold hover:text-tff-gold"
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
