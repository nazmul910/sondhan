import type { Doctor } from "@/types/doctor";
import DoctorGrid from "./DoctorGrid";

export default function SimilarDoctors({ doctors }: { doctors: Doctor[] }) {
  if (!doctors.length) return null;
  return (
    <section className="mt-10">
      <h2 className="section-title mb-4">অন্য ডাক্তারও দেখুন</h2>
      <DoctorGrid doctors={doctors} resetHref="/doctors" />
    </section>
  );
}
