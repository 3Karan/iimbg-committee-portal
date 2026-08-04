'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1a0a0e]">
      {/* Background — Subtle Bodhi leaf pattern + gradients */}
      <div className="absolute inset-0 z-0">
        {/* Deep maroon gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#2d1118]/60 to-[#1a0a0e] z-10" />

        {/* Warm saffron glow — left */}
        <div
          className={`absolute top-[15%] left-[5%] w-72 h-72 rounded-full bg-[#c5973e]/10 blur-3xl transition-all duration-1000 ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        {/* Deep maroon glow — right */}
        <div
          className={`absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full bg-[#6b2534]/20 blur-3xl transition-all duration-1000 delay-300 ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        {/* Small gold accent — center top */}
        <div
          className={`absolute top-[40%] right-[30%] w-32 h-32 rounded-full bg-[#d4a853]/8 blur-2xl animate-pulse-glow transition-all duration-1000 delay-500 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        {/* IIM BG tagline */}
        <p className={`text-sm md:text-base text-[#c5973e] font-medium tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          The Enlightening IIM
        </p>

        {/* Institution name */}
        <h2 className={`text-xl md:text-3xl text-[#f0e6d2] font-light mb-3 uppercase tracking-[0.2em] transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          IIM Bodh Gaya
        </h2>

        {/* Committee name */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-[#c5973e] via-[#e8be5a] to-[#c5973e] bg-clip-text text-transparent drop-shadow-sm transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          IT Committee
        </h1>

        {/* Tagline */}
        <p className={`text-lg md:text-2xl text-[#ddd0b8] font-light mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Empowering Innovation, Driving Digital Excellence
        </p>

        {/* CTA */}
        <button
          onClick={scrollToEvents}
          className={`group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#1a0a0e] bg-gradient-to-r from-[#c5973e] to-[#e8be5a] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(197,151,62,0.4)] focus:outline-none delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
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
