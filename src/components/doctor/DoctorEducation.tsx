import { GraduationCap, Hospital } from "lucide-react";

import type { EducationItem } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

export default function DoctorEducation({ items }: { items: EducationItem[] }) {
  return (
    <SectionCard title="শিক্ষা ও অভিজ্ঞতা">
      <ul>
        {items.map((item, i) => {
          const Icon = i === items.length - 1 ? Hospital : GraduationCap;
          return (
            <li className="flex gap-3.5 border-t border-slate-100 py-3" key={item.title}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-dark">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <strong className="block text-[15px] text-heading">{item.title}</strong>
                <span className="text-[13px] text-slate-500">{item.subtitle}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
