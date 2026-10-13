import type { ReactNode } from "react";
import { Check, HeartPulse } from "lucide-react";

type Props = { title: string; points: string[]; children: ReactNode };

/** Split card used by login and register: brand panel on the left, form on the right. */
export default function AuthShell({ title, points, children }: Props) {
  return (
    <main className="hero-gradient">
      <div className="page-container py-10 sm:py-14">
        <div className="mx-auto flex max-w-[1000px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(23,33,59,0.12)]">
          <aside className="hidden basis-[42%] flex-col justify-center gap-6 bg-gradient-to-br from-primary to-primary-dark p-10 text-white md:flex">
            <span className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center rounded-full bg-white/15">
                <HeartPulse aria-hidden="true" className="size-6" />
              </span>
              Shondhan
            </span>
            <h2 className="text-[28px] font-bold leading-snug">{title}</h2>
            <ul className="flex flex-col gap-3.5">
              {points.map((point) => (
                <li className="flex items-center gap-3 text-[15px]" key={point}>
                  <Check aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.6} />
                  {point}
                </li>
              ))}
            </ul>
          </aside>

          <section className="min-w-0 flex-1 p-6 sm:p-10">{children}</section>
        </div>
      </div>
    </main>
  );
}
