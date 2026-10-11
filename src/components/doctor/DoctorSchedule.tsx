import Link from "next/link";
import { Hospital } from "lucide-react";

import type { Doctor } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

export default function DoctorSchedule({ doctor }: { doctor: Doctor }) {
  return (
    <SectionCard title="চেম্বার ও সময়সূচী">
      <div className="flex items-center gap-3 pb-3.5">
        <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Hospital aria-hidden="true" className="size-7" />
        </span>
        <div>
          <Link className="block text-[15px] font-bold text-heading hover:text-primary-dark" href={`/hospitals/${doctor.hospitalId}`}>
            {doctor.hospitalName}
          </Link>
          <span className="text-[13px] text-slate-500">{doctor.address}</span>
        </div>
      </div>
      <dl>
        {doctor.schedule.map((s) => (
          <div className="flex justify-between gap-3 border-t border-slate-100 py-3 text-sm" key={s.days}>
            <dt className="font-semibold text-slate-700">{s.days}</dt>
            <dd className={s.time ? "text-slate-600" : "text-red-700"}>{s.time ?? "বন্ধ"}</dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
