"use client";

import { CheckboxGroup, FilterPanel, RadioGroup, toggleValue } from "@/components/shared/FilterControls";
import { RATING_OPTIONS } from "@/data/listOptions";
import { DEPARTMENT_KEYS, DEPARTMENT_LABELS, FACILITY_KEYS, FACILITY_LABELS } from "@/data/hospitalOpiton";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import type { DepartmentKey, FacilityKey, HospitalQuery } from "@/types/hospital";

const departmentOptions = DEPARTMENT_KEYS.map((key) => ({ value: key, label: DEPARTMENT_LABELS[key] }));
const facilityOptions = FACILITY_KEYS.map((key) => ({ value: key, label: FACILITY_LABELS[key] }));

export default function HospitalFilters({ query }: { query: HospitalQuery }) {
  const { update, isPending } = useUpdateQuery();

  const keep = new URLSearchParams();
  if (query.q) keep.set("q", query.q);
  if (query.type) keep.set("type", query.type);
  const resetHref = keep.toString() ? `/hospitals?${keep}` : "/hospitals";

  return (
    <FilterPanel pending={isPending} resetHref={resetHref}>
      <CheckboxGroup
        onToggle={(v) => update({ department: toggleValue(query.departments, v as DepartmentKey) })}
        options={departmentOptions}
        selected={query.departments}
        title="বিভাগ"
      />
      <CheckboxGroup
        onToggle={(v) => update({ facility: toggleValue(query.facilities, v as FacilityKey) })}
        options={facilityOptions}
        selected={query.facilities}
        title="সুবিধা"
      />
      <RadioGroup
        name="rating"
        onChange={(v) => update({ rating: v || null })}
        options={RATING_OPTIONS}
        title="রেটিং"
        value={query.minRating === null ? "" : String(query.minRating)}
      />
    </FilterPanel>
  );
}
