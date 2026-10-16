import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import DoctorDetailClient from "@/components/doctor/DoctorDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `ডাক্তার বিস্তারিত #${id} | Shondhan`,
    description: "ডাক্তারের সম্পূর্ণ প্রোফাইল, চেম্বার ও সময়সূচী দেখুন।",
  };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="page-container py-8 pb-16">
      <Breadcrumb
        items={[
          { label: "হোম", href: "/" },
          { label: "ডাক্তার", href: "/doctors" },
          { label: "বিস্তারিত" },
        ]}
      />
      <div className="mt-5">
        <DoctorDetailClient id={id} />
      </div>
    </main>
  );
}
