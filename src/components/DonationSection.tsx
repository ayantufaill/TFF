import { Heart, Shield, Users, Building } from "lucide-react";

export function DonationSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20L60 40L80 30L70 50L90 60L70 70L80 90L60 80L50 100L40 80L20 90L30 70L10 60L30 50L20 30L40 40L50 20Z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}>
        </div>
      </div>

      {/* Mosque Silhouette */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <path d="M200 50 L160 100 L100 100 L100 250 L300 250 L300 100 L240 100 L200 50 Z" fill="currentColor"/>
          <circle cx="150" cy="80" r="20" fill="currentColor"/>
          <circle cx="250" cy="80" r="20" fill="currentColor"/>
          <path d="M200 30 L190 50 L210 50 Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support Our Mission
          </h2>
          <div className="text-xl text-white/90 mb-4" style={{ direction: 'rtl' }}>
            ادعم مهمتنا
          </div>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Help us continue providing free Islamic resources to Muslims worldwide. 
            Your donation supports the development and maintenance of our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Impact Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <Users className="w-8 h-8 text-white mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">1M+</div>
            <div className="text-white/80">Muslims Served</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <Heart className="w-8 h-8 text-white mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80">Donations Received</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <Shield className="w-8 h-8 text-white mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-white/80">Secure Transactions</div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Make a Donation</h3>
            <p className="text-gray-600">Choose an amount or enter a custom amount</p>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {['$10', '$25', '$50', '$100'].map((amount) => (
              <button
                key={amount}
                className="p-3 border-2 border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-colors font-medium text-gray-700 hover:text-emerald-600"
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border border-gray-300 rounded-lg hover:border-emerald-600 transition-colors flex items-center justify-center gap-2">
                <div className="w-6 h-4 bg-blue-600 rounded"></div>
                <span className="text-sm font-medium">Credit Card</span>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-emerald-600 transition-colors flex items-center justify-center gap-2">
                <div className="w-6 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm font-medium">PayPal</span>
              </button>
            </div>
          </div>

          {/* Donation Button */}
          <button className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-lg flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Donate Now
          </button>

          {/* Security Note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure SSL encrypted transaction</span>
          </div>
        </div>

        {/* Impact Message */}
        <div className="text-center mt-8">
          <p className="text-white/90 italic">
            "The best of people are those who benefit others" - Prophet Muhammad (PBUH)
          </p>
        </div>
      </div>
    </section>
  );
}