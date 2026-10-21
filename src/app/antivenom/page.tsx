import type { Metadata } from "next";
import HospitalApiGrid from "@/components/hopital/HospitalApiGrid";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "অ্যান্টিভেনম আছে এমন হাসপাতাল | Shondhan",
  description: "অ্যান্টিভেনম আছে এমন হাসপাতালের তালিকা ও যোগাযোগের তথ্য দেখুন।",
};

export default function AntivenomPage() {
  return (
    <main>
      <PageHero
        accent="জরুরি স্বাস্থ্যসেবা"
        crumbs={[{ label: "হোম", href: "/" }, { label: "অ্যান্টিভেনম হাসপাতাল" }]}
        description="অ্যান্টিভেনম আছে এমন হাসপাতালের তথ্য দেখুন। রওনা হওয়ার আগে ফোন করে মজুত ও প্রাপ্যতা নিশ্চিত করুন।"
        title="অ্যান্টিভেনম"
      />

      <section aria-label="অ্যান্টিভেনম আছে এমন হাসপাতাল" className="page-container py-8 pb-16">
        <HospitalApiGrid antivenomOnly={true} />

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
          ⚠️ জরুরি অবস্থা হলে দ্রুততম সময়ে হাসপাতালে যান; যাওয়ার আগে হাসপাতালে ফোন করে অ্যান্টিভেনমের মজুত নিশ্চিত করার পরামর্শ দেওয়া হচ্ছে।
        </p>
      </section>
    </main>
  );
}
