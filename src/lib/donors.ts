import { BLOOD_GROUP_KEYS, BLOOD_MODE_KEYS, BLOOD_SORT_KEYS, DEFAULT_BLOOD_GROUP } from "@/data/bloodOptions";
import { donors } from "@/data/donors";
import type { Donor, DonorQuery } from "@/types/blood";
import { paginate, type Paged } from "./list";
import { parsePage, pickOne, type RawSearchParams } from "./query";
import { toBn } from "./format";

export const DONORS_PAGE_SIZE = 6;

export function parseDonorQuery(raw: RawSearchParams): DonorQuery {
  return {
    group: pickOne(raw.group, BLOOD_GROUP_KEYS) ?? DEFAULT_BLOOD_GROUP,
    mode: pickOne(raw.mode, BLOOD_MODE_KEYS) ?? "find",
    sort: pickOne(raw.sort, BLOOD_SORT_KEYS) ?? "distance",
    page: parsePage(raw.page),
  };
}

/** Never donated counts as "longest ago". */
const sinceLastDonation = (d: Donor) => d.lastDonatedMonthsAgo ?? Number.POSITIVE_INFINITY;

export async function getDonors(query: DonorQuery): Promise<Paged<Donor>> {
  const matching = donors.filter((d) => d.bloodGroup === query.group);
  const sorted = matching.sort(query.sort === "eligible" ? (a, b) => sinceLastDonation(b) - sinceLastDonation(a) : (a, b) => a.distanceKm - b.distanceKm);
  return paginate(sorted, query.page, DONORS_PAGE_SIZE);
}

export const formatLastDonation = (months: number | null) => (months === null ? "কখনো দেননি" : `${toBn(months)} মাস আগে`);
