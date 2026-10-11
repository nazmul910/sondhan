import EmptyState from "@/components/shared/EmptyState";
import type { Hospital } from "@/types/hospital";
import HospitalCard from "./HospitalCard";

export default function HospitalGrid({ hospitals, resetHref }: { hospitals: Hospital[]; resetHref: string }) {
  if (hospitals.length === 0) {
    return <EmptyState hint="অন্য নাম বা ফিল্টার দিয়ে আবার চেষ্টা করুন।" resetHref={resetHref} title="কোনো প্রতিষ্ঠান পাওয়া যায়নি" />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4">
      {hospitals.map((hospital) => (
        <HospitalCard hospital={hospital} key={hospital.id} />
      ))}
    </div>
  );
}
