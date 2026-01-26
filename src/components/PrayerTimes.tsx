import { MapPin, Clock, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("Mecca, Saudi Arabia");

  // Mock prayer times data
  const prayerTimes = [
    { name: "Fajr", nameArabic: "الفجر", time: "05:30", passed: true },
    { name: "Dhuhr", nameArabic: "الظهر", time: "12:15", passed: true },
    { name: "Asr", nameArabic: "العصر", time: "15:45", passed: false, next: true },
    { name: "Maghrib", nameArabic: "المغرب", time: "18:20", passed: false },
    { name: "Isha", nameArabic: "العشاء", time: "19:45", passed: false }
  ];

  const nextPrayer = prayerTimes.find(prayer => prayer.next);
  const timeUntilNext = "2:30:15"; // Mock countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Prayer Times
          </h2>
          <div className="text-xl text-gray-600 mb-2" style={{ direction: 'rtl' }}>
            أوقات الصلاة
          </div>
          <p className="text-gray-600">
            Never miss a prayer with accurate prayer times for your location
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Location & Time */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-gray-800">{location}</span>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-gray-600">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Update Location
            </button>
          </div>

          {/* Next Prayer Countdown */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-lg text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Next Prayer</span>
              </div>
              
              {nextPrayer && (
                <>
                  <div className="text-2xl font-bold mb-2">
                    {nextPrayer.name}
                  </div>
                  <div className="text-lg mb-2" style={{ direction: 'rtl' }}>
                    {nextPrayer.nameArabic}
                  </div>
                  <div className="text-sm opacity-90 mb-4">
                    at {nextPrayer.time}
                  </div>
                  
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-sm opacity-90 mb-2">Time remaining</div>
                    <div className="text-3xl font-bold">
                      {timeUntilNext}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Set Reminder
            </button>
          </div>

          {/* Prayer Times List */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Prayers</h3>
            
            <div className="space-y-3">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    prayer.next 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : prayer.passed 
                        ? 'bg-gray-50 opacity-75' 
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      prayer.passed ? 'bg-green-500' : prayer.next ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {prayer.name}
                      </div>
                      <div className="text-xs text-gray-500" style={{ direction: 'rtl' }}>
                        {prayer.nameArabic}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`font-medium ${
                    prayer.next ? 'text-emerald-600' : 'text-gray-600'
                  }`}>
                    {prayer.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}