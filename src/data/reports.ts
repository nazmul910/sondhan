import type { Report } from "@/types/account";

/** Mock data. `fileUrl: null` means the file is not on a server yet, so download is a demo only. */
export const initialReports: Report[] = [
  { id: "r001", title: "ব্লাড টেস্ট রিপোর্ট", type: "blood-test", date: "2026-10-10", provider: "পপুলার ডায়াগনস্টিক", doctor: "", note: "CBC, লিপিড প্রোফাইল", fileName: "cbc-lipid-profile.pdf", fileSize: 482_000, fileUrl: null, fileMime: "application/pdf" },
  { id: "r002", title: "প্রেসক্রিপশন", type: "prescription", date: "2026-10-02", provider: "রয়্যাল হাসপাতাল", doctor: "ডা. তানজীর আহমেদ", note: "", fileName: "prescription-oct.jpg", fileSize: 1_320_000, fileUrl: null, fileMime: "image/jpeg" },
  { id: "r003", title: "বুকের এক্স-রে", type: "x-ray", date: "2026-09-18", provider: "ইবনে সিনা হাসপাতাল", doctor: "", note: "PA View", fileName: "chest-xray.png", fileSize: 3_450_000, fileUrl: null, fileMime: "image/png" },
  { id: "r004", title: "ইসিজি রিপোর্ট", type: "other", date: "2026-09-05", provider: "রয়্যাল হাসপাতাল", doctor: "", note: "রুটিন চেকআপ", fileName: "ecg.pdf", fileSize: 210_000, fileUrl: null, fileMime: "application/pdf" },
  { id: "r005", title: "প্রস্রাব পরীক্ষা", type: "blood-test", date: "2026-08-20", provider: "সেবা ক্লিনিক", doctor: "", note: "R/E", fileName: "urine-re.pdf", fileSize: 156_000, fileUrl: null, fileMime: "application/pdf" },
];
