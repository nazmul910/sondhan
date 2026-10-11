import type { Metadata } from "next";
import AiBanner from "@/components/shared/AiBanner";
import ChipLinks from "@/components/shared/ChipLinks";
import PageHero from "@/components/shared/PageHero";
import Pagination from "@/components/shared/Pagination";
import TipGrid from "@/components/tips/TipGrid";
import TipSearchBar from "@/components/tips/TipSearchBar";
import { TIP_CATEGORY_TABS } from "@/data/tipOptions";
import { toBn } from "@/lib/format";
import type { RawSearchParams } from "@/lib/query";
import { getTips, parseTipQuery } from "@/lib/tips";

export const metadata: Metadata = {
  title: "স্বাস্থ্য টিপস | Shondhan",
  description: "পুষ্টি, ব্যায়াম, মানসিক স্বাস্থ্য ও প্রাথমিক চিকিৎসা নিয়ে সহজ বাংলায় স্বাস্থ্য টিপস।",
};

export default async function HealthTipsPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseTipQuery(raw);
  const { items, total, page, pageCount } = await getTips(query);

  return (
    <main>
      <PageHero
        accent="স্বাস্থ্য টিপস"
        crumbs={[{ label: "হোম", href: "/" }, { label: "স্বাস্থ্য টিপস" }]}
        description="পুষ্টি, ব্যায়াম, মানসিক স্বাস্থ্য ও প্রাথমিক চিকিৎসা নিয়ে সহজ বাংলায় দরকারি পরামর্শ।"
        title="সুস্থ থাকার সহজ"
      >
        <TipSearchBar action="/health-tips" category={query.category} defaultQuery={query.q} placeholder="স্বাস্থ্য টিপস খুঁজুন..." />
        <div className="mt-4">
          <ChipLinks basePath="/health-tips" current={query.category} options={TIP_CATEGORY_TABS} param="category" params={raw} />
        </div>
      </PageHero>

      <div className="page-container py-9 pb-16">
        <section aria-label="স্বাস্থ্য টিপসের তালিকা">
          <p className="mb-5 text-[15px] text-slate-600">
            <strong className="text-heading">{toBn(total)} টি টিপস</strong> পাওয়া গেছে
          </p>
          <TipGrid resetHref="/health-tips" tips={items} />
          <Pagination basePath="/health-tips" page={page} pageCount={pageCount} params={raw} />
          <AiBanner text="নির্দিষ্ট কোনো শারীরিক সমস্যা নিয়ে জানতে চান? লক্ষণ বলুন, AI সহকারী সাহায্য করবে।" />
        </section>
      </div>
    </main>
  );
}
