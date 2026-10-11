import { Suspense } from "react";
import type { Metadata } from "next";
import AmbulanceGrid from "@/components/ambulance/AmbulanceGrid";
import AmbulanceHero from "@/components/ambulance/AmbulanceHero";
import AmbulanceSteps from "@/components/ambulance/AmbulanceSteps";
import ChipLinks from "@/components/shared/ChipLinks";
import FilterSelect from "@/components/shared/FilterSelect";
import Pagination from "@/components/shared/Pagination";
import { AMBULANCE_AREAS, AMBULANCE_TYPE_TABS } from "@/data/ambulance";
import { getAmbulances, parseAmbulanceQuery } from "@/lib/abmulance";
import type { RawSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "অ্যাম্বুলেন্স | Shondhan",
  description: "জরুরি অ্যাম্বুলেন্স সেবা — আইসিইউ, এসি, ফ্রিজিং ও নরমাল অ্যাম্বুলেন্স খুঁজুন।",
};

export default async function AmbulancePage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseAmbulanceQuery(raw);
  const { items, page, pageCount } = await getAmbulances(query);

  return (
    <main>
      <AmbulanceHero />

      <section className="page-container scroll-mt-24 py-9 pb-16" id="ambulance-list">
        <h2 className="section-title mb-4">কাছাকাছি অ্যাম্বুলেন্স সার্ভিস</h2>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <ChipLinks basePath="/ambulance" current={query.type} options={AMBULANCE_TYPE_TABS} param="type" params={raw} />
          <Suspense>
            <FilterSelect allLabel="সব এলাকা" label="এলাকা" options={AMBULANCE_AREAS} param="area" value={query.area} />
          </Suspense>
        </div>

        <AmbulanceGrid ambulances={items} />
        <Pagination basePath="/ambulance" page={page} pageCount={pageCount} params={raw} />
        <AmbulanceSteps />
      </section>
    </main>
  );
}
