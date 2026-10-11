/** Options shared by the doctor and hospital list pages. */
export const SORT_OPTIONS = [
  { value: "distance", label: "সবচেয়ে কাছের" },
  { value: "rating", label: "সর্বোচ্চ রেটিং" },
  { value: "reviews", label: "সবচেয়ে বেশি রিভিউ" },
] as const;

export const RATING_OPTIONS = [
  { value: "", label: "সব" },
  { value: "4.5", label: "৪.৫ ও তার বেশি" },
  { value: "4", label: "৪.০ ও তার বেশি" },
] as const;
