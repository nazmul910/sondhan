"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadDoctors } from "@/features/doctors/doctorSlice";
import DoctorApiCard from "@/components/doctor/DoctorApiCard";
import ServicePromos from "./ServicePromos";

export default function NearbyDoctors() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const dispatch = useAppDispatch();
  const { items: doctors, loading, error } = useAppSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(loadDoctors({}));
  }, [dispatch]);

  return (
    <>
      <section aria-labelledby="doctors-title" className="bg-white py-12 sm:py-14" id="doctors">
        <div className="page-container overflow-x-clip">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-[28px]" id="doctors-title">
              কাছাকাছি ডাক্তার
            </h2>
            <Link
              className="inline-flex items-center gap-2 text-base font-bold text-primary-dark transition hover:gap-3 sm:text-lg"
              href="/doctors"
            >
              সব দেখুন
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </div>

          <div className="relative px-4">
            <Swiper
              className="doctor-swiper px-1 py-2"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={12}
              slidesPerView={1.12}
              breakpoints={{
                560: { slidesPerView: 1.7, spaceBetween: 14 },
                760: { slidesPerView: 2.25, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
                1280: { slidesPerView: 4, spaceBetween: 16 },
              }}
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id}>
                  <DoctorApiCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>
            {loading && doctors.length === 0 && (
              <div aria-label="ডাক্তার লোড হচ্ছে" className="absolute inset-0 z-[1] grid grid-cols-1 gap-3 bg-white/80 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="card min-h-[218px] animate-pulse bg-slate-100" key={index} />
                ))}
              </div>
            )}
            {error && doctors.length === 0 && (
              <p className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700">
                ডাক্তারদের তথ্য লোড করা যায়নি: {error}
              </p>
            )}
            {!loading && !error && doctors.length === 0 && (
              <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-600">
                এখনও কোনো ডাক্তার যোগ করা হয়নি।
              </p>
            )}
            <button
              aria-label="আগের ডাক্তার"
              className="absolute left-5 top-1/2 z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-primary hover:bg-primary hover:text-white sm:size-10"
              onClick={() => swiperRef.current?.slidePrev()}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              aria-label="পরের ডাক্তার"
              className="absolute right-5 top-1/2 z-10 grid size-9 translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-primary-dark shadow-md transition hover:border-primary hover:bg-primary hover:text-white sm:size-10"
              onClick={() => swiperRef.current?.slideNext()}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </section>
      <ServicePromos />
    </>
  );
}
