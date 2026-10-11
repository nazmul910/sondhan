import EmptyState from "@/components/shared/EmptyState";
import type { Donor } from "@/types/blood";
import DonorCard from "./DonorCard";

export default function DonorGrid({ donors, resetHref }: { donors: Donor[]; resetHref: string }) {
  if (donors.length === 0) {
    return <EmptyState hint="অন্য রক্তের গ্রুপ বেছে নিন, অথবা পাশের ফর্মে রক্তের জন্য অনুরোধ পাঠান।" resetHref={resetHref} title="কোনো ডোনার পাওয়া যায়নি" />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-4">
      {donors.map((d) => (
        <DonorCard donor={d} key={d.id} />
      ))}
    </div>
  );
}
