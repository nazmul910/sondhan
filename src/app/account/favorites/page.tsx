import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import FavoriteDoctors from "@/components/account/FavoriteDoctors";

export const metadata: Metadata = {
  title: "প্রিয় ডাক্তারগণ | Shondhan",
  description: "আপনার সংরক্ষিত ডাক্তারদের তালিকা।",
};

export default function AccountFavoritesPage() {
  return (
    <>
      <AccountHeading description="আপনার সংরক্ষিত ডাক্তারদের তালিকা।" title="প্রিয় ডাক্তারগণ" />
      <FavoriteDoctors />
    </>
  );
}
