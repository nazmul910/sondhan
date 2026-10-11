"use client";

import { MapPin } from "lucide-react";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";

type Props = { param: string; label: string; allLabel: string; options: string[]; value: string | null };

/** Dropdown that writes one value into the URL (e.g. ?area=মিরপুর). */
export default function FilterSelect({ param, label, allLabel, options, value }: Props) {
  const { update, isPending } = useUpdateQuery();

  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <MapPin aria-hidden="true" className="pointer-events-none absolute left-3 size-4 text-primary" />
      <select className="field h-10 w-auto pl-9 font-semibold" disabled={isPending} onChange={(e) => update({ [param]: e.target.value || null })} value={value ?? ""}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
