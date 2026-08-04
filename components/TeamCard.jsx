import Image from 'next/image';

/**
 * Generates a professional initials-based avatar URL.
 * Uses the ui-avatars.com service for clean, consistent initials.
 */
function getInitialsAvatar(name) {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&size=240&background=4a1a25&color=e8be5a&bold=true&font-size=0.4`;
}

export default function TeamCard({ member }) {
  // Use the local image if it exists, otherwise fall back to initials avatar
  const avatarSrc = member.image || getInitialsAvatar(member.name);

  return (
    <div className="group flex flex-col items-center p-8 bg-white/[0.04] backdrop-blur-lg border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(197,151,62,0.15)] hover:border-[#c5973e]/30">
      {/* Avatar */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#c5973e] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[#c5973e] p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#2d1118]">
            <Image
              src={avatarSrc}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="120px"
            />
          </div>
        </div>
      </div>
      
      {/* Name */}
      <h3 className="text-xl font-bold text-[#faf5eb] mb-1 text-center">{member.name}</h3>
      
      {/* Role Badge */}
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#c5973e]/10 text-[#e8be5a] border border-[#c5973e]/20 mb-4 text-center">
        {member.role}
      </span>
      
      {/* Bio */}
      <p className="text-sm text-[#ddd0b8]/70 text-center mb-6 line-clamp-3">
        {member.bio}
      </p>
      
      {/* LinkedIn */}
      {member.linkedin && (
        <a 
          href={member.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto text-[#ddd0b8] hover:text-[#c5973e] transition-colors p-2 rounded-full hover:bg-white/5"
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
