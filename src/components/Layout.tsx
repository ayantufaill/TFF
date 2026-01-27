import { Outlet, Link, useLocation } from 'react-router';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/training', label: 'Training' },
    { path: '/get-involved', label: 'Get Involved' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#2C5F2D]">Two Finger Foundation</h1>
                <p className="text-xs text-gray-600">Empowering Lives, Nurturing Faith</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? 'text-[#C9A961] font-medium'
                      : 'text-gray-700 hover:text-[#2C5F2D]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/donate">
                <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                  Donate Now
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-3 px-4 transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#C9A961]/10 text-[#C9A961] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/donate" className="block py-3 px-4" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white">
                  Donate Now
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#2C5F2D] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">About TFF</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Two Finger Foundation is dedicated to empowering widows, supporting orphans, and guiding new Muslims to a stronger future through compassion and community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C9A961]">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-[#C9A961] transition-colors">About Us</Link></li>
                <li><Link to="/programs" className="hover:text-[#C9A961] transition-colors">Our Programs</Link></li>
                <li><Link to="/training" className="hover:text-[#C9A961] transition-colors">Training Modules</Link></li>
                <li><Link to="/get-involved" className="hover:text-[#C9A961] transition-colors">Volunteer</Link></li>
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
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded text-sm flex-1 text-gray-900"
                />
                <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-200">
              <p>© 2026 Two Finger Foundation. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/privacy" className="hover:text-[#C9A961] transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#C9A961] transition-colors">Terms & Conditions</Link>
                <Link to="/accessibility" className="hover:text-[#C9A961] transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
