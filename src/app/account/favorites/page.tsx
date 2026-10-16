import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import FavoriteDoctors from "@/components/account/FavoriteDoctors";
import { getAllDoctors } from "@/lib/doctors";

export const metadata: Metadata = {
  title: "প্রিয় ডাক্তারগণ | Shondhan",
  description: "আপনার সংরক্ষিত ডাক্তারদের তালিকা।",
};

export default async function AccountFavoritesPage() {
  // TODO(backend): fetch the user's favorite doctors instead of passing the full list
  const doctors = await getAllDoctors();

  return (
    <>
      <AccountHeading description="আপনার সংরক্ষিত ডাক্তারদের তালিকা।" title="প্রিয় ডাক্তারগণ" />
      <FavoriteDoctors doctors={doctors} />
    </>
  );
}
