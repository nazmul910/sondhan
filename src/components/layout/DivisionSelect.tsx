"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, MapPin } from "lucide-react";

const divisions = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
];

export default function DivisionSelect({
  className = "",
  showLocationIcon = true,
  name,
}: {
  className?: string;
  showLocationIcon?: boolean;
  name?: string;
}) {
  return (
    <Select.Root defaultValue="ঢাকা" name={name}>
      <Select.Trigger
        aria-label="বিভাগ নির্বাচন করুন"
        className={`group relative inline-flex min-w-0 flex-none items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-left font-medium text-slate-700 shadow-sm outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/15 data-[placeholder]:text-slate-500 ${className}`}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          {showLocationIcon && <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />}
          <Select.Value />
        </span>
        <Select.Icon>
          <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-slate-500 transition group-data-[state=open]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          align="start"
          className="z-[100] max-h-[min(320px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
          position="popper"
          sideOffset={6}
        >
          <Select.Viewport>
            {divisions.map((division) => (
              <Select.Item
                className="relative flex min-h-10 cursor-pointer select-none items-center rounded-lg py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary-dark data-[state=checked]:font-semibold data-[state=checked]:text-primary-dark"
                key={division}
                value={division}
              >
                <Select.ItemIndicator className="absolute left-3 inline-flex items-center">
                  <Check aria-hidden="true" className="size-4 text-primary" />
                </Select.ItemIndicator>
                <Select.ItemText>{division}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
