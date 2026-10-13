import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import ReportsList from "@/components/account/ReportsList";

export const metadata: Metadata = {
  title: "মেডিকেল রিপোর্ট | Shondhan",
  description: "আপনার সব স্বাস্থ্য রিপোর্ট এক জায়গায়।",
};

export default function AccountReportsPage() {
  return (
    <>
      <AccountHeading description="আপনার সব স্বাস্থ্য রিপোর্ট এক জায়গায়।" title="মেডিকেল রিপোর্ট" />
      <ReportsList />
    </>
  );
}
