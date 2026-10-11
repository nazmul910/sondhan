import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";
import Rating from "@/components/shared/Rating";
import { DEPARTMENT_LABELS, HOSPITAL_TYPE_LABELS } from "@/data/hospitalOpiton";
import { formatDistance } from "@/lib/format";
import type { Hospital } from "@/types/hospital";
import HospitalThumb from "./HospitalThumb";

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  const href = `/hospitals/${hospital.id}`;

  return (
    <article className="card card-interactive flex gap-3.5 p-3.5 sm:gap-4 sm:p-4">
      <Link href={href} tabIndex={-1}>
        <HospitalThumb />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold leading-snug text-heading sm:text-base">
            <Link href={href}>{hospital.name}</Link>
          </h3>
          <span className="badge shrink-0 bg-indigo-50 text-indigo-700">{HOSPITAL_TYPE_LABELS[hospital.type]}</span>
        </div>
        <Rating count={hospital.reviewCount} value={hospital.rating} />
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <span className="truncate">{hospital.address}</span>
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <Clock3 aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {formatDistance(hospital.distanceKm)} দূরে
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {hospital.departments.slice(0, 3).map((d) => (
            <li className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-600" key={d}>
              {DEPARTMENT_LABELS[d]}
            </li>
          ))}
        </ul>
        <Link className="btn-outline mt-auto min-h-9 text-[13px]" href={href}>
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}
