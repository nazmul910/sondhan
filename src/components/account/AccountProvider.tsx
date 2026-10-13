"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialProfile } from "@/data/profile";
import { initialReports } from "@/data/reports";
import type { Profile, Report, ReportDraft } from "@/types/account";

type AccountStore = {
  profile: Profile;
  reports: Report[];
  updateProfile: (next: Profile) => void;
  addReport: (draft: ReportDraft, file: File) => Report;
  updateReport: (id: string, draft: ReportDraft) => void;
  deleteReport: (id: string) => void;
};

const AccountContext = createContext<AccountStore | null>(null);

const byNewest = (a: Report, b: Report) => b.date.localeCompare(a.date);

function revoke(url: string | null) {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

/**
 * Frontend-only store that lives in app/account/layout.tsx, so data survives
 * navigation between the account pages (e.g. upload -> reports list).
 * Each action is where the Redux thunk / API call goes later.
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [reports, setReports] = useState<Report[]>(initialReports);

  const updateProfile = (next: Profile) => {
    // TODO(backend): dispatch(updateProfile(next))
    if (next.avatarUrl !== profile.avatarUrl) revoke(profile.avatarUrl);
    setProfile(next);
  };

  const addReport = (draft: ReportDraft, file: File) => {
    // TODO(backend): dispatch(uploadReport({ draft, file })) - multipart upload
    const report: Report = {
      ...draft,
      id: `r${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      fileMime: file.type,
      fileUrl: URL.createObjectURL(file),
    };
    setReports((list) => [report, ...list].sort(byNewest));
    return report;
  };

  const updateReport = (id: string, draft: ReportDraft) => {
    // TODO(backend): dispatch(updateReport({ id, ...draft }))
    setReports((list) => list.map((r) => (r.id === id ? { ...r, ...draft } : r)).sort(byNewest));
  };

  const deleteReport = (id: string) => {
    // TODO(backend): dispatch(deleteReport(id))
    revoke(reports.find((r) => r.id === id)?.fileUrl ?? null);
    setReports((list) => list.filter((r) => r.id !== id));
  };

  return (
    <AccountContext.Provider value={{ profile, reports, updateProfile, addReport, updateReport, deleteReport }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used inside <AccountProvider> (app/account/layout.tsx)");
  return context;
}
