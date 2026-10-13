export type ContactItem = {
  key: "phone" | "email" | "address" | "hours";
  label: string;
  value: string;
  /** tel: / mailto: link. Leave undefined while the value is still a placeholder. */
  href?: string;
};

/** Placeholders: replace with the real details (add `href` too, e.g. "tel:+8801..."). */
export const CONTACT_ITEMS: ContactItem[] = [
  { key: "phone", label: "ফোন", value: "[ফোন নম্বর]" },
  { key: "email", label: "ইমেইল", value: "[ইমেইল ঠিকানা]" },
  { key: "address", label: "ঠিকানা", value: "[অফিসের ঠিকানা]" },
  { key: "hours", label: "সময়", value: "[সময়সূচী]" },
];

export const CONTACT_SUBJECTS = [
  { value: "general", label: "সাধারণ প্রশ্ন" },
  { value: "problem", label: "সমস্যা জানান" },
  { value: "add-org", label: "ডাক্তার/প্রতিষ্ঠান যুক্ত করুন" },
  { value: "other", label: "অন্যান্য" },
] as const;

export const MESSAGE_MIN_LENGTH = 10;
