import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import ProfileForm from "@/components/account/ProfileForm";

export const metadata: Metadata = {
  title: "প্রোফাইল সম্পাদনা | Shondhan",
  description: "আপনার ব্যক্তিগত তথ্য হালনাগাদ করুন।",
};

export default function AccountProfilePage() {
  return (
    <>
      <AccountHeading description="আপনার ব্যক্তিগত তথ্য হালনাগাদ করুন।" title="প্রোফাইল সম্পাদনা" />
      <ProfileForm />
    </>
  );
}
