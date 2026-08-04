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
          <h1 className="text-4xl md:text-5xl font-bold text-[#faf5eb] mb-4">
            Event <span className="gradient-gold-text">Registration</span>
          </h1>
          <p className="text-[#ddd0b8]/70 text-lg max-w-2xl mx-auto">
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
              <h3 className="text-xl font-bold text-[#faf5eb] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#e8be5a]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg> Why Register?
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <svg className="w-6 h-6 text-[#c5973e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
                    title: "Priority Access",
                    desc: "Get guaranteed entry to high-demand events",
                  },
                  {
                    icon: <svg className="w-6 h-6 text-[#c5973e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    title: "Updates & Reminders",
                    desc: "Receive timely event updates and reminders",
                  },
                  {
                    icon: <svg className="w-6 h-6 text-[#c5973e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: "Certificates",
                    desc: "Earn participation certificates for workshops",
                  },
                  {
                    icon: <svg className="w-6 h-6 text-[#c5973e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                    title: "Networking",
                    desc: "Connect with like-minded peers and industry experts",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-[#faf5eb] font-medium">{item.title}</p>
                      <p className="text-[#ddd0b8]/70 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#c5973e]/10 to-transparent border border-[#c5973e]/20 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#e8be5a] mb-3">
                Need Help?
              </h3>
              <p className="text-[#ddd0b8] text-sm mb-4">
                For queries about events or registration, reach out to us.
              </p>
              <a
                href="mailto:itcommittee@iimbg.ac.in"
                className="text-[#c5973e] hover:text-[#e8be5a] text-sm font-medium transition-colors"
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
