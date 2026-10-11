import type { BloodGroup, BloodMode, BloodSort } from "@/types/blood";

/** URL-safe keys on purpose: a literal "+" in a query string is decoded as a space. */
export const BLOOD_GROUP_LABELS: Record<BloodGroup, string> = {
  "a-pos": "A+",
  "a-neg": "A-",
  "b-pos": "B+",
  "b-neg": "B-",
  "ab-pos": "AB+",
  "ab-neg": "AB-",
  "o-pos": "O+",
  "o-neg": "O-",
};

export const BLOOD_GROUP_KEYS = Object.keys(BLOOD_GROUP_LABELS) as BloodGroup[];
export const DEFAULT_BLOOD_GROUP: BloodGroup = "o-pos";

export const BLOOD_MODES: { value: BloodMode; label: string }[] = [
  { value: "find", label: "রক্ত খুঁজুন" },
  { value: "donor", label: "ডোনার হোন" },
];
export const BLOOD_MODE_KEYS = BLOOD_MODES.map((m) => m.value);

export const BLOOD_SORT_OPTIONS: { value: BloodSort; label: string }[] = [
  { value: "distance", label: "সবচেয়ে কাছের" },
  { value: "eligible", label: "দীর্ঘদিন রক্ত দেননি" },
];
export const BLOOD_SORT_KEYS = BLOOD_SORT_OPTIONS.map((o) => o.value);

export const BLOOD_AREAS = ["মিরপুর", "ধানমন্ডি", "মোহাম্মদপুর", "উত্তরা", "গুলশান", "বনানী", "মতিঝিল", "বাড্ডা", "যাত্রাবাড়ী", "তেজগাঁও"];

export const LAST_DONATION_OPTIONS = [
  { value: "never", label: "কখনো দেইনি" },
  { value: "recent", label: "৩ মাসের কম আগে" },
  { value: "mid", label: "৩ – ৬ মাস আগে" },
  { value: "long", label: "৬ মাসের বেশি আগে" },
] as const;
