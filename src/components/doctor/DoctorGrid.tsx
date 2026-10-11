
import type { Doctor } from "@/types/doctor";
import DoctorCard from "./DoctorCard";
import EmptyState from "../shared/EmptyState";

type Props = { doctors: Doctor[]; resetHref: string };

export default function DoctorGrid({ doctors, resetHref }: Props) {
  if (doctors.length === 0) {
    return <EmptyState hint="অন্য নাম বা ফিল্টার দিয়ে আবার চেষ্টা করুন।" resetHref={resetHref} title="কোনো ডাক্তার পাওয়া যায়নি" />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {doctors.map((doctor) => (
        <DoctorCard doctor={doctor} key={doctor.id} />
      ))}
    </div>
  );
}
