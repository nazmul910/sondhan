import { Activity, Apple, Baby, Brain, BriefcaseMedical, CloudRain, Dumbbell, Flower2, type LucideIcon } from "lucide-react";
import type { TipCategory } from "@/types/tip";

export const TIP_CATEGORY_LABELS: Record<TipCategory, string> = {
  nutrition: "পুষ্টি ও খাদ্যাভ্যাস",
  exercise: "ব্যায়াম",
  mental: "মানসিক স্বাস্থ্য",
  child: "শিশু স্বাস্থ্য",
  women: "নারী স্বাস্থ্য",
  chronic: "দীর্ঘমেয়াদি রোগ",
  "first-aid": "প্রাথমিক চিকিৎসা",
  seasonal: "মৌসুমি রোগ",
};

export const TIP_CATEGORY_ICONS: Record<TipCategory, LucideIcon> = {
  nutrition: Apple,
  exercise: Dumbbell,
  mental: Brain,
  child: Baby,
  women: Flower2,
  chronic: Activity,
  "first-aid": BriefcaseMedical,
  seasonal: CloudRain,
};

/** Full class strings on purpose: Tailwind only generates classes it can see. */
export const TIP_CATEGORY_STYLES: Record<TipCategory, { badge: string; tile: string }> = {
  nutrition: { badge: "bg-emerald-50 text-emerald-700", tile: "bg-emerald-50 text-emerald-600" },
  exercise: { badge: "bg-orange-50 text-orange-700", tile: "bg-orange-50 text-orange-600" },
  mental: { badge: "bg-violet-50 text-violet-700", tile: "bg-violet-50 text-violet-600" },
  child: { badge: "bg-sky-50 text-sky-700", tile: "bg-sky-50 text-sky-600" },
  women: { badge: "bg-pink-50 text-pink-700", tile: "bg-pink-50 text-pink-600" },
  chronic: { badge: "bg-indigo-50 text-indigo-700", tile: "bg-indigo-50 text-indigo-600" },
  "first-aid": { badge: "bg-red-50 text-red-700", tile: "bg-red-50 text-red-600" },
  seasonal: { badge: "bg-cyan-50 text-cyan-700", tile: "bg-cyan-50 text-cyan-600" },
};

export const TIP_CATEGORY_KEYS = Object.keys(TIP_CATEGORY_LABELS) as TipCategory[];

/** Chips under the hero search. */
export const TIP_CATEGORY_TABS = [{ value: "", label: "সব" }, ...TIP_CATEGORY_KEYS.map((key) => ({ value: key, label: TIP_CATEGORY_LABELS[key] }))];
