import Link from "next/link";
import { ArrowRight, HeartPulse, Phone } from "lucide-react";

const columns = [
  {
    title: "সেবা",
    links: [
      ["ডাক্তার", "/doctors"],
      ["হাসপাতাল", "/hospitals"],
      ["অ্যাম্বুলেন্স", "/ambulance"],
      ["রক্ত ব্যাংক", "/blood-bank"],
      ["এআই সহকারী", "/ai-assistant"],
    ],
  },
  {
    title: "অ্যাকাউন্ট",
    links: [
      ["লগইন", "/login"],
      ["রেজিস্ট্রেশন", "/register"],
      ["মেডিকেল রিপোর্ট", "/account/reports"],
      ["প্রিয় ডাক্তার", "/account/favorites"],
    ],
  },
  {
    title: "সহায়তা",
    links: [
      ["হেল্প সেন্টার", "/help"],
      ["যোগাযোগ", "/contact"],
      ["গোপনীয়তা নীতি", "/privacy"],
    ],
  },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.5-1.5h1.7V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.9H7v3.1h2.7v8h3.8Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect height="16" rx="4.5" width="16" x="4" y="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.8" fill="currentColor" r="1" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: (
      <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer aria-label="ফুটার" className="relative mt-auto overflow-hidden bg-heading text-slate-300">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="page-container grid gap-10 py-12 grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 lg:py-14">
        <div className="max-w-sm">
          <Link aria-label="Shondhan হোম" className="group inline-flex items-center gap-2.5" href="/">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <HeartPulse aria-hidden="true" className="size-5" strokeWidth={2.4} />
            </span>
            <span className="text-[22px] font-bold tracking-tight text-white">Shondhan</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">
            কাছাকাছি ডাক্তার, হাসপাতাল, অ্যাম্বুলেন্স ও রক্ত ব্যাংক — সবকিছু এক জায়গায়।
          </p>

          <div className="mt-5 flex items-center gap-2.5" aria-label="সোশ্যাল মিডিয়া">
            {socials.map(({ label, href, icon }) => (
              <a
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary hover:text-white focus-visible:outline-white"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                {icon}
              </a>
            ))}
          </div>

          <a
            className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 transition duration-200 hover:border-primary/50 hover:bg-white/[0.08]"
            href="tel:999"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
              <Phone aria-hidden="true" className="size-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-slate-400">জরুরি অ্যাম্বুলেন্স</span>
              <span className="text-base font-bold tracking-wide text-white">999</span>
            </span>
          </a>
        </div>

        {columns.map((col) => (
          <nav aria-label={col.title} className="flex flex-col items-start gap-3" key={col.title}>
            <h2 className="mb-1 text-sm font-bold text-white">{col.title}</h2>
            {col.links.map(([label, href]) => (
              <Link
                className="group inline-flex items-center gap-1.5 text-[13px] text-slate-300 transition duration-200 hover:translate-x-1 hover:text-white focus-visible:text-white"
                href={href}
                key={href}
              >
                {label}
                <ArrowRight aria-hidden="true" className="size-3 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="page-container flex min-h-14 flex-col items-center justify-center gap-2 py-3 text-center text-xs text-slate-400 sm:flex-row sm:justify-between">
          <p>© 2026 Shondhan। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>আপনার সুস্থতাই আমাদের অঙ্গীকার</p>
        </div>
      </div>
    </footer>
  );
}
