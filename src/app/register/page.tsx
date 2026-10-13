import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "রেজিস্ট্রেশন | Shondhan",
  description: "আপনার নাম, ইমেইল ও পাসওয়ার্ড দিয়ে Shondhan এ অ্যাকাউন্ট খুলুন।",
};

export default function RegisterPage() {
  return (
    <AuthShell showBack>
      <RegisterForm />
    </AuthShell>
  );
}
