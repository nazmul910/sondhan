import { Ambulance as AmbulanceIcon, Clock3, MapPin, Phone } from "lucide-react";
import CallButton from "../shared/CallButton";
import { AMBULANCE_TYPE_BADGE, AMBULANCE_TYPE_LABELS } from "@/data/ambulance";
import type { Ambulance } from "@/types/ambulance";

export default function AmbulanceCard({ ambulance }: { ambulance: Ambulance }) {
  return (
    <article className="card card-interactive flex gap-3.5 p-4">
      <div className="grid size-[72px] shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600">
        <AmbulanceIcon aria-hidden="true" className="size-9" strokeWidth={1.8} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-heading">{ambulance.name}</h3>
          <span className={`badge shrink-0 ${AMBULANCE_TYPE_BADGE[ambulance.type]}`}>{AMBULANCE_TYPE_LABELS[ambulance.type]}</span>
        </div>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {ambulance.area}, ঢাকা
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <Clock3 aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {ambulance.open24h ? "২৪/৭ সেবা" : "নির্দিষ্ট সময়ে"}
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {ambulance.phone ?? "[ফোন নম্বর]"}
        </p>
        <CallButton className="mt-1.5 min-h-10 text-[13px]" label="কল করুন" phone={ambulance.phone} variant="danger" />
      </div>
    </article>
  );
}
