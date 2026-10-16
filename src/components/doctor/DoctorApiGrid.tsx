"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadDoctors } from "@/features/doctors/doctorSlice";
import type { ApiDoctorListItem } from "@/features/doctors/types";
import DoctorApiCard from "./DoctorApiCard";
import EmptyState from "@/components/shared/EmptyState";
import { Stethoscope } from "lucide-react";

export default function DoctorApiGrid({ search }: { search?: string }) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.doctors);

  useEffect(() => {
    dispatch(loadDoctors({ search }));
  }, [dispatch, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="card animate-pulse min-h-[218px] p-4" key={i}>
            <div className="flex gap-3.5">
              <div className="h-[156px] w-[104px] shrink-0 rounded-xl bg-slate-200" />
              <div className="flex flex-1 flex-col gap-3 pt-1">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="mt-auto h-9 rounded-lg bg-slate-200" />
              </div>
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
        actionLabel="সব ডাক্তার দেখুন"
        hint={
          search
            ? "অন্য নাম বা বিশেষত্ব দিয়ে আবার খুঁজে দেখুন।"
            : "ডাক্তারদের তথ্য যোগ হলে এখানে দেখা যাবে।"
        }
        icon={search ? undefined : Stethoscope}
        resetHref={search ? "/doctors" : undefined}
        title={search ? "আপনার খোঁজা ডাক্তারকে পাওয়া যায়নি" : "এখনও কোনো ডাক্তার যোগ করা হয়নি"}
      />
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {items.map((doctor: ApiDoctorListItem) => (
        <DoctorApiCard doctor={doctor} key={doctor.id} />
      ))}
    </div>
  );
}
