import EmptyState from "@/components/shared/EmptyState";
import type { Ambulance } from "@/types/ambulance";
import AmbulanceCard from "./AmbulanceCard";

export default function AmbulanceGrid({ ambulances }: { ambulances: Ambulance[] }) {
  if (ambulances.length === 0) {
    return <EmptyState hint="অন্য ধরন বা এলাকা বেছে নিন।" resetHref="/ambulance" title="কোনো অ্যাম্বুলেন্স পাওয়া যায়নি" />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
      {ambulances.map((a) => (
        <AmbulanceCard ambulance={a} key={a.id} />
      ))}
    </div>
  );
}
