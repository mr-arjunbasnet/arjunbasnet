import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = "https://www.arjun-basnet.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arjun Basnet — Project Manager & AI Automation Engineer",
    template: "%s | Arjun Basnet",
  },
  description:
    "Arjun Basnet — Project Manager and AI Automation Engineer in Kathmandu, Nepal. Specialising in EdTech platforms, business process automation, n8n and Claude workflows, and digital transformation. 100+ projects delivered at Makura Creations, two-time ICC Digital Fan Engagement Award.",
  keywords: [
    "Arjun Basnet",
    "Project Manager Nepal",
    "AI Automation Engineer",
    "Business Process Automation",
    "EdTech Nepal",
    "Learning Management System Nepal",
    "LMS development Nepal",
    "Digital Transformation Consultant",
    "n8n Automation Specialist",
    "Claude API workflows",
    "AI workflow engineer",
    "Makura Creations",
    "Cricket Nepal digital",
    "Kathmandu software developer",
    "PSC TSC preparation platform",
    "Computer vision research Nepal",
    "Agile project manager Nepal",
    "LLM workflow orchestration",
    "Adaptive learning analytics",
  ],
  authors: [{ name: "Arjun Basnet", url: siteUrl }],
  creator: "Arjun Basnet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Arjun Basnet",
    title: "Arjun Basnet — Project Manager & AI Automation Engineer",
    description:
      "Project Manager and AI Automation Engineer in Kathmandu, Nepal — EdTech, n8n, Claude, and digital transformation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Basnet — Project Manager & AI Automation Engineer",
    description:
      "Project Manager and AI Automation Engineer in Kathmandu, Nepal — EdTech, n8n, Claude, and digital transformation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Arjun Basnet",
  givenName: "Arjun",
  familyName: "Basnet",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: "Project Manager & AI Automation Engineer",
  description:
    "Project Manager and AI Automation Engineer in Kathmandu, Nepal. Specialises in EdTech platforms, business process automation, AI workflow orchestration, and digital transformation.",
  email: "mailto:mr.arjunbasnet@gmail.com",
  telephone: "+977-9862694813",
  nationality: "Nepali",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  worksFor: {
    "@type": "Organization",
    name: "Makura Creations Pvt. Ltd.",
    url: "https://makuracreations.com",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Tribhuvan University",
      url: "https://tu.edu.np",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Madan Bhandari Memorial College",
    },
  ],
  sameAs: [
    "https://np.linkedin.com/in/mrarjunbasnet",
    "https://github.com/mr-arjunbasnet",
    "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en",
    "https://www.researchgate.net/profile/Arjun-Basnet-11",
  ],
  knowsAbout: [
    "Project Management",
    "AI Automation",
    "Business Process Automation",
    "Educational Technology",
    "Learning Management Systems",
    "Digital Transformation",
    "n8n Workflow Automation",
    "Claude API",
    "LLM Workflow Orchestration",
    "Prompt Engineering",
    "Computer Vision",
    "Information Systems",
    "Agile Methodology",
    "Scrum",
    "Stakeholder Management",
    "Adaptive Learning Analytics",
    "TensorFlow",
    "PyTorch",
    "Python",
    "Next.js",
    "React",
  ],
  knowsLanguage: ["English", "Nepali"],
  award: [
    "ICC Digital Fan Engagement Award 2023",
    "ICC Digital Fan Engagement Award 2024",
    "Tribhuvan University 60% Merit Scholarship (2018)",
    "Best Table Topics Speaker — Lalitpur Toastmasters Club (3× recipient)",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Arjun Basnet — Project Manager & AI Automation Engineer",
  url: siteUrl,
  description:
    "Portfolio of Arjun Basnet — Project Manager and AI Automation Engineer in Kathmandu, Nepal.",
  inLanguage: "en",
  author: { "@id": `${siteUrl}/#person` },
  publisher: { "@id": `${siteUrl}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#111111]">
        <JsonLd data={personSchema} id="ld-person" />
        <JsonLd data={websiteSchema} id="ld-website" />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}