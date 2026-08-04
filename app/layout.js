import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "IT Committee | IIM Bodh Gaya",
  description:
    "The official portal of the IT Committee at IIM Bodh Gaya. Explore upcoming events, meet our team, and register for tech workshops, hackathons, and guest lectures.",
  keywords: [
    "IIM Bodh Gaya",
    "IT Committee",
    "tech events",
    "hackathon",
    "workshops",
    "guest lectures",
  ],
  openGraph: {
    title: "IT Committee | IIM Bodh Gaya",
    description:
      "Empowering Innovation, Driving Digital Excellence — Explore events, meet the team, and register.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1a0a0e] text-[#faf5eb]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
