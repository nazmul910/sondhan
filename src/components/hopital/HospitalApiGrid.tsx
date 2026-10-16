"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadHospitals } from "@/features/hospitals/hospitalSlice";
import type { ApiHospitalListItem } from "@/features/hospitals/types";
import HospitalApiCard from "./HospitalApiCard";
import EmptyState from "@/components/shared/EmptyState";
import { Building2 } from "lucide-react";

export default function HospitalApiGrid({ search }: { search?: string }) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.hospitals);

  useEffect(() => {
    dispatch(loadHospitals({ search }));
  }, [dispatch, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="card animate-pulse min-h-[180px] p-4" key={i}>
            <div className="flex flex-col gap-3">
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="mt-auto h-9 rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        <p className="font-semibold">ডেটা লোড হয়নি</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        actionLabel="সব হাসপাতাল দেখুন"
        hint={
          search
            ? "অন্য নাম বা এলাকার তথ্য দিয়ে আবার খুঁজে দেখুন।"
            : "হাসপাতাল ও ক্লিনিকের তথ্য যোগ হলে এখানে দেখা যাবে।"
        }
        icon={search ? undefined : Building2}
        resetHref={search ? "/hospitals" : undefined}
        title={search ? "আপনার খোঁজা হাসপাতালটি পাওয়া যায়নি" : "এখনও কোনো হাসপাতাল যোগ করা হয়নি"}
      />
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {items.map((hospital: ApiHospitalListItem) => (
        <HospitalApiCard hospital={hospital} key={hospital.id} />
      ))}
    </div>
  );
}
