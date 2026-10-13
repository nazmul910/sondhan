import { Download, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import ReportTypeBadge from "@/components/account/ReportTypeBadge";
import { formatDate } from "@/lib/format";
import { reportSubtitle } from "@/lib/reports";
import { cn } from "@/lib/utils";
import type { Report } from "@/types/account";

type Props = {
  report: Report;
  onView: () => void;
  onEdit: () => void;
  onDownload: () => void;
  onDelete: () => void;
};

function IconButton({ label, danger, onClick, children }: { label: string; danger?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "grid size-10 cursor-pointer place-items-center rounded-lg border bg-white transition",
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-slate-200 text-slate-700 hover:border-primary hover:bg-primary-soft hover:text-primary-dark",
      )}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

export default function ReportRow({ report, onView, onEdit, onDownload, onDelete }: Props) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex min-w-0 flex-1 basis-64 items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <FileText aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-heading">{report.title}</h3>
          <p className="truncate text-[13px] text-slate-500">{reportSubtitle(report)}</p>
        </div>
      </div>

      <div className="flex items-center gap-x-4 gap-y-3 max-sm:w-full max-sm:flex-wrap">
        <time className="text-sm whitespace-nowrap text-slate-600 sm:w-36 sm:text-center" dateTime={report.date}>
          {formatDate(report.date)}
        </time>
        <div className="flex sm:w-24 sm:justify-center">
          <ReportTypeBadge type={report.type} />
        </div>
        <div className="flex items-center gap-2 max-sm:basis-full">
          <IconButton label={`${report.title} দেখুন`} onClick={onView}>
            <Eye aria-hidden="true" className="size-[18px]" />
          </IconButton>
          <IconButton label={`${report.title} সম্পাদনা করুন`} onClick={onEdit}>
            <Pencil aria-hidden="true" className="size-[18px]" />
          </IconButton>
          <IconButton label={`${report.title} ডাউনলোড করুন`} onClick={onDownload}>
            <Download aria-hidden="true" className="size-[18px]" />
          </IconButton>
          <IconButton danger label={`${report.title} মুছে ফেলুন`} onClick={onDelete}>
            <Trash2 aria-hidden="true" className="size-[18px]" />
          </IconButton>
        </div>
      </div>
    </li>
  );
}
