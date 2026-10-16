import type { Metadata } from "next";
import BloodHero from "@/components/blood/BloodHero";
import BloodRequestForm from "@/components/blood/BloodRequestForm";
import DonorGrid from "@/components/blood/DonorGrid";
import DonorJoinCard from "@/components/blood/DonorJoinCard";
import DonorRegisterForm from "@/components/blood/DonorRegisterForm";
import DonorResultsHeader from "@/components/blood/DonorResultsHeader";
import BloodBankCard from "@/components/blood/BloodBankCard";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import { fetchBloodBanks } from "@/features/bloodBanks/bloodBankApi";
import { Droplet } from "lucide-react";
import { getDonors, parseDonorQuery } from "@/lib/donors";
import { parsePage, type RawSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "রক্ত ব্যাংক | Shondhan",
  description: "রক্তের গ্রুপ ও এলাকা অনুযায়ী ডোনার খুঁজুন, অথবা ডোনার হিসেবে যুক্ত হোন।",
};

export default async function BloodBankPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseDonorQuery(raw);
  const { items, total, page, pageCount } = await getDonors(query);
  const isFinding = query.mode === "find";
  const bankPage = parsePage(raw.bank_page);
  let bloodBanks: Awaited<ReturnType<typeof fetchBloodBanks>> | null = null;
  let bloodBankError: string | null = null;
  try {
    bloodBanks = await fetchBloodBanks(bankPage);
  } catch (cause) {
    bloodBankError =
      cause instanceof Error ? cause.message : "ব্লাড ব্যাংকের তথ্য লোড করা যায়নি";
    bloodBanks = null;
  }

  return (
    <main>
      <BloodHero params={raw} query={query} />

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        <section aria-label={isFinding ? "ডোনারের তালিকা" : "ডোনার রেজিস্ট্রেশন"} className="min-w-0 flex-1">
          {isFinding ? (
            <>
              <DonorResultsHeader group={query.group} sort={query.sort} total={total} />
              <DonorGrid donors={items} resetHref="/blood-bank" />
              <Pagination basePath="/blood-bank" page={page} pageCount={pageCount} params={raw} />
            </>
          ) : (
            <DonorRegisterForm />
          )}
        </section>

        <aside className="mt-8 flex flex-col gap-4 lg:sticky lg:top-24 lg:mt-0 lg:w-[360px] lg:shrink-0">
          {/* key: re-seed the form's blood group when the user picks another group above */}
          <BloodRequestForm defaultGroup={query.group} key={query.group} />
          {isFinding && <DonorJoinCard />}
        </aside>
      </div>

      <section aria-labelledby="blood-banks-title" className="bg-white py-10 sm:py-12">
        <div className="page-container">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blood">রক্তের নির্ভরযোগ্য ঠিকানা</p>
              <h2 className="mt-1 text-2xl font-bold text-heading" id="blood-banks-title">
                ব্লাড ব্যাংকসমূহ
              </h2>
            </div>
            {bloodBanks && bloodBanks.pagination.total > 0 && (
              <p className="text-sm text-slate-500">
                মোট {bloodBanks.pagination.total.toLocaleString("bn-BD")}টি ব্লাড ব্যাংক
              </p>
            )}
          </div>

          {bloodBankError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-700">
              <h3 className="font-bold">ব্লাড ব্যাংকের তথ্য লোড হয়নি</h3>
              <p className="mt-2 text-sm">{bloodBankError}</p>
            </div>
          ) : !bloodBanks || bloodBanks.items.length === 0 ? (
            <EmptyState
              hint="ব্লাড ব্যাংকের তথ্য যোগ হলে এখানে দেখা যাবে।"
              icon={Droplet}
              title="এখনও কোনো ব্লাড ব্যাংক যোগ করা হয়নি"
            />
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                {bloodBanks.items.map((bank) => (
                  <BloodBankCard bank={bank} key={bank.id} />
                ))}
              </div>
              <Pagination
                basePath="/blood-bank"
                page={bloodBanks.pagination.current_page}
                pageCount={bloodBanks.pagination.last_page}
                pageParam="bank_page"
                params={raw}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
