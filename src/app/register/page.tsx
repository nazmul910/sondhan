import { Suspense } from "react";
import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "রেজিস্ট্রেশন | Shondhan",
  description: "আপনার নাম, ইমেইল ও পাসওয়ার্ড দিয়ে Shondhan এ অ্যাকাউন্ট খুলুন।",
};

export default function RegisterPage() {
  return (
    <AuthShell
      points={[
        "কাছের ডাক্তার ও হাসপাতাল খুঁজুন",
        "রক্তদাতা হয়ে জীবন বাঁচান",
        "রিপোর্ট নিরাপদে রাখুন",
      ]}
      showBack
      title="Shondhan এ যোগ দিন, সেবা পান সহজে"
    >
      <Suspense fallback={<div className="min-h-72 animate-pulse rounded-xl bg-slate-100" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
