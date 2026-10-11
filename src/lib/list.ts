import type { ListSort } from "@/types/common";

export const LIST_SORTS: ListSort[] = ["distance", "rating", "reviews"];

type Rankable = { distanceKm: number; rating: number; reviewCount: number };

const comparators: Record<ListSort, (a: Rankable, b: Rankable) => number> = {
  distance: (a, b) => a.distanceKm - b.distanceKm,
  rating: (a, b) => b.rating - a.rating,
  reviews: (a, b) => b.reviewCount - a.reviewCount,
};

export const compareBy = (sort: ListSort) => comparators[sort];

export type Paged<T> = { items: T[]; total: number; page: number; pageCount: number };

export function paginate<T>(all: T[], page: number, pageSize: number): Paged<T> {
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const current = Math.min(Math.max(page, 1), pageCount);
  const start = (current - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length, page: current, pageCount };
}
