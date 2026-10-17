"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { KeyRound, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import FormField from "@/components/blood/FormField";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import { useAppSelector } from "@/hooks/redux";
import { changePassword } from "@/features/auth/authApi";

export default function ProfilePasswordReset() {
  const { token, user } = useAppSelector((s) => s.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("বর্তমান পাসওয়ার্ড দিন।");
      return;
    }
    if (!password || password.length < 6) {
      setError("নতুন পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।");
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirmChange = async () => {
    if (!token) {
      setError("অনুগ্রহ করে প্রথমে লগইন করুন।");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await changePassword(token, {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success(res.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।");
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "পাসওয়ার্ড পরিবর্তন করা যায়নি।";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setCurrentPassword("");
    setPassword("");
    setPasswordConfirmation("");
    setError("");
  };

  return (
    <section className="card p-5 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary-dark sm:size-14">
          <KeyRound className="size-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-heading">পাসওয়ার্ড পরিবর্তন ও রিসেট</h2>
          <p className="mt-0.5 text-[13px] text-slate-500">
            আপনার অ্যাকাউন্টের সুরক্ষার জন্য শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}


      {/* Form */}
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <FormField htmlFor="profile-curr-pw" label="বর্তমান পাসওয়ার্ড">
          <div className="relative">
            <input
              autoComplete="current-password"
              className="field pr-11"
              id="profile-curr-pw"
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
              required
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
            />
            <button
              aria-label={showCurrent ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-primary"
              onClick={() => setShowCurrent((v) => !v)}
              type="button"
            >
              {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField htmlFor="profile-new-pw" label="নতুন পাসওয়ার্ড">
            <div className="relative">
              <input
                autoComplete="new-password"
                className="field pr-11"
                id="profile-new-pw"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                required
                type={showNew ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showNew ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-primary"
                onClick={() => setShowNew((v) => !v)}
                type="button"
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FormField>

          <FormField htmlFor="profile-confirm-new-pw" label="নতুন পাসওয়ার্ড নিশ্চিত করুন">
            <div className="relative">
              <input
                autoComplete="new-password"
                className="field pr-11"
                id="profile-confirm-new-pw"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                required
                type={showConfirm ? "text" : "password"}
                value={passwordConfirmation}
              />
              <button
                aria-label={showConfirm ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-primary"
                onClick={() => setShowConfirm((v) => !v)}
                type="button"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FormField>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-3">
            <button
              className="btn-primary h-12 px-7 disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              <KeyRound aria-hidden="true" className="size-4" />
              {loading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড হালনাগাদ করুন"}
            </button>
            {(currentPassword || password || passwordConfirmation) && (
              <button className="btn-outline h-12 px-7" onClick={handleDiscard} type="button">
                বাতিল
              </button>
            )}
          </div>

          <Link
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            href="/forgot-password"
          >
            পাসওয়ার্ড ভুলে গেছেন? ওটিপি দিয়ে রিসেট করুন
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </form>

      <ConfirmDialog
        confirmLabel="হ্যাঁ, পরিবর্তন করুন"
        description="আপনার অ্যাকাউন্টের পাসওয়ার্ড নতুন পাসওয়ার্ড দিয়ে আপডেট করা হবে।"
        icon={<Lock aria-hidden="true" className="size-6 text-primary" />}
        onConfirm={handleConfirmChange}
        onOpenChange={setConfirmOpen}
        open={confirmOpen}
        title="পাসওয়ার্ড পরিবর্তন করবেন?"
      />
    </section>
  );
}
