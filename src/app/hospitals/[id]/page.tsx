import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HospitalDepartments from "@/components/hopital/HospitalDepartments";
import HospitalDoctorDirectory from "@/components/hopital/HospitalDoctorDirectory";

import HospitalProfileHeader from "@/components/hopital/HospitalProfileHeader";

import HospitalSidebar from "@/components/hopital/HospitalSidebar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getDoctorsByHospital } from "@/lib/doctors";
import { getAllHospitalIds, getHospitalById } from "@/lib/hospitals";
import HospitalInfo from "@/components/hopital/HospitalInfo";
import HospitalServices from "@/components/hopital/HospitalServices";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllHospitalIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hospital = await getHospitalById(id);
  if (!hospital) return { title: "প্রতিষ্ঠান পাওয়া যায়নি | Shondhan" };

  return {
    title: `${hospital.name} | Shondhan`,
    description: `${hospital.name}, ${hospital.address}। বিভাগ, ডাক্তার, সেবা ও যোগাযোগ।`,
  };
}

export default async function HospitalDetailPage({ params }: Props) {
  const { id } = await params;
  const hospital = await getHospitalById(id);
  if (!hospital) notFound();

  const doctors = await getDoctorsByHospital(hospital.id);

  return (
    <main className="page-container py-8 pb-16">
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "হাসপাতাল", href: "/hospitals" }, { label: hospital.name }]} />

      <div className="mt-5 lg:flex lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <HospitalProfileHeader hospital={hospital} />
          <HospitalInfo hospital={hospital} />
          <HospitalDepartments departments={hospital.departments} />
          <HospitalDoctorDirectory doctors={doctors} />
          <HospitalServices services={hospital.services} />
        </div>

        <aside className="mt-5 lg:sticky lg:top-24 lg:mt-0 lg:w-[340px] lg:shrink-0">
          <HospitalSidebar hospital={hospital} />
        </aside>
      </div>
    </main>
  );
}
