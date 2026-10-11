import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { BLOOD_MODES } from "@/data/bloodOptions";
import { buildQuery, type RawSearchParams } from "@/lib/query";
import type { DonorQuery } from "@/types/blood";
import BloodGroupPicker from "./BloodGroupPicker";

export default function BloodHero({ query, params }: { query: DonorQuery; params: RawSearchParams }) {
  return (
    <section className="hero-blood">
      <div className="page-container py-8 sm:py-9">
        <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "রক্ত ব্যাংক" }]} />
        <h1 className="mt-3 text-[clamp(30px,4vw,44px)] font-bold leading-[1.25] tracking-tight text-heading">
          রক্ত খুঁজুন বা <span className="text-blood">ডোনার হোন</span>
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-7 text-slate-600">রক্তের গ্রুপ ও এলাকা অনুযায়ী ডোনার ও ব্লাড ব্যাংক খুঁজে নিন।</p>

        <div className="mt-5 flex flex-wrap gap-3" role="tablist">
          {BLOOD_MODES.map((m) => {
            const active = query.mode === m.value;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-lg border px-5 text-sm font-bold transition ${
                  active ? "border-blood bg-blood text-white" : "border-pink-200 bg-white text-blood-dark hover:border-blood"
                }`}
                href={`/blood-bank${buildQuery(params, { mode: m.value === "find" ? null : m.value, page: null })}`}
                key={m.value}
                scroll={false}
              >
                {m.label}
              </Link>
            );
          })}
        </div>

        {query.mode === "find" && (
          <div className="mt-5">
            <BloodGroupPicker current={query.group} params={params} />
          </div>
        )}
      </div>
    </section>
  );
}
