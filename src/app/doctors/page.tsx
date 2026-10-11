import { Suspense } from "react";
import type { Metadata } from "next";

import DoctorGrid from "@/components/doctor/DoctorGrid";
import PopularSpecialties from "@/components/doctor/PopularSpecialties";
import AiBanner from "@/components/shared/AiBanner";

import Pagination from "@/components/shared/Pagination";
import ResultsHeader from "@/components/shared/ResultsHeader";
import SearchBar from "@/components/shared/SearchBar";
import { getDoctors, parseDoctorQuery } from "@/lib/doctors";
import type { RawSearchParams } from "@/lib/query";
import PageHero from "@/components/shared/PageHero";
import DoctorFilters from "@/components/doctor/DoctorFilters";

export const metadata: Metadata = {
  title: "ডাক্তার খুঁজুন | Shondhan",
  description: "বিশেষজ্ঞ, হাসপাতাল ও এলাকা অনুযায়ী ডাক্তার খুঁজে নিন।",
};

export default async function DoctorsPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseDoctorQuery(raw);
  const { items, total, page, pageCount } = await getDoctors(query);

  return (
    <main>
      <PageHero
        accent="ডাক্তার খুঁজুন"
        crumbs={[{ label: "হোম", href: "/" }, { label: "ডাক্তার" }]}
        description="বিশেষজ্ঞ, হাসপাতাল ও এলাকা অনুযায়ী ডাক্তার খুঁজে নিন।"
        title="আপনার প্রয়োজনের"
      >
        <SearchBar action="/doctors" defaultQuery={query.q} placeholder="ডাক্তারের নাম, বিশেষত্ব বা হাসপাতাল লিখুন..." />
        <PopularSpecialties />
      </PageHero>

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        <Suspense>
          <DoctorFilters query={query} />
        </Suspense>

        <section aria-label="ডাক্তারের তালিকা" className="min-w-0 flex-1">
          <ResultsHeader sort={query.sort} total={total} unit="জন ডাক্তার" />
          <DoctorGrid doctors={items} resetHref="/doctors" />
          <Pagination basePath="/doctors" page={page} pageCount={pageCount} params={raw} />
          <AiBanner text="কোন ডাক্তার দেখাবেন বুঝতে পারছেন না? লক্ষণ বলুন, সঠিক বিশেষজ্ঞ খুঁজে নিন।" />
        </section>
      </div>
    </main>
  );
}
