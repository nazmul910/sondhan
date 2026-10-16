import type { Metadata } from "next";
import AiBanner from "@/components/shared/AiBanner";
import ChipLinks from "@/components/shared/ChipLinks";
import PageHero from "@/components/shared/PageHero";
import SearchBar from "@/components/shared/SearchBar";
import HospitalApiGrid from "@/components/hopital/HospitalApiGrid";
import { HOSPITAL_TYPE_TABS } from "@/data/hospitalOpiton";
import type { RawSearchParams } from "@/lib/query";
import { first } from "@/lib/query";

export const metadata: Metadata = {
  title: "হাসপাতাল ও ক্লিনিক | Shondhan",
  description: "আপনার এলাকার হাসপাতাল, ক্লিনিক ও ডায়াগনস্টিক সেন্টার একসাথে দেখুন।",
};

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const search = (first(raw.q) ?? "").trim() || undefined;
  const type = first(raw.type) || undefined;

  return (
    <main>
      <PageHero
        accent="হাসপাতাল ও ক্লিনিক"
        crumbs={[{ label: "হোম", href: "/" }, { label: "হাসপাতাল" }]}
        description="আপনার এলাকার হাসপাতাল, ক্লিনিক ও ডায়াগনস্টিক সেন্টার একসাথে দেখুন।"
        title="কাছাকাছি"
      >
        <SearchBar
          action="/hospitals"
          defaultQuery={search}
          placeholder="হাসপাতাল, ক্লিনিক বা বিভাগ খুঁজুন..."
        />
        <div className="mt-4">
          <ChipLinks
            basePath="/hospitals"
            current={type ?? null}
            options={HOSPITAL_TYPE_TABS}
            param="type"
            params={raw}
          />
        </div>
      </PageHero>

      <div className="page-container py-9 pb-16">
        <section aria-label="হাসপাতালের তালিকা">
          <HospitalApiGrid search={search} />
          <AiBanner text="কোন বিভাগে যাবেন বুঝতে পারছেন না? লক্ষণ বলুন, সঠিক বিশেষজ্ঞ ও হাসপাতাল খুঁজে নিন।" />
        </section>
      </div>
    </main>
  );
}
