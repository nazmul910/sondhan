import type { Metadata } from "next";
import AiBanner from "@/components/shared/AiBanner";
import PageHero from "@/components/shared/PageHero";
import SearchBar from "@/components/shared/SearchBar";
import PopularSpecialties from "@/components/doctor/PopularSpecialties";
import DoctorApiGrid from "@/components/doctor/DoctorApiGrid";
import type { RawSearchParams } from "@/lib/query";
import { first } from "@/lib/query";

export const metadata: Metadata = {
  title: "ডাক্তার খুঁজুন | Shondhan",
  description: "বিশেষজ্ঞ, হাসপাতাল ও এলাকা অনুযায়ী ডাক্তার খুঁজে নিন।",
};

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const search = (first(raw.q) ?? "").trim() || undefined;

  return (
    <main>
      <PageHero
        accent="ডাক্তার খুঁজুন"
        crumbs={[{ label: "হোম", href: "/" }, { label: "ডাক্তার" }]}
        description="বিশেষজ্ঞ, হাসপাতাল ও এলাকা অনুযায়ী ডাক্তার খুঁজে নিন।"
        title="আপনার প্রয়োজনের"
      >
        <SearchBar
          action="/doctors"
          defaultQuery={search}
          placeholder="ডাক্তারের নাম, বিশেষত্ব বা হাসপাতাল লিখুন..."
        />
        <PopularSpecialties />
      </PageHero>

      <div className="page-container py-9 pb-16">
        <section aria-label="ডাক্তারের তালিকা">
          <DoctorApiGrid search={search} />
          <AiBanner text="কোন ডাক্তার দেখাবেন বুঝতে পারছেন না? লক্ষণ বলুন, সঠিক বিশেষজ্ঞ খুঁজে নিন।" />
        </section>
      </div>
    </main>
  );
}
