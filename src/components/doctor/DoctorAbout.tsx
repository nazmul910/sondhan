
import type { Doctor } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

export default function DoctorAbout({ doctor }: { doctor: Doctor }) {
  return (
    <SectionCard title="পরিচিতি">
      <p className="text-[15px] leading-8 text-slate-600">{doctor.about}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {doctor.topics.map((topic) => (
          <li className="chip" key={topic}>
            {topic}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
