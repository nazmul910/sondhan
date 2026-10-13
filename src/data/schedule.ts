import type { ScheduleItem } from "@/types/doctor";

export const defaultSchedule: ScheduleItem[] = [
  { days: "শনি – বুধ", time: "বিকাল ৫:০০ – রাত ৯:০০" },
  { days: "বৃহস্পতিবার", time: "সকাল ১০:০০ – দুপুর ২:০০" },
  { days: "শুক্রবার", time: null },
];
