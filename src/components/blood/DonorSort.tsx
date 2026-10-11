"use client";

import { BLOOD_SORT_OPTIONS } from "@/data/bloodOptions";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import type { BloodSort } from "@/types/blood";

export default function DonorSort({ value }: { value: BloodSort }) {
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
        {BLOOD_SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
