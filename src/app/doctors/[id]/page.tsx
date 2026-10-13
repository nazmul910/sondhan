import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DoctorAbout from "@/components/doctor/DoctorAbout";
import DoctorEducation from "@/components/doctor/DoctorEducation";
import DoctorProfileHeader from "@/components/doctor/DoctorProfileHeader";
import DoctorReviews from "@/components/doctor/DoctorReviews";
import DoctorSchedule from "@/components/doctor/DoctorSchedule";
import SimilarDoctors from "@/components/doctor/SimilarDoctors";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { sampleReviews } from "@/data/reviews";
import { SPECIALTY_LABELS } from "@/data/specialties";
import { getAllDoctorIds, getDoctorById, getSimilarDoctors } from "@/lib/doctors";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllDoctorIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) return { title: "ডাক্তার পাওয়া যায়নি | Shondhan" };

  return {
    title: `${doctor.name} — ${SPECIALTY_LABELS[doctor.specialty]} | Shondhan`,
    description: `${doctor.name}, ${doctor.hospitalName}। চেম্বার সময়সূচী ও রিভিউ।`,
  };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) notFound();

  const similar = await getSimilarDoctors(doctor);

  return (
    <main className="page-container py-8 pb-16">
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "ডাক্তার", href: "/doctors" }, { label: doctor.name }]} />

      <div className="mt-5">
        <div className="flex min-w-0 flex-col gap-5">
          <DoctorProfileHeader doctor={doctor} />
          <DoctorAbout doctor={doctor} />
          <DoctorEducation items={doctor.education} />
          <DoctorSchedule doctor={doctor} />
          <DoctorReviews count={doctor.reviewCount} rating={doctor.rating} reviews={sampleReviews} />
        </div>
      </div>

      <SimilarDoctors doctors={similar} />
    </main>
  );
}
