"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import assistantImage from "@/assets/home/assistant.svg";
import { useAiChat } from "@/hooks/useAiChat";
import AiLoginModal from "@/components/chat/AiLoginModal";

export default function AiBanner({ text }: { text: string }) {
  const { handleOpenAiChat, showLoginModal, setShowLoginModal } = useAiChat();

  return (
    <>
      <button
        type="button"
        onClick={handleOpenAiChat}
        className="group relative mt-9 flex w-full cursor-pointer flex-wrap items-center gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-5 text-left transition hover:shadow-md"
      >
        <Image alt="" className="size-20 shrink-0" height={80} src={assistantImage} width={80} />
        <div className="min-w-0 flex-1 basis-72">
          <h2 className="text-xl font-bold text-blue-700">AI স্বাস্থ্য সহকারী</h2>
          <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:translate-x-1">
          <ArrowRight aria-hidden="true" className="size-5" />
        </span>
      </button>

      <AiLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
