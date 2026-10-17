"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, clearAuthError } from "@/features/auth/authSlice";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account/profile";

  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error: authError } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

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

      <Link
        className="mt-3 cursor-pointer self-end text-xs font-medium text-[#477f82] hover:underline"
        href="/forgot-password"
      >
        পাসওয়ার্ড ভুলে গেছেন?
      </Link>

      <button
        className="mt-9 min-h-[48px] w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "লগইন হচ্ছে..." : "লগইন"}
      </button>

      <p className="mt-5 text-center text-[13px] text-[#888]">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          className="font-bold text-[#477f82]"
          href={`/register${redirect !== "/account/profile" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
        >
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
