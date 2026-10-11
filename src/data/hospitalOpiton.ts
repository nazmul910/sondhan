import type { DepartmentKey, FacilityKey, HospitalType } from "@/types/hospital";

export const HOSPITAL_TYPE_LABELS: Record<HospitalType, string> = {
  hospital: "হাসপাতাল",
  clinic: "ক্লিনিক",
  diagnostic: "ডায়াগনস্টিক সেন্টার",
};

export const DEPARTMENT_LABELS: Record<DepartmentKey, string> = {
  medicine: "মেডিসিন",
  cardiology: "কার্ডিওলজি",
  gynecology: "গাইনি ও প্রসূতি",
  pediatrics: "শিশু",
  orthopedics: "অর্থোপেডিক",
  pathology: "প্যাথলজি",
  radiology: "রেডিওলজি",
  dialysis: "ডায়ালাইসিস",
  icu: "আইসিইউ",
};

export const FACILITY_LABELS: Record<FacilityKey, string> = {
  emergency: "২৪/৭ ইমার্জেন্সি",
  icu: "আইসিইউ",
  ambulance: "অ্যাম্বুলেন্স সুবিধা",
  lab: "ডায়াগনস্টিক ল্যাব",
};

export const HOSPITAL_TYPE_KEYS = Object.keys(HOSPITAL_TYPE_LABELS) as HospitalType[];
export const DEPARTMENT_KEYS = Object.keys(DEPARTMENT_LABELS) as DepartmentKey[];
export const FACILITY_KEYS = Object.keys(FACILITY_LABELS) as FacilityKey[];

/** Tabs under the hospital hero search. */
export const HOSPITAL_TYPE_TABS = [
  { value: "", label: "সব" },
  ...HOSPITAL_TYPE_KEYS.map((key) => ({ value: key, label: HOSPITAL_TYPE_LABELS[key] })),
];
