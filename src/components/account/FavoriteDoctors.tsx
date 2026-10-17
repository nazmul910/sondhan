"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartOff } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import DoctorApiCard from "@/components/doctor/DoctorApiCard";
import type { ApiDoctorListItem } from "@/features/doctors/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadWishlist, toggleWishlist } from "@/features/doctors/doctorSlice";

export default function FavoriteDoctors() {
  const dispatch = useAppDispatch();
  const { wishlistItems, wishlistLoading } = useAppSelector((s) => s.doctors);
  const { token } = useAppSelector((s) => s.auth);

  const [target, setTarget] = useState<ApiDoctorListItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(loadWishlist(token));
    }
  }, [dispatch, token]);

  const askRemove = (doctor: ApiDoctorListItem) => {
    setTarget(doctor);
    setOpen(true);
  };

  const confirmRemove = async () => {
    if (!target || !token) return;
    try {
      await dispatch(toggleWishlist({ doctorId: target.id, token }));
      toast.success(`${target.name} প্রিয় তালিকা থেকে সরানো হয়েছে।`);
    } catch {
      toast.error("প্রিয় তালিকা থেকে সরাতে সমস্যা হয়েছে।");
    }
    setTarget(null);
  };

  if (wishlistLoading && wishlistItems.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div className="card animate-pulse h-56 p-4" key={i} />
        ))}
      </div>
    );
  }

  return (
    <section>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {wishlistItems.map((doctor) => (
            <DoctorApiCard
              doctor={doctor}
              key={doctor.id}
              onRemoveFavorite={() => askRemove(doctor)}
            />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
          <HeartOff aria-hidden="true" className="size-10 text-slate-400" />
          <h2 className="text-lg font-bold text-heading">আপনার প্রিয় তালিকা খালি</h2>
          <p className="max-w-sm text-sm text-slate-500">
            ডাক্তারের কার্ডের হার্ট আইকনে চাপ দিয়ে তাঁকে প্রিয় তালিকায় যোগ করুন।
          </p>
          <Link className="btn-outline mt-3 h-11" href="/doctors">
            ডাক্তার খুঁজুন
          </Link>
        </div>
      )}

      {target && (
        <ConfirmDialog
          confirmLabel="হ্যাঁ, সরিয়ে ফেলুন"
          description={`${target.name} আপনার প্রিয় তালিকা থেকে সরে যাবে। চাইলে পরে আবার যোগ করতে পারবেন।`}
          icon={<HeartOff aria-hidden="true" className="size-6" />}
          onConfirm={confirmRemove}
          onOpenChange={setOpen}
          open={open}
          title="প্রিয় তালিকা থেকে সরাবেন?"
          tone="danger"
        />
      )}
    </section>
  );
}
