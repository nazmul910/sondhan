"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  AlertTriangle,
  MapPin,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  initChat,
  sendUserMessage,
  resetChat,
  setChatOpen,
} from "@/features/chat/chatSlice";
import type { ChatMessage } from "@/features/chat/types";

const SUGGESTED_PROMPTS = [
  "কাছাকাছি কোন হাসপাতালে এন্টিভেনম আছে এবং কত দূরে?",
  "আমার শরীরে প্রচণ্ড জ্বর ও মাথাব্যথা, এখন কোন ডাক্তারের কাছে যাব?",
  "জরুরি অ্যাম্বুলেন্স সেবা কীভাবে দ্রুত পেতে পারি?",
  "হৃদরোগ বিশেষজ্ঞ ডাক্তারের সিরিয়াল কীভাবে পাব?",
];

function formatMessageText(text: string) {
  // Simple markdown-style parser for bold **text** and linebreaks
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    // split by **bold**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={lIdx} className="block leading-relaxed">
        {parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-bold text-heading">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  });
}

function formatTime(isoString?: string) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function AiChatDrawer() {
  const dispatch = useAppDispatch();
  const { isOpen, messages, loading, sending, isHumanHandled } = useAppSelector(
    (s) => s.chat
  );
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [inputMessage, setInputMessage] = useState("");
  const [coords, setCoords] = useState<{ latitude?: number; longitude?: number }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat when drawer opens
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      dispatch(initChat());
    }
  }, [isOpen, isAuthenticated, dispatch]);

  // Request user geolocation for location-aware answers (e.g. nearest antivenom hospital)
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          // Fallback or permission denied: leave coords empty
        },
        { timeout: 8000 }
      );
    }
  }, []);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, sending, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend ?? inputMessage).trim();
    if (!text || sending) return;

    setInputMessage("");
    await dispatch(
      sendUserMessage({
        message: text,
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = async () => {
    if (confirm("আপনি কি নতুন চ্যাট সেশন শুরু করতে চান?")) {
      await dispatch(resetChat());
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setChatOpen(open))}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col p-0 sm:max-w-md md:max-w-lg"
      >
        {/* Header */}
        <SheetHeader className="bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-white px-5 py-4 border-b border-slate-200/80">
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-primary/30 bg-white p-0.5 shadow-sm">
                <Image
                  src="/assets/ai-robot.jpg"
                  alt="AI স্বাস্থ্য সহকারী"
                  width={40}
                  height={40}
                  className="size-full rounded-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                  title="অনলাইন"
                />
              </div>

              <div className="min-w-0">
                <SheetTitle className="flex items-center gap-1.5 text-base font-bold text-heading leading-tight truncate">
                  <span>সন্ধান AI সহকারী</span>
                  <Sparkles className="size-3.5 text-primary shrink-0" />
                </SheetTitle>
                <p className="flex items-center gap-1 text-[11px] text-slate-500 truncate mt-0.5">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {isHumanHandled ? "সাপোর্ট সদস্য সংযুক্ত" : "২৪/৭ সক্রিয় স্মার্ট সহকারী"}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-primary active:scale-95"
              title="নতুন চ্যাট শুরু করুন"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">নতুন চ্যাট</span>
            </button>
          </div>
        </SheetHeader>

        {/* Disclaimer Notice Banner */}
        <div className="flex items-center gap-2 border-b border-amber-200/60 bg-amber-50/90 px-4 py-2 text-[11px] text-amber-900">
          <AlertTriangle className="size-3.5 shrink-0 text-amber-700" />
          <span className="leading-tight">
            জরুরি প্রয়োজনে বিলম্ব না করে নিকটস্থ হাসপাতালে যান বা ডাক্তারের পরামর্শ নিন।
          </span>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50">
          {loading && messages.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="size-6 animate-spin text-primary" />
              <p className="text-xs">চ্যাট লোড হচ্ছে...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="size-16 rounded-2xl bg-primary-soft/80 p-2 shadow-sm border border-primary/20 mb-3 flex items-center justify-center">
                <Image
                  src="/assets/ai-robot.jpg"
                  alt="AI Assistant"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover"
                />
              </div>

              <h4 className="text-base font-bold text-heading">
                আসসালামু আলাইকুম!
              </h4>
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
                আমি সন্ধান এআই সহকারী। লক্ষণ যাচাই, উপযুক্ত ডাক্তার নির্বাচন কিংবা হাসপাতালে এন্টিভেনম মজুত সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।
              </p>

              <div className="mt-5 w-full text-left">
                <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  জনপ্রিয় প্রশ্নসমূহ:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="rounded-xl border border-slate-200/90 bg-white p-2.5 text-left text-xs text-slate-700 shadow-2xs transition hover:border-primary/50 hover:bg-primary-soft/30 hover:text-primary active:scale-[0.99]"
                    >
                      💬 {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg: ChatMessage) => {
                const isUser = msg.sender_type === "user";
                const isHuman = msg.sender_type === "human";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs shadow-xs ${
                        isUser
                          ? "bg-primary text-white"
                          : isHuman
                          ? "bg-indigo-600 text-white"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {isUser ? (
                        <User className="size-4" />
                      ) : isHuman ? (
                        <ShieldCheck className="size-4" />
                      ) : (
                        <Bot className="size-4 text-emerald-700" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`flex max-w-[82%] flex-col ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-xs ${
                          isUser
                            ? "bg-primary text-white rounded-tr-xs"
                            : isHuman
                            ? "bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-tl-xs"
                            : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs"
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                            <span>
                              {isHuman ? "সাপোর্ট প্রতিনিধি" : "সন্ধান AI"}
                            </span>
                          </div>
                        )}
                        <div className="space-y-1">
                          {formatMessageText(msg.message)}
                        </div>
                      </div>

                      <span className="mt-1 px-1 text-[10px] text-slate-400">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Sending / Typing State */}
              {sending && (
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
                    <Bot className="size-4 text-emerald-700" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-500 shadow-xs">
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                    <span className="ml-1 text-[11px] text-slate-400">
                      উত্তর তৈরি হচ্ছে...
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200/90 bg-white p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex flex-1 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="আপনার লক্ষণ বা প্রশ্ন লিখুন..."
                disabled={sending}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/60 py-2.5 pl-3.5 pr-8 text-xs text-heading outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
              />
              {coords.latitude && (
                <span
                  title="লোকেশন সক্রিয়"
                  className="absolute right-2.5 text-emerald-600"
                >
                  <MapPin className="size-3.5" />
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim() || sending}
              className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              aria-label="বার্তা পাঠান"
            >
              {sending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-400">
            <span>
              {coords.latitude
                ? "📍 আপনার অবস্থান সক্রিয় রয়েছে"
                : "📍 অবস্থান শেয়ার করলে নিখুঁত নিকটস্থ ফলাফল পাওয়া যায়"}
            </span>
            <span>Enter চাপুন</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
