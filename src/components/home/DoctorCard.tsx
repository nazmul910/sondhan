import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Clock3, Heart, MapPin, Star } from "lucide-react";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  hospital: string;
  distance: string;
  image: StaticImageData;
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const href = `/doctors/${doctor.id}`;

  return (
    <article className="flex min-h-[218px] gap-3.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_3px_12px_rgba(23,48,64,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:min-h-[228px] sm:gap-4 sm:p-4">
      <Link className="relative h-[156px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-primary-soft sm:h-[164px] sm:w-[116px]" href={href}>
        <Image
          alt={`${doctor.name} ${doctor.specialty}`}
          className="object-cover object-top"
          fill
          sizes="(max-width: 600px) 104px, 116px"
          src={doctor.image}
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-1">
          <h3 className="truncate pt-0.5 text-sm font-bold leading-snug text-heading sm:text-base"><Link href={href}>{doctor.name}</Link></h3>
          <button
            aria-label={`${doctor.name} পছন্দের তালিকায় যোগ করুন`}
            className="grid size-6 shrink-0 place-items-center rounded-full text-slate-500 transition hover:scale-110 hover:text-rose-500"
            type="button"
          >
            <Heart aria-hidden="true" className="size-[17px]" />
          </button>
        </div>
        <p className="mt-1 truncate text-[13px] text-slate-500 sm:text-sm">{doctor.specialty}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-600">
          <Star aria-hidden="true" className="size-[18px] fill-rating text-rating" />
          {doctor.rating}
          <span className="font-normal text-slate-400">({doctor.reviews})</span>
        </p>
        <p className="mt-2 flex items-center gap-1.5 truncate text-[13px] text-slate-600 sm:text-sm">
          <MapPin aria-hidden="true" className="size-[18px] shrink-0 fill-primary text-primary" />
          <span className="truncate">{doctor.hospital}</span>
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600 sm:text-sm">
          <Clock3 aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          {doctor.distance}
        </p>
        <Link
          className="mt-auto flex min-h-9 items-center justify-center rounded-lg border border-primary/60 px-1.5 text-center text-xs font-bold text-primary-dark transition hover:border-primary hover:bg-primary hover:!text-white sm:text-[13px]"
          href={href}
        >
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}
