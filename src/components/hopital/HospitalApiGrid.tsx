"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Building2, ShieldAlert, ShieldCheck, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadHospitals } from "@/features/hospitals/hospitalSlice";
import type { ApiHospitalListItem } from "@/features/hospitals/types";
import HospitalApiCard from "./HospitalApiCard";
import EmptyState from "@/components/shared/EmptyState";

interface HospitalApiGridProps {
  search?: string;
  antivenomOnly?: boolean;
}

export default function HospitalApiGrid({
  search,
  antivenomOnly = false,
}: HospitalApiGridProps) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.hospitals);

  useEffect(() => {
    dispatch(loadHospitals({ search }));
  }, [dispatch, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="card animate-pulse min-h-[190px] p-4" key={i}>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="size-20 rounded-2xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-auto h-8 rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        <p className="font-semibold">হাসপাতালের তথ্য লোড করা যায়নি</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  // Filter if antivenom filter is requested
  const displayedItems = antivenomOnly
    ? items.filter((hospital) => Boolean(hospital.has_antivenom))
    : items;

  // Empty state when filtered by antivenom
  if (antivenomOnly && displayedItems.length === 0) {
    return (
      <EmptyState
        actionLabel="সব হাসপাতাল দেখুন"
        hint="এই মুহূর্তে অ্যান্টিভেনম মজুত রয়েছে এমন কোনো হাসপাতাল তালিকায় পাওয়া যায়নি। জরুরি প্রয়োজনে নিকটস্থ সদর হাসপাতাল বা জরুরি সেবায় যোগাযোগ করুন।"
        icon={ShieldAlert}
        resetHref="/hospitals"
        title="কোনো অ্যান্টিভেনমযুক্ত হাসপাতাল পাওয়া যায়নি"
      />
    );
  }

  // Empty state when general search or list has no items
  if (displayedItems.length === 0) {
    return (
      <EmptyState
        actionLabel="সব হাসপাতাল দেখুন"
        hint={
          search
            ? "অন্য নাম বা এলাকার তথ্য দিয়ে আবার খুঁজে দেখুন।"
            : "হাসপাতাল ও ক্লিনিকের তথ্য যোগ হলে এখানে দেখা যাবে।"
        }
        icon={search ? undefined : Building2}
        resetHref={search ? "/hospitals" : undefined}
        title={search ? "আপনার খোঁজা হাসপাতালটি পাওয়া যায়নি" : "এখনও কোনো হাসপাতাল যোগ করা হয়নি"}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Active filter notification banner if antivenomOnly */}
      {antivenomOnly && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2.5 text-xs text-emerald-900 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
            <span>
              বর্তমানে শুধুমাত্র <strong>অ্যান্টিভেনম উপলব্ধ</strong> এমন হাসপাতালগুলো দেখানো হচ্ছে ({displayedItems.length}টি পাওয়া গেছে)।
            </span>
          </div>

          <Link
            href="/hospitals"
            className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 shrink-0"
          >
            <span>ফিল্টার মুছুন</span>
            <X className="size-3.5" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {displayedItems.map((hospital: ApiHospitalListItem) => (
          <HospitalApiCard hospital={hospital} key={hospital.id} />
        ))}
      </div>
    </div>
  );
}
