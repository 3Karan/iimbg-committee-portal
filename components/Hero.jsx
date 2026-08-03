'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#111d35]/50 to-[#0a1628] z-10" />
        {/* Animated shapes */}
        <div
          className={`absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#d4a853]/10 blur-3xl transition-transform duration-1000 ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        <div
          className={`absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-1000 delay-300 ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        <h2 className="text-xl md:text-3xl text-slate-300 font-light mb-4 uppercase tracking-[0.2em]">
          IIM Bodh Gaya
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-[#d4a853] via-[#f0c75e] to-[#d4a853] bg-clip-text text-transparent drop-shadow-sm font-playfair">
          IT Committee
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">
          Empowering Innovation, Driving Digital Excellence
        </p>
        <button
          onClick={scrollToEvents}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-[#0a1628] bg-gradient-to-r from-[#d4a853] to-[#f0c75e] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] focus:outline-none"
        >
          <span className="relative z-10 flex items-center gap-2 font-bold">
            Explore Events
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
