"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useAiChat } from "@/hooks/useAiChat";
import AiLoginModal from "@/components/chat/AiLoginModal";
import { useAppSelector } from "@/hooks/redux";

/**
 * Fixed bottom-right floating AI chatbot button.
 * - Shows a pulsing glow AI orb button at all times (after scroll or page load).
 * - On click: opens AiChatDrawer if logged in, or AiLoginModal if not.
 * - Industry-standard FAB pattern (like Intercom, Crisp, Tidio).
 */
export default function AiChatFAB() {
  const { handleOpenAiChat, showLoginModal, setShowLoginModal } = useAiChat();
  const { isOpen } = useAppSelector((s) => s.chat);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Fade in after mount (slight delay for polish)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        {/* Tooltip Label – shows on hover */}
        <div
          aria-hidden="true"
          className={`flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            hovered && !isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            AI স্বাস্থ্য সহকারী
          </span>
          <span className="text-[10px] text-slate-400">• ২৪/৭ সক্রিয়</span>
        </div>

        {/* The FAB button itself */}
        <button
          type="button"
          onClick={handleOpenAiChat}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="AI স্বাস্থ্য সহকারী খুলুন"
          className="group relative flex size-16 cursor-pointer items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
          style={{
            background: "linear-gradient(135deg, #078b7c 0%, #0aad9b 60%, #11d4be 100%)",
          }}
        >
          {/* Pulsing glow ring 1 */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ai-ping-ring"
          />
          {/* Pulsing glow ring 2 (delayed) */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ai-ping-ring-delay"
          />

          {/* Outer soft glow on hover */}
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle, rgba(7,139,124,0.25) 0%, transparent 70%)",
            }}
          />

          {/* AI Robot Image (circular, inside button) */}
          <div className="relative size-10 overflow-hidden rounded-full border-2 border-white/50 shadow-inner">
            <Image
              src="/assets/ai-robot.jpg"
              alt="Sondhan AI"
              width={40}
              height={40}
              className="size-full object-cover"
              priority
            />
            {/* Shimmer overlay on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Sparkle badge top-right */}
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-yellow-400 to-amber-500 shadow"
          >
            <Sparkles className="size-2.5 text-white" />
          </span>

          {/* Online indicator bottom-right */}
          <span
            aria-hidden="true"
            className="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-white bg-emerald-400"
          />
        </button>
      </div>

      {/* Login prompt modal for unauthenticated users */}
      <AiLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />

      {/* Keyframe animations */}
      <style>{`
        @keyframes ai-ping {
          0% { box-shadow: 0 0 0 0 rgba(7,139,124,0.6); opacity: 1; }
          70% { box-shadow: 0 0 0 20px rgba(7,139,124,0); opacity: 0; }
          100% { box-shadow: 0 0 0 0 rgba(7,139,124,0); opacity: 0; }
        }
        @keyframes ai-ping-d {
          0% { box-shadow: 0 0 0 0 rgba(7,139,124,0.4); opacity: 1; }
          70% { box-shadow: 0 0 0 28px rgba(7,139,124,0); opacity: 0; }
          100% { box-shadow: 0 0 0 0 rgba(7,139,124,0); opacity: 0; }
        }
        .ai-ping-ring {
          animation: ai-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .ai-ping-ring-delay {
          animation: ai-ping-d 2.2s cubic-bezier(0, 0, 0.2, 1) infinite 0.7s;
        }
      `}</style>
    </>
  );
}
