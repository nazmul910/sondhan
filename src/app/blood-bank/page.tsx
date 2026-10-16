import type { Metadata } from "next";
import { Droplet, HeartPulse } from "lucide-react";
import BloodBankDirectory from "@/components/blood/BloodBankDirectory";
import { BLOOD_BANK_PAGE_SIZE, fetchAllBloodBanks } from "@/features/bloodBanks/bloodBankApi";

export const metadata: Metadata = {
  title: "ব্লাড ব্যাংক খুঁজুন | Shondhan",
  description: "রক্তের গ্রুপ, ঠিকানা ও জরুরি সেবার তথ্যসহ ব্লাড ব্যাংক খুঁজে নিন।",
};

export default async function BloodBankPage() {
  let banks: Awaited<ReturnType<typeof fetchAllBloodBanks>> = [];
  let error: string | null = null;

  try {
    banks = await fetchAllBloodBanks();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "ব্লাড ব্যাংকের তথ্য লোড করা যায়নি";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="page-container relative py-12 sm:py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-rose-700 shadow-sm">
              <HeartPulse aria-hidden="true" className="size-4" />
              রক্তসেবার নির্ভরযোগ্য ঠিকানা
            </span>
            <h1 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-tight tracking-tight text-heading">
              আপনার কাছের <span className="text-blood">ব্লাড ব্যাংক</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              ঠিকানা, রক্তের গ্রুপ ও জরুরি সেবার তথ্য দেখে যোগাযোগ করুন।
            </p>
          </div>

          {!error && banks.length > 0 && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-rose-100 bg-white px-5 py-4 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-rose-50 text-blood">
                <Droplet aria-hidden="true" className="size-6 fill-current" />
              </span>
              <span>
                <strong className="block text-xl font-bold text-heading">
                  {banks.length.toLocaleString("bn-BD")}
                </strong>
                <span className="text-sm text-slate-500">টি ব্লাড ব্যাংক</span>
              </span>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="blood-banks-heading" className="page-container py-9 pb-16 sm:py-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-blood">সেবা ও যোগাযোগ</p>
            <h2 className="mt-1 text-2xl font-bold text-heading" id="blood-banks-heading">
              ব্লাড ব্যাংকের তালিকা
            </h2>
          </div>
          {!error && banks.length > 0 && (
            <p className="text-sm text-slate-500">{banks.length.toLocaleString("bn-BD")}টি সেবা</p>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-700">
            <h3 className="font-bold">ব্লাড ব্যাংকের তথ্য লোড হয়নি</h3>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : (
          <BloodBankDirectory banks={banks} pageSize={BLOOD_BANK_PAGE_SIZE} />
        )}
      </section>
    </main>
  );
}
