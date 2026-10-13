import { MapPin } from "lucide-react";
import CallButton from "@/components/shared/CallButton";
import Rating from "@/components/shared/Rating";
import { HOSPITAL_TYPE_LABELS } from "@/data/hospitalOpiton";
import { formatDistance } from "@/lib/format";
import type { Hospital } from "@/types/hospital";
import HospitalThumb from "./HospitalThumb";

export default function HospitalProfileHeader({ hospital }: { hospital: Hospital }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hospital.name} ${hospital.address}`)}`;

  return (
    <section className="card flex flex-wrap items-center gap-6 p-5 sm:p-6">
      <HospitalThumb size="lg" />

      <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-indigo-50 text-indigo-700">{HOSPITAL_TYPE_LABELS[hospital.type]}</span>
          {hospital.facilities.includes("emergency") && <span className="badge bg-red-50 text-red-700">২৪/৭ ইমার্জেন্সি</span>}
          {hospital.antivenomAvailable && <span className="badge bg-rose-50 text-rose-700">অ্যান্টিভেনম আছে</span>}
        </div>
        <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">{hospital.name}</h1>
        <Rating count={hospital.reviewCount} value={hospital.rating} />
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          {hospital.address} • {formatDistance(hospital.distanceKm)}
        </p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          <CallButton label="কল করুন" phone={hospital.phone} />
          <a className="btn-outline" href={mapsUrl} rel="noopener noreferrer" target="_blank">
            <MapPin aria-hidden="true" className="size-4" />
            দিকনির্দেশ
          </a>
        </div>
      </div>
    </section>
  );
}
