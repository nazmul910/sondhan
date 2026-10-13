"use client";

import { useState } from "react";
import type { Doctor } from "@/types/doctor";
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
      }),
    ),
  );
}

export default function HospitalDoctorDirectory({ doctors }: { doctors: Doctor[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("daily");
  const visibleDoctors = getDoctorsForTab(doctors, activeTab);

  return (
    <section aria-labelledby="hospital-doctors-title" className="card p-4 sm:p-5">
      <h2 className="section-title mb-4" id="hospital-doctors-title">এই হাসপাতালের ডাক্তারগণ</h2>
      <div aria-label="ডাক্তার দেখার তালিকা" className="mb-4 flex gap-2 overflow-x-auto border-b border-slate-100 pb-3" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            aria-selected={activeTab === id}
            className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition ${activeTab === id ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-primary-soft hover:text-primary-dark"}`}
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

      {visibleDoctors.length ? (
        <div aria-live="polite" className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4" role="tabpanel">
          {visibleDoctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor.id} />)}
        </div>
      ) : (
        <p aria-live="polite" className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500" role="tabpanel">
          এই তালিকায় কোনো ডাক্তার পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
