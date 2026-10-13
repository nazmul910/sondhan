import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "লগইন | Shondhan",
  description: "ইমেইল ও পাসওয়ার্ড দিয়ে আপনার Shondhan অ্যাকাউন্টে প্রবেশ করুন।",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
