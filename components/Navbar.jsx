'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Events', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a1628]/80 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="text-xs text-slate-300 font-medium tracking-wider uppercase">
                IIM Bodh Gaya
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-[#d4a853] to-[#f0c75e] bg-clip-text text-transparent">
                IT Committee
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-[#f0c75e]' : 'text-slate-200 hover:text-white'
                    } group`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#d4a853] transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute w-full bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-md text-center transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#f0c75e]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
