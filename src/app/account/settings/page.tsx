import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import SettingsPanel from "@/components/account/SettingsPanel";

export const metadata: Metadata = {
  title: "সেটিংস | Shondhan",
  description: "পাসওয়ার্ড পরিবর্তন, নোটিফিকেশন ও অ্যাকাউন্ট ব্যবস্থাপনা।",
};

export default function AccountSettingsPage() {
  return (
    <>
      <AccountHeading
        description="পাসওয়ার্ড পরিবর্তন, নোটিফিকেশন অ্যালার্ট ও অ্যাকাউন্ট নিরাপত্তা ব্যবস্থাপনা।"
        title="সেটিংস"
      />
      <SettingsPanel />
    </>
  );
}
