'use client';
import { useEffect, useState } from 'react';
import EventCard from './EventCard';

export default function EventsGrid({ filteredEvents = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <span className="text-3xl text-slate-400">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
        <p className="text-slate-400">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700 slide-in-from-bottom-8">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
