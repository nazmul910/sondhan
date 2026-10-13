import type { Metadata } from "next";
import DraftNotice from "@/components/legal/DraftNotice";
import LegalSections from "@/components/legal/LegalSections";
import LegalToc from "@/components/legal/LegalToc";
import PageHero from "@/components/shared/PageHero";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED_AT } from "@/data/privacy";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | Shondhan",
  description: "Shondhan আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখে তা জানুন।",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        accent="নীতি"
        crumbs={[{ label: "হোম", href: "/" }, { label: "গোপনীয়তা নীতি" }]}
        description={`আপনার তথ্য আমরা কীভাবে ব্যবহার ও সুরক্ষিত রাখি। সর্বশেষ হালনাগাদ: ${formatDate(PRIVACY_UPDATED_AT)}`}
        title="গোপনীয়তা"
      />

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        <LegalToc sections={PRIVACY_SECTIONS} />

        <article className="card min-w-0 flex-1 p-5 sm:p-8">
          <DraftNotice />
          <LegalSections sections={PRIVACY_SECTIONS} />
        </article>
      </div>
    </main>
  );
}
