import type { ScheduleItem } from "@/types/doctor";

export const defaultSchedule: ScheduleItem[] = [
  { days: "শনি – বুধ", time: "বিকাল ৫:০০ – রাত ৯:০০" },
  { days: "বৃহস্পতিবার", time: "সকাল ১০:০০ – দুপুর ২:০০" },
  { days: "শুক্রবার", time: null },
];

export const bookingSlots = ["৫:০০ PM", "৫:৩০ PM", "৬:০০ PM", "৬:৩০ PM", "৭:০০ PM", "৭:৩০ PM"];
