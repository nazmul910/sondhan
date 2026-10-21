import { MapPin, ShieldCheck, ShieldAlert } from "lucide-react";
import CallButton from "@/components/shared/CallButton";
import HospitalThumb from "./HospitalThumb";

interface HospitalHeaderProps {
  hospital: {
    id: number | string;
    name: string;
    address: string;
    phone?: string | null;
    away?: string | null;
    image?: string | null;
    has_antivenom?: boolean;
    status?: string;
  };
}

export default function HospitalProfileHeader({ hospital }: HospitalHeaderProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hospital.name} ${hospital.address}`
  )}`;

  return (
    <section className="card flex flex-wrap items-center gap-6 p-5 sm:p-6">
      <HospitalThumb size="lg" src={hospital.image} alt={hospital.name} />

      <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {hospital.has_antivenom ? (
            <span className="badge border border-emerald-200 bg-emerald-50 text-emerald-700">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              অ্যান্টিভেনম: উপলব্ধ
            </span>
          ) : (
            <span className="badge border border-slate-200 bg-slate-100 text-slate-600">
              <ShieldAlert className="size-3.5 text-slate-400" />
              অ্যান্টিভেনম: নেই
            </span>
          )}

          {hospital.status && (
            <span className="badge bg-teal-50 text-teal-800 border border-teal-200">
              {hospital.status === "active" ? "সক্রিয় প্রতিষ্ঠান" : hospital.status}
            </span>
          )}
        </div>

        <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">
          {hospital.name}
        </h1>

        <p className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          <span>{hospital.address}</span>
          {hospital.away && <span>• {hospital.away} দূরে</span>}
        </p>

        <div className="mt-2 flex flex-wrap gap-2.5">
          {hospital.phone && <CallButton label="কল করুন" phone={hospital.phone} />}
          <a
            className="btn-outline"
            href={mapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" className="size-4" />
            দিকনির্দেশ
          </a>
        </div>
      </div>
    </section>
  );
}
