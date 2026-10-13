import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Hospital, MapPin, Phone } from "lucide-react";

import Rating from "@/components/shared/Rating";
import { SPECIALTY_LABELS } from "@/data/specialties";
import { formatDistance, toBn } from "@/lib/format";
import type { Doctor } from "@/types/doctor";
import FavoriteButton from "../shared/FavoriteButton";

export default function DoctorProfileHeader({ doctor }: { doctor: Doctor }) {
  return (
    <section className="card flex flex-wrap gap-6 p-5 sm:p-6">
      <div className="relative h-[250px] w-[200px] shrink-0 overflow-hidden rounded-2xl bg-primary-soft max-sm:mx-auto">
        <Image alt={doctor.name} className="object-cover object-top" fill priority sizes="200px" src={doctor.image} />
      </div>

      <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2.5">
        <div className="flex flex-wrap gap-2">
          <span className="badge">ডাক্তার</span>
          <span className="badge bg-emerald-50 text-emerald-700">
            <BadgeCheck aria-hidden="true" className="size-3.5" />
            ভেরিফায়েড
          </span>
        </div>
        <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">{doctor.name}</h1>
        <p className="text-base font-semibold text-primary-dark">{SPECIALTY_LABELS[doctor.specialty]}</p>
        <p className="text-sm text-slate-500">
          {doctor.degrees} • BMDC রেজি. {doctor.bmdc ? toBn(doctor.bmdc) : "[নম্বর]"}
        </p>
        <Rating count={doctor.reviewCount} value={doctor.rating} />
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <Hospital aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          <Link className="hover:text-primary-dark" href={`/hospitals/${doctor.hospitalId}`}>
            {doctor.hospitalName}
          </Link>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          {doctor.address} • {formatDistance(doctor.distanceKm)}
        </p>

        <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
          {doctor.phone && (
            <a className="btn-outline" href={`tel:${doctor.phone}`}>
              <Phone aria-hidden="true" className="size-[18px]" />
              কল করুন
            </a>
          )}
          <FavoriteButton name={doctor.name} variant="button" />
        </div>
      </div>
    </section>
  );
}
