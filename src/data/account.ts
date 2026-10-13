import { Heart, FileText, Settings, Upload, User, type LucideIcon } from "lucide-react";
import type { Gender, ReportFilter, ReportType } from "@/types/account";

export const ACCOUNT_NAV: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "প্রোফাইল সম্পাদনা", href: "/account/profile", Icon: User },
  { label: "মেডিকেল রিপোর্ট", href: "/account/reports", Icon: FileText },
  { label: "নতুন রিপোর্ট আপলোড", href: "/account/reports/upload", Icon: Upload },
  { label: "প্রিয় ডাক্তারগণ", href: "/account/favorites", Icon: Heart },
  { label: "সেটিংস", href: "/account/settings", Icon: Settings },
];

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
  { value: "other", label: "অন্যান্য" },
];

/** Badge colours are full class strings so Tailwind can see them. */
export const REPORT_TYPES: Record<ReportType, { label: string; defaultTitle: string; badge: string }> = {
  "blood-test": { label: "ব্লাড টেস্ট", defaultTitle: "ব্লাড টেস্ট রিপোর্ট", badge: "bg-red-50 text-red-700" },
  prescription: { label: "প্রেসক্রিপশন", defaultTitle: "প্রেসক্রিপশন", badge: "bg-blue-50 text-blue-700" },
  "x-ray": { label: "এক্স-রে", defaultTitle: "এক্স-রে রিপোর্ট", badge: "bg-violet-50 text-violet-700" },
  other: { label: "অন্যান্য", defaultTitle: "মেডিকেল রিপোর্ট", badge: "bg-slate-100 text-slate-600" },
};

export const REPORT_TYPE_KEYS = Object.keys(REPORT_TYPES) as ReportType[];

export const REPORT_FILTERS: { value: ReportFilter; label: string }[] = [
  { value: "all", label: "সব" },
  ...REPORT_TYPE_KEYS.map((key) => ({ value: key as ReportFilter, label: REPORT_TYPES[key].label })),
];

export const REPORT_ACCEPTED_MIME = ["application/pdf", "image/jpeg", "image/png"];
export const REPORT_MAX_BYTES = 10 * 1024 * 1024;

export const AVATAR_ACCEPTED_MIME = ["image/jpeg", "image/png"];
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
