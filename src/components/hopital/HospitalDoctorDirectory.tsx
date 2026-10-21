"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Star, Briefcase, Stethoscope } from "lucide-react";
import type { Doctor } from "@/types/doctor";
import type { ApiHospitalDoctorItem } from "@/features/hospitals/types";
import DoctorCard from "@/components/doctor/DoctorCard";

type Tab = "daily" | "friday" | "specialists";

const tabs: { id: Tab; label: string }[] = [
  { id: "daily", label: "দৈনিক" },
  { id: "friday", label: "শুক্রবার" },
  { id: "specialists", label: "বিশেষজ্ঞ" },
];

function getDoctorsForTab(doctors: Doctor[], tab: Tab) {
  if (tab === "specialists") return doctors.filter((doctor) => doctor.specialty !== "general");

  return doctors.filter((doctor) =>
    doctor.chambers.some((chamber) =>
      chamber.schedule.some((item) => {
        if (!item.time) return false;
        return tab === "friday" ? item.days.includes("শুক্রবার") : !item.days.includes("শুক্রবার");
      })
    )
  );
}

interface HospitalDoctorDirectoryProps {
  doctors?: Doctor[];
  apiDoctors?: {
    daily?: ApiHospitalDoctorItem[];
    friday?: ApiHospitalDoctorItem[];
    specialist?: ApiHospitalDoctorItem[];
  };
}

export default function HospitalDoctorDirectory({
  doctors = [],
  apiDoctors,
}: HospitalDoctorDirectoryProps) {
  const [activeTab, setActiveTab] = useState<Tab>("daily");

  let activeApiDoctors: ApiHospitalDoctorItem[] = [];
  if (apiDoctors) {
    if (activeTab === "daily") activeApiDoctors = apiDoctors.daily || [];
    else if (activeTab === "friday") activeApiDoctors = apiDoctors.friday || [];
    else activeApiDoctors = apiDoctors.specialist || [];
  }

  const visibleMockDoctors = !apiDoctors ? getDoctorsForTab(doctors, activeTab) : [];
  const hasDoctors = apiDoctors ? activeApiDoctors.length > 0 : visibleMockDoctors.length > 0;

  return (
    <section aria-labelledby="hospital-doctors-title" className="card p-4 sm:p-5">
      <h2 className="section-title mb-4" id="hospital-doctors-title">
        এই হাসপাতালের ডাক্তারগণ
      </h2>

      <div
        aria-label="ডাক্তার দেখার তালিকা"
        className="mb-4 flex gap-2 overflow-x-auto border-b border-slate-100 pb-3"
        role="tablist"
      >
        {tabs.map(({ id, label }) => (
          <button
            aria-selected={activeTab === id}
            className={`min-h-10 shrink-0 cursor-pointer rounded-full px-4 text-sm font-semibold transition ${
              activeTab === id
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-primary-soft hover:text-primary-dark"
            }`}
            id={`hospital-doctor-tab-${id}`}
            key={id}
            onClick={() => setActiveTab(id)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {hasDoctors ? (
        <div
          aria-live="polite"
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4"
          role="tabpanel"
        >
          {apiDoctors
            ? activeApiDoctors.map((doc) => (
                <article
                  key={doc.id}
                  className="card card-interactive flex flex-col justify-between p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-heading sm:text-base">
                        <Link
                          href={`/doctors/${doc.id}`}
                          className="hover:text-primary transition"
                        >
                          {doc.name}
                        </Link>
                      </h3>
                      {doc.rating && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 shrink-0">
                          <Star className="size-3.5 fill-amber-500 text-amber-500" />
                          {doc.rating}
                        </span>
                      )}
                    </div>

                    <p className="flex items-center gap-1.5 text-xs font-medium text-primary-dark">
                      <Stethoscope className="size-3.5 shrink-0" />
                      <span>{doc.specialization}</span>
                    </p>

                    {doc.qualifications && (
                      <p className="text-xs text-slate-500">{doc.qualifications}</p>
                    )}

                    {doc.experience && (
                      <p className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Briefcase className="size-3 text-slate-400" />
                        <span>{doc.experience}</span>
                      </p>
                    )}

                    {doc.available_time && (
                      <p className="flex items-center gap-1 text-[11px] text-slate-600 mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                        <Clock className="size-3 text-primary shrink-0" />
                        <span className="truncate">{doc.available_time}</span>
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/doctors/${doc.id}`}
                    className="btn-outline mt-3 w-full text-center text-xs font-bold"
                  >
                    ডাক্তার প্রোফাইল দেখুন
                  </Link>
                </article>
              ))
            : visibleMockDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.id} />
              ))}
        </div>
      ) : (
        <p
          aria-live="polite"
          className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500"
          role="tabpanel"
        >
          এই তালিকায় কোনো ডাক্তার পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
