"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useAiChat } from "@/hooks/useAiChat";
import AiLoginModal from "@/components/chat/AiLoginModal";
import { useAppSelector } from "@/hooks/redux";
import aiImg from "@/assets/ai/E V E.svg";

export default function AiChatFAB() {
  const { handleOpenAiChat, showLoginModal, setShowLoginModal } = useAiChat();
  const { isOpen } = useAppSelector((s) => s.chat);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Floating Widget ── */}
      <div
        className={`fixed bottom-4 right-3 z-50 flex flex-col items-end gap-0
          sm:bottom-5 sm:right-4
          md:bottom-6 md:right-5
          transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >

        {/* ════ CLOSED STATE ════ */}
        <div
          className={`flex flex-col items-end gap-0 transition-all duration-300 ${
            isOpen
              ? "opacity-0 scale-90 pointer-events-none h-0 overflow-hidden"
              : "opacity-100 scale-100"
          }`}
          aria-hidden={isOpen}
        >
          {/* Tooltip bubble — hidden on very small screens, shown sm+ */}
          <div
            className={`ai-bubble relative mb-3 rounded-2xl border border-slate-200/80
              bg-white/95 shadow-xl backdrop-blur-sm
              transition-all duration-300
              hidden lg:block
              sm:mr-3 sm:px-3.5 sm:py-2.5
              md:mr-4 md:px-4 md:py-3
              ${hovered ? "shadow-2xl -translate-y-0.5" : ""}`}
            style={{ minWidth: 170, maxWidth: 220 }}
          >
            <span className="ai-bubble-tail" aria-hidden="true" />
            <p className="font-bold text-slate-800 mb-0.5 text-[12px] sm:text-[13px]">
              কী জানতে চান?
            </p>
            <p className="leading-snug text-slate-500 text-[11px] sm:text-[12px] md:text-[13px]">
              স্বাস্থ্যের তথ্য খুঁজতে আমি আপনার সাথে আছি
            </p>
          </div>

          {/* Robot circle + banner row */}
          <button
            type="button"
            onClick={handleOpenAiChat}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="AI স্বাস্থ্য সহকারী খুলুন"
            className="group flex items-center gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
          >
            {/* Robot circle */}
            <div
              className={`
                relative z-10 shrink-0 flex items-center justify-center rounded-full shadow-2xl
                transition-transform duration-300 group-hover:scale-105 group-active:scale-95
                size-[68px]
                sm:size-[76px]
                md:size-[84px]
              `}
              style={{
                background: "linear-gradient(135deg, #e0f7f5 0%, #b2ebe0 100%)",
              }}
            >
              <span aria-hidden="true" className="absolute inset-0 rounded-full ai-fab-ring" />
              <span aria-hidden="true" className="absolute inset-0 rounded-full ai-fab-ring-d" />

              <div className="relative size-[58px] sm:size-[64px] md:size-[72px] overflow-hidden rounded-full">
                <Image
                  src={aiImg}
                  alt="Sondhan AI Robot"
                  width={72}
                  height={72}
                  className="size-full object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Banner pill */}
            <div
              className={`
                relative hidden lg:flex items-center rounded-r-full shadow-lg
                transition-all duration-300
                -ml-4 h-[52px] gap-1.5 pl-7 pr-3
                sm:-ml-5 sm:h-[58px] sm:gap-2 sm:pl-8 sm:pr-3.5
                md:h-[64px] md:pl-9 md:pr-3.5
                group-hover:pr-4 sm:group-hover:pr-5
              `}
              style={{
                background: "linear-gradient(135deg, #078b7c 0%, #0aad9b 60%, #11d4be 100%)",
                minWidth: 148,
              }}
            >
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-[12px] sm:text-[13px] md:text-[14px]">
                  AI স্বাস্থ্য সহকারী
                </span>
                <span className="text-emerald-100/90 text-[10px] sm:text-[11px] md:text-[12px]">
                  আপনার প্রশ্ন করুন
                </span>
              </div>
              <span className="ml-auto flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                <ChevronRight className="size-3.5 sm:size-4 text-white" />
              </span>
            </div>
          </button>
        </div>

        {/* ════ OPEN STATE: only robot circle ════ */}
        <div
          className={`transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none h-0 overflow-hidden"
          }`}
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            onClick={handleOpenAiChat}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="AI চ্যাট খুলুন"
            className={`
              group relative flex cursor-pointer items-center justify-center rounded-full shadow-2xl
              transition-all duration-300 hover:scale-110 active:scale-95
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
              size-[60px] sm:size-[68px] md:size-[76px]
            `}
            style={{
              background: "linear-gradient(135deg, #e0f7f5 0%, #b2ebe0 100%)",
            }}
          >
            <span aria-hidden="true" className="absolute inset-0 rounded-full ai-fab-ring" />
            <div className="relative size-[50px] sm:size-[58px] md:size-[64px] overflow-hidden rounded-full">
              <Image
                src={aiImg}
                alt="Sondhan AI"
                width={64}
                height={64}
                className="size-full object-contain"
                priority
                unoptimized
              />
            </div>
          </button>
        </div>
      </div>

      {/* Login prompt modal */}
      <AiLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />

      {/* Keyframe animations */}
      <style>{`
        @keyframes ai-fab-ping {
          0%   { box-shadow: 0 0 0 0 rgba(7,139,124,0.5); opacity: 1; }
          70%  { box-shadow: 0 0 0 16px rgba(7,139,124,0); opacity: 0; }
          100% { box-shadow: 0 0 0 0 rgba(7,139,124,0); opacity: 0; }
        }
        @keyframes ai-fab-ping-d {
          0%   { box-shadow: 0 0 0 0 rgba(7,139,124,0.3); opacity: 1; }
          70%  { box-shadow: 0 0 0 24px rgba(7,139,124,0); opacity: 0; }
          100% { box-shadow: 0 0 0 0 rgba(7,139,124,0); opacity: 0; }
        }
        .ai-fab-ring   { animation: ai-fab-ping   2.4s cubic-bezier(0,0,0.2,1) infinite; }
        .ai-fab-ring-d { animation: ai-fab-ping-d 2.4s cubic-bezier(0,0,0.2,1) infinite 0.8s; }

        .ai-bubble-tail {
          position: absolute;
          bottom: -7px;
          right: 26px;
          width: 14px;
          height: 7px;
          background: white;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.06));
        }
      `}</style>
    </>
  );
}
