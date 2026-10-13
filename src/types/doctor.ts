import type { StaticImageData } from "next/image";

export type Gender = "male" | "female";

export type SpecialtyKey =
  | "general"
  | "cardiology"
  | "gynecology"
  | "pediatrics"
  | "medicine"
  | "dermatology";

/** `time: null` means the chamber is closed on those days. */
export type ScheduleItem = { days: string; time: string | null };

export type DoctorChamber = {
  hospitalId: string;
  hospitalName: string;
  address: string;
  phone: string | null;
  schedule: ScheduleItem[];
};

export type EducationItem = { title: string; subtitle: string };

export type Doctor = {
  id: string;
  name: string;
  specialty: SpecialtyKey;
  gender: Gender;
  rating: number;
  reviewCount: number;
  hospitalId: string;
  hospitalName: string;
  address: string;
  distanceKm: number;
  image: StaticImageData;
  degrees: string;
  bmdc: string | null;
  phone: string | null;
  fee: number | null;
  chambers: DoctorChamber[];
  about: string;
  topics: string[];
  education: EducationItem[];
  schedule: ScheduleItem[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type DoctorSort = "distance" | "rating" | "reviews";

/** Parsed + validated version of the URL search params. */
export type DoctorQuery = {
  q: string;
  specialties: SpecialtyKey[];
  minRating: number | null;
  gender: Gender | null;
  sort: DoctorSort;
  page: number;
};
