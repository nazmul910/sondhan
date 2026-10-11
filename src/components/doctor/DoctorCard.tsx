import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";

import Rating from "@/components/shared/Rating";
import { SPECIALTY_LABELS } from "@/data/specialties";
import { formatDistance } from "@/lib/format";
import type { Doctor } from "@/types/doctor";
import FavoriteButton from "../shared/FavoriteButton";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const href = `/doctors/${doctor.id}`;

  return (
    <article className="card card-interactive flex min-h-[218px] gap-3.5 p-3.5 sm:min-h-[228px] sm:gap-4 sm:p-4">
      <Link className="relative h-[156px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-primary-soft sm:h-[164px] sm:w-[116px]" href={href}>
        <Image alt={doctor.name} className="object-cover object-top" fill sizes="(max-width: 600px) 104px, 116px" src={doctor.image} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-1">
          <h3 className="truncate pt-0.5 text-sm font-bold leading-snug text-heading sm:text-base">
            <Link href={href}>{doctor.name}</Link>
          </h3>
          <FavoriteButton name={doctor.name} />
        </div>
        <p className="mt-1 truncate text-[13px] text-slate-500 sm:text-sm">{SPECIALTY_LABELS[doctor.specialty]}</p>
        <Rating className="mt-2" count={doctor.reviewCount} value={doctor.rating} />
        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-slate-600 sm:text-sm">
          <MapPin aria-hidden="true" className="size-[18px] shrink-0 fill-primary text-primary" />
          <span className="truncate">{doctor.hospitalName}</span>
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600 sm:text-sm">
          <Clock3 aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          {formatDistance(doctor.distanceKm)}
        </p>
        <Link className="btn-outline mt-auto min-h-9 text-xs sm:text-[13px]" href={href}>
          অ্যাপয়েন্টমেন্ট নিন
        </Link>
      </div>
    </article>
  );
}
