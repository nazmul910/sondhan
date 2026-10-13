import type { BloodGroup } from "./blood";

export type Gender = "male" | "female" | "other";

export type Profile = {
  name: string;
  /** Local format, e.g. "01711234567". Read-only on the profile page (it is the login). */
  phone: string;
  email: string;
  /** "YYYY-MM-DD" or "" when not set */
  birthDate: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  division: string;
  address: string;
  isDonor: boolean;
  /** Object URL / CDN URL. null = default icon avatar. */
  avatarUrl: string | null;
};

export type ReportType = "blood-test" | "prescription" | "x-ray" | "other";
export type ReportFilter = "all" | ReportType;

export type Report = {
  id: string;
  title: string;
  type: ReportType;
  /** "YYYY-MM-DD" */
  date: string;
  /** Hospital / lab / clinic */
  provider: string;
  doctor: string;
  note: string;
  fileName: string;
  fileSize: number;
  /** null = file is not on a server yet (mock rows) */
  fileUrl: string | null;
  fileMime: string;
};

/** What the upload / edit forms produce. `id`, file info and URL are added by the store. */
export type ReportDraft = Pick<Report, "title" | "type" | "date" | "provider" | "doctor" | "note">;
