"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initialProfile } from "@/data/profile";
import { initialSettings } from "@/data/settings";
import type { AppSettings, Profile, Report, ReportDraft } from "@/types/account";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchMedicalFiles,
  uploadMedicalRecord,
  deleteMedicalFile,
  type ApiMedicalFileRecord,
} from "@/features/files/filesApi";
import { toggleWishlist } from "@/features/doctors/doctorSlice";
import { normalizeImageUrl } from "@/lib/images";

type AccountStore = {
  profile: Profile;
  reports: Report[];
  /** Saved doctor ids, newest first. */
  favoriteIds: string[];
  settings: AppSettings;
  updateProfile: (next: Profile) => void;
  addReport: (draft: ReportDraft, file: File) => Promise<Report>;
  updateReport: (id: string, draft: ReportDraft) => void;
  deleteReport: (id: string, recordId?: number) => Promise<void>;
  removeFavorite: (doctorId: string) => void;
  updateSettings: (next: AppSettings) => void;
};

const AccountContext = createContext<AccountStore | null>(null);

const byNewest = (a: Report, b: Report) => b.date.localeCompare(a.date);

function revoke(url: string | null) {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

function mapApiRecordToReports(records: ApiMedicalFileRecord[]): Report[] {
  const result: Report[] = [];
  records.forEach((record) => {
    const baseDate = record.created_at ? record.created_at.split("T")[0] : new Date().toISOString().split("T")[0];

    // Map prescriptions
    record.prescriptions?.forEach((p) => {
      result.push({
        id: `file-p-${p.id}`,
        recordId: record.id,
        title: record.visit_purpose || "প্রেসক্রিপশন",
        type: "prescription",
        date: p.created_at ? p.created_at.split("T")[0] : baseDate,
        provider: record.hospital_name || "হাসপাতাল",
        doctor: record.doctor_name || "ডাক্তার",
        note: record.visit_purpose || "",
        fileName: `prescription-${p.id}.jpg`,
        fileSize: 1024 * 500,
        fileUrl: normalizeImageUrl(p.file_url),
        fileMime: "image/jpeg",
      });
    });

    // Map reports
    record.reports?.forEach((r) => {
      result.push({
        id: `file-r-${r.id}`,
        recordId: record.id,
        title: record.visit_purpose || "মেডিকেল টেস্ট রিপোর্ট",
        type: "blood-test",
        date: r.created_at ? r.created_at.split("T")[0] : baseDate,
        provider: record.hospital_name || "হাসপাতাল",
        doctor: record.doctor_name || "ডাক্তার",
        note: record.visit_purpose || "",
        fileName: `report-${r.id}.jpg`,
        fileSize: 1024 * 800,
        fileUrl: normalizeImageUrl(r.file_url),
        fileMime: "image/jpeg",
      });
    });

    // If both empty, still show the record
    if ((!record.prescriptions || record.prescriptions.length === 0) &&
        (!record.reports || record.reports.length === 0)) {
      result.push({
        id: `file-rec-${record.id}`,
        recordId: record.id,
        title: record.visit_purpose || "মেডিকেল রেকর্ড",
        type: "other",
        date: baseDate,
        provider: record.hospital_name || "হাসপাতাল",
        doctor: record.doctor_name || "ডাক্তার",
        note: record.visit_purpose || "",
        fileName: `record-${record.id}`,
        fileSize: 0,
        fileUrl: null,
        fileMime: "application/octet-stream",
      });
    }
  });

  return result.sort(byNewest);
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((s) => s.auth);
  const { wishlistItems } = useAppSelector((s) => s.doctors);

  const [profile, setProfile] = useState<Profile>(() => ({
    ...initialProfile,
    name: user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : initialProfile.name,
    email: user?.email || initialProfile.email,
    avatarUrl: user?.avatar || null,
  }));

  const [reports, setReports] = useState<Report[]>([]);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  // Sync profile when user changes in Redux
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || prev.phone,
        avatarUrl: user.avatar || null,
      }));
    }
  }, [user]);

  // Load backend files when authenticated
  useEffect(() => {
    if (!token) return;
    fetchMedicalFiles(token)
      .then((records) => {
        if (records && Array.isArray(records) && records.length > 0) {
          setReports(mapApiRecordToReports(records));
        }
      })
      .catch(() => {
        // Fall back to local reports if fetch fails
      });
  }, [token]);

  const favoriteIds = wishlistItems.map((d) => String(d.id));

  const updateProfile = (next: Profile) => {
    if (next.avatarUrl !== profile.avatarUrl) revoke(profile.avatarUrl);
    setProfile(next);
  };

  const addReport = async (draft: ReportDraft, file: File): Promise<Report> => {
    const localReport: Report = {
      ...draft,
      id: `r${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      fileMime: file.type,
      fileUrl: URL.createObjectURL(file),
    };

    if (token) {
      await uploadMedicalRecord(token, {
        doctor_name: draft.doctor || "ডাক্তার",
        hospital_name: draft.provider || "হাসপাতাল",
        visit_purpose: draft.title || "স্বাস্থ্য পরীক্ষা",
        file,
        isPrescription: draft.type === "prescription",
      });

      try {
        const records = await fetchMedicalFiles(token);
        if (records && Array.isArray(records) && records.length > 0) {
          const fresh = mapApiRecordToReports(records);
          setReports(fresh);
          return fresh[0] || localReport;
        }
      } catch (err) {
        console.error("Failed to refetch files:", err);
      }
    }

    setReports((list) => [localReport, ...list].sort(byNewest));
    return localReport;
  };

  const updateReport = (id: string, draft: ReportDraft) => {
    setReports((list) => list.map((r) => (r.id === id ? { ...r, ...draft } : r)).sort(byNewest));
  };

  const deleteReport = async (id: string, recordId?: number) => {
    const targetReport = reports.find((r) => r.id === id);
    const targetRecordId = recordId ?? targetReport?.recordId;

    if (token && targetRecordId) {
      await deleteMedicalFile(token, targetRecordId);
    }

    revoke(targetReport?.fileUrl ?? null);
    setReports((list) =>
      list.filter((r) => (targetRecordId ? r.recordId !== targetRecordId && r.id !== id : r.id !== id))
    );
  };

  const removeFavorite = (doctorId: string) => {
    if (token) {
      dispatch(toggleWishlist({ doctorId, token }));
    }
  };

  const updateSettings = (next: AppSettings) => {
    setSettings(next);
  };

  return (
    <AccountContext.Provider
      value={{
        profile,
        reports,
        favoriteIds,
        settings,
        updateProfile,
        addReport,
        updateReport,
        deleteReport,
        removeFavorite,
        updateSettings,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used inside <AccountProvider> (app/account/layout.tsx)");
  return context;
}
