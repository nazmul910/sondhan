import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function TipDisclaimer() {
  return (
    <aside className="flex items-start gap-3.5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-amber-600" />
      <div>
        <strong className="block text-[15px] text-heading">মনে রাখবেন</strong>
        <p className="mt-1 text-sm leading-7 text-slate-700">
          এই লেখা শুধু সাধারণ সচেতনতার জন্য। রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। শারীরিক সমস্যা থাকলে{" "}
          <Link className="font-bold text-primary-dark underline underline-offset-2" href="/doctors">
            ডাক্তারের পরামর্শ নিন
          </Link>
          ।
        </p>
      </div>
    </aside>
  );
}
