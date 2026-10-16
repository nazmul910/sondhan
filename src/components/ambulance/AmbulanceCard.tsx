import { Ambulance as AmbulanceIcon, MapPin, Phone } from "lucide-react";
import CallButton from "../shared/CallButton";
import type { ApiAmbulance } from "@/types/ambulance";

export default function AmbulanceCard({ ambulance }: { ambulance: ApiAmbulance }) {
  return (
    <article className="card card-interactive flex gap-3.5 p-4">
      <div className="grid size-[72px] shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600">
        <AmbulanceIcon aria-hidden="true" className="size-9" strokeWidth={1.8} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-heading">{ambulance.name}</h3>
          <span className="badge shrink-0 bg-red-50 text-red-700">{ambulance.type}</span>
        </div>
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {ambulance.district}
        </p>
        {ambulance.away && (
          <p className="text-[13px] text-slate-600">দূরত্ব: {ambulance.away}</p>
        )}
        <p className="flex items-center gap-1.5 text-[13px] text-slate-600">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {ambulance.phone}
        </p>
        <CallButton className="mt-1.5 min-h-10 text-[13px]" label="কল করুন" phone={ambulance.phone} variant="danger" />
      </div>
    </article>
  );
}
