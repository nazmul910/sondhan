import type { ListSort } from "./common";

export type HospitalType = "hospital" | "clinic" | "diagnostic";

export type DepartmentKey =
  | "medicine"
  | "cardiology"
  | "gynecology"
  | "pediatrics"
  | "orthopedics"
  | "pathology"
  | "radiology"
  | "dialysis"
  | "icu";

export type FacilityKey = "emergency" | "icu" | "ambulance" | "lab";

export type Hospital = {
  id: string;
  name: string;
  type: HospitalType;
  rating: number;
  reviewCount: number;
  address: string;
  distanceKm: number;
  phone: string | null;
  openHours: string;
  antivenomAvailable: boolean;
  departments: DepartmentKey[];
  facilities: FacilityKey[];
  services: string[];
};

export type HospitalQuery = {
  q: string;
  type: HospitalType | null;
  departments: DepartmentKey[];
  facilities: FacilityKey[];
  minRating: number | null;
  sort: ListSort;
  page: number;
};
