"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadDoctorById, clearSelectedDoctor } from "@/features/doctors/doctorSlice";
import { BadgeCheck, Hospital, MapPin, Phone, Stethoscope, Clock3, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionCard from "@/components/shared/SectionCard";

export default function DoctorDetailClient({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { selectedDoctor: doctor, detailLoading: loading, detailError: error } = useAppSelector(
    (s) => s.doctors
  );

  useEffect(() => {
    dispatch(loadDoctorById({ id }));
    return () => {
      dispatch(clearSelectedDoctor());
    };
  }, [dispatch, id]);

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-semibold">ডেটা লোড হয়নি</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading || !doctor) {
    return (
      <div className="flex flex-col gap-5">
        <div className="card animate-pulse flex flex-wrap gap-6 p-5">
          <div className="h-[250px] w-[200px] rounded-2xl bg-slate-200" />
          <div className="flex flex-1 basis-80 flex-col gap-3 pt-2">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 h-10 w-32 rounded bg-slate-200" />
          </div>
        </div>
        <div className="card animate-pulse h-40 p-5" />
        <div className="card animate-pulse h-48 p-5" />
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex min-w-0 flex-col gap-5">
      {/* Profile Header */}
      <section className="card flex flex-wrap gap-6 p-5 sm:p-6">
        <div className="relative h-[250px] w-[200px] shrink-0 overflow-hidden rounded-2xl bg-primary-soft max-sm:mx-auto">
          {doctor.image_url ? (
            <Image
              alt={doctor.name}
              className="object-cover object-top"
              fill
              priority
              sizes="200px"
              src={doctor.image_url}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-primary">
              <Stethoscope className="size-16 opacity-30" />
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2.5">
          <div className="flex flex-wrap gap-2">
            <span className="badge">ডাক্তার</span>
            <span className="badge bg-emerald-50 text-emerald-700">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
              ভেরিফায়েড
            </span>
          </div>

          <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">
            {doctor.name}
          </h1>
          <p className="text-base font-semibold text-primary-dark">{doctor.specialization}</p>
          <p className="text-sm text-slate-500">{doctor.qualifications}</p>

          {/* Stats row */}
          <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {doctor.rating} রেটিং
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-primary" />
              {doctor.patients_count} রোগী
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4 text-primary" />
              {doctor.experience}
            </span>
          </div>

          <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
            {doctor.phone && (
              <a className="btn-outline" href={`tel:${doctor.phone}`}>
                <Phone aria-hidden="true" className="size-[18px]" />
                কল করুন
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About / Biography */}
      {doctor.biography && (
        <SectionCard title="পরিচিতি">
          <p className="text-[15px] leading-8 text-slate-600">{doctor.biography}</p>
        </SectionCard>
      )}

      {/* Chambers / Schedule */}
      {doctor.hospitals.length > 0 && (
        <SectionCard title="চেম্বার ও সময়সূচী">
          <div className="flex flex-col gap-4">
            {doctor.hospitals.map((h) => (
              <article className="rounded-xl bg-slate-50 p-4 sm:p-5" key={h.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Hospital aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <Link
                        className="block truncate text-[15px] font-bold text-heading hover:text-primary-dark"
                        href={`/hospitals/${h.id}`}
                      >
                        {h.hospital_name}
                      </Link>
                      {h.clinic_name && (
                        <p className="text-[13px] text-slate-500">{h.clinic_name}</p>
                      )}
                      <span className="mt-1 flex items-center gap-1 text-[13px] text-slate-500">
                        <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                        {h.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available times */}
                {h.available_time.length > 0 && (
                  <dl className="mt-4">
                    {h.available_time.map((time, i) => (
                      <div
                        className="flex justify-between gap-3 border-t border-slate-200 py-3 text-sm"
                        key={i}
                      >
                        <dd className="text-slate-600">{time}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
