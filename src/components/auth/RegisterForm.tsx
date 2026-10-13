"use client";

import { useState, type FormEvent } from "react";
import { LockKeyhole, Mail, RotateCcw, UserRound } from "lucide-react";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";
import Link from "next/link";

export default function RegisterForm() {
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }
    setMessage("রেজিস্ট্রেশন আপাতত ডেমো হিসেবে দেখানো হচ্ছে।");
  };

  return (
    <form className="flex flex-col" onSubmit={submit}>
      <div className="mb-6">
        <AuthHeading text="সহজে যোগ দিন এবং আপনার স্বাস্থ্য নিয়ন্ত্রণ করুন" title="অ্যাকাউন্ট তৈরি করুন" />
      </div>

      <div className="space-y-4">
        <AuthField autoComplete="given-name" icon={UserRound} id="register-first-name" label="নামের প্রথমাংশ" name="firstName" placeholder="আপনার নামের প্রথমাংশ লিখুন" />
        <AuthField autoComplete="family-name" icon={UserRound} id="register-last-name" label="নামের শেষাংশ" name="lastName" placeholder="আপনার নামের শেষাংশ লিখুন" />
        <AuthField autoComplete="email" icon={Mail} id="register-email" label="ইমেইল" name="email" placeholder="আপনার ইমেইল লিখুন" type="email" />
        <AuthField autoComplete="new-password" icon={LockKeyhole} id="register-password" label="পাসওয়ার্ড" name="password" placeholder="একটি পাসওয়ার্ড তৈরি করুন" type="password" />
        <AuthField autoComplete="new-password" icon={RotateCcw} id="register-confirm-password" label="পাসওয়ার্ড নিশ্চিত করুন" name="confirmPassword" placeholder="আপনার পাসওয়ার্ডটি নিশ্চিত করুন" type="password" />
      </div>

      <button className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073]" type="submit">
        সাইন আপ
      </button>

      <p className="mt-5 text-center text-[13px] text-[#888]">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link className="font-bold text-[#477f82]" href="/login">লগইন</Link>
      </p>

      <div className="mt-6">
        <OrDivider />
      </div>
      <div className="mt-6">
        <GoogleButton />
      </div>

      {message && <p className="mt-4 text-center text-xs text-slate-500" role="status">{message}</p>}
    </form>
  );
}
