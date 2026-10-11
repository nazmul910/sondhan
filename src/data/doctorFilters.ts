import type { Gender } from "@/types/doctor";

export const RATING_OPTIONS = [
  { value: "", label: "সব" },
  { value: "4.5", label: "৪.৫ ও তার বেশি" },
  { value: "4", label: "৪.০ ও তার বেশি" },
] as const;

export const GENDER_OPTIONS: { value: "" | Gender; label: string }[] = [
  { value: "", label: "সব" },
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "নারী" },
];

export const SORT_OPTIONS = [
  { value: "distance", label: "সবচেয়ে কাছের" },
  { value: "rating", label: "সর্বোচ্চ রেটিং" },
  { value: "reviews", label: "সবচেয়ে বেশি রিভিউ" },
] as const;
