import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Volume2,
  Square,
} from "lucide-react";
import "./HomePage.css";
import heroImg from "../assets/home/hero-main.jpg";
import widowsImg from "../assets/home/impact-widows.jpg";
import orphansImg from "../assets/home/impact-orphans.jpg";
import revertsImg from "../assets/home/impact-reverts.jpg";
import gallery1 from "../assets/home/gallery-1.jpg";
import gallery2 from "../assets/home/gallery-2.jpg";
import gallery3 from "../assets/home/gallery-3.jpg";
import patternBg from "../assets/home/pattern-bg.jpg";
import bookLivingIslam from "../assets/home/book-living-islam.png";
import bookNewMuslimGuide from "../assets/home/book-new-muslim-guide.png";
import bookPurificationHeart from "../assets/home/book-purification-heart.png";
import bookKnowledgePurpose from "../assets/home/book-knowledge-purpose.png";
import bookRamadanGuide from "../assets/home/book-ramadan-guide.png";
import bookStruggleEnds from "../assets/home/book-struggle-ends.png";

/* ---------- Small building blocks ---------- */

/** Fades + slides a section in the first time it scrolls into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Count-up animation when in view: 0 -> target over ~1.8s with ease-out */
function CountUp({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 4;
      setDisplay(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  const value = Math.min(display, target);
  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
}

// Video section right after the Shahadah intro: YouTube ID, or null to hide.
const HERO_VIDEO_YOUTUBE_ID = "3uNNZ9h3vS8" as string | null;

const HERO_TAGLINES: { headline: React.ReactNode; subtitle: string }[] = [
  {
    headline: (
      <>
        Empowering widows.
        <br />
        Supporting orphans.
        <br />
        <span className="text-tff-gold-gradient">Guiding new Muslims</span>{" "}
        <span className="italic font-normal">to a stronger future.</span>
      </>
    ),
    subtitle:
      "Building a compassionate community through dignity, support, and faith",
  },
  {
    headline: (
      <>
        Extending hands{" "}
        <span className="italic font-normal">where hope is fading.</span>
        <br />
        <span className="text-tff-gold-gradient">Serving humanity</span> with
        purpose.
      </>
    ),
    subtitle:
      "Because every life deserves dignity and opportunity. Eternal impact.",
  },
  {
    headline: (
      <>
        Empowering widows,
        <br />
        uplifting families,
        <br />
        <span className="text-tff-gold-gradient">strengthening</span>{" "}
        <span className="italic font-normal">communities.</span>
      </>
    ),
    subtitle:
      "Your support builds sustainable futures, reaching where others can't.",
  },
  {
    headline: (
      <>
        Restoring dignity.
        <br />
        Rebuilding hope.
        <br />
        <span className="text-tff-gold-gradient">Empowering</span>{" "}
        <span className="italic font-normal">futures.</span>
      </>
    ),
    subtitle: "From survival to self-reliance — together we rise.",
  },
];

const DUAS_AZKAR: {
  time: string;
  arabic: string;
  transliteration: string;
  meaning: string;
}[] = [
  {
    time: "Remembrance",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    meaning: "Glory be to Allah.",
  },
  {
    time: "Remembrance",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    meaning: "All praise is for Allah.",
  },
  {
    time: "Remembrance",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    meaning: "Allah is the Greatest.",
  },
  {
    time: "Faith",
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illa Allah",
    meaning: "There is no god but Allah.",
  },
  {
    time: "Forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    meaning: "I seek forgiveness from Allah.",
  },
  {
    time: "Remembrance",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi",
    meaning: "Glory be to Allah and praise Him.",
  },
  {
    time: "Remembrance",
    arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "SubhanAllahi Al-'Azim",
    meaning: "Glory be to Allah, the Most Great.",
  },
  {
    time: "Strength",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    meaning: "There is no power and no strength except with Allah.",
  },
  {
    time: "For Anxiety",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    meaning:
      "Allah is sufficient for us and He is the best disposer of affairs.",
  },
  {
    time: "Forgiveness",
    arabic: "رَبِّ اغْفِرْ لِي",
    transliteration: "Rabbi ighfir li",
    meaning: "My Lord, forgive me.",
  },
  {
    time: "Mercy",
    arabic: "رَبِّ ارْحَمْنِي",
    transliteration: "Rabbi irhamni",
    meaning: "My Lord, have mercy on me.",
  },
  {
    time: "Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    meaning: "My Lord, increase me in knowledge.",
  },
  {
    time: "For Anxiety",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    transliteration: "Ya Hayyu Ya Qayyum, bi rahmatika astagheeth",
    meaning: "O Ever-Living, O Sustainer, in Your mercy I seek relief.",
  },
  {
    time: "Both Worlds",
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration:
      "Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adhab an-nar",
    meaning:
      "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.",
  },
  {
    time: "Guidance",
    arabic: "اللَّهُمَّ اهْدِنِي",
    transliteration: "Allahumma ihdini",
    meaning: "O Allah, guide me.",
  },
  {
    time: "For Parents",
    arabic: "اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ",
    transliteration: "Allahummaghfir li wa li walidayya",
    meaning: "O Allah, forgive me and my parents.",
  },
  {
    time: "Well-being",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
    transliteration: "Allahumma inni as'aluka al-'afiyah",
    meaning: "O Allah, I ask You for well-being.",
  },
  {
    time: "Ease",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
    transliteration: "Rabbi ishrah li sadri",
    meaning: "My Lord, expand my chest.",
  },
  {
    time: "Steadfastness",
    arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Allahumma thabbit qalbi 'ala deenik",
    meaning: "O Allah, keep my heart firm upon Your religion.",
  },
  {
    time: "Trust",
    arabic: "اللَّهُمَّ إِنِّي تَوَكَّلْتُ عَلَيْكَ",
    transliteration: "Allahumma inni tawakkaltu 'alayk",
    meaning: "O Allah, I place my trust in You.",
  },
];

const HADITHS: { text: string; source: string }[] = [
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih al-Bukhari & Muslim",
  },
  {
    text: "The strong is not the one who overcomes people by his strength, but the one who controls his anger.",
    source: "Sahih al-Bukhari & Muslim",
  },
  {
    text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    source: "Sahih al-Bukhari & Muslim",
  },
  {
    text: "Make things easy and do not make them difficult. Cheer people up and do not repel them.",
    source: "Sahih al-Bukhari",
  },
  {
    text: "The most beloved of deeds to Allah are those done consistently, even if small.",
    source: "Sahih al-Bukhari & Muslim",
  },
];

const IMPACT_STATS = [
  { value: 2, suffix: "+", label: "Countries Served" },
  { value: 5, suffix: "+", label: "Families Supported" },
  { value: 2, suffix: "+", label: "Children Educated" },
  { value: 3, suffix: "+", label: "Widows Trained" },
  { value: 12, suffix: "+", label: "New Muslims Guided" },
  { value: 100, suffix: "%", label: "Transparency Rating" },
];

const PROGRAMS = [
  {
    tag: "Widow Empowerment",
    title: "Widows Support",
    image: widowsImg,
    desc: "Widows often face emotional loss, social isolation, and economic hardship after losing their life partners. At The Two Fingers Foundation, we work to restore dignity by providing emotional care, skills development, and sustainable support systems.",
    bullets: ["Financial aid", "Vocational training", "Legal support"],
  },
  {
    tag: "Orphan Care",
    title: "Orphans Support",
    image: orphansImg,
    desc: "Orphans are among the most vulnerable members of any community, deserving protection, education, and love. We focus on nurturing their potential through education, healthcare, and mentorship.",
    bullets: ["Education", "Mentorship", "Holistic development"],
  },
  {
    tag: "Revert Support",
    title: "New Revert Support",
    image: revertsImg,
    desc: "Accepting Islam is a profound and courageous journey, often accompanied by confusion, social pressure, and emotional challenges. We support new reverts with guidance, learning resources, and a caring community.",
    bullets: [
      "Islamic education",
      "Community integration",
      "Spiritual guidance",
    ],
  },
];

// Shared with the Downloads page (public/covers/*.jpg + real Google Drive files)
const BOOKS = [
  {
    title: "Living Islam",
    author: "Dr. Munib Siddiqui",
    tag: "Beginner's Guide",
    cover: bookLivingIslam,
    note: "A clear, practical, and beginner-friendly guide to the Five Pillars — grounded in the promise: \"Call upon Me; I will respond to you.\" (Ghafir 40:60)",
    file: "https://drive.google.com/file/d/1YOZ5o4VWeWTBHuUKY7CStPtsC68zOoaK/view?usp=drive_link",
  },
  {
    title: "The New Muslim Guide",
    author: "Dr. Munib Siddiqui",
    tag: "For Reverts",
    cover: bookNewMuslimGuide,
    note: "A clear and friendly introduction to Islam in a questions-and-answers format — designed to walk new Muslims through faith, practice, and everyday life.",
    file: "https://drive.google.com/file/d/13gbIDTvL7DjZ_TOzkqXXo-Ps5DHSokGD/view?usp=drive_link",
  },
  {
    title: "Purification of Heart",
    author: "Two Fingers Foundation",
    tag: "Spiritual Guide",
    cover: bookPurificationHeart,
    note: "A spiritual guide for new Muslims on cleansing the heart — softening it toward Allah, and rebuilding the inner life with sincerity and light.",
    file: "https://drive.google.com/file/d/13uHJEY1T2U0_lIVeU3DI21nvE1l99FzH/view?usp=drive_link",
  },
  {
    title: "Knowledge & Purpose",
    author: "Dr. Munib Siddiqui",
    tag: "Reflection",
    cover: bookKnowledgePurpose,
    note: "An Islamic perspective on learning, meaning, and responsibility — for the seeker who wants their studies and their life to serve a higher aim.",
    file: "https://drive.google.com/file/d/1FUbodc2vVhyPMMOwO3isVJo44aib7TQL/view?usp=drive_link",
  },
  {
    title: "Understand with Ease: Ramadan Guide",
    author: "Dr. Munib Siddiqui",
    tag: "Ramadan",
    cover: bookRamadanGuide,
    note: "\"The month of Ramadan is the one in which the Qur'an was revealed as guidance for mankind…\" (Qur'an 2:185) — a simple companion to fasting, prayer, and reflection.",
    file: "https://drive.google.com/file/d/1rwafPkQxxbj_RB4VbzU_vXpPUFNQqlbj/view?usp=drive_link",
  },
  {
    title: "The Struggle Ends, the Journey Begins",
    author: "Dr. Munib Siddiqui",
    tag: "Hope & Healing",
    cover: bookStruggleEnds,
    note: "For the widow, the orphan, and the seeking soul — a tender reminder that hardship is not the end of the story, but the doorway to a new beginning with Allah.",
    file: "https://drive.google.com/file/d/1ipBZf0-1x1igyHloTV_rJDx_RoaUVM09/view?usp=drive_link",
  },
  {
    title: "Light of Faith",
    author: "Dr. Munib Siddiqui",
    tag: "Start Here",
    cover: "/covers/1.jpg",
    note: "Gentle introduction to iman, hope and trust in Allah — ideal first read.",
    file: "https://drive.google.com/file/d/1M9bi34Rc6_moPbppjDD2l98hcSmQjyYg/view?usp=drive_link",
  },
  {
    title: "Bow Before Allah",
    author: "Dr. Munib Siddiqui",
    tag: "Salah",
    cover: "/covers/4.jpg",
    note: "Explains the meaning of salah, its movements and how to build khushu'.",
    file: "https://drive.google.com/file/d/1jdHtlhrfRtAdNlgTe2LhmQsH2aesRjHl/view?usp=drive_link",
  },
  {
    title: "The Final Messenger ﷺ",
    author: "Dr. Munib Siddiqui",
    tag: "Seerah",
    cover: "/covers/5.jpg",
    note: "Key events and lessons from the life of the Prophet ﷺ, made easy to follow.",
    file: "https://drive.google.com/file/d/1JLkXjyulXNLGmdkct89-r-2V0AsZD7qW/view?usp=drive_link",
  },
  {
    title: "The Gateway to Quran",
    author: "Dr. Munib Siddiqui",
    tag: "Qur'an",
    cover: "/covers/6.jpg",
    note: "A simple doorway into reading, understanding and reflecting on the Qur'an.",
    file: "https://drive.google.com/file/d/1CDHlGdiUicK-pH4UJZZLOI8gRqtfPTai/view?usp=drive_link",
  },
  {
    title: "The Muslim Lifestyle",
    author: "Dr. Munib Siddiqui",
    tag: "Character",
    cover: "/covers/7.jpg",
    note: "Covers manners, habits and routines for a balanced prophetic lifestyle.",
    file: "https://drive.google.com/file/d/1yudypcC8_yYXGetTgs1S07IgY8LagbTZ/view?usp=drive_link",
  },
  {
    title: "Walking Together",
    author: "Dr. Munib Siddiqui",
    tag: "Family",
    cover: "/covers/9.jpg",
    note: "Guidance for marriage, family ties and building a healthy Muslim community.",
    file: "https://drive.google.com/file/d/1XXdirVBG_ulReYf56Bua-hL-Upw3J5zS/view?usp=drive_link",
  },
  // {
  //   title: "Islamic Manners",
  //   author: "Dr. Munib Siddiqui",
  //   tag: "Manners",
  //   cover: "/covers/11.jpg",
  //   note: "Practical etiquette with parents, guests, neighbours and the wider community.",
  //   file: "https://drive.google.com/file/d/1RCPxd-3F94o99BMcrkYhRN3VAcBfvfoE/view?usp=drive_link",
  // },
];

const MISSION_POINTS = [
  {
    t: "Stand with the vulnerable",
    d: "Not temporarily — but sustainably. Long-term partnerships with the families we serve.",
  },
  {
    t: "Replace dependency with empowerment",
    d: "Vocational training, financial literacy, and pathways to self-reliance.",
  },
  {
    t: "Turn confusion into clarity",
    d: "Faith-centered mentorship for those beginning their journey with Islam.",
  },
  {
    t: "Transform charity into long-term impact",
    d: "Structured programs measured by dignity restored, not dollars spent.",
  },
];

const STORIES = [
  {
    q: "TFF didn’t hand me money. They handed me a future. My sewing business now supports my three children.",
    n: "Amina",
    r: "Widow, Kenya",
  },
  {
    q: "I found brothers and sisters who walked with me. The confusion of my first year as a Muslim faded into peace.",
    n: "Yusuf",
    r: "New Muslim, UK",
  },
  {
    q: "The scholarship kept me in school. Today I’m studying to become a nurse and give back to my community.",
    n: "Ibrahim",
    r: "Orphan Scholar, Somalia",
  },
  {
    q: "Transparent, structured, faith-centered. Every quarter I see exactly where my zakat went.",
    n: "Sara M.",
    r: "Monthly Donor",
  },
];

const GALLERY = [
  { img: gallery1, cap: "Food distribution — Ramadan 2024" },
  { img: gallery2, cap: "Classroom scholarship programme" },
  { img: gallery3, cap: "Elder widows care circle" },
];

const TRANSPARENCY_PILLARS = [
  {
    t: "Full financial reports",
    d: "Audited quarterly by independent Islamic finance auditors.",
  },
  {
    t: "Programme-level tracking",
    d: "Every donation tagged to a specific family, project, or region.",
  },
  {
    t: "Zakat compliance",
    d: "Reviewed by our Shariah advisory board with published fatwa.",
  },
  {
    t: "Field verification",
    d: "Local teams on the ground with photo and video documentation.",
  },
];

const VOLUNTEER_ROLES = [
  {
    t: "Field Coordinator",
    loc: "Kenya · Somalia · Bangladesh",
    type: "In-person",
  },
  { t: "Revert Mentor", loc: "Remote · Weekly commitment", type: "Remote" },
  { t: "Fundraising Ambassador", loc: "Global · Flexible", type: "Remote" },
  {
    t: "Content & Storytelling",
    loc: "Remote · Project-based",
    type: "Remote",
  },
];

const PARTNERS = [
  "Global Zakat Fund",
  "Islamic Relief Coalition",
  "Crescent Trust",
  "UmmahCare",
  "Barakah Foundation",
  "Rahma Aid",
  "Al-Amin Council",
  "Noor Charities",
];

const FAQS = [
  {
    q: "Is my donation zakat-eligible?",
    a: "Yes. Our zakat fund is reviewed by our Shariah advisory board and distributed strictly according to the eight categories mentioned in Surah At-Tawbah (9:60).",
  },
  {
    q: "How is my contribution tracked?",
    a: "Every donation is tagged to a specific programme and region. Monthly and quarterly reports show exactly where funds were deployed, complete with field verification.",
  },
  {
    q: "What percentage goes to overhead?",
    a: "0% of your donation goes to overhead. Administrative costs are funded through a separate operating endowment, so 100% of your contribution reaches the beneficiaries.",
  },
  {
    q: "Can I sponsor a specific family or orphan?",
    a: "Yes. Our sponsorship programme lets you support a specific orphan or widow long-term. You’ll receive periodic updates about their progress.",
  },
  {
    q: "Do you accept recurring monthly gifts?",
    a: "Absolutely. Monthly giving is the most sustainable way to support our programmes and allows us to plan long-term commitments to families.",
  },
  {
    q: "Where does TFF operate?",
    a: "We currently operate across Asia, Africa, and the Middle East, with active field teams in over a dozen countries.",
  },
];

function GoldRule() {
  return (
    <div className="mx-auto flex items-center justify-center gap-3 opacity-80">
      <span className="h-px w-10 bg-tff-gold" />
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-tff-gold">
        <path
          fill="currentColor"
          d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z"
        />
      </svg>
      <span className="h-px w-10 bg-tff-gold" />
    </div>
  );
}

export function HomePage() {
  const location = useLocation();
  const impactRef = useRef<HTMLElement>(null);
  const [impactInView, setImpactInView] = useState(false);
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0);
  const [heroLeavingIndex, setHeroLeavingIndex] = useState<number | null>(null);
  const [heroLeavingVisible, setHeroLeavingVisible] = useState(false);
  const [heroEntering, setHeroEntering] = useState(true);
  const heroTaglineRef = useRef(0);
  heroTaglineRef.current = heroTaglineIndex;
  const [carouselResetKey, setCarouselResetKey] = useState(0);
  const [visibleDonate, setVisibleDonate] = useState(false);
  const [scrollP, setScrollP] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [playingDuaIndex, setPlayingDuaIndex] = useState<number | null>(null);
  const [arabicVoiceAvailable, setArabicVoiceAvailable] = useState(true);
  const arabicVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Voices load asynchronously (esp. in Chrome) — speaking before they're
  // ready silently falls back to the default English voice, which mangles
  // Arabic text. We wait for the real list and pick a proper Arabic voice.
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setArabicVoiceAvailable(false);
      return;
    }
    const pickArabicVoice = (voices: SpeechSynthesisVoice[]) => {
      const arabicVoices = voices.filter((v) =>
        v.lang.toLowerCase().startsWith("ar"),
      );
      return (
        arabicVoices.find((v) => v.lang.toLowerCase() === "ar-sa") ??
        arabicVoices[0] ??
        null
      );
    };
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      arabicVoiceRef.current = pickArabicVoice(voices);
      setArabicVoiceAvailable(!!arabicVoiceRef.current);
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleDuaSpeech = (index: number, arabic: string) => {
    if (!("speechSynthesis" in window) || !arabicVoiceRef.current) return;
    window.speechSynthesis.cancel();
    if (playingDuaIndex === index) {
      setPlayingDuaIndex(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(arabic);
    utterance.voice = arabicVoiceRef.current;
    utterance.lang = arabicVoiceRef.current.lang;
    // Slower + slightly lower pitch reads clearer word-by-word instead of
    // rushing the phrase — the closest a generic Arabic TTS voice can get
    // to sounding deliberate rather than robotic.
    utterance.rate = 0.72;
    utterance.pitch = 0.95;
    utterance.onend = () => setPlayingDuaIndex(null);
    utterance.onerror = () => setPlayingDuaIndex(null);
    setPlayingDuaIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const goToSlide = (index: number) => {
    const next = (index + HERO_TAGLINES.length) % HERO_TAGLINES.length;
    setHeroTaglineIndex(next);
    setHeroEntering(true);
    setCarouselResetKey((k) => k + 1);
  };

  /* Scroll to Cause of TFF section when opening /#cause-of-tff (e.g. from hero button) */
  useEffect(() => {
    if (location.hash !== "#cause-of-tff") return;
    const el = document.getElementById("cause-of-tff");
    if (!el) return;
    const t = setTimeout(
      () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  /* Scroll to Dua and Azkar section when opening /#dua-azkar */
  useEffect(() => {
    if (location.hash !== "#dua-azkar") return;
    const el = document.getElementById("dua-azkar");
    if (!el) return;
    const t = setTimeout(
      () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const el = impactRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setImpactInView(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroEntering(false), 80);
    return () => clearTimeout(t);
  }, [heroTaglineIndex]);

  useEffect(() => {
    if (heroLeavingIndex === null) return;
    setHeroLeavingVisible(true);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHeroLeavingVisible(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [heroLeavingIndex]);

  /* Auto-advance carousel every 10 sec; arrows/dots still work */
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intervalId = setInterval(() => {
      if (timeoutId) clearTimeout(timeoutId);
      const current = heroTaglineRef.current;
      setHeroLeavingIndex(current);
      timeoutId = setTimeout(() => {
        setHeroTaglineIndex((prev) => (prev + 1) % HERO_TAGLINES.length);
        setHeroEntering(true);
        setHeroLeavingIndex(null);
        setHeroLeavingVisible(false);
        timeoutId = null;
      }, 700);
    }, 10000);
    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [carouselResetKey]);

  /* Floating donate button + scroll progress bar */
  useEffect(() => {
    const onScroll = () => {
      setVisibleDonate(window.scrollY > 700);
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setScrollP(Math.max(0, Math.min(1, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-tff-cream">
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-tff-gold-gradient transition-[width] duration-100"
          style={{ width: `${scrollP * 100}%` }}
        />
      </div>

      {/* ================= Hero ================= */}
      <section className="relative isolate overflow-hidden bg-tff-navy-gradient pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: "480px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-tff-gold/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 right-0 -z-10 h-[340px] w-[340px] rounded-full bg-tff-gold/15 blur-3xl"
        />
        {/* Watermark: crops tightly to just the icon mark from logo.png (which is a full
            lockup with wordmark text below it), via a background-image sized/positioned
            to isolate that region — an <img> with object-fit couldn't crop both axes at once. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 -top-6 -z-10 h-[210px] w-[200px] select-none opacity-[0.2] mix-blend-screen"
          style={{
            filter: "invert(1)",
            backgroundImage: "url(/logo.png)",
            backgroundSize: "560px 462px",
            backgroundPosition: "-185px -38px",
          }}
        />

        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <p className="font-arabic text-2xl text-tff-gold-soft md:text-3xl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-tff-gold/40 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-tff-gold-soft">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tff-gold" />
                A Non-Profit Foundation
              </div>
            </Reveal>

            {/* Rotating headline / subtitle. The current tagline stays in normal flow so it
                defines the block's height; the outgoing one is only ever overlaid on top of
                it for the brief crossfade, so long real headlines never get clipped or bleed
                into the next block. */}
            <div className="relative mt-6 pointer-events-none">
              {heroLeavingIndex !== null && (
                <h1
                  key={`leave-${heroLeavingIndex}`}
                  className={`absolute inset-0 font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-medium leading-[1.05] transition-opacity duration-700 ease-in-out ${heroLeavingVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {HERO_TAGLINES[heroLeavingIndex].headline}
                </h1>
              )}
              <h1
                key={heroTaglineIndex}
                className={`font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-medium leading-[1.05] transition-opacity duration-700 ease-in-out ${heroEntering ? "opacity-0" : "opacity-100"}`}
              >
                {HERO_TAGLINES[heroTaglineIndex].headline}
              </h1>
            </div>
            <div className="relative mt-5 pointer-events-none">
              {heroLeavingIndex !== null && (
                <p
                  key={`sub-leave-${heroLeavingIndex}`}
                  className={`absolute inset-0 max-w-xl text-lg leading-relaxed text-white/75 transition-opacity duration-700 ease-in-out ${heroLeavingVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {HERO_TAGLINES[heroLeavingIndex].subtitle}
                </p>
              )}
              <p
                key={`sub-${heroTaglineIndex}`}
                className={`max-w-xl text-lg leading-relaxed text-white/75 transition-opacity duration-700 ease-in-out ${heroEntering ? "opacity-0" : "opacity-100"}`}
              >
                {HERO_TAGLINES[heroTaglineIndex].subtitle}
              </p>
            </div>

            <Reveal delay={200} className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="hero-donate-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-tff-gold px-6 py-3.5 font-semibold text-tff-navy-deep transition-transform hover:scale-[1.03]"
                >
                  Donate Now
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("cause-of-tff")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="hero-glass-btn rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-medium text-white backdrop-blur-sm"
                >
                  Cause of TFF
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("dua-azkar")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="hero-glass-btn rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-medium text-white backdrop-blur-sm"
                >
                  Azkaar / Dua
                </button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <span className="text-tff-gold">✦</span> 100% Transparent
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tff-gold">✦</span> Zakat Eligible
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tff-gold">✦</span> Faith-Centered
                </div>
              </div>
            </Reveal>

            {/* Dots + arrows */}
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => goToSlide(heroTaglineIndex - 1)}
                aria-label="Previous statement"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2.5">
                {HERO_TAGLINES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to statement ${i + 1}`}
                    aria-current={heroTaglineIndex === i ? "true" : undefined}
                    className="h-2.5 w-2.5 rounded-full transition-colors"
                    style={{
                      backgroundColor:
                        heroTaglineIndex === i
                          ? "#C9A961"
                          : "rgba(255,255,255,0.35)",
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToSlide(heroTaglineIndex + 1)}
                aria-label="Next statement"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <Reveal
            delay={200}
            className="relative hidden lg:block lg:mr-6 xl:mr-10"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-tff-gold/20 shadow-tff-elegant">
                <img
                  src={heroImg}
                  alt="Community supported by The Two Fingers Foundation"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tff-navy-deep/75 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live impact
                </div>
              </div>
              <div className="absolute -left-6 top-1/3 hidden animate-tff-float rounded-2xl glass-card p-4 shadow-tff-soft md:block">
                <p className="text-xs uppercase tracking-widest text-tff-navy/60">
                  Since inception
                </p>
                <p className="font-display text-2xl text-tff-navy">
                  <CountUp target={22} suffix="+" inView />
                </p>
                <p className="text-xs text-gray-500">lives touched</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl glass-dark p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-tff-gold-soft">
                This month
              </p>
              <p className="mt-1 font-display text-3xl text-white">
                <CountUp target={5} suffix="+" inView /> families served
              </p>
              <p className="mt-2 text-xs text-white/70">
                Across 2+ countries in Asia, Africa &amp; the Middle East
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Hadith ticker (unchanged, already premium) ================= */}
      <section
        className="hadith-ticker"
        aria-label="Hadith of the Prophet, scrolling"
      >
        <div className="hadith-ticker-shine" aria-hidden />
        <div className="hadith-ticker-track">
          {[...HADITHS, ...HADITHS].map((hadith, index) => (
            <div className="hadith-ticker-item" key={index}>
              <span className="hadith-ticker-badge">
                <Quote className="h-3.5 w-3.5" />
              </span>
              <span className="hadith-ticker-text">
                &ldquo;{hadith.text}&rdquo;
              </span>
              <span className="hadith-ticker-source">({hadith.source})</span>
              <span className="hadith-ticker-dot" aria-hidden />
            </div>
          ))}
        </div>
      </section>

      {/* ================= Shahadah ================= */}
      {HERO_VIDEO_YOUTUBE_ID && (
        <section className="relative overflow-hidden bg-tff-cream py-20 md:py-28">
          <div className="container-page">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                  First Step of Faith
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight text-tff-navy md:text-5xl">
                  Shahadah
                </h2>
                <div className="mt-6 flex justify-center">
                  <GoldRule />
                </div>
              </Reveal>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
              <Reveal className="flex items-center rounded-3xl border border-tff-navy/10 bg-white p-8 shadow-tff-soft md:p-10">
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold text-tff-navy">
                    The Shahadah
                  </span>{" "}
                  is the foundation of Islam and the gateway to a life of
                  purpose, clarity, and peace. By sincerely declaring that there
                  is no god worthy of worship except Allah, and that Muhammad ﷺ
                  is the Messenger of Allah, a person enters Islam with a clean
                  slate and a renewed direction. If you are new to Islam, watch
                  the video to understand the meaning, beauty, and simplicity of
                  the Shahadah. And if you are already a Muslim, take a moment
                  to revisit and renew this powerful declaration.
                </p>
              </Reveal>
              <Reveal
                delay={100}
                className="relative overflow-hidden rounded-3xl border border-tff-navy/10 shadow-tff-elegant"
                style={{ minHeight: 360 }}
              >
                <iframe
                  title="Understanding the Shahadah"
                  src={`https://www.youtube.com/embed/${HERO_VIDEO_YOUTUBE_ID}?enablejsapi=1`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ================= Mission / Cause of TFF ================= */}
      <section
        id="cause-of-tff"
        className="relative scroll-mt-20 py-20 md:py-32"
      >
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Our Mission
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Not just relief. <br />
                <span className="italic text-tff-navy/60">
                  This is restoration.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200} className="sticky top-28 mt-10">
              <div className="rounded-3xl bg-tff-navy-gradient p-8 text-white shadow-tff-elegant">
                <p className="font-arabic text-2xl text-tff-gold-soft">
                  لَا إِلٰهَ إِلَّا اللَّهُ
                </p>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  Across many communities, widows struggle in silence, orphans
                  grow without guidance, and new Muslims begin their journey
                  without structured support. Poverty is not only financial — it
                  is educational, emotional, and spiritual.
                </p>
                <div className="mt-6 divider-gold" />
                <p className="mt-6 text-sm uppercase tracking-widest text-tff-gold-soft">
                  TFF was established to respond to this deeper need.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6">
            {MISSION_POINTS.map((c, i) => (
              <Reveal key={i} delay={i * 100}>
                <article className="group relative overflow-hidden rounded-2xl border border-tff-navy/10 bg-white p-8 shadow-tff-soft hover-lift">
                  <div className="flex items-start gap-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-tff-gold-gradient font-display text-lg font-semibold text-tff-navy-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl text-tff-navy">
                        {c.t}
                      </h3>
                      <p className="mt-2 leading-relaxed text-gray-500">
                        {c.d}
                      </p>
                    </div>
                  </div>
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

      {/* ================= Impact ================= */}
      <section
        ref={impactRef}
        className="relative overflow-hidden bg-tff-navy-gradient py-20 text-white md:py-32"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: "420px",
          }}
        />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Our Impact
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Real stories. Real change.{" "}
                <span className="text-tff-gold-gradient italic">
                  Real hope.
                </span>
              </h2>
              <div className="mt-6 flex justify-center">
                <GoldRule />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full bg-tff-navy p-7 transition-colors hover:bg-tff-navy-deep">
                  <p className="font-display text-4xl text-white md:text-5xl">
                    <CountUp
                      target={s.value}
                      suffix={s.suffix}
                      inView={impactInView}
                    />
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/60">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-16">
            <div className="mx-auto max-w-3xl rounded-3xl glass-dark p-8 md:p-12">
              <Quote className="h-8 w-8 text-tff-gold" />
              <p className="mt-6 font-display text-xl italic leading-relaxed text-white/90 md:text-2xl">
                "After losing my husband, I felt lost and unable to provide for
                my children. The Two Fingers Foundation gave me hope, skills
                training, and the support I needed to stand on my own feet.
                Today, I run my own small business and can send my children to
                school with dignity."
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-tff-gold-gradient" />
                <div>
                  <p className="font-semibold text-white">Amina</p>
                  <p className="text-sm text-white/60">
                    Widow &amp; Entrepreneur — TFF Programme Graduate
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Programs ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Who We Serve
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Comprehensive support systems{" "}
                <span className="italic text-tff-navy/60">
                  designed to create lasting change.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 space-y-20">
            {PROGRAMS.map((p, i) => (
              <Reveal key={i}>
                <article
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-tff-elegant">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tff-navy-deep/60 via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full glass-dark px-3 py-1.5 text-xs uppercase tracking-widest text-tff-gold-soft">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-sm uppercase tracking-widest text-tff-gold">
                      Programme 0{i + 1}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-tff-navy md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-lg leading-relaxed text-gray-500">
                      {p.desc}
                    </p>
                    <ul className="mt-7 grid gap-3">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-3 text-tff-navy"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-tff-gold/15 text-tff-gold">
                            ✓
                          </span>
                          <span className="font-medium">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Stories ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Success Stories
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Voices from{" "}
                <span className="italic text-tff-navy/60">
                  the ones we serve.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {STORIES.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <blockquote className="relative h-full rounded-3xl border border-tff-navy/10 bg-tff-cream p-9 hover-lift">
                  <Quote className="h-9 w-9 text-tff-gold/50" />
                  <p className="mt-4 font-display text-xl italic leading-relaxed text-tff-navy">
                    "{t.q}"
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-tff-navy-gradient" />
                    <div>
                      <p className="font-semibold text-tff-navy">{t.n}</p>
                      <p className="text-sm text-gray-500">{t.r}</p>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Dua & Azkar ================= */}
      <section
        id="dua-azkar"
        className="relative scroll-mt-20 bg-tff-cream py-20 md:py-32"
      >
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Dua &amp; Azkar
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                Remembrance for{" "}
                <span className="italic text-tff-navy/60">
                  every hour of the day.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                A curated selection of authentic supplications from the Qur'an
                and Sunnah — return to them daily, and let your heart find
                stillness.
              </p>
              <p className="mt-3 text-xs text-gray-400">
                Tap{" "}
                <Volume2 className="inline h-3.5 w-3.5 align-text-bottom" /> on
                any card for an AI-voiced pronunciation aid — not a substitute
                for a qualified reciter.
              </p>
              <div className="mt-6 flex justify-center">
                <GoldRule />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DUAS_AZKAR.map((it, i) => (
              <Reveal key={i} delay={(i % 6) * 60}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tff-navy/10 bg-white p-8 hover-lift">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-fit rounded-full bg-tff-navy/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-tff-navy/70">
                      {it.time}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleDuaSpeech(i, it.arabic)}
                      disabled={!arabicVoiceAvailable}
                      aria-label={
                        !arabicVoiceAvailable
                          ? "Arabic voice not available on this device"
                          : playingDuaIndex === i
                            ? `Stop ${it.transliteration}`
                            : `Listen to ${it.transliteration}`
                      }
                      title={
                        !arabicVoiceAvailable
                          ? "Arabic voice not available on this device"
                          : undefined
                      }
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tff-navy/5 text-tff-navy transition-colors hover:bg-tff-gold hover:text-tff-navy-deep disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-tff-navy/5 disabled:hover:text-tff-navy"
                    >
                      {playingDuaIndex === i ? (
                        <Square className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="mt-5 font-arabic text-2xl leading-[1.9] text-tff-navy"
                  >
                    {it.arabic}
                  </p>
                  <p className="mt-3 text-sm italic text-tff-navy/60">
                    {it.transliteration}
                  </p>
                  <div className="mt-4 divider-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">
                    {it.meaning}
                  </p>
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

      {/* ================= Books ================= */}
      <section id="books" className="relative py-20 md:py-32">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Recommended Reading
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
                A library for{" "}
                <span className="italic text-tff-navy/60">
                  the seeking heart.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
                Books our team returns to again and again — for widows finding
                footing, orphans finding voice, and new Muslims finding their
                way.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <a
                href="/downloads"
                className="inline-flex items-center gap-2 rounded-full border border-tff-navy/15 px-5 py-3 text-sm font-medium text-tff-navy hover:border-tff-gold hover:text-tff-gold"
              >
                Full reading list →
              </a>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BOOKS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <a
                  href={b.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full gap-5 rounded-3xl border border-tff-navy/10 bg-white p-6 hover-lift"
                >
                  <div className="relative h-44 w-28 shrink-0 overflow-hidden rounded-md bg-tff-navy/5 shadow-tff-elegant ring-1 ring-tff-navy/10">
                    <img
                      src={b.cover}
                      alt={`${b.title} cover`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-tff-gold-gradient" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-tff-gold">
                      {b.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl leading-snug text-tff-navy group-hover:text-tff-gold">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">by {b.author}</p>
                    <p className="mt-3 text-sm leading-relaxed text-tff-navy/75">
                      {b.note}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Gallery ================= */}
      <section className="bg-tff-cream py-20 md:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Gallery
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-tff-navy md:text-4xl">
                From the field
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="max-w-md text-gray-500">
                Moments captured across Asia, Africa, and the Middle East — the
                communities where your generosity lands.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GALLERY.map((it, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure
                  className={`group relative overflow-hidden rounded-3xl shadow-tff-soft ${i === 1 ? "md:mt-16" : ""}`}
                >
                  <img
                    src={it.img}
                    alt={it.cap}
                    loading="lazy"
                    className="h-[380px] w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tff-navy-deep/85 via-tff-navy-deep/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-tff-gold-soft">
                      Field diary
                    </p>
                    <p className="mt-1 font-display text-xl">{it.cap}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Transparency ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
              Transparency &amp; Trust
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
              You deserve to know{" "}
              <span className="italic text-tff-navy/60">
                where every dirham goes.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-500">
              Real change happens when compassion is combined with structure.
              TFF publishes complete reports, audits, and field verification so
              every donor can trace the impact of their gift.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {["Annual Report 2024", "Zakat Policy", "Shariah Audit"].map(
                (c) => (
                  <a
                    key={c}
                    href="#"
                    className="rounded-full border border-tff-navy/15 px-5 py-2.5 text-sm font-medium text-tff-navy transition-colors hover:border-tff-gold hover:text-tff-gold"
                  >
                    {c} ↗
                  </a>
                ),
              )}
            </div>
          </Reveal>

          <div className="grid gap-4">
            {TRANSPARENCY_PILLARS.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group flex items-start gap-5 rounded-2xl border border-tff-navy/10 bg-white p-6 hover-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tff-navy text-tff-gold transition-colors group-hover:bg-tff-gold group-hover:text-tff-navy">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-tff-navy">
                      {p.t}
                    </h3>
                    <p className="mt-1 text-gray-500">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Volunteer ================= */}
      {/* <section className="relative overflow-hidden bg-tff-navy-gradient py-20 text-white md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: "460px",
          }}
        />
        <div className="container-page relative">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
                Volunteer Opportunities
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Give your time.{" "}
                <span className="italic text-tff-gold-gradient">
                  Change a life.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 rounded-full border border-tff-gold/50 px-5 py-3 text-sm font-medium text-tff-gold-soft hover:bg-tff-gold/10"
              >
                View all roles →
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-3">
            {VOLUNTEER_ROLES.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <Link
                  to="/volunteer"
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-tff-gold/60 hover:bg-white/10"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-tff-gold-soft">
                      {r.type}
                    </p>
                    <h3 className="mt-1 font-display text-2xl">{r.t}</h3>
                    <p className="mt-1 text-sm text-white/70">{r.loc}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-tff-gold-gradient text-tff-navy-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= Partners =================
      <section className="border-y border-tff-navy/10 bg-tff-cream py-14">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
            Trusted &amp; supported by
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="font-display text-lg text-tff-navy/70 hover:text-tff-navy"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= FAQ ================= */}
      <section className="py-20 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tff-gold">
              FAQ
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-tff-navy md:text-5xl">
              Questions,{" "}
              <span className="italic text-tff-navy/60">answered.</span>
            </h2>
            <p className="mt-6 max-w-md text-gray-500">
              Transparency isn't a policy — it's a promise. Here are answers to
              the questions our donors ask most.
            </p>
            <a
              href="mailto:info@twofingerfoundation.org"
              className="mt-8 inline-flex items-center gap-2 border-b border-tff-navy pb-1 text-sm font-semibold uppercase tracking-widest text-tff-navy hover:border-tff-gold hover:text-tff-gold"
            >
              Contact our team →
            </a>
          </Reveal>
          <div className="divide-y divide-tff-navy/10 rounded-3xl border border-tff-navy/10 bg-white">
            {FAQS.map((it, i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-tff-cream/60"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-tff-navy md:text-xl">
                      {it.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-tff-navy/15 text-tff-navy transition-transform ${isOpen ? "rotate-45 bg-tff-gold text-tff-navy-deep" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid overflow-hidden transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p className="px-6 pb-6 leading-relaxed text-gray-500">
                        {it.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Final CTA ================= */}
      <section className="relative isolate overflow-hidden bg-tff-navy-gradient py-20 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: "520px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tff-gold/20 blur-3xl"
        />
        <div className="container-page text-center">
          <Reveal>
            <p className="font-arabic text-2xl text-tff-gold-soft md:text-3xl">
              رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl leading-[1.08] text-white md:text-6xl">
              Be part of{" "}
              <span className="italic text-tff-gold-gradient">the change.</span>
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Your support can transform lives. Whether through donation,
              volunteering, or seeking help — every action creates ripples of
              positive change.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Floating donate button */}
      {/* <Link
        to="/donate"
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-tff-gold-gradient px-5 py-3.5 font-semibold text-tff-navy-deep shadow-tff-gold transition-all duration-500 ${
          visibleDonate
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-tff-navy text-tff-gold">
          <Heart className="h-3.5 w-3.5" />
        </span>
        Donate
      </Link> */}
    </div>
  );
}
