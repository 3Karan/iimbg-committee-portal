import Image from 'next/image';

export default function TeamCard({ member }) {
  return (
    <div className="group flex flex-col items-center p-8 bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,168,83,0.15)] hover:border-[#d4a853]/30">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#d4a853] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[#d4a853] p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#111d35]">
            <Image
              src={member.image || `https://placehold.co/240x240/111d35/d4a853?text=${encodeURIComponent(member.name.charAt(0))}`}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="120px"
            />
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-1 text-center">{member.name}</h3>
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#d4a853]/10 text-[#f0c75e] border border-[#d4a853]/20 mb-4 text-center">
        {member.role}
      </span>
      
      <p className="text-sm text-slate-400 text-center mb-6 line-clamp-3">
        {member.bio}
      </p>
      
      {member.linkedin && (
        <a 
          href={member.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto text-slate-300 hover:text-[#d4a853] transition-colors p-2 rounded-full hover:bg-white/5"
          aria-label={`${member.name}'s LinkedIn`}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
    </div>
  );
}
