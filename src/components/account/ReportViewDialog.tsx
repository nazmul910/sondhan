"use client";

import { Download, FileText, Pencil } from "lucide-react";
import ReportTypeBadge from "@/components/account/ReportTypeBadge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatFileSize } from "@/lib/files";
import { formatDate } from "@/lib/format";
import type { Report } from "@/types/account";

type Props = {
  report: Report;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDownload: () => void;
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-heading">{value || "—"}</dd>
    </div>
  );
}

export default function ReportViewDialog({ report, open, onOpenChange, onEdit, onDownload }: Props) {
  const isImage = report.fileMime.startsWith("image/");

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <ReportTypeBadge className="w-fit" type={report.type} />
          <DialogTitle>{report.title}</DialogTitle>
          <DialogDescription>{formatDate(report.date)}</DialogDescription>
        </DialogHeader>

        <div className="grid min-h-44 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {report.fileUrl && isImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob/user URL, next/image cannot optimise it
            <img alt={report.title} className="max-h-72 w-full object-contain" src={report.fileUrl} />
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <FileText aria-hidden="true" className="size-10 text-blue-500" strokeWidth={1.6} />
              <p className="max-w-full truncate text-sm font-semibold text-heading">{report.fileName}</p>
              {report.fileUrl ? (
                <a className="text-[13px] font-bold text-primary-dark hover:underline" href={report.fileUrl} rel="noreferrer" target="_blank">
                  নতুন ট্যাবে ফাইল খুলুন
                </a>
              ) : (
                <p className="text-[13px] text-slate-500">ফাইল প্রিভিউ ব্যাকএন্ড যুক্ত হলে এখানে দেখা যাবে।</p>
              )}
            </div>
          )}
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Detail label="হাসপাতাল / ল্যাব" value={report.provider} />
          <Detail label="ডাক্তার" value={report.doctor} />
          <Detail label="ফাইল" value={`${report.fileName} • ${formatFileSize(report.fileSize)}`} />
          <div className="sm:col-span-2">
            <Detail label="নোট" value={report.note} />
          </div>
        </dl>

        <DialogFooter>
          <button className="btn-outline h-11 px-5" onClick={onDownload} type="button">
            <Download aria-hidden="true" className="size-4" />
            ডাউনলোড
          </button>
          <button className="btn-primary h-11 px-5" onClick={onEdit} type="button">
            <Pencil aria-hidden="true" className="size-4" />
            সম্পাদনা করুন
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
