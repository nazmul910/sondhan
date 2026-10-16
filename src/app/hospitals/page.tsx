import { Suspense } from "react";
import type { Metadata } from "next";
import HospitalFilters from "@/components/hopital/HospitalFilters";
import HospitalGrid from "@/components/hopital/HospitalGrid";
import AiBanner from "@/components/shared/AiBanner";
import ChipLinks from "@/components/shared/ChipLinks";
import PageHero from "@/components/shared/PageHero";
import Pagination from "@/components/shared/Pagination";
import ResultsHeader from "@/components/shared/ResultsHeader";
import SearchBar from "@/components/shared/SearchBar";
import { HOSPITAL_TYPE_TABS } from "@/data/hospitalOpiton";
import { getHospitals, parseHospitalQuery } from "@/lib/hospitals";
import type { RawSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "হাসপাতাল ও ক্লিনিক | Shondhan",
  description: "আপনার এলাকার হাসপাতাল, ক্লিনিক ও ডায়াগনস্টিক সেন্টার একসাথে দেখুন।",
};

export default async function HospitalsPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseHospitalQuery(raw);
  const { items, total, page, pageCount } = await getHospitals(query);

  return (
    <main>
      <PageHero
        accent="হাসপাতাল ও ক্লিনিক"
        crumbs={[{ label: "হোম", href: "/" }, { label: "হাসপাতাল" }]}
        description="আপনার এলাকার হাসপাতাল, ক্লিনিক ও ডায়াগনস্টিক সেন্টার একসাথে দেখুন।"
        title="কাছাকাছি"
      >
        <SearchBar action="/hospitals" defaultQuery={query.q} placeholder="হাসপাতাল, ক্লিনিক বা বিভাগ খুঁজুন..." />
        <div className="mt-4">
          <ChipLinks basePath="/hospitals" current={query.type} options={HOSPITAL_TYPE_TABS} param="type" params={raw} />
        </div>
      </PageHero>

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        {/* <Suspense>
          <HospitalFilters query={query} />
        </Suspense> */}

        <section aria-label="হাসপাতালের তালিকা" className="min-w-0 flex-1">
          <ResultsHeader sort={query.sort} total={total} unit="টি প্রতিষ্ঠান" />
          <HospitalGrid hospitals={items} resetHref="/hospitals" />
          <Pagination basePath="/hospitals" page={page} pageCount={pageCount} params={raw} />
          <AiBanner text="কোন বিভাগে যাবেন বুঝতে পারছেন না? লক্ষণ বলুন, সঠিক বিশেষজ্ঞ ও হাসপাতাল খুঁজে নিন।" />
        </section>
      </div>
    </main>
  );
}
