import { doctors } from "@/data/doctors";
import { SPECIALTY_KEYS, SPECIALTY_LABELS } from "@/data/specialties";
import type { Doctor, DoctorQuery } from "@/types/doctor";
import { compareBy, LIST_SORTS, paginate, type Paged } from "./list";
import { first, parseMinRating, parsePage, pickMany, pickOne, type RawSearchParams } from "./query";

export const DOCTORS_PAGE_SIZE = 6;

export type DoctorListResult = Paged<Doctor>;

/** URL search params -> validated query object. Unknown values are ignored. */
export function parseDoctorQuery(raw: RawSearchParams): DoctorQuery {
  return {
    q: (first(raw.q) ?? "").trim(),
    specialties: pickMany(raw.specialty, SPECIALTY_KEYS),
    minRating: parseMinRating(raw.rating),
    gender: pickOne(raw.gender, ["male", "female"] as const),
    sort: pickOne(raw.sort, LIST_SORTS) ?? "distance",
    page: parsePage(raw.page),
  };
}

// The functions below are async on purpose: swap the body for a fetch() later
// and no component has to change.

export async function getDoctors(query: DoctorQuery): Promise<DoctorListResult> {
  const needle = query.q.toLowerCase();

  const filtered = doctors.filter((d) => {
    if (needle && ![d.name, SPECIALTY_LABELS[d.specialty], d.hospitalName].some((t) => t.toLowerCase().includes(needle))) return false;
    if (query.specialties.length && !query.specialties.includes(d.specialty)) return false;
    if (query.minRating !== null && d.rating < query.minRating) return false;
    if (query.gender && d.gender !== query.gender) return false;
    return true;
  });

  return paginate(filtered.sort(compareBy(query.sort)), query.page, DOCTORS_PAGE_SIZE);
}

export async function getAllDoctors() {
  return [...doctors];
}

export async function getDoctorById(id: string) {
  return doctors.find((d) => d.id === id) ?? null;
}

export async function getDoctorsByHospital(hospitalId: string) {
  return doctors.filter((doctor) => doctor.chambers.some((chamber) => chamber.hospitalId === hospitalId)).sort(compareBy("rating"));
}

export async function getSimilarDoctors(doctor: Doctor, limit = 3) {
  return doctors
    .filter((d) => d.id !== doctor.id)
    .sort((a, b) => Number(b.specialty === doctor.specialty) - Number(a.specialty === doctor.specialty) || compareBy("distance")(a, b))
    .slice(0, limit);
}

export async function getFeaturedDoctors(limit = 5) {
  return [...doctors].sort(compareBy("rating")).slice(0, limit);
}

export const getAllDoctorIds = () => doctors.map((d) => d.id);
