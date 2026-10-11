import { Check } from "lucide-react";
import SectionCard from "@/components/shared/SectionCard";

export default function HospitalServices({ services }: { services: string[] }) {
  return (
    <SectionCard title="সেবাসমূহ">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5">
        {services.map((s) => (
          <li className="flex items-center gap-2.5 text-sm text-slate-700" key={s}>
            <Check aria-hidden="true" className="size-[18px] shrink-0 text-primary" strokeWidth={2.6} />
            {s}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
