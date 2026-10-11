"use client";

import { SORT_OPTIONS } from "@/data/doctorFilters";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";

export default function SortSelect({ value }: { value: string }) {
  const { update, isPending } = useUpdateQuery();

  return (
    <label className="flex items-center gap-2.5 text-[13px]">
      সাজান:
      <select
        className="field h-10 w-auto font-semibold"
        disabled={isPending}
        onChange={(e) => update({ sort: e.target.value === "distance" ? null : e.target.value })}
        value={value}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
