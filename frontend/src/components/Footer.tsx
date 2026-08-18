import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  Heart
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Read Quran", nameArabic: "اقرأ القرآن" },
    { name: "Prayer Times", nameArabic: "أوقات الصلاة" },
    { name: "Recitations", nameArabic: "التلاوات" },
    { name: "Articles", nameArabic: "المقالات" },
    { name: "Hadith Collection", nameArabic: "مجموعة الأحاديث" }
  ];

  const aboutLinks = [
    "Our Mission",
    "Islamic Scholars",
    "Community Guidelines",
    "Privacy Policy",
    "Terms of Service"
  ];

  const supportLinks = [
    "Help Center",
    "Contact Support",
    "Feedback",
    "Report Issue"
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40 L32 32 L24 40 L32 48 L40 40 Z M56 40 L48 32 L40 40 L48 48 L56 40 Z M40 24 L32 16 L24 24 L32 32 L40 24 Z M40 56 L32 48 L24 56 L32 64 L40 56 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-semibold">QuranSpace</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your comprehensive Islamic platform for Quran recitation, prayer times, 
              and Islamic knowledge. Serving Muslims worldwide with authentic content.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">info@quranspace.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">Global Service</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors block">
                    {link.name}
                  </a>
                  <div className="text-xs text-gray-500 mt-1" style={{ direction: 'rtl' }}>
                    {link.nameArabic}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Apps */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile App Downloads */}
            <div>
              <h4 className="font-medium mb-4">Download Our App</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8">
          <div className="text-center md:text-left md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="text-gray-300">Subscribe to get daily Quran verses, hadith, and Islamic content</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-300 mr-4">Follow Us:</span>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 QuranSpace. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-end gap-1">
                Made with <Heart className="w-3 h-3 text-red-400" /> for the Ummah
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}