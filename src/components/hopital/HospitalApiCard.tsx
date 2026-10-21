import Link from "next/link";
import { MapPin, Phone, ShieldCheck, ShieldAlert } from "lucide-react";
import type { ApiHospitalListItem } from "@/features/hospitals/types";
import HospitalThumb from "./HospitalThumb";

export default function HospitalApiCard({ hospital }: { hospital: ApiHospitalListItem }) {
  const href = `/hospitals/${hospital.id}`;

  return (
    <article className="card card-interactive flex flex-col justify-between p-4 sm:p-4.5 gap-3.5">
      <div className="flex gap-3.5 sm:gap-4">
        <Link href={href} tabIndex={-1} className="shrink-0">
          <HospitalThumb src={hospital.image} alt={hospital.name} />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-heading sm:text-base hover:text-primary transition">
              <Link href={href}>{hospital.name}</Link>
            </h3>
          </div>

          <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
            <span className="truncate">{hospital.address}</span>
          </p>

          {hospital.phone && (
            <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <span>{hospital.phone}</span>
            </p>
          )}

          {hospital.away && (
            <p className="text-[12px] text-slate-500 font-medium">
              দূরত্ব: {hospital.away}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-auto">
        {/* Antivenom availability status: available or not available */}
        <div>
          {hospital.has_antivenom ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <ShieldCheck className="size-3.5 shrink-0 text-emerald-600" />
              অ্যান্টিভেনম: উপলব্ধ
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
              <ShieldAlert className="size-3.5 shrink-0 text-slate-400" />
              অ্যান্টিভেনম: নেই
            </span>
          )}
        </div>

        <Link
          className="btn-outline min-h-8.5 px-3 text-xs font-bold"
          href={href}
        >
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}
