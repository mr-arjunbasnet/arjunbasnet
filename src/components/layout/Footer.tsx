import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

const social = [
  { href: "https://np.linkedin.com/in/mrarjunbasnet", label: "LinkedIn" },
  { href: "https://github.com/mr-arjunbasnet", label: "GitHub" },
  { href: "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en", label: "Google Scholar" },
  { href: "https://www.researchgate.net/profile/Arjun-Basnet-11", label: "ResearchGate" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2DDD6] bg-[#FAFAF8] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-semibold text-[#111111] text-lg mb-2">Arjun Basnet</p>
            <p className="text-[#737373] text-sm leading-relaxed">
              Project Manager & AI Automation Engineer.<br />
              Building educational technology for emerging economies.
            </p>
            <p className="text-[#737373] text-sm mt-3">Kathmandu, Nepal</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[#737373] hover:text-[#1A3FA8] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">
              Profiles
            </p>
            <div className="flex flex-col gap-2.5">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#737373] hover:text-[#1A3FA8] transition-colors"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2DDD6] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-[#737373]">
            © {new Date().getFullYear()} Arjun Basnet. All rights reserved.
          </p>
          <a
            href="mailto:mr.arjunbasnet@gmail.com"
            className="text-xs text-[#737373] hover:text-[#1A3FA8] transition-colors"
          >
            mr.arjunbasnet@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}