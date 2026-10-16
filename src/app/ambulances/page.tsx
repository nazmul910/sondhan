import type { Metadata } from "next";
import AmbulanceGrid from "@/components/ambulance/AmbulanceGrid";
import AmbulanceHero from "@/components/ambulance/AmbulanceHero";
import AmbulanceSteps from "@/components/ambulance/AmbulanceSteps";
import { fetchAmbulances } from "@/features/ambulances/ambulanceApi";
import type { ApiAmbulance } from "@/types/ambulance";

export const metadata: Metadata = {
  title: "অ্যাম্বুলেন্স | Shondhan",
  description: "জরুরি অ্যাম্বুলেন্স সেবা — আইসিইউ, এসি, ফ্রিজিং ও নরমাল অ্যাম্বুলেন্স খুঁজুন।",
};

export default async function AmbulancePage() {
  let ambulances: ApiAmbulance[] = [];
  let error: string | null = null;
  try {
    ambulances = await fetchAmbulances();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "অ্যাম্বুলেন্সের তথ্য লোড করা যায়নি";
    ambulances = [];
  }

  return (
    <main>
      <AmbulanceHero />

      <section className="page-container scroll-mt-24 py-9 pb-16" id="ambulance-list">
        <h2 className="section-title mb-4">কাছাকাছি অ্যাম্বুলেন্স সার্ভিস</h2>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-700">
            <h2 className="font-bold">অ্যাম্বুলেন্সের তথ্য লোড হয়নি</h2>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : (
          <AmbulanceGrid ambulances={ambulances} />
        )}
        <AmbulanceSteps />
      </section>
    </main>
  );
}
