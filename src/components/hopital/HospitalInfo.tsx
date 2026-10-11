import { Ambulance, Clock3, MapPin, Phone, type LucideIcon } from "lucide-react";
import SectionCard from "@/components/shared/SectionCard";
import type { Hospital } from "@/types/hospital";

export default function HospitalInfo({ hospital }: { hospital: Hospital }) {
  const items: { Icon: LucideIcon; label: string; value: string }[] = [
    { Icon: Clock3, label: "খোলা", value: hospital.openHours },
    { Icon: Phone, label: "ফোন", value: hospital.phone ?? "[হাসপাতালের নম্বর]" },
    { Icon: MapPin, label: "ঠিকানা", value: hospital.address },
    { Icon: Ambulance, label: "ইমার্জেন্সি", value: hospital.facilities.includes("emergency") ? "২৪/৭ চালু" : "নেই" },
  ];

  return (
    <SectionCard title="তথ্য">
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
        {items.map(({ Icon, label, value }) => (
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5" key={label}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-dark">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <dt className="text-xs text-slate-500">{label}</dt>
              <dd className="text-sm font-bold text-heading">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
