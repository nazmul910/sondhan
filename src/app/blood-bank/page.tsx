import type { Metadata } from "next";
import BloodHero from "@/components/blood/BloodHero";
import BloodRequestForm from "@/components/blood/BloodRequestForm";
import DonorGrid from "@/components/blood/DonorGrid";
import DonorJoinCard from "@/components/blood/DonorJoinCard";
import DonorRegisterForm from "@/components/blood/DonorRegisterForm";
import DonorResultsHeader from "@/components/blood/DonorResultsHeader";
import Pagination from "@/components/shared/Pagination";
import { getDonors, parseDonorQuery } from "@/lib/donors";
import type { RawSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "রক্ত ব্যাংক | Shondhan",
  description: "রক্তের গ্রুপ ও এলাকা অনুযায়ী ডোনার খুঁজুন, অথবা ডোনার হিসেবে যুক্ত হোন।",
};

export default async function BloodBankPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseDonorQuery(raw);
  const { items, total, page, pageCount } = await getDonors(query);
  const isFinding = query.mode === "find";

  return (
    <main>
      <BloodHero params={raw} query={query} />

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        <section aria-label={isFinding ? "ডোনারের তালিকা" : "ডোনার রেজিস্ট্রেশন"} className="min-w-0 flex-1">
          {isFinding ? (
            <>
              <DonorResultsHeader group={query.group} sort={query.sort} total={total} />
              <DonorGrid donors={items} resetHref="/blood-bank" />
              <Pagination basePath="/blood-bank" page={page} pageCount={pageCount} params={raw} />
            </>
          ) : (
            <DonorRegisterForm />
          )}
        </section>

        <aside className="mt-8 flex flex-col gap-4 lg:sticky lg:top-24 lg:mt-0 lg:w-[360px] lg:shrink-0">
          {/* key: re-seed the form's blood group when the user picks another group above */}
          <BloodRequestForm defaultGroup={query.group} key={query.group} />
          {isFinding && <DonorJoinCard />}
        </aside>
      </div>
    </main>
  );
}
