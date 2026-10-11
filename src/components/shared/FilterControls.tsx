"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

type Option = { value: string; label: string };

/** Card shell for a filter sidebar: collapsible on mobile, sticky on desktop. */
export function FilterPanel({ resetHref, pending, children }: { resetHref: string; pending: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(false); // mobile only; desktop is always visible

  return (
    <aside aria-label="ফিল্টার" className="mb-5 lg:sticky lg:top-24 lg:mb-0 lg:w-[270px] lg:shrink-0">
      <button aria-expanded={open} className="btn-outline w-full lg:hidden" onClick={() => setOpen((v) => !v)} type="button">
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        ফিল্টার
      </button>

      <div
        aria-busy={pending}
        className={`card mt-3 flex-col gap-5 p-5 transition-opacity lg:mt-0 lg:flex ${open ? "flex" : "hidden"} ${pending ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between">
          <strong className="text-[17px] text-heading">ফিল্টার</strong>
          <Link className="text-xs font-semibold text-primary-dark" href={resetHref}>
            রিসেট
          </Link>
        </div>
        {children}
      </div>
    </aside>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2.5 text-[13px] font-bold text-heading">{title}</legend>
      {children}
    </fieldset>
  );
}

export function CheckboxGroup({ title, options, selected, onToggle }: { title: string; options: Option[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <Group title={title}>
      {options.map((o) => (
        <label className="flex min-h-7 items-center gap-2.5 text-sm text-slate-700" key={o.value}>
          <input checked={selected.includes(o.value)} className="field-check" onChange={() => onToggle(o.value)} type="checkbox" />
          {o.label}
        </label>
      ))}
    </Group>
  );
}

export function RadioGroup({ title, name, options, value, onChange }: { title: string; name: string; options: readonly Option[]; value: string; onChange: (value: string) => void }) {
  return (
    <Group title={title}>
      {options.map((o) => (
        <label className="flex min-h-7 items-center gap-2.5 text-sm text-slate-700" key={o.value}>
          <input checked={value === o.value} className="field-check" name={name} onChange={() => onChange(o.value)} type="radio" />
          {o.label}
        </label>
      ))}
    </Group>
  );
}

export function ChipGroup({ title, options, value, onChange }: { title: string; options: readonly Option[]; value: string; onChange: (value: string) => void }) {
  return (
    <Group title={title}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button aria-pressed={value === o.value} className={value === o.value ? "chip chip-active" : "chip"} key={o.value} onClick={() => onChange(o.value)} type="button">
            {o.label}
          </button>
        ))}
      </div>
    </Group>
  );
}

/** Add/remove one value from a multi-value list. */
export const toggleValue = <T extends string>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
