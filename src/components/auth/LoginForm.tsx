"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail, AlertCircle, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, clearAuthError } from "@/features/auth/authSlice";
import { forgotPassword, verifyOtp, resetPassword } from "@/features/auth/authApi";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";

type ForgotStep = "email" | "otp" | "reset" | "done";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account/profile";

  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error: authError } = useAppSelector((state) => state.auth);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  // Forgot password flow states
  const [isForgot, setIsForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      setFormError("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    const resultAction = await dispatch(login({ email: email.trim(), password }));
    if (login.fulfilled.match(resultAction)) {
      router.replace(redirect);
    }
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    if (!forgotEmail.trim()) {
      setForgotError("আপনার ইমেইল ঠিকানা লিখুন।");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await forgotPassword(forgotEmail.trim());
      setForgotMessage(res.message);
      setForgotStep("otp");
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : "ওটিপি পাঠানো যায়নি।");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    if (!otp.trim()) {
      setForgotError("ওটিপি কোডটি লিখুন।");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await verifyOtp(forgotEmail.trim(), otp.trim());
      setResetToken(res.token);
      setForgotMessage("ওটিপি সফলভাবে যাচাই হয়েছে। নতুন পাসওয়ার্ড সেট করুন।");
      setForgotStep("reset");
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : "ওটিপি যাচাই করা যায়নি।");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    if (!newPassword || newPassword.length < 6) {
      setForgotError("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setForgotError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await resetPassword({
        email: forgotEmail.trim(),
        token: resetToken,
        password: newPassword,
        password_confirmation: confirmNewPassword,
      });
      setForgotMessage(res.message);
      setForgotStep("done");
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : "পাসওয়ার্ড রিসেট করা যায়নি।");
    } finally {
      setForgotLoading(false);
    }
  };

  // ── Forgot Password View ──
  if (isForgot) {
    return (
      <div className="flex flex-col">
        <button
          className="mb-4 flex w-fit cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#477f82] hover:underline"
          onClick={() => {
            setIsForgot(false);
            setForgotStep("email");
            setForgotError("");
            setForgotMessage("");
          }}
          type="button"
        >
          <ArrowLeft className="size-3.5" />
          লগইনে ফিরে যান
        </button>

        <div className="mb-6">
          <AuthHeading
            text={
              forgotStep === "email"
                ? "আপনার নিবন্ধিত ইমেইল লিখুন, আমরা পাসওয়ার্ড রিসেট ওটিপি পাঠাব।"
                : forgotStep === "otp"
                ? "আপনার ইমেইলে প্রেরিত ওটিপি কোডটি লিখুন।"
                : forgotStep === "reset"
                ? "একটি নতুন শক্তিশালী পাসওয়ার্ড তৈরি করুন।"
                : "আপনার পাসওয়ার্ড সফলভাবে রিসেট হয়েছে।"
            }
            title={forgotStep === "done" ? "সফল হয়েছে" : "পাসওয়ার্ড পুনরুদ্ধার"}
          />
        </div>

        {forgotError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            <AlertCircle className="size-4 shrink-0" />
            <span>{forgotError}</span>
          </div>
        )}

        {forgotMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{forgotMessage}</span>
          </div>
        )}

        {forgotStep === "email" && (
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <AuthField
              autoComplete="email"
              icon={Mail}
              id="forgot-email"
              label="ইমেইল"
              name="email"
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              required
              type="email"
              value={forgotEmail}
            />
            <button
              className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
              disabled={forgotLoading}
              type="submit"
            >
              {forgotLoading ? "পাঠানো হচ্ছে..." : "ওটিপি পাঠান"}
            </button>
          </form>
        )}

        {forgotStep === "otp" && (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <AuthField
              icon={KeyRound}
              id="forgot-otp"
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
              disabled={forgotLoading}
              type="submit"
            >
              {forgotLoading ? "যাচাই করা হচ্ছে..." : "ওটিপি যাচাই করুন"}
            </button>
          </form>
        )}

        {forgotStep === "reset" && (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            <AuthField
              icon={LockKeyhole}
              id="new-password"
              label="নতুন পাসওয়ার্ড"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              required
              type="password"
              value={newPassword}
            />
            <AuthField
              icon={LockKeyhole}
              id="confirm-new-password"
              label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
              name="confirmNewPassword"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="পাসওয়ার্ডটি আবার লিখুন"
              required
              type="password"
              value={confirmNewPassword}
            />
            <button
              className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
              disabled={forgotLoading}
              type="submit"
            >
              {forgotLoading ? "রিসেট করা হচ্ছে..." : "পাসওয়ার্ড রিসেট সম্পন্ন করুন"}
            </button>
          </form>
        )}

        {forgotStep === "done" && (
          <button
            className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073]"
            onClick={() => {
              setIsForgot(false);
              setForgotStep("email");
            }}
            type="button"
          >
            এখন লগইন করুন
          </button>
        )}
      </div>
    );
  }

  // ── Standard Login View ──
  const activeError = formError || authError;

  return (
    <form className="flex flex-col" onSubmit={submitLogin}>
      <div className="mb-9">
        <AuthHeading text="আপনার স্বাস্থ্যসেবা যাত্রা অব্যাহত রাখতে সাইন ইন করুন" title="স্বাগতম" />
      </div>

      {activeError && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          <span>{activeError}</span>
        </div>
      )}

      <div className="space-y-5">
        <AuthField
          autoComplete="email"
          icon={Mail}
          id="login-email"
          label="ইমেইল"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="আপনার ইমেইল লিখুন"
          required
          type="email"
          value={email}
        />
        <AuthField
          autoComplete="current-password"
          icon={LockKeyhole}
          id="login-password"
          label="পাসওয়ার্ড"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="আপনার পাসওয়ার্ড লিখুন"
          required
          type="password"
          value={password}
        />
      </div>

      <button
        className="mt-3 cursor-pointer self-end text-xs font-medium text-[#477f82] hover:underline"
        onClick={() => {
          setIsForgot(true);
          setForgotStep("email");
          setForgotError("");
          setForgotMessage("");
        }}
        type="button"
      >
        পাসওয়ার্ড ভুলে গেছেন?
      </button>

      <button
        className="mt-9 min-h-[48px] w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "লগইন হচ্ছে..." : "লগইন"}
      </button>

      <p className="mt-5 text-center text-[13px] text-[#888]">
        অ্যাকাউন্ট নেই?{" "}
        <Link className="font-bold text-[#477f82]" href={`/register${redirect !== "/account/profile" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}>
          সাইন আপ
        </Link>
      </p>

      <div className="mt-8">
        <OrDivider />
      </div>
      <div className="mt-7">
        <GoogleButton />
      </div>
    </form>
  );
}
