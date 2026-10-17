"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock3, Stethoscope } from "lucide-react";
import type { ApiDoctorListItem } from "@/features/doctors/types";
import FavoriteButton from "@/components/shared/FavoriteButton";
import LoginRequiredDialog from "@/components/auth/LoginRequiredDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleWishlist } from "@/features/doctors/doctorSlice";

export default function DoctorApiCard({
  doctor,
  onRemoveFavorite,
}: {
  doctor: ApiDoctorListItem;
  onRemoveFavorite?: (id: number) => void;
}) {
  const dispatch = useAppDispatch();
  const { wishlistItems } = useAppSelector((s) => s.doctors);
  const { isAuthenticated, token } = useAppSelector((s) => s.auth);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const href = `/doctors/${doctor.id}`;
  const isWishlisted = wishlistItems.some((d) => d.id === doctor.id);

  const handleToggle = () => {
    if (!isAuthenticated || !token) {
      setLoginModalOpen(true);
      return;
    }
    if (onRemoveFavorite) {
      onRemoveFavorite(doctor.id);
    } else {
      dispatch(toggleWishlist({ doctorId: doctor.id, token }));
    }
  };

  return (
    <article className="card card-interactive relative flex min-h-[218px] gap-3.5 p-3.5 sm:min-h-[228px] sm:gap-4 sm:p-4">
      {/* Top right Favorite Button */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <FavoriteButton
          favorite={{
            saved: isWishlisted,
            onToggle: handleToggle,
          }}
          name={doctor.name}
          variant="icon"
        />
      </div>

      {/* Avatar */}
      <Link
        className="relative h-[156px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-primary-soft sm:h-[164px] sm:w-[116px]"
        href={href}
      >
        {doctor.image_url ? (
          <Image
            alt={doctor.name}
            className="object-cover object-top"
            fill
            sizes="(max-width: 600px) 104px, 116px"
            src={doctor.image_url}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-primary">
            <Stethoscope className="size-10 opacity-40" />
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col pr-7">
        <h3 className="truncate pt-0.5 text-sm font-bold leading-snug text-heading sm:text-base">
          <Link href={href}>{doctor.name}</Link>
        </h3>

        <p className="mt-1 truncate text-[13px] text-slate-500 sm:text-sm">
          {doctor.specialization}
        </p>

        <p className="mt-1 truncate text-[13px] text-slate-400 sm:text-sm">
          {doctor.qualifications}
        </p>

        {doctor.away && (
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-slate-600 sm:text-sm">
            <MapPin aria-hidden="true" className="size-[18px] shrink-0 fill-primary text-primary" />
            <span className="truncate">{doctor.away}</span>
          </p>
        )}

        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600 sm:text-sm">
          <Clock3 aria-hidden="true" className="size-[18px] shrink-0 text-primary" />
          {doctor.experience}
        </p>

        <Link className="btn-outline mt-auto min-h-9 text-xs sm:text-[13px]" href={href}>
          বিস্তারিত দেখুন
        </Link>
      </div>

      <LoginRequiredDialog
        description="ডাক্তারদের প্রিয় তালিকায় সংরক্ষণ করে রাখতে অনুগ্রহ করে লগইন করুন।"
        onOpenChange={setLoginModalOpen}
        open={loginModalOpen}
        redirectUrl={href}
        title="প্রিয় তালিকায় যোগ করতে লগইন করুন"
      />
    </article>
  );
}
