"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  loadDoctorById,
  clearSelectedDoctor,
  toggleWishlist,
  submitDoctorRating,
  clearRateNotice,
} from "@/features/doctors/doctorSlice";
import {
  BadgeCheck,
  Hospital,
  MapPin,
  Phone,
  Stethoscope,
  Clock3,
  Users,
  Star,
  CheckCircle2,
  AlertCircle,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionCard from "@/components/shared/SectionCard";
import FavoriteButton from "@/components/shared/FavoriteButton";
import LoginRequiredDialog from "@/components/auth/LoginRequiredDialog";
import { toBn } from "@/lib/format";
import { normalizeImageUrl } from "@/lib/images";

export default function DoctorDetailClient({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const {
    selectedDoctor: doctor,
    detailLoading: loading,
    detailError: error,
    rateLoading,
    rateSuccess,
    rateError,
  } = useAppSelector((s) => s.doctors);
  const { isAuthenticated, token } = useAppSelector((s) => s.auth);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalContext, setLoginModalContext] = useState<"wishlist" | "rating">("wishlist");
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    dispatch(loadDoctorById({ id, token: token || undefined }));
    return () => {
      dispatch(clearSelectedDoctor());
      dispatch(clearRateNotice());
    };
  }, [dispatch, id, token]);

  const handleToggleWishlist = () => {
    if (!isAuthenticated || !token) {
      setLoginModalContext("wishlist");
      setLoginModalOpen(true);
      return;
    }
    if (doctor) {
      dispatch(toggleWishlist({ doctorId: doctor.id, token }));
    }
  };

  const handleRatingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      setLoginModalContext("rating");
      setLoginModalOpen(true);
      return;
    }
    if (doctor) {
      const result = await dispatch(
        submitDoctorRating({
          doctorId: doctor.id,
          rating: selectedRating,
          token,
        })
      );
      if (submitDoctorRating.fulfilled.match(result)) {
        // Refresh doctor data to show updated rating
        dispatch(loadDoctorById({ id, token }));
      }
    }
  };

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-semibold">ডেটা লোড হয়নি</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading || !doctor) {
    return (
      <div className="flex flex-col gap-5">
        <div className="card animate-pulse flex flex-wrap gap-6 p-5">
          <div className="h-[250px] w-[200px] rounded-2xl bg-slate-200" />
          <div className="flex flex-1 basis-80 flex-col gap-3 pt-2">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 h-10 w-32 rounded bg-slate-200" />
          </div>
        </div>
        <div className="card animate-pulse h-40 p-5" />
        <div className="card animate-pulse h-48 p-5" />
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex min-w-0 flex-col gap-5">
      {/* Profile Header */}
      <section className="card flex flex-wrap gap-6 p-5 sm:p-6">
        <div className="relative h-[250px] w-[200px] shrink-0 overflow-hidden rounded-2xl bg-primary-soft max-sm:mx-auto">
          {doctor.image_url && !imgError ? (
            <Image
              alt={doctor.name}
              className="object-cover object-top"
              fill
              priority
              sizes="200px"
              src={normalizeImageUrl(doctor.image_url) || doctor.image_url}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-primary">
              <Stethoscope className="size-16 opacity-30" />
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2.5">
          <div className="flex flex-wrap gap-2">
            <span className="badge">ডাক্তার</span>
            <span className="badge bg-emerald-50 text-emerald-700">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
              ভেরিফায়েড
            </span>
          </div>

          <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">
            {doctor.name}
          </h1>
          <p className="text-base font-semibold text-primary-dark">{doctor.specialization}</p>
          <p className="text-sm text-slate-500">{doctor.qualifications}</p>

          {/* Stats row */}
          <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5 font-semibold">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {doctor.rating} রেটিং
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-primary" />
              {doctor.patients_count} রোগী
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4 text-primary" />
              {doctor.experience}
            </span>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
            {doctor.phone && (
              <a className="btn-outline" href={`tel:${doctor.phone}`}>
                <Phone aria-hidden="true" className="size-[18px]" />
                কল করুন
              </a>
            )}
            <FavoriteButton
              favorite={{
                saved: !!doctor.is_wishlisted,
                onToggle: handleToggleWishlist,
              }}
              name={doctor.name}
              variant="button"
            />
          </div>
        </div>
      </section>

      {/* About / Biography */}
      {doctor.biography && (
        <SectionCard title="পরিচিতি">
          <p className="text-[15px] leading-8 text-slate-600">{doctor.biography}</p>
        </SectionCard>
      )}

      {/* Chambers / Schedule */}
      {doctor.hospitals.length > 0 && (
        <SectionCard title="চেম্বার ও সময়সূচী">
          <div className="flex flex-col gap-4">
            {doctor.hospitals.map((h) => (
              <article className="rounded-xl bg-slate-50 p-4 sm:p-5" key={h.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Hospital aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <Link
                        className="block truncate text-[15px] font-bold text-heading hover:text-primary-dark"
                        href={`/hospitals/${h.id}`}
                      >
                        {h.hospital_name}
                      </Link>
                      {h.clinic_name && (
                        <p className="text-[13px] text-slate-500">{h.clinic_name}</p>
                      )}
                      <span className="mt-1 flex items-center gap-1 text-[13px] text-slate-500">
                        <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                        {h.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available times */}
                {h.available_time.length > 0 && (
                  <dl className="mt-4">
                    {h.available_time.map((time, i) => (
                      <div
                        className="flex justify-between gap-3 border-t border-slate-200 py-3 text-sm"
                        key={i}
                      >
                        <dd className="text-slate-600">{time}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Doctor Rating & Review Section */}
      <SectionCard title="রেটিং ও মতামত">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-amber-50 text-2xl font-bold text-amber-600">
              {doctor.rating}
            </div>
            <div>
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    className={`size-5 ${
                      s <= Math.round(Number(doctor.rating) || 5)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                    key={s}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                ডাক্তারের সামগ্রিক চিকিৎসা সেবা রেটিং
              </p>
            </div>
          </div>
        </div>

        {/* Rating Submission Form */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-heading">ডাক্তারকে রেটিং দিন</h3>

          {rateSuccess && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{rateSuccess}</span>
            </div>
          )}

          {rateError && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              <span>{rateError}</span>
            </div>
          )}

          {!isAuthenticated ? (
            <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-600">
                ডাক্তারকে রেটিং প্রদান করার জন্য অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
              </p>
              <button
                className="btn-primary h-9 px-4 text-xs"
                onClick={() => {
                  setLoginModalContext("rating");
                  setLoginModalOpen(true);
                }}
                type="button"
              >
                <LogIn className="size-3.5" />
                লগইন করুন
              </button>
            </div>
          ) : (
            <form className="mt-3 space-y-4" onSubmit={handleRatingSubmit}>
              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                  আপনার স্টার রেটিং নির্বাচন করুন (১ থেকে ৫):
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      aria-label={`${toBn(star)} তারা`}
                      className="cursor-pointer rounded-lg p-1 transition hover:scale-110"
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      type="button"
                    >
                      <Star
                        className={`size-7 ${
                          star <= selectedRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="btn-primary h-10 px-5 text-xs font-bold disabled:opacity-60"
                disabled={rateLoading}
                type="submit"
              >
                {rateLoading ? "জমা হচ্ছে..." : "রেটিং জমা দিন"}
              </button>
            </form>
          )}
        </div>
      </SectionCard>

      {/* Login Required Dialog */}
      <LoginRequiredDialog
        description={
          loginModalContext === "wishlist"
            ? "ডাক্তারকে প্রিয় তালিকায় যোগ বা অপসারণ করতে অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।"
            : "ডাক্তারকে রেটিং প্রদান করতে অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।"
        }
        onOpenChange={setLoginModalOpen}
        open={loginModalOpen}
        redirectUrl={`/doctors/${doctor.id}`}
        title={loginModalContext === "wishlist" ? "প্রিয় তালিকায় যোগ করতে লগইন করুন" : "রেটিং দিতে লগইন করুন"}
      />
    </div>
  );
}
