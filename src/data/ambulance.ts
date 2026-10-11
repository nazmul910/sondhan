import type { Ambulance, AmbulanceType } from "@/types/ambulance";

export const EMERGENCY_NUMBER = "999";

export const AMBULANCE_TYPE_LABELS: Record<AmbulanceType, string> = {
  normal: "নরমাল",
  ac: "এসি",
  icu: "আইসিইউ",
  freezing: "ফ্রিজিং",
};

/** Full class strings on purpose: Tailwind only generates classes it can see. */
export const AMBULANCE_TYPE_BADGE: Record<AmbulanceType, string> = {
  normal: "bg-slate-100 text-slate-600",
  ac: "bg-cyan-50 text-cyan-700",
  icu: "bg-red-50 text-red-700",
  freezing: "bg-blue-50 text-blue-700",
};

export const AMBULANCE_TYPE_KEYS = Object.keys(AMBULANCE_TYPE_LABELS) as AmbulanceType[];

export const AMBULANCE_TYPE_TABS = [
  { value: "", label: "সব" },
  { value: "icu", label: AMBULANCE_TYPE_LABELS.icu },
  { value: "normal", label: AMBULANCE_TYPE_LABELS.normal },
  { value: "ac", label: AMBULANCE_TYPE_LABELS.ac },
  { value: "freezing", label: AMBULANCE_TYPE_LABELS.freezing },
];

export const ambulances: Ambulance[] = [
  { id: "seba", name: "সেবা অ্যাম্বুলেন্স সার্ভিস", type: "icu", area: "ধানমন্ডি", phone: null, open24h: true },
  { id: "lifeline", name: "লাইফলাইন অ্যাম্বুলেন্স", type: "normal", area: "মিরপুর", phone: null, open24h: true },
  { id: "royal", name: "রয়্যাল অ্যাম্বুলেন্স", type: "freezing", area: "গুলশান", phone: null, open24h: true },
  { id: "green-cross", name: "গ্রিন ক্রস অ্যাম্বুলেন্স", type: "ac", area: "উত্তরা", phone: null, open24h: true },
  { id: "al-amin", name: "আল-আমিন অ্যাম্বুলেন্স", type: "normal", area: "মোহাম্মদপুর", phone: null, open24h: true },
  { id: "health-care", name: "হেলথ কেয়ার অ্যাম্বুলেন্স", type: "icu", area: "বনানী", phone: null, open24h: false },
];

export const AMBULANCE_AREAS = [...new Set(ambulances.map((a) => a.area))];
