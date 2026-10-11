import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiBanner from "@/components/shared/AiBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RelatedTips from "@/components/tips/RelatedTips";
import TipArticleBody from "@/components/tips/TipArticleBody";
import TipArticleHeader from "@/components/tips/TipArticleHeader";
import TipDisclaimer from "@/components/tips/TipDisclaimer";
import { getAllTipIds, getRelatedTips, getTipById } from "@/lib/tips";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllTipIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tip = await getTipById(id);
  if (!tip) return { title: "টিপসটি পাওয়া যায়নি | Shondhan" };

  return { title: `${tip.title} | Shondhan`, description: tip.summary };
}

export default async function HealthTipDetailPage({ params }: Props) {
  const { id } = await params;
  const tip = await getTipById(id);
  if (!tip) notFound();

  const related = await getRelatedTips(tip);

  return (
    <main className="page-container py-8 pb-16">
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "স্বাস্থ্য টিপস", href: "/health-tips" }, { label: tip.title }]} />

      <div className="mt-5 lg:flex lg:items-start lg:gap-6">
        <article className="flex min-w-0 flex-1 flex-col gap-5">
          <TipArticleHeader tip={tip} />
          <TipArticleBody tip={tip} />
          <TipDisclaimer />
          <AiBanner text="এই বিষয়ে আরও কিছু জানতে চান? AI সহকারীকে জিজ্ঞাসা করুন।" />
        </article>

        <aside className="mt-5 lg:sticky lg:top-24 lg:mt-0 lg:w-[340px] lg:shrink-0">
          <RelatedTips tips={related} />
        </aside>
      </div>
    </main>
  );
}
