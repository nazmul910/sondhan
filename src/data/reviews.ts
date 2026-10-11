import type { Review } from "@/types/doctor";

/** Share of 5★ … 1★ ratings, in percent. Replace with API data later. */
export const ratingDistribution = [82, 12, 4, 1, 1];

export const sampleReviews: Review[] = [
  { id: "r1", author: "[রোগীর নাম]", rating: 5, text: "[রিভিউ টেক্সট এখানে থাকবে।]" },
  { id: "r2", author: "[রোগীর নাম]", rating: 5, text: "[রিভিউ টেক্সট এখানে থাকবে।]" },
];
