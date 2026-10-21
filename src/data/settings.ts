import { HelpCircle, Mail, ShieldCheck, type LucideIcon } from "lucide-react";
import type { AppLanguage, AppSettings, NotificationKey } from "@/types/account";

/** Mock settings. Replace with the settings API response later. */
export const initialSettings: AppSettings = {
  language: "bn",
  notifications: { bloodRequests: true, reportReminders: false, newFeatures: false },
};

export const LANGUAGE_OPTIONS: { value: AppLanguage; label: string }[] = [
  { value: "bn", label: "বাংলা" },
  { value: "en", label: "English" },
];

export const NOTIFICATION_OPTIONS: { key: NotificationKey; title: string; hint: string }[] = [
  { key: "bloodRequests", title: "রক্তের অনুরোধ", hint: "আপনার এলাকায় জরুরি রক্তের অনুরোধ এলে জানান" },
  { key: "reportReminders", title: "রিপোর্ট রিমাইন্ডার", hint: "নিয়মিত চেকআপের স্মরণ করিয়ে দিন" },
  { key: "newFeatures", title: "নতুন সেবা ও টিপস", hint: "নতুন ফিচার ও স্বাস্থ্য টিপস" },
];

export const SETTINGS_LINKS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "গোপনীয়তা নীতি", href: "/privacy", Icon: ShieldCheck },
  { label: "হেল্প সেন্টার", href: "/contact", Icon: HelpCircle },
  { label: "যোগাযোগ", href: "/contact", Icon: Mail },
];
