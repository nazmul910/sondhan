import EmptyState from "@/components/shared/EmptyState";
import { Ambulance as AmbulanceIcon } from "lucide-react";
import type { ApiAmbulance } from "@/types/ambulance";
import AmbulanceCard from "./AmbulanceCard";

export default function AmbulanceGrid({ ambulances }: { ambulances: ApiAmbulance[] }) {
  if (ambulances.length === 0) {
    return (
      <EmptyState
        hint="অ্যাম্বুলেন্স সার্ভিসের তথ্য যোগ হলে এখানে দেখা যাবে।"
        icon={AmbulanceIcon}
        title="এখনও কোনো অ্যাম্বুলেন্স যোগ করা হয়নি"
      />
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
      {ambulances.map((a) => (
        <AmbulanceCard ambulance={a} key={a.id} />
      ))}
    </div>
  );
}
