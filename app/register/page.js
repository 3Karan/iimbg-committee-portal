import RegistrationForm from "@/components/RegistrationForm";

export const metadata = {
  title: "Register | IT Committee - IIM Bodh Gaya",
  description:
    "Register for upcoming events organized by the IT Committee at IIM Bodh Gaya. Join hackathons, workshops, lectures, and more.",
};

export default function RegisterPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event <span className="gradient-gold-text">Registration</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Secure your spot at our upcoming events. Fill in your details below
            and we&apos;ll confirm your registration via email.
          </p>
        </div>

        {/* Registration Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            <RegistrationForm />
          </div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why Register Card */}
            <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-[#f0c75e]">✦</span> Why Register?
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: "🎯",
                    title: "Priority Access",
                    desc: "Get guaranteed entry to high-demand events",
                  },
                  {
                    icon: "📧",
                    title: "Updates & Reminders",
                    desc: "Receive timely event updates and reminders",
                  },
                  {
                    icon: "🏆",
                    title: "Certificates",
                    desc: "Earn participation certificates for workshops",
                  },
                  {
                    icon: "🤝",
                    title: "Networking",
                    desc: "Connect with like-minded peers and industry experts",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#d4a853]/10 to-transparent border border-[#d4a853]/20 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#f0c75e] mb-3">
                Need Help?
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                For queries about events or registration, reach out to us.
              </p>
              <a
                href="mailto:itcommittee@iimbg.ac.in"
                className="text-[#d4a853] hover:text-[#f0c75e] text-sm font-medium transition-colors"
              >
                itcommittee@iimbg.ac.in →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
