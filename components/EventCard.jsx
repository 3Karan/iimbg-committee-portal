import Image from 'next/image';

const categoryColors = {
  'Tech': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Cultural': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Workshop': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Guest Lecture': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

/**
 * Formats an ISO date string (e.g., "2026-09-15") into a readable format.
 * Returns "Sep 15, 2026" style output.
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ event }) {
  const badgeColor = categoryColors[event.category] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';

  return (
    <div className="group relative flex flex-col bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20">
      {/* Event Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={event.image || `https://placehold.co/600x400/111d35/d4a853?text=${encodeURIComponent(event.name)}`}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent opacity-80" />
      </div>
      
      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6 relative">
        {/* Category Badge */}
        <div className="absolute -top-4 left-6">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md ${badgeColor}`}>
            {event.category}
          </span>
        </div>
        
        {/* Event Name */}
        <h3 className="text-xl font-bold text-white mb-3 mt-2">{event.name}</h3>
        
        {/* Date, Time & Venue */}
        <div className="space-y-2 mb-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#d4a853] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#d4a853] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.venue}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-2 mt-auto">
          {event.description}
        </p>
      </div>
    </div>
  );
}
