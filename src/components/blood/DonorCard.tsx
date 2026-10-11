import { Droplet, MapPin, Phone } from "lucide-react";
import { BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { formatLastDonation } from "@/lib/donors";
import type { Donor } from "@/types/blood";

export default function DonorCard({ donor }: { donor: Donor }) {
  const callStyle = "grid size-11 shrink-0 place-items-center rounded-full bg-blood text-white shadow-md shadow-blood/25 transition hover:bg-blood-dark";

  return (
    <article className="card card-interactive flex items-center gap-3.5 p-4">
      <div className="grid size-[68px] shrink-0 place-items-center rounded-2xl bg-blood-soft text-[22px] font-bold text-blood">{BLOOD_GROUP_LABELS[donor.bloodGroup]}</div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-bold leading-snug text-heading">{donor.name}</h3>
          <span className={`badge shrink-0 ${donor.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{donor.available ? "প্রস্তুত" : "এখন নয়"}</span>
        </div>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {donor.area}, ঢাকা
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <Droplet aria-hidden="true" className="size-4 shrink-0 text-primary" />
          শেষ রক্তদান: {formatLastDonation(donor.lastDonatedMonthsAgo)}
        </p>
      </div>

      {donor.phone ? (
        <a aria-label={`${donor.name}-কে কল করুন`} className={callStyle} href={`tel:${donor.phone}`}>
          <Phone aria-hidden="true" className="size-5" />
        </a>
      ) : (
        <span aria-disabled="true" aria-label="ফোন নম্বর শীঘ্রই যোগ হবে" className={`${callStyle} cursor-not-allowed opacity-50 hover:bg-blood`} title="ফোন নম্বর শীঘ্রই যোগ হবে">
          <Phone aria-hidden="true" className="size-5" />
        </span>
      )}
    </article>
  );
}
