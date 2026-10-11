import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import type { Hospital } from "@/types/hospital";

export default function HospitalSidebar({ hospital }: { hospital: Hospital }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="card p-5">
        <strong className="text-base text-heading">অবস্থান</strong>
        {/* TODO: replace with a real map (Google Maps embed / Leaflet) once coordinates are in the data. */}
        <div className="mt-3 grid h-48 place-items-center rounded-xl bg-[repeating-linear-gradient(45deg,#eef5f3,#eef5f3_12px,#e5f0ed_12px,#e5f0ed_24px)] text-center text-[13px] font-semibold text-primary-dark">
          <span className="flex flex-col items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-7 text-primary" />
            [মানচিত্র এখানে বসবে]
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-6 text-slate-600">{hospital.address}</p>
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 p-5">
        <strong className="text-base text-red-700">জরুরি অ্যাম্বুলেন্স দরকার?</strong>
        <p className="mb-3.5 mt-1.5 text-[13px] leading-6 text-slate-600">এই হাসপাতালে যেতে দ্রুত অ্যাম্বুলেন্স ডাকুন।</p>
        <Link className="btn-danger w-full min-h-11" href="/ambulance">
          <Phone aria-hidden="true" className="size-4" />
          অ্যাম্বুলেন্স দেখুন
        </Link>
      </section>
    </div>
  );
}
