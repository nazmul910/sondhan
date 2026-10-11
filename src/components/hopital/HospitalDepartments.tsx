import SectionCard from "@/components/shared/SectionCard";
import { DEPARTMENT_LABELS } from "@/data/hospitalOpiton";
import type { DepartmentKey } from "@/types/hospital";

export default function HospitalDepartments({ departments }: { departments: DepartmentKey[] }) {
  return (
    <SectionCard title="বিভাগসমূহ">
      <ul className="flex flex-wrap gap-2.5">
        {departments.map((d) => (
          <li className="rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary-dark" key={d}>
            {DEPARTMENT_LABELS[d]}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
