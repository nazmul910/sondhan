"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import doctorOne from "@/assets/home/doctor1.png";
import doctorTwo from "@/assets/home/doctor2.png";
import DoctorCard, { type Doctor } from "./DoctorCard";
import ServicePromos from "./ServicePromos";

const doctors: Doctor[] = [
  {
    id: "tanzir-ahmed",
    name: "ডা. তানজীর আহমেদ",
    specialty: "কার্ডিওলজিস্ট",
    rating: "4.8",
    reviews: "320",
    hospital: "রয়্যাল হাসপাতাল",
    distance: "২.১ কিমি",
    image: doctorTwo,
  },
  {
    id: "nusrat-jahan",
    name: "ডা. নুসরাত জাহান",
    specialty: "গাইনোকোলজিস্ট",
    rating: "4.9",
    reviews: "280",
    hospital: "লাইফ কেয়ার হাসপাতাল",
    distance: "৩.৪ কিমি",
    image: doctorOne,
  },
  {
    id: "mustafizur-rahman",
    name: "ডা. মুস্তাফিজুর রহমান",
    specialty: "জেনারেল ফিজিশিয়ান",
    rating: "4.7",
    reviews: "415",
    hospital: "ইবনে সিনা হাসপাতাল",
    distance: "৪.০ কিমি",
    image: doctorTwo,
  },
  {
    id: "samia-islam",
    name: "ডা. সামিয়া ইসলাম",
    specialty: "গাইনোকোলজিস্ট",
    rating: "4.8",
    reviews: "290",
    hospital: "পপুলার ডায়াগনস্টিক",
    distance: "৩.৮ কিমি",
    image: doctorOne,
  },
  {
    id: "mahmud-hasan",
    name: "ডা. মাহমুদ হাসান",
    specialty: "মেডিসিন বিশেষজ্ঞ",
    rating: "4.9",
    reviews: "365",
    hospital: "গ্রিন লাইফ হাসপাতাল",
    distance: "২.৯ কিমি",
    image: doctorTwo,
  },
];

export default function NearbyDoctors() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <>
      <section aria-labelledby="doctors-title" className="bg-white py-12 sm:py-14" id="doctors">
        <div className="page-container overflow-x-clip">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-[28px]" id="doctors-title">
              কাছাকাছি ডাক্তার
            </h2>
            <a
              className="inline-flex items-center gap-2 text-base font-bold text-primary-dark transition hover:gap-3 sm:text-lg"
              href="#doctors"
            >
              সব দেখুন
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
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
                  <DoctorCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>
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
