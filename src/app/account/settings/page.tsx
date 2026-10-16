import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import SettingsPanel from "@/components/account/SettingsPanel";

export const metadata: Metadata = {
  title: "সেটিংস | Shondhan",
  description: "ভাষা, নোটিফিকেশন ও অ্যাকাউন্ট ব্যবস্থাপনা।",
};

export default function AccountSettingsPage() {
  return (
    <>
      <AccountHeading description="ভাষা, নোটিফিকেশন ও অ্যাকাউন্ট ব্যবস্থাপনা।" title="সেটিংস" />
      <SettingsPanel />
    </>
  );
}
