import TeamCard from "@/components/TeamCard";
import teamData from "@/data/team.json";

export const metadata = {
  title: "Our Team | IT Committee - IIM Bodh Gaya",
  description:
    "Meet the dedicated members of the IT Committee at IIM Bodh Gaya driving digital innovation on campus.",
};

export default function TeamPage() {
  // Separate chairperson for featured display
  const chairperson = teamData.find(
    (m) => m.role === "Chairperson"
  );
  const otherMembers = teamData.filter(
    (m) => m.role !== "Chairperson"
  );

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="gradient-gold-text">Team</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            The passionate individuals behind the IT Committee who are dedicated
            to empowering innovation and digital excellence at IIM Bodh Gaya.
          </p>
        </div>

        {/* Featured Chairperson */}
        {chairperson && (
          <div className="max-w-sm mx-auto mb-16">
            <TeamCard member={chairperson} />
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a853]/30 to-transparent"></div>
          <span className="text-sm text-[#d4a853] font-medium tracking-wider uppercase">
            Committee Members
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a853]/30 to-transparent"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {otherMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
