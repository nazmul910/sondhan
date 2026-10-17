"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Ambulance,
  HeartPulse,
  Hospital,
  Menu,
  NotebookTabs,
  Droplet,
  Stethoscope,
  X,
  User,
  LogOut,
} from "lucide-react";
import DivisionSelect from "./DivisionSelect";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

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

  const handleLogout = async () => {
    await dispatch(logout());
    setMenuOpen(false);
    router.push("/login");
  };

  const displayName = user?.first_name || "অ্যাকাউন্ট";

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_3px_18px_rgba(24,58,72,0.04)]">
      <div className="page-container flex min-h-16 items-center justify-between gap-3 py-2 max-[380px]:gap-1 lg:min-h-22.5 lg:gap-5">
        <Link className="inline-flex shrink-0 items-center gap-2" href="/" aria-label="Shondhan হোম">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-white shadow-md shadow-primary/20">
            <HeartPulse aria-hidden="true" className="size-6" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-xl font-bold tracking-tight text-primary-dark lg:text-[22px]">Shondhan</strong>
            <small className="mt-0.5 whitespace-nowrap text-[10px] md:text-[14px] text-slate-600 max-[380px]:hidden">প্রয়োজনের সময়, Sondhan তখন</small>
          </span>
        </Link>

        <nav aria-label="প্রধান নেভিগেশন" className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex xl:gap-3">
          {navItems.map(({ label, href, Icon }) => {
            const active = isNavItemActive(pathname, href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`group relative flex h-[52px] shrink-0 items-center gap-3 text-[12px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-primary-dark hover:after:scale-x-100 xl:gap-5 xl:text-[16px] ${active ? "text-primary-dark after:scale-x-100" : "text-slate-600"}`}
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

          {isAuthenticated ? (
            <Link
              className="hidden h-9 items-center gap-2 rounded-lg border border-primary/20 bg-primary-soft/60 px-3 text-xs font-bold text-primary-dark transition hover:bg-primary-soft sm:inline-flex"
              href="/account/profile"
            >
              <span className="grid size-5.5 place-items-center overflow-hidden rounded-full bg-primary text-white text-[10px]">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" className="size-full object-cover" src={user.avatar} />
                ) : (
                  <User className="size-3.5" />
                )}
              </span>
              <span className="max-w-[100px] truncate">{displayName}</span>
            </Link>
          ) : (
            <Link
              className="hidden h-9 min-w-[82px] rounded-lg bg-primary px-4 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md sm:inline-flex sm:items-center sm:justify-center"
              href="/login"
            >
              লগইন
            </Link>
          )}

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            className="grid cursor-pointer size-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-primary hover:bg-primary-soft hover:text-primary-dark lg:hidden"
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

        {isAuthenticated && user && (
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-primary-soft/50 p-3">
            <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-primary text-white">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" className="size-full object-cover" src={user.avatar} />
              ) : (
                <User className="size-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-heading">
                {user.first_name} {user.last_name}
              </p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
        )}

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

        {isAuthenticated ? (
          <div className="mt-4 flex flex-col gap-2">
            <Link
              className="grid h-11 place-items-center rounded-lg bg-primary text-sm font-bold text-white transition hover:bg-primary-dark"
              href="/account/profile"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              আমার অ্যাকাউন্ট
            </Link>
            <button
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 text-sm font-bold text-red-600 transition hover:bg-red-50"
              onClick={handleLogout}
              tabIndex={menuOpen ? 0 : -1}
              type="button"
            >
              <LogOut className="size-4" />
              লগআউট করুন
            </button>
          </div>
        ) : (
          <Link
            className="mt-5 grid h-11 place-items-center rounded-lg bg-primary text-sm font-bold text-white transition hover:bg-primary-dark"
            href="/login"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            লগইন করুন
          </Link>
        )}
      </nav>
    </header>
  );
}
