import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

// Relative path so logo loads when app is opened as file (e.g. dist/index.html) or from any base URL
const LOGO_SVG = `${import.meta.env.BASE_URL}logo.svg`;

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Discovering Islam', to: '/discovering-islam' },
  { label: 'Programs', to: '/programs' },
  { label: 'Training', to: '/training' },
  { label: 'Playlist', to: '/playlist' },
  { label: 'Downloads', to: '/downloads' },
  { label: 'Articles', to: '/articles' },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== '/' && location.pathname !== '';

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col overflow-x-hidden">
      <header className="bg-white shadow-sm sticky top-0 z-50 relative h-16 sm:h-20 min-h-[4rem]">
        {/* Back – desktop only: top-left (web unchanged) */}
        {showBack ? (
          <div className="absolute left-0 top-0 bottom-0 h-full hidden lg:flex items-center justify-center pl-10 sm:pl-14 z-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[#2C5F2D] hover:text-[#C9A961] font-medium transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              <span>Back</span>
            </button>
          </div>
        ) : null}

        <div className={`max-w-7xl mx-auto pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-6 lg:pr-8 h-full ${showBack ? 'lg:pl-24 lg:pl-32' : ''}`}>
          <div className="flex items-center justify-between h-16 sm:h-20 min-h-[4rem] gap-3">
            {/* Back – mobile only: logo se pehle */}
            {showBack ? (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="lg:hidden flex-shrink-0 inline-flex items-center gap-1.5 text-[#2C5F2D] hover:text-[#C9A961] font-medium transition-colors py-2 pr-1"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 shrink-0" />
                <span>Back</span>
              </button>
            ) : null}
            {/* Logo + name – click pe home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-start no-underline focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-offset-2 rounded-lg"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <img
                  src={LOGO_SVG}
                  alt="Two Finger Foundation"
                  width={48}
                  height={48}
                  fetchPriority="high"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-semibold text-[#2C5F2D] truncate">Two Finger Foundation</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Empowering Lives, Nurturing Faith</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`transition-colors ${
                      isActive ? 'text-[#C9A961] font-medium' : 'text-gray-700 hover:text-[#2C5F2D]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-only full-screen menu overlay – main content ko cover, nav clear */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 sm:top-20 z-40 lg:hidden bg-[#FAF8F3]"
          aria-hidden="false"
        >
          <nav className="pt-6 px-6 pb-8 flex flex-col gap-1" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 px-4 rounded-lg text-lg font-medium transition-colors ${
                    isActive ? 'bg-[#C9A961]/15 text-[#2C5F2D]' : 'text-[#2C5F2D] hover:bg-[#2C5F2D]/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer – About TFF ke upar zyada green; © 2026 neeche se upar */}
      <footer className="bg-[#2C5F2D] text-white mt-36 sm:mt-44 lg:mt-56">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(28px, 3.5vw, 48px)', paddingBottom: 'clamp(20px, 2.5vw, 36px)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">About TFF</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Two Finger Foundation is dedicated to empowering widows, supporting orphans, and guiding new Muslims to a stronger future through compassion and community.
              </p>
            </div>

            {/* Quick Links – no links for demo */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>About Us</li>
                <li>Our Programs</li>
                <li>Training Modules</li>
                <li>Volunteer</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>Email: info@twofingerfoundation.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Charity Lane, City, ST 12345</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">Stay Connected</h3>
              <p className="text-sm text-gray-200 mb-3">Subscribe to our newsletter for updates</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-email" className="sr-only">Email for newsletter</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  aria-label="Email for newsletter"
                  className="px-3 py-2 rounded text-sm flex-1 min-w-0 text-gray-900 w-full sm:w-auto"
                />
                <Button type="button" className="bg-[#C9A961] hover:bg-[#B89751] text-white w-full sm:w-auto shrink-0" aria-label="Subscribe to newsletter">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar – neeche padding taake © 2026 full end par na lage */}
          <div className="border-t border-white/20 pt-8 sm:pt-10" style={{ paddingBottom: 'clamp(16px, 2vw, 28px)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-200 text-center md:text-left">
              <p>© 2026 Two Finger Foundation. All rights reserved.</p>
              <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6 text-gray-200">
                <Link to="/privacy-policy" className="hover:text-[#C9A961] transition-colors">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-[#C9A961] transition-colors">Terms and Conditions</Link>
                <Link to="/donation-policy" className="hover:text-[#C9A961] transition-colors">Donation Policy</Link>
                <Link to="/refund-policy" className="hover:text-[#C9A961] transition-colors">Refund Policy</Link>
                <Link to="/accessibility-statement" className="hover:text-[#C9A961] transition-colors">Accessibility Statement</Link>
                <Link to="/impartiality-statement" className="hover:text-[#C9A961] transition-colors">Impartiality Statement</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
