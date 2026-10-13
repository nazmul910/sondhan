import { REPORT_TYPES } from "@/data/account";
import { todayIso } from "./files";
import type { Report, ReportDraft } from "@/types/account";

export type DraftErrors = Partial<Record<"title" | "date" | "provider", string>>;

export const emptyDraft: ReportDraft = { title: "", type: "blood-test", date: "", provider: "", doctor: "", note: "" };

/** Upload has no title field: the title comes from the chosen type ("ব্লাড টেস্ট রিপোর্ট"). */
export const withDefaultTitle = (draft: ReportDraft): ReportDraft => ({
  ...draft,
  title: draft.title.trim() || REPORT_TYPES[draft.type].defaultTitle,
});

export function validateDraft(draft: ReportDraft, requireTitle: boolean): DraftErrors {
  const errors: DraftErrors = {};
  if (requireTitle && !draft.title.trim()) errors.title = "রিপোর্টের শিরোনাম লিখুন";
  if (!draft.date) errors.date = "রিপোর্টের তারিখ দিন";
  else if (draft.date > todayIso()) errors.date = "তারিখ ভবিষ্যতের হতে পারে না";
  if (!draft.provider.trim()) errors.provider = "হাসপাতাল বা ল্যাবের নাম লিখুন";
  return errors;
}

export const trimDraft = (d: ReportDraft): ReportDraft => ({
  ...d,
  title: d.title.trim(),
  provider: d.provider.trim(),
  doctor: d.doctor.trim(),
  note: d.note.trim(),
});

/** "ডা. তানজীর আহমেদ • রয়্যাল হাসপাতাল" - falls back to the note when there is no doctor. */
export const reportSubtitle = (r: Report) => [r.doctor || r.note, r.provider].filter(Boolean).join(" • ");
