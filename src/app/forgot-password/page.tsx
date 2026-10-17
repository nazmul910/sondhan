import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "পাসওয়ার্ড পুনরুদ্ধার | Shondhan",
  description: "আপনার ইমেইলে ওটিপি কোড পাঠিয়ে সহজেই পাসওয়ার্ড রিসেট করুন।",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      points={[
        "আপনার ইমেইলে তাৎক্ষণিক ওটিপি কোড পান",
        "নিরাপদে অ্যাকাউন্ট পুনরুদ্ধার করুন",
        "নতুন পাসওয়ার্ড দিয়ে অবিলম্বে লগইন করুন",
      ]}
      showBack
      title="পাসওয়ার্ড ভুলে গেছেন? সহজে রিসেট করুন"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
