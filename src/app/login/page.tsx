import { Suspense } from "react";
import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "লগইন | Shondhan",
  description: "ইমেইল ও পাসওয়ার্ড দিয়ে আপনার Shondhan অ্যাকাউন্টে প্রবেশ করুন।",
};

export default function LoginPage() {
  return (
    <AuthShell
      points={[
        "মেডিকেল রিপোর্ট সংরক্ষণ করুন",
        "প্রিয় ডাক্তারদের তালিকা রাখুন",
        "এআই সহকারীর চ্যাট হিস্ট্রি দেখুন",
      ]}
      title="আবার স্বাগতম! আপনার স্বাস্থ্যসেবা এক জায়গায়"
    >
      <Suspense fallback={<div className="min-h-72 animate-pulse rounded-xl bg-slate-100" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
