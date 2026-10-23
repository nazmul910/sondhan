"use client";

import Link from "next/link";
import { Search, ShieldPlus, ArrowRight } from "lucide-react";
import DivisionSelect from "@/components/layout/DivisionSelect";
import Image from "next/image";
import heroImg from "@/assets/home/photo_2026-10-23_21-24-59.jpg"
import heroImg1 from "@/assets/home/photo_2026-10-23_21-25-03.jpg"
import heroImg2 from "@/assets/home/Family Healthcare Hospital Locator.png"

const popularSearches = ["জেনারেল ফিজিশিয়ান", "কার্ডিওলজিস্ট", "গাইনোকোলজিস্ট", "শিশু বিশেষজ্ঞ"];

export default function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-[#effaf7] via-[#f5fbfa] to-[#eef9f6]"
      id="home"
    >
      <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-[60%] h-full">
        <Image
          src={heroImg2}
          alt="hero image"
          className="w-full h-full object-cover"
          
        />

      </div>

      <div className="page-container relative z-20 flex min-h-[340px] items-center py-10 max-md:min-h-[380px] max-md:py-8">
        {/* Search & Links Column */}
        <div className="relative z-10 w-full max-w-[760px]">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary ring-4 ring-primary/10" />
            আপনার সুস্থতার সঙ্গী
          </span>
          <h1 className="mt-3 text-[clamp(34px,4.1vw,52px)] font-bold leading-[1.25] tracking-tight text-heading max-md:text-[clamp(34px,9vw,43px)]">
            প্রয়োজনের স্বাস্থ্যসেবা
            <br />
            <span className="text-primary">এখন হাতের কাছেই</span>
          </h1>
          <p className="mt-2 text-[15px] leading-7 text-slate-600 max-md:max-w-sm max-md:text-[13px]">
            কাছাকাছি ডাক্তার, হাসপাতাল, অ্যাম্বুলেন্স ও প্রয়োজনীয়
            <br className="max-md:hidden" /> স্বাস্থ্যসেবা খুঁজে নিন এক জায়গায়।
          </p>

          <form
            action="#doctors"
            className="mt-6 flex min-h-[58px] w-full max-w-[720px] items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-1.5 pl-4 shadow-[0_12px_30px_rgba(23,33,59,0.09)] ring-1 ring-white/80 max-md:mt-5 max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_auto] max-sm:gap-2 max-sm:p-2"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 max-sm:col-span-2 max-sm:min-h-11 max-sm:border-b max-sm:border-slate-100 max-sm:px-1.5">
              <Search aria-hidden="true" className="size-[22px] shrink-0 text-slate-500" />
              <input
                aria-label="ডাক্তার বা স্বাস্থ্যসেবা খুঁজুন"
                className="min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-slate-400 max-sm:text-xs"
                name="query"
                placeholder="ডাক্তার, হাসপাতাল বা স্বাস্থ্যসেবা খুঁজুন..."
                type="search"
              />
            </label>
            <span aria-hidden="true" className="h-7 w-px shrink-0 bg-slate-200 max-sm:hidden" />
            <DivisionSelect className="h-11 w-[118px] shrink-0 text-sm max-sm:h-10 max-sm:w-[112px] max-sm:px-2 max-sm:text-xs" />
            <button
              aria-label="খুঁজুন"
              className="inline-flex h-11 min-w-[112px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark max-md:min-w-[88px] max-md:gap-1.5 max-md:text-xs max-sm:h-10 max-sm:min-w-[104px]"
              type="submit"
            >
              <Search aria-hidden="true" className="size-[18px]" />
              খুঁজুন
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs max-sm:gap-1.5 max-sm:text-[11px]">
            <strong className="mr-1 text-heading">জনপ্রিয় সার্চ:</strong>
            {popularSearches.map((term) => (
              <a
                className="rounded-full bg-primary/10 px-3 py-2 text-[#55736e] transition hover:bg-white hover:text-primary-dark max-sm:px-2.5 max-sm:py-1.5"
                href="#doctors"
                key={term}
              >
                {term}
              </a>
            ))}
          </div>

          {/* Antivenom Quick Navigation */}
          <Link
            className="mt-5 flex w-full max-w-[720px] items-center gap-3 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 p-3.5 text-left shadow-xs transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
            href="/hospitals?antivenom=true"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-700">
              <ShieldPlus aria-hidden="true" className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-rose-800 sm:text-base">
                অ্যান্টিভেনম কোথায় পাবেন?
              </strong>
              <span className="mt-0.5 block text-xs leading-5 text-slate-600 sm:text-sm">
                অ্যান্টিভেনম আছে এমন হাসপাতাল খুঁজুন
              </span>
            </span>
            <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-rose-700" />
          </Link>
          
        </div>
      </div>
    </section>
  );
}
