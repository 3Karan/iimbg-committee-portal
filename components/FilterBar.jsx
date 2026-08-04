'use client';

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories = []
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full mb-10 bg-white/[0.03] p-4 rounded-2xl border border-white/10 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-[#ddd0b8]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[#faf5eb] placeholder-[#ddd0b8]/40 focus:outline-none focus:ring-2 focus:ring-[#c5973e]/50 focus:border-[#c5973e] transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#c5973e] to-[#e8be5a] text-[#1a0a0e] shadow-[0_0_15px_rgba(197,151,62,0.3)]'
                : 'bg-white/5 text-[#ddd0b8] hover:bg-white/10 border border-transparent hover:border-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
