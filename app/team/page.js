import TeamCard from "@/components/TeamCard";
import teamData from "@/data/team.json";

export const metadata = {
  title: "Our Team | IT Committee - IIM Bodh Gaya",
  description:
    "Meet the dedicated members of the IT Committee at IIM Bodh Gaya driving digital innovation on campus.",
};

export default function TeamPage() {


  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#faf5eb] mb-4">
            Meet Our <span className="gradient-gold-text">Team</span>
          </h1>
          <p className="text-[#ddd0b8]/70 text-lg max-w-2xl mx-auto">
            Seventeen students. One committee.<br />
            The people behind every platform, poster, and production across campus.
          </p>
        </div>



        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
