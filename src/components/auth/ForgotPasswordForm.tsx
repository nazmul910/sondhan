"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, KeyRound, LockKeyhole, AlertCircle, CheckCircle2 } from "lucide-react";
import { forgotPassword, verifyOtp, resetPassword } from "@/features/auth/authApi";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";

type Step = "email" | "otp" | "reset" | "done";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("আপনার ইমেইল ঠিকানা দিন।");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email.trim());
      setMessage(res.message);
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ওটিপি পাঠানো যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("ওটিপি কোডটি লিখুন।");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(email.trim(), otp.trim());
      setResetToken(res.token);
      setMessage("ওটিপি সফলভাবে যাচাই হয়েছে। নতুন পাসওয়ার্ড সেট করুন।");
      setStep("reset");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ওটিপি সঠিক নয় বা মেয়াদ শেষ হয়ে গেছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || password.length < 6) {
      setError("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== confirmPassword) {
      setError("নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({
        email: email.trim(),
        token: resetToken,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage(res.message);
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "পাসওয়ার্ড রিসেট করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Link
        className="mb-4 flex w-fit items-center gap-1.5 text-xs font-semibold text-[#477f82] transition hover:underline"
        href="/login"
      >
        <ArrowLeft className="size-3.5" />
        লগইনে ফিরে যান
      </Link>

      <div className="mb-6">
        <AuthHeading
          text={
            step === "email"
              ? "আপনার নিবন্ধিত ইমেইল লিখুন, আমরা পাসওয়ার্ড রিসেট ওটিপি পাঠাব।"
              : step === "otp"
              ? `${email} ঠিকানায় প্রেরিত ওটিপি কোডটি লিখুন।`
              : step === "reset"
              ? "আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড দিন।"
              : "আপনার পাসওয়ার্ড সফলভাবে রিসেট সম্পন্ন হয়েছে।"
          }
          title={step === "done" ? "সফল হয়েছে" : "পাসওয়ার্ড ভুলে গেছেন?"}
        />
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {step === "email" && (
        <form className="space-y-4" onSubmit={handleSendOtp}>
          <AuthField
            autoComplete="email"
            icon={Mail}
            id="forgot-email-input"
            label="ইমেইল ঠিকানা"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার নিবন্ধিত ইমেইল লিখুন"
            required
            type="email"
            value={email}
          />
          <button
            className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "ওটিপি পাঠানো হচ্ছে..." : "ওটিপি পাঠান"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form className="space-y-4" onSubmit={handleVerifyOtp}>
          <AuthField
            icon={KeyRound}
            id="forgot-otp-input"
            label="ওটিপি কোড"
            name="otp"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="ওটিপি লিখুন (যেমন: 1111)"
            required
            type="text"
            value={otp}
          />
          <button
            className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "যাচাই করা হচ্ছে..." : "ওটিপি যাচাই করুন"}
          </button>
        </form>
      )}

      {step === "reset" && (
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <AuthField
            icon={LockKeyhole}
            id="forgot-new-pw"
            label="নতুন পাসওয়ার্ড"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
            required
            type="password"
            value={password}
          />
          <AuthField
            icon={LockKeyhole}
            id="forgot-confirm-pw"
            label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="পাসওয়ার্ডটি আবার লিখুন"
            required
            type="password"
            value={confirmPassword}
          />
          <button
            className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "রিসেট করা হচ্ছে..." : "পাসওয়ার্ড রিসেট করুন"}
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="mt-4">
          <Link
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073]"
            href="/login"
          >
            লগইন পেজে যান
          </Link>
        </div>
      )}
    </div>
  );
}
