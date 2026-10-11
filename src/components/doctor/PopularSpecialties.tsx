import Link from "next/link";
import { POPULAR_SPECIALTIES, SPECIALTY_LABELS } from "@/data/specialties";

export default function PopularSpecialties() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
      <strong className="mr-1 text-heading">জনপ্রিয় সার্চ:</strong>
      {POPULAR_SPECIALTIES.map((key) => (
        <Link className="rounded-full bg-primary/10 px-3 py-2 text-[#55736e] transition hover:bg-white hover:text-primary-dark" href={`/doctors?specialty=${key}`} key={key}>
          {SPECIALTY_LABELS[key]}
        </Link>
      ))}
    </div>
  );
}
