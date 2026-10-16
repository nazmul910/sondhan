import Link from "next/link";
import { MapPin, Phone, ShieldAlert } from "lucide-react";
import type { ApiHospitalListItem } from "@/features/hospitals/types";
import HospitalThumb from "./HospitalThumb";

export default function HospitalApiCard({ hospital }: { hospital: ApiHospitalListItem }) {
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
          <div className="flex shrink-0 flex-col items-end gap-1">
            {hospital.has_antivenom && (
              <span className="badge bg-rose-50 text-rose-700">
                <ShieldAlert className="size-3" />
                অ্যান্টিভেনম
              </span>
            )}
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <span className="truncate">{hospital.address}</span>
        </p>

        {hospital.phone && (
          <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
            <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
            {hospital.phone}
          </p>
        )}

        {hospital.away && (
          <p className="text-[13px] text-slate-500">{hospital.away} দূরে</p>
        )}

        <Link className="btn-outline mt-auto min-h-9 text-[13px]" href={href}>
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}
