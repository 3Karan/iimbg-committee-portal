import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2d1118] border-t-2 border-[#c5973e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#c5973e] to-[#e8be5a] bg-clip-text text-transparent mb-4">
              About IT Committee
            </h3>
            <p className="text-[#ddd0b8] text-sm leading-relaxed">
              The IT Committee of IIM Bodh Gaya — The Enlightening IIM — is dedicated to fostering digital innovation and technical excellence. We organize events, workshops, and manage digital infrastructure to empower the student community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#faf5eb] text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#faf5eb] text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm flex items-center gap-2">
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm flex items-center gap-2">
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="mailto:itcommittee@iimbg.ac.in" className="text-[#ddd0b8] hover:text-[#c5973e] transition-colors text-sm flex items-center gap-2">
                  <span>itcommittee@iimbg.ac.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-[#ddd0b8]/60 text-sm">
            &copy; {new Date().getFullYear()} IIM Bodh Gaya IT Committee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
