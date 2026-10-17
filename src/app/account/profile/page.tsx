import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import ProfileForm from "@/components/account/ProfileForm";
import ProfilePasswordReset from "@/components/account/ProfilePasswordReset";

export const metadata: Metadata = {
  title: "প্রোফাইল ও পাসওয়ার্ড সম্পাদনা | Shondhan",
  description: "আপনার ব্যক্তিগত তথ্য ও পাসওয়ার্ড নিরাপত্তা হালনাগাদ করুন।",
};

export default function AccountProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <AccountHeading description="আপনার ব্যক্তিগত তথ্য হালনাগাদ করুন।" title="প্রোফাইল সম্পাদনা" />
        <ProfileForm />
      </div>

      <div>
        <AccountHeading
          description="আপনার অ্যাকাউন্টের সুরক্ষার জন্য পাসওয়ার্ড পরিবর্তন বা রিসেট করুন।"
          title="পাসওয়ার্ড নিরাপত্তা"
        />
        <ProfilePasswordReset />
      </div>
    </div>
  );
}
