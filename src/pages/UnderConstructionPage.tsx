import { Link, useLocation } from 'react-router';

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
  'donate': 'Donate',
  'volunteer': 'Volunteer',
  'get-help': 'Get Help',
};

export function UnderConstructionPage() {
  const path = useLocation().pathname.replace(/^\//, '') || '';
  const title = POLICY_TITLES[path] || 'Page';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-[#2C5F2D] mb-2">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">Under construction</p>
      <Link
        to="/"
        className="text-[#C9A961] hover:text-[#B89751] font-medium underline underline-offset-2"
      >
        Back to home
      </Link>
    </div>
  );
}
