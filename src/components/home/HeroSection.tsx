"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShieldPlus, ArrowRight, Sparkles, Bot, MessageSquare } from "lucide-react";
import DivisionSelect from "@/components/layout/DivisionSelect";
import { useAiChat } from "@/hooks/useAiChat";
import AiLoginModal from "@/components/chat/AiLoginModal";

const popularSearches = ["জেনারেল ফিজিশিয়ান", "কার্ডিওলজিস্ট", "গাইনোকোলজিস্ট", "শিশু বিশেষজ্ঞ"];

export default function HeroSection() {
  const { handleOpenAiChat, showLoginModal, setShowLoginModal } = useAiChat();

  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-gradient-to-r from-[#effaf7] via-[#f5fbfa] to-[#eef9f6]"
        id="home"
      >
        <div className="page-container relative flex min-h-[380px] items-center justify-between gap-8 py-10 max-md:min-h-[420px] max-md:items-start max-md:py-8 lg:gap-12">
          {/* Left Column: Search & Links */}
          <div className="relative z-10 w-full max-w-[760px] lg:max-w-[620px] xl:max-w-[680px]">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary ring-4 ring-primary/10" />
              আপনার সুস্থতার সঙ্গী
            </span>
            <h1 className="mt-3 text-[clamp(34px,4.1vw,52px)] font-bold leading-[1.25] tracking-tight text-heading max-md:text-[clamp(34px,9vw,43px)]">
              আপনার প্রয়োজনের
              <br />
              <span className="text-primary">স্বাস্থ্যসেবা খুঁজুন</span>
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-slate-600 max-md:max-w-sm max-md:text-[13px]">
              কাছাকাছি ডাক্তার, হাসপাতাল, অ্যাম্বুলেন্স ও প্রয়োজনীয়
              <br className="max-md:hidden" /> স্বাস্থ্যসেবা খুঁজে নিন এক জায়গায়।
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
              <strong className="mr-1 text-heading">জনপ্রিয় সার্চ:</strong>
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

            {/* Mobile AI Assistant Trigger Card */}
            <div className="mt-3.5 flex w-full max-w-[720px] items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-3.5 shadow-xs lg:hidden">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-primary/30 bg-white p-0.5 shadow-xs">
                  <Image
                    src="/assets/ai-robot.jpg"
                    alt="AI সহকারী"
                    width={44}
                    height={44}
                    className="size-full rounded-lg object-cover"
                  />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-sm font-bold text-heading">AI স্বাস্থ্য সহকারী</strong>
                  <span className="block truncate text-xs text-slate-600">
                    লক্ষণ বা এন্টিভেনম তথ্য জানতে সরাসরি কথা বলুন
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenAiChat}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary-dark active:scale-95"
              >
                <Sparkles className="size-3.5" />
                AI সহকারী
              </button>
            </div>
          </div>

          {/* Right Column: Premium AI Assistant Robot Showcase (Desktop/Tablet) */}
          <div className="relative z-10 hidden flex-1 items-center justify-center lg:flex">
            <div className="relative w-full max-w-[390px] rounded-3xl border border-emerald-200/80 bg-white/85 p-6 shadow-[0_20px_50px_rgba(7,139,124,0.12)] backdrop-blur-md">
              {/* Subtle ambient decorative gradient background glow */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -right-6 -z-10 size-56 rounded-full bg-primary/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 -z-10 size-56 rounded-full bg-teal-200/30 blur-3xl"
              />

              {/* Floating Top Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/70">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  ২৪/৭ এআই সেবা সক্রিয়
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Bot className="size-3.5 text-primary" />
                  Smart Health
                </span>
              </div>

              {/* Central Robot Graphic */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="group relative size-56 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-teal-50/30 p-2 shadow-inner transition hover:scale-[1.02]">
                  <Image
                    src="/assets/ai-robot.jpg"
                    alt="Sondhan AI Robot Assistant"
                    width={224}
                    height={224}
                    priority
                    className="size-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </div>

              {/* Robot Info & Interactive Button */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-heading">
                  সন্ধান AI স্বাস্থ্য সহকারী
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  লক্ষণ অনুযায়ী বিশেষজ্ঞ ডাক্তার পরামর্শ ও তাৎক্ষণিক এন্টিভেনম মজুত তথ্য জানতে সরাসরি কথা বলুন।
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleOpenAiChat}
                    className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 px-4 text-sm font-bold text-white shadow-md shadow-primary/25 transition duration-200 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="size-4 animate-spin [animation-duration:4s]" />
                    <span>AI সহকারী</span>
                    <MessageSquare className="size-4 ml-1 opacity-80 group-hover:translate-x-0.5 transition" />
                  </button>

                  <p className="text-[11px] text-slate-400">
                    লগইন করে যেকোনো সময় বিনামূল্যে পরামর্শ নিন
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Prompt Modal for Unauthenticated Users */}
      <AiLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
