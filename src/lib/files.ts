import { toBn } from "./format";

/** 1_320_000 -> "১.৩ এমবি" */
export function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${toBn((bytes / (1024 * 1024)).toFixed(1))} এমবি`;
  return `${toBn(Math.max(1, Math.round(bytes / 1024)))} কেবি`;
}

/** Returns a Bangla error message, or null when the file is fine. */
export function validateFile(file: File, acceptedMime: string[], maxBytes: number, formatsLabel: string) {
  if (!acceptedMime.includes(file.type)) return `শুধু ${formatsLabel} ফাইল গ্রহণযোগ্য`;
  if (file.size > maxBytes) return `ফাইলের আকার সর্বোচ্চ ${toBn(Math.round(maxBytes / (1024 * 1024)))} এমবি হতে হবে`;
  return null;
}

/** "YYYY-MM-DD" of today in the user's local time. Call inside handlers, not during render. */
export function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
