"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import ambulanceImage from "@/assets/home/ambulance.png";
import assistantImage from "@/assets/home/assistant.svg";
import { useAiChat } from "@/hooks/useAiChat";
import AiLoginModal from "@/components/chat/AiLoginModal";

export default function ServicePromos() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const { handleOpenAiChat, showLoginModal, setShowLoginModal } = useAiChat();

  return (
    <>
      <section
        aria-label="জরুরি স্বাস্থ্যসেবা"
        className="overflow-x-clip pb-16 pt-8 sm:pb-20 sm:pt-10"
        id="services"
      >
        <div className="page-container">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-[28px]">জরুরি স্বাস্থ্যসেবা</h2>
            <div className="flex items-center gap-2">
              <button
                aria-label="আগের স্বাস্থ্যসেবা"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                onClick={() => swiperRef.current?.slidePrev()}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label="পরের স্বাস্থ্যসেবা"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-primary-dark shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                onClick={() => swiperRef.current?.slideNext()}
                type="button"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>

          <Swiper
            className="service-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={12}
            slidesPerView={1.08}
            breakpoints={{
              640: { slidesPerView: 1.35, spaceBetween: 16 },
              1024: { slidesPerView: 2, spaceBetween: 16 },
            }}
          >
            <SwiperSlide>
              <article className="flex min-h-[260px] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 px-4 py-5 text-center sm:min-h-[148px] sm:flex-row sm:justify-start sm:gap-5 sm:px-6 sm:py-5 sm:text-left">
                <div className="relative h-[82px] w-[120px] shrink-0 sm:h-[90px] sm:w-[128px]">
                  <Image alt="অ্যাম্বুলেন্স" className="object-contain" fill sizes="(max-width: 640px) 120px, 128px" src={ambulanceImage} />
                </div>
                <div className="min-w-0 flex-none sm:flex-1">
                  <h3 className="text-lg font-bold text-red-700 sm:text-xl">জরুরি অ্যাম্বুলেন্স প্রয়োজন?</h3>
                  <p className="mx-auto mt-1.5 max-w-[290px] text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-base">
                    যেকোনো সময়, যেকোনো জায়গায় দ্রুত অ্যাম্বুলেন্স সেবা নিন।
                  </p>
                </div>
                <a
                  className="inline-flex min-h-12 shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[#c83228] px-4 text-sm font-bold !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ad251d] sm:px-5 sm:text-base"
                  href="tel:999"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  <span>এখনই কল করুন</span>
                </a>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <button
                type="button"
                onClick={handleOpenAiChat}
                className="group flex w-full min-h-[260px] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-5 text-center transition hover:shadow-md sm:min-h-[148px] sm:flex-row sm:justify-start sm:gap-4 sm:px-5 sm:py-5 sm:text-left"
              >
                <div className="relative size-[76px] shrink-0 sm:size-[88px]">
                  <Image alt="AI স্বাস্থ্য সহকারী" className="object-contain" fill sizes="(max-width: 640px) 76px, 88px" src={assistantImage} />
                </div>
                <div className="min-w-0 flex-none sm:flex-1">
                  <h3 className="text-lg font-bold text-blue-700 sm:text-xl">AI স্বাস্থ্য সহকারী</h3>
                  <p className="mx-auto mt-1.5 max-w-[290px] text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-base">
                    আপনার স্বাস্থ্য সম্পর্কিত প্রশ্ন করুন এবং দ্রুত উত্তর পান।
                  </p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:translate-x-1">
                  <ArrowRight aria-hidden="true" className="size-5" />
                </span>
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <AiLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
