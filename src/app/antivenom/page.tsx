import type { Metadata } from "next";
import HospitalCard from "@/components/hopital/HospitalCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";
import { getAntivenomHospitals } from "@/lib/hospitals";

export const metadata: Metadata = {
  title: "অ্যান্টিভেনম আছে এমন হাসপাতাল | Shondhan",
  description: "অ্যান্টিভেনম আছে এমন হাসপাতালের তালিকা ও যোগাযোগের তথ্য দেখুন।",
};

export default async function AntivenomPage() {
  const hospitals = await getAntivenomHospitals();

  return (
    <main>
      <PageHero
        accent="জরুরি স্বাস্থ্যসেবা"
        crumbs={[{ label: "হোম", href: "/" }, { label: "অ্যান্টিভেনম হাসপাতাল" }]}
        description="অ্যান্টিভেনম আছে এমন হাসপাতালের তথ্য দেখুন। রওনা হওয়ার আগে ফোন করে মজুত ও প্রাপ্যতা নিশ্চিত করুন।"
        title="অ্যান্টিভেনম"
      />

      <section aria-label="অ্যান্টিভেনম আছে এমন হাসপাতাল" className="page-container py-8 pb-16">
        {hospitals.length ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {hospitals.map((hospital) => (
              <HospitalCard hospital={hospital} key={hospital.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            hint="এই মুহূর্তে অ্যান্টিভেনম আছে এমন কোনো হাসপাতালের তথ্য পাওয়া যায়নি। জরুরি প্রয়োজনে নিকটস্থ হাসপাতাল বা জরুরি সেবায় যোগাযোগ করুন।"
            resetHref="/hospitals"
            title="অ্যান্টিভেনম আছে এমন হাসপাতাল পাওয়া যায়নি"
          />
        )}
        <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          তালিকাটি নমুনা তথ্য দিয়ে তৈরি। জরুরি অবস্থা হলে দ্রুত চিকিৎসা নিন; যাওয়ার আগে হাসপাতালে ফোন করে অ্যান্টিভেনমের মজুত নিশ্চিত করুন।
        </p>
      </section>
    </main>
  );
}
