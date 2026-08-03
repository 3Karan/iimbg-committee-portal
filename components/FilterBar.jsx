'use client';

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories = []
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full mb-10 bg-white/[0.02] p-4 rounded-2xl border border-white/10 backdrop-blur-md">
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-slate-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#d4a853] to-[#f0c75e] text-[#0a1628] shadow-[0_0_15px_rgba(212,168,83,0.3)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent hover:border-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
