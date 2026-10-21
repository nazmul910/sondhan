"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import BloodBankCard from "@/components/blood/BloodBankCard";
import type { BloodBank } from "@/features/bloodBanks/bloodBankApi";
import { toBn } from "@/lib/format";

const LOCATIONS = [
  { value: "Tangail", label: "টাঙ্গাইল" },
  { value: "Dhaka", label: "ঢাকা" },
  { value: "Mymensingh", label: "ময়মনসিংহ" },
] as const;

type Props = { banks: BloodBank[]; pageSize: number };

export default function BloodBankDirectory({ banks, pageSize }: Props) {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");
  const [page, setPage] = useState(1);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const hasFilters = normalizedSearch.length > 0 || district.length > 0;

  const filteredBanks = useMemo(
    () =>
      banks.filter((bank) => {
        if (district && bank.district.toLocaleLowerCase() !== district.toLocaleLowerCase()) {
          return false;
        }
        if (!normalizedSearch) return true;

        const searchableText = [
          bank.name,
          bank.address,
          bank.district,
          bank.phone,
          bank.away ?? "",
          ...bank.blood_groups,
        ]
          .join(" ")
          .toLocaleLowerCase();

        return searchableText.includes(normalizedSearch);
      }),
    [banks, district, normalizedSearch],
  );

  const pageCount = Math.max(1, Math.ceil(filteredBanks.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleBanks = filteredBanks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const startPage = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => startPage + index);

  const resetFilters = () => {
    setSearch("");
    setDistrict("");
    setPage(1);
  };

  return (
    <>
      <div className="mb-6 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-heading">
          <SlidersHorizontal aria-hidden="true" className="size-4 text-blood" />
          ব্লাড ব্যাংক খুঁজুন
        </div>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_240px]">
          <label className="relative block">
            <span className="sr-only">ব্লাড ব্যাংকের তথ্য দিয়ে খুঁজুন</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            />
            <input
              className="field pl-10"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="নাম, ঠিকানা, ফোন বা রক্তের গ্রুপ লিখুন"
              type="search"
              value={search}
            />
          </label>

          <label className="relative block">
            <span className="sr-only">জেলা বেছে নিন</span>
            <MapPin
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            />
            <select
              className="field appearance-none pl-10"
              onChange={(event) => {
                setDistrict(event.target.value);
                setPage(1);
              }}
              value={district}
            >
              <option value="">সব নির্ধারিত জেলা</option>
              {LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div aria-live="polite" className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-500">
            {filteredBanks.length.toLocaleString("bn-BD")}টি ব্লাড ব্যাংক পাওয়া গেছে
          </p>
          {hasFilters && (
            <button
              className="inline-flex items-center gap-1 text-sm font-semibold text-blood hover:text-blood-dark"
              onClick={resetFilters}
              type="button"
            >
              <X aria-hidden="true" className="size-4" />
              ফিল্টার মুছুন
            </button>
          )}
        </div>
      </div>

      {visibleBanks.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {visibleBanks.map((bank) => (
              <BloodBankCard bank={bank} key={bank.id} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav aria-label="ব্লাড ব্যাংকের পেজ নেভিগেশন" className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                aria-label="আগের পেজ"
                className="page-btn border border-slate-200 bg-white px-3 text-slate-700 transition enabled:hover:border-blood disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              {pages.map((pageNumber) => (
                <button
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={`page-btn ${
                    pageNumber === currentPage
                      ? "bg-blood font-bold text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blood"
                  }`}
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {toBn(pageNumber)}
                </button>
              ))}
              <button
                aria-label="পরের পেজ"
                className="page-btn border border-slate-200 bg-white px-3 text-slate-700 transition enabled:hover:border-blood disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage === pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-rose-50 text-blood">
            <Search aria-hidden="true" className="size-7" />
          </span>
          <h3 className="font-bold text-heading">
            {hasFilters ? "আপনার খোঁজা ব্লাড ব্যাংক পাওয়া যায়নি" : "এখনও কোনো ব্লাড ব্যাংক যোগ করা হয়নি"}
          </h3>
          <p className="max-w-md text-sm text-slate-500">
            {hasFilters
              ? "অন্য নাম, ঠিকানা, রক্তের গ্রুপ বা জেলা দিয়ে চেষ্টা করুন।"
              : "ব্লাড ব্যাংকের তথ্য যোগ হলে এখানে দেখা যাবে।"}
          </p>
          {hasFilters && (
            <button className="btn-outline mt-1" onClick={resetFilters} type="button">
              সব ব্লাড ব্যাংক দেখুন
            </button>
          )}
        </div>
      )}
    </>
  );
}
