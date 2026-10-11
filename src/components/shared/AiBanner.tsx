import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import assistantImage from "@/assets/home/assistant.svg";

export default function AiBanner({ text }: { text: string }) {
  return (
    <Link
      aria-describedby="ai-banner-tooltip"
      className="group relative mt-9 flex flex-wrap items-center gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-5 transition hover:shadow-md"
      href="#"
    >
      <Image alt="" className="size-20 shrink-0" height={80} src={assistantImage} width={80} />
      <div className="min-w-0 flex-1 basis-72">
        <h2 className="text-xl font-bold text-blue-700">AI স্বাস্থ্য সহকারী</h2>
        <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
      </div>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:translate-x-1">
        <ArrowRight aria-hidden="true" className="size-5" />
      </span>
      <span
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-1 rounded-lg bg-heading px-4 py-2.5 text-center text-xs leading-relaxed text-white opacity-0 shadow-lg transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        id="ai-banner-tooltip"
        role="tooltip"
      >
        AI সহকারী আপনার প্রশ্ন বিশ্লেষণ করে প্রাসঙ্গিক স্বাস্থ্যতথ্য খুঁজে পেতে সাহায্য করে।
      </span>
    </Link>
  );
}
