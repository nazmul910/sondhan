import type { SpecialtyKey } from "@/types/doctor";

export const SPECIALTY_LABELS: Record<SpecialtyKey, string> = {
  general: "জেনারেল ফিজিশিয়ান",
  cardiology: "কার্ডিওলজিস্ট",
  gynecology: "গাইনোকোলজিস্ট",
  pediatrics: "শিশু বিশেষজ্ঞ",
  medicine: "মেডিসিন বিশেষজ্ঞ",
  dermatology: "চর্ম ও যৌন রোগ",
};

export const SPECIALTY_KEYS = Object.keys(SPECIALTY_LABELS) as SpecialtyKey[];

/** Shown as chips under the hero search box. */
export const POPULAR_SPECIALTIES: SpecialtyKey[] = ["general", "cardiology", "gynecology", "pediatrics"];
