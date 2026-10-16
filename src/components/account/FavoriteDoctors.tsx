"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartOff } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import { useAccount } from "@/components/account/AccountProvider";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import DoctorCard from "@/components/doctor/DoctorCard";
import type { Doctor } from "@/types/doctor";

export default function FavoriteDoctors({ doctors }: { doctors: Doctor[] }) {
  const { favoriteIds, removeFavorite } = useAccount();
  const [notice, setNotice] = useState("");
  // `target` stays set while the dialog animates out, so its text never blinks empty.
  const [target, setTarget] = useState<Doctor | null>(null);
  const [open, setOpen] = useState(false);

  const favorites = favoriteIds.flatMap((id) => doctors.find((d) => d.id === id) ?? []);

  const askRemove = (doctor: Doctor) => {
    setTarget(doctor);
    setOpen(true);
  };

  const confirmRemove = () => {
    if (!target) return;
    removeFavorite(target.id);
    setNotice(`${target.name} প্রিয় তালিকা থেকে সরানো হয়েছে।`);
  };

  return (
    <section>
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {favorites.map((doctor) => (
            <DoctorCard doctor={doctor} favorite={{ saved: true, onToggle: () => askRemove(doctor) }} key={doctor.id} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
          <HeartOff aria-hidden="true" className="size-10 text-slate-400" />
          <h2 className="text-lg font-bold text-heading">আপনার প্রিয় তালিকা খালি</h2>
          <p className="max-w-sm text-sm text-slate-500">ডাক্তারের কার্ডের হার্ট আইকনে চাপ দিয়ে তাঁকে প্রিয় তালিকায় যোগ করুন।</p>
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
