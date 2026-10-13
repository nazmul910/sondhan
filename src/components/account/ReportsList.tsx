"use client";

import { useState } from "react";
import Link from "next/link";
import { FileX, Plus, Trash2 } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import { useAccount } from "@/components/account/AccountProvider";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import ReportEditDialog from "@/components/account/ReportEditDialog";
import ReportRow from "@/components/account/ReportRow";
import ReportViewDialog from "@/components/account/ReportViewDialog";
import { REPORT_FILTERS } from "@/data/account";
import { cn } from "@/lib/utils";
import type { Report, ReportDraft, ReportFilter } from "@/types/account";

type Dialog = "view" | "edit" | "delete" | null;

export default function ReportsList() {
  const { reports, updateReport, deleteReport } = useAccount();
  const [filter, setFilter] = useState<ReportFilter>("all");
  const [notice, setNotice] = useState("");
  // `target` stays set while a dialog animates out, so its content never blinks empty.
  const [target, setTarget] = useState<Report | null>(null);
  const [dialog, setDialog] = useState<Dialog>(null);

  const visible = filter === "all" ? reports : reports.filter((r) => r.type === filter);

  const openDialog = (report: Report, next: Exclude<Dialog, null>) => {
    setTarget(report);
    setDialog(next);
  };

  const close = (next: Exclude<Dialog, null>) => (open: boolean) => {
    if (!open && dialog === next) setDialog(null);
  };

  const download = (report: Report) => {
    // TODO(backend): point to the signed file URL returned by the API
    if (!report.fileUrl) {
      setNotice("এটি ডেমো রিপোর্ট, তাই ফাইল নেই। ব্যাকএন্ড যুক্ত হলে ডাউনলোড চালু হবে।");
      return;
    }
    const link = document.createElement("a");
    link.href = report.fileUrl;
    link.download = report.fileName;
    link.click();
    setNotice(`“${report.fileName}” ডাউনলোড শুরু হয়েছে।`);
  };

  const saveEdit = (draft: ReportDraft) => {
    if (!target) return;
    updateReport(target.id, draft);
    setNotice("রিপোর্টের তথ্য আপডেট করা হয়েছে।");
  };

  const confirmDelete = () => {
    if (!target) return;
    deleteReport(target.id);
    setNotice(`“${target.title}” মুছে ফেলা হয়েছে।`);
  };

  return (
    <section className="card p-4 sm:p-6">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div aria-label="রিপোর্টের ধরন" className="flex flex-wrap gap-2" role="group">
          {REPORT_FILTERS.map(({ value, label }) => (
            <button aria-pressed={filter === value} className={cn("chip", filter === value && "chip-active")} key={value} onClick={() => setFilter(value)} type="button">
              {label}
            </button>
          ))}
        </div>
        <Link className="btn-primary h-11 px-5" href="/account/reports/upload">
          <Plus aria-hidden="true" className="size-[18px]" />
          নতুন রিপোর্ট
        </Link>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-4 border-t border-slate-100">
          {visible.map((report) => (
            <ReportRow
              key={report.id}
              onDelete={() => openDialog(report, "delete")}
              onDownload={() => download(report)}
              onEdit={() => openDialog(report, "edit")}
              onView={() => openDialog(report, "view")}
              report={report}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2 border-t border-slate-100 px-4 py-14 text-center">
          <FileX aria-hidden="true" className="size-10 text-slate-400" />
          <h2 className="text-lg font-bold text-heading">কোনো রিপোর্ট পাওয়া যায়নি</h2>
          <p className="max-w-sm text-sm text-slate-500">
            {filter === "all" ? "আপনার প্রথম মেডিকেল রিপোর্টটি আপলোড করুন।" : "এই ধরনের কোনো রিপোর্ট নেই। অন্য ধরন বেছে নিন বা নতুন রিপোর্ট আপলোড করুন।"}
          </p>
          <Link className="btn-outline mt-3 h-11" href="/account/reports/upload">
            রিপোর্ট আপলোড করুন
          </Link>
        </div>
      )}

      {target && (
        <>
          <ReportViewDialog onDownload={() => download(target)} onEdit={() => setDialog("edit")} onOpenChange={close("view")} open={dialog === "view"} report={target} />
          <ReportEditDialog onOpenChange={close("edit")} onSave={saveEdit} open={dialog === "edit"} report={target} />
          <ConfirmDialog
            confirmLabel="হ্যাঁ, মুছে ফেলুন"
            description={`“${target.title}” রিপোর্টটি স্থায়ীভাবে মুছে যাবে। এটি আর ফিরিয়ে আনা যাবে না।`}
            icon={<Trash2 aria-hidden="true" className="size-6" />}
            onConfirm={confirmDelete}
            onOpenChange={close("delete")}
            open={dialog === "delete"}
            title="রিপোর্ট মুছে ফেলবেন?"
            tone="danger"
          />
        </>
      )}
    </section>
  );
}
