"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Hospital, MapPin, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

import type { Doctor } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

export default function DoctorSchedule({ doctor }: { doctor: Doctor }) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <SectionCard title="চেম্বার ও সময়সূচী">
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={12}
        >
          {doctor.chambers.map((chamber) => (
            <SwiperSlide key={chamber.hospitalId}>
              <article className="h-full rounded-xl bg-slate-50 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Hospital aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <Link className="block truncate text-[15px] font-bold text-heading hover:text-primary-dark" href={`/hospitals/${chamber.hospitalId}`}>
                        {chamber.hospitalName}
                      </Link>
                      <span className="mt-1 flex items-center gap-1 text-[13px] text-slate-500">
                        <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                        {chamber.address}
                      </span>
                    </div>
                  </div>
                  {chamber.phone ? (
                    <a className="btn-outline min-h-9 px-3 text-xs" href={`tel:${chamber.phone}`}>
                      <Phone aria-hidden="true" className="size-4" />
                      {chamber.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500">ফোন নম্বর পাওয়া যায়নি</span>
                  )}
                </div>
                <dl className="mt-4">
                  {chamber.schedule.map((item) => (
                    <div className="flex justify-between gap-3 border-t border-slate-200 py-3 text-sm" key={item.days}>
                      <dt className="font-semibold text-slate-700">{item.days}</dt>
                      <dd className={item.time ? "text-slate-600" : "text-red-700"}>{item.time ?? "বন্ধ"}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        {doctor.chambers.length > 1 && (
          <div className="mt-3 flex justify-end gap-2">
            <button
              aria-label="আগের চেম্বার"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary"
              onClick={() => swiperRef.current?.slidePrev()}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              aria-label="পরের চেম্বার"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary"
              onClick={() => swiperRef.current?.slideNext()}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
