import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import UploadForm from "@/components/account/UploadForm";

export const metadata: Metadata = {
  title: "নতুন রিপোর্ট আপলোড | Shondhan",
  description: "সর্বশেষ টেস্টের ফলাফল বা প্রেসক্রিপশন যোগ করুন।",
};

export default function AccountReportUploadPage() {
  return (
    <>
      <AccountHeading description="সর্বশেষ টেস্টের ফলাফল বা প্রেসক্রিপশন যোগ করুন।" title="নতুন রিপোর্ট আপলোড" />
      <UploadForm />
    </>
  );
}
