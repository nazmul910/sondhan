import { MapPin, Phone, Siren, Droplet } from "lucide-react";
import CallButton from "@/components/shared/CallButton";
import type { BloodBank } from "@/features/bloodBanks/bloodBankApi";

export default function BloodBankCard({ bank }: { bank: BloodBank }) {
  return (
    <article className="card card-interactive flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blood/10 text-blood">
          <Droplet aria-hidden="true" className="size-6 fill-current" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold leading-snug text-heading">{bank.name}</h3>
          {bank.is_emergency && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
              <Siren aria-hidden="true" className="size-3.5" />
              জরুরি সেবা
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-slate-600">
        <p className="flex items-start gap-2">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{bank.address}, {bank.district}</span>
        </p>
        {bank.away && <p className="pl-6 text-xs text-slate-500">দূরত্ব: {bank.away}</p>}
        <p className="flex items-center gap-2">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {bank.phone}
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-slate-500">রক্তের গ্রুপ</p>
        <ul aria-label="রক্তের গ্রুপ" className="flex flex-wrap gap-2">
          {bank.blood_groups.map((group) => (
            <li className="rounded-lg bg-blood/10 px-2.5 py-1 text-xs font-bold text-blood-dark" key={group}>
              {group}
            </li>
          ))}
        </ul>
      </div>

      <CallButton className="mt-auto min-h-10 text-[13px]" label="কল করুন" phone={bank.phone} variant="danger" />
    </article>
  );
}
