import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const POLICY_TITLES: Record<string, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms and Conditions',
  'donation-policy': 'Donation Policy',
  'refund-policy': 'Refund Policy',
  'accessibility-statement': 'Accessibility Statement',
  'impartiality-statement': 'Impartiality Statement',
  'cause-of-tff': 'Cause of TFF',
  'daily-ayat-hadith': 'Daily Ayat and Hadith',
  'azkaar-dua': 'Azkaar / Dua',
  'volunteer': 'Volunteer',
  'get-help': 'Get Help',
  'about-us': 'About Us',
  'discovering-islam': 'Discovering Islam',
  'programs': 'Programs',
  'playlist': 'Playlist',
  'downloads': 'Downloads',
};

export function UnderConstructionPage() {
  const path = useLocation().pathname.replace(/^\//, '') || '';
  const title = POLICY_TITLES[path] || 'Page';

  if (path === 'donation-policy') {
    return (
      <div className="min-h-[60vh] px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-6">{title}</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Two Fingers Foundation does not accept, collect, or process monetary
            donations of any kind through this website.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Our work is powered entirely by volunteers. If you would like to support
            our mission, we welcome you to volunteer your time and skills rather than
            contribute funds.
          </p>
          <Link
            to="/volunteer"
            className="text-[#C9A961] hover:text-[#B89751] font-medium underline underline-offset-2"
          >
            Volunteer with us
          </Link>
          <span className="mx-2 text-gray-400">·</span>
          <Link
            to="/"
            className="text-[#C9A961] hover:text-[#B89751] font-medium underline underline-offset-2"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">Under construction</p>
        <Link
          to="/"
          className="text-[#C9A961] hover:text-[#B89751] font-medium underline underline-offset-2"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
