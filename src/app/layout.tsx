import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

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

const siteUrl = "https://arjun-basnet.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arjun Basnet — Project Manager & AI Automation Engineer",
    template: "%s | Arjun Basnet",
  },
  description:
    "Arjun Basnet is a Project Manager and AI Automation Engineer based in Kathmandu, Nepal. He leads EdTech platforms, digital transformation projects, and AI automation workflows at Makura Creations.",
  keywords: [
    "Arjun Basnet",
    "Project Manager Nepal",
    "AI Automation Engineer",
    "EdTech Nepal",
    "Learning Management System Nepal",
    "Makura Creations",
    "Cricket Nepal digital",
    "n8n automation",
    "Claude API workflows",
    "Kathmandu software developer",
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
      "Building educational technology for Nepal that teachers actually use and students can learn from.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arjun Basnet — Project Manager & AI Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Basnet — Project Manager & AI Automation Engineer",
    description:
      "Building educational technology for Nepal that teachers actually use and students can learn from.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: siteUrl,
  },
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
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}