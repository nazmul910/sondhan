import { REPORT_TYPES } from "@/data/account";
import { cn } from "@/lib/utils";
import type { ReportType } from "@/types/account";

export default function ReportTypeBadge({ type, className }: { type: ReportType; className?: string }) {
  const { label, badge } = REPORT_TYPES[type];

  return <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[11px] font-bold whitespace-nowrap", badge, className)}>{label}</span>;
}
