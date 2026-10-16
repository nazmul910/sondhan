import { MapPin, Phone, Siren, Droplet, ExternalLink } from "lucide-react";
import CallButton from "@/components/shared/CallButton";
import type { BloodBank } from "@/features/bloodBanks/bloodBankApi";

export default function BloodBankCard({ bank }: { bank: BloodBank }) {
  const mapUrl = `https://www.openstreetmap.org/?mlat=${bank.latitude}&mlon=${bank.longitude}#map=16/${bank.latitude}/${bank.longitude}`;

  return (
    <article className="card card-interactive flex flex-col gap-4 overflow-hidden p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-50 text-blood">
          <Droplet aria-hidden="true" className="size-6 fill-current" strokeWidth={1.7} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold leading-snug text-heading">{bank.name}</h3>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              bank.is_emergency ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            <Siren aria-hidden="true" className="size-3.5" />
            {bank.is_emergency ? "জরুরি সেবা" : "জরুরি সেবা নয়"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-slate-600">
        <p className="flex items-start gap-2">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            {bank.address}
            <span className="block text-slate-500">{bank.district}</span>
          </span>
        </p>
        {bank.away && (
          <p className="pl-6 text-xs text-slate-500">দূরত্ব: {bank.away}</p>
        )}
        <a
          className="inline-flex w-fit items-center gap-1.5 pl-6 text-xs font-semibold text-primary-dark hover:text-blood"
          href={mapUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink aria-hidden="true" className="size-3.5" />
          মানচিত্রে দেখুন
        </a>
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

      <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="flex min-w-0 flex-1 items-center gap-2 text-sm text-slate-600">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <span className="truncate">{bank.phone}</span>
        </span>
        <CallButton className="min-h-10 shrink-0 text-[13px]" label="কল করুন" phone={bank.phone} variant="danger" />
      </div>
    </article>
  );
}
