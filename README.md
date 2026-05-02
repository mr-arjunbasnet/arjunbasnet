# Arjun Basnet — Portfolio

Personal portfolio site for **Arjun Basnet** — Project Manager and AI Automation Engineer based in Kathmandu, Nepal.

🌐 Live at [arjun-basnet.com.np](https://arjun-basnet.com.np)

---

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) + React 19
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Typography:** DM Serif Display + Geist Sans (via `next/font/google`)
- **Icons:** [Lucide React](https://lucide.dev)
- **Email:** [Nodemailer](https://nodemailer.com) over SMTP
- **Hosting:** [Vercel](https://vercel.com)

## Pages

| Route | Content |
|-------|---------|
| `/` | Hero, stats, selected work, recognition, CTA |
| `/about` | Story, education + work timeline, skills, certifications, leadership |
| `/work` | Five case studies (Cricket Nepal, LMS, AI workflows, USEF, UWS) |
| `/research` | Peer-reviewed publication, research interests, open questions |
| `/contact` | SMTP-backed contact form + profile links |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form requires SMTP credentials. Copy the template and fill it in:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---------|-------------|
| `SMTP_HOST` | SMTP host (default: `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_SECURE` | `true` for port 465, otherwise `false` |
| `SMTP_USER` | Sending email address |
| `SMTP_PASS` | App password (Gmail App Password recommended) |
| `SMTP_FROM` | "From" address (must match `SMTP_USER` for Gmail) |
| `SMTP_TO` | Where contact submissions are delivered |

## Profile photos

Drop two images into `/public/`:

- `arjun-hero.jpg` — Home page hero
- `arjun-about.jpg` — About page header

If they're missing, the site automatically falls back to a styled "AB" gradient placeholder — never broken.

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo into Vercel
3. Add the SMTP environment variables in Vercel project settings
4. Vercel auto-detects Next.js — no extra config needed

## Build

```bash
npm run build   # production build
npm run start   # serve production build locally
npm run lint    # ESLint
```

---

© Arjun Basnet
