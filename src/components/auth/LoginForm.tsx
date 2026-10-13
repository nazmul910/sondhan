"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import AuthField from "./AuthField";
import AuthHeading from "./AuthHeading";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";

export default function LoginForm() {
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("লগইন সুবিধাটি আপাতত ডেমো হিসেবে দেখানো হচ্ছে।");
  };

  return (
    <form className="flex flex-col" onSubmit={submit}>
      <div className="mb-9">
        <AuthHeading text="আপনার স্বাস্থ্যসেবা যাত্রা অব্যাহত রাখতে সাইন ইন করুন" title="স্বাগতম" />
      </div>

      <div className="space-y-5">
        <AuthField autoComplete="email" icon={Mail} id="login-email" label="ইমেইল" name="email" placeholder="আপনার ইমেইল লিখুন" type="email" />
        <AuthField autoComplete="current-password" icon={LockKeyhole} id="login-password" label="পাসওয়ার্ড" name="password" placeholder="আপনার পাসওয়ার্ড লিখুন" type="password" />
      </div>

      <button
        className="mt-3 self-end text-xs font-medium text-[#477f82]"
        onClick={() => setMessage("পাসওয়ার্ড পুনরুদ্ধার আপাতত চালু নেই।")}
        type="button"
      >
        পাসওয়ার্ড ভুলে গেছেন?
      </button>

      <button className="mt-9 min-h-[48px] w-full cursor-pointer rounded-xl bg-[#477f82] text-sm font-bold text-white transition hover:bg-[#3d7073]" type="submit">
        লগইন
      </button>

      <p className="mt-5 text-center text-[13px] text-[#888]">
        অ্যাকাউন্ট নেই?{" "}
        <Link className="font-bold text-[#477f82]" href="/register">সাইন আপ</Link>
      </p>

      <div className="mt-8">
        <OrDivider />
      </div>
      <div className="mt-7">
        <GoogleButton />
      </div>

      {message && <p className="mt-4 text-center text-xs text-slate-500" role="status">{message}</p>}
    </form>
  );
}
