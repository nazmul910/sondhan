import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, HeartPulse } from "lucide-react";

type Props = { children: ReactNode; points: string[]; showBack?: boolean; title: string };

export default function AuthShell({ children, points, showBack = false, title }: Props) {
  return (
    <main className="min-h-svh bg-[#f3f8f7]">
      <div className="mx-auto flex min-h-svh w-full max-w-[1160px] items-center p-0 sm:p-6 lg:p-10">
        <div className="flex min-h-svh w-full overflow-hidden bg-white sm:min-h-0 sm:rounded-3xl sm:border sm:border-slate-200 sm:shadow-[0_20px_50px_rgba(23,33,59,0.12)] lg:min-h-[690px]">
          <aside className="hidden basis-[42%] flex-col justify-center gap-8 bg-gradient-to-br from-[#4d8c89] to-[#326f70] p-10 text-white md:flex lg:p-12">
            <span className="flex items-center gap-2.5 text-xl font-bold">
              <span className="grid size-11 place-items-center rounded-full bg-white/15">
                <HeartPulse aria-hidden="true" className="size-6" />
              </span>
              Shondhan
            </span>
            <div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-snug">{title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/80">
                প্রয়োজনের সময়ে, ভরসার ঠিকানা—আপনার স্বাস্থ্যসেবার সবকিছু এক জায়গায়।
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {points.map((point) => (
                <li className="flex items-center gap-3 text-[15px] text-white/95" key={point}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.6} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </aside>

          <section className={`relative flex min-w-0 flex-1 flex-col justify-center px-5 pb-8 sm:px-8 sm:py-10 lg:px-12 ${showBack ? "pt-8" : "pt-14 md:pt-10"}`}>
            {showBack && (
              <Link aria-label="লগইন পেজে ফিরে যান" className="mb-5 inline-flex size-7 items-center text-[#477f82] md:absolute md:left-8 md:top-8 lg:left-12" href="/login">
                <ArrowLeft aria-hidden="true" className="size-6" />
              </Link>
            )}
            <div className="mx-auto w-full max-w-[440px]">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
