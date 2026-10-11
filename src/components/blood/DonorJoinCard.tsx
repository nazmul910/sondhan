import Link from "next/link";
import { Droplet } from "lucide-react";

export default function DonorJoinCard() {
  return (
    <section className="rounded-2xl bg-primary-soft p-5 sm:p-6">
      <h2 className="text-xl font-bold text-primary-dark">রক্ত দিতে চান?</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">ডোনার হিসেবে রেজিস্টার করুন, প্রয়োজনে মানুষ আপনার সাথে যোগাযোগ করবে।</p>
      <Link className="btn-primary mt-4 min-h-12 w-full" href="/blood-bank?mode=donor" scroll={false}>
        <Droplet aria-hidden="true" className="size-[18px]" />
        ডোনার হিসেবে যুক্ত হোন
      </Link>
    </section>
  );
}
