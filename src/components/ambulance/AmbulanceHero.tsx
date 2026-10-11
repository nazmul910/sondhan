import Image from "next/image";
import { Phone } from "lucide-react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ambulanceImage from "@/assets/home/ambulance.png";
import { EMERGENCY_NUMBER } from "@/data/ambulance";
import { toBn } from "@/lib/format";

export default function AmbulanceHero() {
  return (
    <section className="hero-emergency">
      <div className="page-container flex flex-wrap items-center justify-between gap-7 py-9">
        <div className="flex-1 basis-96">
          <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "অ্যাম্বুলেন্স" }]} />
          <h1 className="mt-3 text-[clamp(30px,4vw,44px)] font-bold leading-[1.25] tracking-tight text-heading">
            জরুরি <span className="text-red-600">অ্যাম্বুলেন্স</span> প্রয়োজন?
          </h1>
          <p className="mt-2 max-w-lg text-base leading-8 text-slate-600">
            যেকোনো সময়, যেকোনো জায়গায় দ্রুত অ্যাম্বুলেন্স সেবা নিন। জীবন-ঝুঁকির মতো পরিস্থিতিতে সরাসরি {toBn(EMERGENCY_NUMBER)}-এ কল করুন।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn-danger min-h-14 gap-2.5 px-7 text-base shadow-[0_8px_20px_rgba(200,50,40,0.25)]" href={`tel:${EMERGENCY_NUMBER}`}>
              <Phone aria-hidden="true" className="size-5" />
              {toBn(EMERGENCY_NUMBER)} এ কল করুন
            </a>
            <a className="inline-flex min-h-14 items-center rounded-xl border border-red-200 bg-white px-6 text-[15px] font-bold text-red-800 transition hover:bg-red-50" href="#ambulance-list">
              কাছের অ্যাম্বুলেন্স দেখুন
            </a>
          </div>
        </div>
        <Image alt="অ্যাম্বুলেন্স" className="h-auto w-full max-w-[380px] object-contain" priority src={ambulanceImage} />
      </div>
    </section>
  );
}
