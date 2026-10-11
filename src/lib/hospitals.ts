import { DEPARTMENT_KEYS, DEPARTMENT_LABELS, FACILITY_KEYS, HOSPITAL_TYPE_KEYS } from "@/data/hospitalOpiton";

import type { Hospital, HospitalQuery } from "@/types/hospital";
import { compareBy, LIST_SORTS, paginate, type Paged } from "./list";
import { first, parseMinRating, parsePage, pickMany, pickOne, type RawSearchParams } from "./query";
import { hospitals } from "@/data/hospitals";

export const HOSPITALS_PAGE_SIZE = 6;

export type HospitalListResult = Paged<Hospital>;

export function parseHospitalQuery(raw: RawSearchParams): HospitalQuery {
  return {
    q: (first(raw.q) ?? "").trim(),
    type: pickOne(raw.type, HOSPITAL_TYPE_KEYS),
    departments: pickMany(raw.department, DEPARTMENT_KEYS),
    facilities: pickMany(raw.facility, FACILITY_KEYS),
    minRating: parseMinRating(raw.rating),
    sort: pickOne(raw.sort, LIST_SORTS) ?? "distance",
    page: parsePage(raw.page),
  };
}

export async function getHospitals(query: HospitalQuery): Promise<HospitalListResult> {
  const needle = query.q.toLowerCase();

  const filtered = hospitals.filter((h) => {
    if (needle && ![h.name, h.address, ...h.departments.map((d) => DEPARTMENT_LABELS[d])].some((t) => t.toLowerCase().includes(needle))) return false;
    if (query.type && h.type !== query.type) return false;
    // "any of": a hospital matches if it has at least one selected department
    if (query.departments.length && !query.departments.some((d) => h.departments.includes(d))) return false;
    // "all of": a hospital must have every selected facility
    if (query.facilities.length && !query.facilities.every((f) => h.facilities.includes(f))) return false;
    if (query.minRating !== null && h.rating < query.minRating) return false;
    return true;
  });

  return paginate(filtered.sort(compareBy(query.sort)), query.page, HOSPITALS_PAGE_SIZE);
}

export async function getHospitalById(id: string) {
  return hospitals.find((h) => h.id === id) ?? null;
}

export const getAllHospitalIds = () => hospitals.map((h) => h.id);
