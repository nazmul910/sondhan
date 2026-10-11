import EmptyState from "@/components/shared/EmptyState";
import type { HealthTip } from "@/types/tip";
import TipCard from "./TipCard";

export default function TipGrid({ tips, resetHref }: { tips: HealthTip[]; resetHref: string }) {
  if (tips.length === 0) {
    return <EmptyState hint="অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা অন্য বিষয় বেছে নিন।" resetHref={resetHref} title="কোনো টিপস পাওয়া যায়নি" />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
      {tips.map((t) => (
        <TipCard key={t.id} tip={t} />
      ))}
    </div>
  );
}
