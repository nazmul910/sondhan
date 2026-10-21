"use client";

import { useState, useEffect, type FormEvent } from "react";
import { LockKeyhole, Mail, RotateCcw, UserRound, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { register, clearAuthError } from "@/features/auth/authSlice";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account/profile";

  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error: authError } = useAppSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!firstName.trim()) {
      setFormError("নামের প্রথমাংশ লিখুন।");
      return;
    }
    if (!lastName.trim()) {
      setFormError("নামের শেষাংশ লিখুন।");
      return;
    }
    if (!email.trim()) {
      setFormError("ইমেইল ঠিকানা লিখুন।");
      return;
    }
    if (!password || password.length < 6) {
      setFormError("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    const resultAction = await dispatch(
      register({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
      })
    );

    if (register.fulfilled.match(resultAction)) {
      router.replace(redirect);
    }
  };

  const activeError = formError || authError;

  return (
    <form className="flex flex-col" onSubmit={submitRegister}>
      <div className="mb-6">
        <AuthHeading text="সহজে যোগ দিন এবং আপনার স্বাস্থ্য নিয়ন্ত্রণ করুন" title="অ্যাকাউন্ট তৈরি করুন" />
      </div>

      {activeError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          <span>{activeError}</span>
        </div>
      )}

      <div className="space-y-4">
        <AuthField
          autoComplete="given-name"
          icon={UserRound}
          id="register-first-name"
          label="নামের প্রথমাংশ"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="আপনার নামের প্রথমাংশ লিখুন"
          required
          value={firstName}
        />
        <AuthField
          autoComplete="family-name"
          icon={UserRound}
          id="register-last-name"
          label="নামের শেষাংশ"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="আপনার নামের শেষাংশ লিখুন"
          required
          value={lastName}
        />
        <AuthField
          autoComplete="email"
          icon={Mail}
          id="register-email"
          label="ইমেইল"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="আপনার ইমেইল লিখুন"
          required
          type="email"
          value={email}
        />
        <AuthField
          autoComplete="new-password"
          icon={LockKeyhole}
          id="register-password"
          label="পাসওয়ার্ড"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
          required
          type="password"
          value={password}
        />
        <AuthField
          autoComplete="new-password"
          icon={RotateCcw}
          id="register-confirm-password"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="আপনার পাসওয়ার্ডটি নিশ্চিত করুন"
          required
          type="password"
          value={confirmPassword}
        />
      </div>

      <button
        className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073] disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
      </button>

      <p className="mt-5 text-center text-[13px] text-[#888]">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link className="font-bold text-[#477f82]" href={`/login${redirect !== "/account/profile" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}>
          লগইন
        </Link>
      </p>

      <div className="mt-6">
        <OrDivider />
      </div>
      {/* <div className="mt-6">
        <GoogleButton />
      </div> */}
    </form>
  );
}
