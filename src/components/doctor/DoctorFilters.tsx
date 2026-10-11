"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { GENDER_OPTIONS, RATING_OPTIONS } from "@/data/doctorFilters";
import { SPECIALTY_KEYS, SPECIALTY_LABELS } from "@/data/specialties";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import type { DoctorQuery, SpecialtyKey } from "@/types/doctor";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2.5 text-[13px] font-bold text-heading">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function DoctorFilters({ query }: { query: DoctorQuery }) {
  const { update, isPending } = useUpdateQuery();
  const [open, setOpen] = useState(false); // mobile only; desktop is always visible

  const toggleSpecialty = (key: SpecialtyKey) => {
    const next = query.specialties.includes(key) ? query.specialties.filter((s) => s !== key) : [...query.specialties, key];
    update({ specialty: next });
  };

  return (
    <aside aria-label="ফিল্টার" className="mb-5 lg:sticky lg:top-24 lg:mb-0 lg:w-[270px] lg:shrink-0">
      <button
        aria-expanded={open}
        className="btn-outline w-full lg:hidden"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        ফিল্টার
      </button>

      <div
        aria-busy={isPending}
        className={`card mt-3 flex-col gap-5 p-5 transition-opacity lg:mt-0 lg:flex ${open ? "flex" : "hidden"} ${isPending ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between">
          <strong className="text-[17px] text-heading">ফিল্টার</strong>
          <Link className="text-xs font-semibold text-primary-dark" href={query.q ? `/doctors?q=${encodeURIComponent(query.q)}` : "/doctors"}>
            রিসেট
          </Link>
        </div>

        <Group title="বিশেষত্ব">
          {SPECIALTY_KEYS.map((key) => (
            <label className="flex min-h-7 items-center gap-2.5 text-sm text-slate-700" key={key}>
              <input checked={query.specialties.includes(key)} className="field-check" onChange={() => toggleSpecialty(key)} type="checkbox" />
              {SPECIALTY_LABELS[key]}
            </label>
          ))}
        </Group>

        <Group title="রেটিং">
          {RATING_OPTIONS.map((o) => (
            <label className="flex min-h-7 items-center gap-2.5 text-sm text-slate-700" key={o.value}>
              <input
                checked={(query.minRating === null ? "" : String(query.minRating)) === o.value}
                className="field-check"
                name="rating"
                onChange={() => update({ rating: o.value || null })}
                type="radio"
              />
              {o.label}
            </label>
          ))}
        </Group>

        <Group title="লিঙ্গ">
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((o) => (
              <button
                aria-pressed={(query.gender ?? "") === o.value}
                className={(query.gender ?? "") === o.value ? "chip chip-active" : "chip"}
                key={o.value}
                onClick={() => update({ gender: o.value || null })}
                type="button"
              >
                {o.label}
              </button>
            ))}
          </div>
        </Group>
      </div>
    </aside>
  );
}
