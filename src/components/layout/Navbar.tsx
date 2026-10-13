"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Ambulance,
  HeartPulse,
  Hospital,
  Menu,
  NotebookTabs,
  Droplet,
  Stethoscope,
  X,
} from "lucide-react";
import DivisionSelect from "./DivisionSelect";
import Link from "next/link";

const navItems = [
  { label: "হোম", href: "/", Icon: HeartPulse },
  { label: "ডাক্তার", href: "/doctors", Icon: Stethoscope },
  { label: "হাসপাতাল", href: "/hospitals", Icon: Hospital },
  { label: "অ্যাম্বুলেন্স", href: "/ambulances", Icon: Ambulance },
  { label: "রক্ত ব্যাংক", href: "/blood-bank", Icon: Droplet },
  { label: "স্বাস্থ্য টিপস", href: "/health-tips", Icon: NotebookTabs },
];

function isNavItemActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_3px_18px_rgba(24,58,72,0.04)]">
      <div className="page-container flex min-h-16 items-center justify-between gap-3 py-2 max-[380px]:gap-1 lg:min-h-[72px] lg:gap-5">
        <Link className="inline-flex shrink-0 items-center gap-2" href="/" aria-label="Shondhan হোম">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-white shadow-md shadow-primary/20">
            <HeartPulse aria-hidden="true" className="size-6" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-xl font-bold tracking-tight text-primary-dark lg:text-[22px]">Shondhan</strong>
            <small className="mt-0.5 whitespace-nowrap text-[9px] md:text-[12px] text-slate-600 max-[380px]:hidden">প্রয়োজনের সময়ে, ভরসার ঠিকানা</small>
          </span>
        </Link>

        <nav aria-label="প্রধান নেভিগেশন" className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex xl:gap-3">
          {navItems.map(({ label, href, Icon }) => {
            const active = isNavItemActive(pathname, href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`group relative flex h-[52px] shrink-0 items-center gap-1.5 text-[11px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-primary-dark hover:after:scale-x-100 xl:gap-2 xl:text-xs ${active ? "text-primary-dark after:scale-x-100" : "text-slate-600"}`}
                href={href}
                key={label}
              >
                <Icon aria-hidden="true" className="size-[18px] xl:size-5" strokeWidth={2.2} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <DivisionSelect className="max-md:hidden cursor-pointer h-9 w-[104px] text-xs max-[380px]:w-[88px] md:inline-flex sm:w-[118px]" />
          <button className="hidden cursor-pointer h-9 min-w-[82px] rounded-lg bg-primary px-4 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md sm:inline-flex sm:items-center sm:justify-center" type="button">
            লগইন
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            className="grid cursor-pointer size-9 place-items-center cursor-pointer rounded-lg border border-slate-200 text-slate-700 transition hover:border-primary hover:bg-primary-soft hover:text-primary-dark lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5 cursor-pointer" /> : <Menu aria-hidden="true" className="size-5 cursor-pointer" />}
          </button>
        </div>
      </div>

      <button
        aria-label="মেনু বন্ধ করুন"
        className={`mobile-menu-backdrop ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />
      <nav
        aria-label="মোবাইল নেভিগেশন"
        aria-hidden={!menuOpen}
        className={`mobile-menu-drawer ${menuOpen ? "is-open" : ""}`}
        inert={!menuOpen}
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 text-lg font-bold text-slate-900">
          মেনু
          <button
            aria-label="মেনু বন্ধ করুন"
            className="grid size-9 place-items-center cursor-pointer rounded-lg border border-slate-200 transition hover:border-primary hover:text-primary"
            onClick={() => setMenuOpen(false)}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        {navItems.map(({ label, href, Icon }) => {
          const active = isNavItemActive(pathname, href);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 items-center gap-4 border-b border-slate-100 px-1 text-base font-semibold transition hover:translate-x-1 hover:text-primary-dark ${active ? "text-primary-dark" : "text-slate-600"}`}
              href={href}
              key={label}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <Icon aria-hidden="true" className="size-5" />
              {label}
            </Link>
          );
        })}
        <button className="mt-5 h-11 cursor-pointer rounded-lg bg-primary text-sm font-bold text-white transition hover:bg-primary-dark" type="button">
          লগইন করুন
        </button>
      </nav>
    </header>
  );
}
