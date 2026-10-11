import { CalendarDays, Clock3 } from "lucide-react";
import { TIP_CATEGORY_ICONS, TIP_CATEGORY_LABELS, TIP_CATEGORY_STYLES } from "@/data/tipOptions";
import { toBn } from "@/lib/format";
import { formatTipDate } from "@/lib/tips";
import type { HealthTip } from "@/types/tip";

export default function TipArticleHeader({ tip }: { tip: HealthTip }) {
  const Icon = TIP_CATEGORY_ICONS[tip.category];
  const style = TIP_CATEGORY_STYLES[tip.category];

  return (
    <section className="card flex flex-wrap items-center gap-6 p-5 sm:p-6">
      <div className={`grid size-24 shrink-0 place-items-center rounded-2xl sm:size-28 ${style.tile}`}>
        <Icon aria-hidden="true" className="size-12" strokeWidth={1.6} />
      </div>

      <div className="flex min-w-0 flex-1 basis-80 flex-col gap-2.5">
        <span className={`badge w-fit ${style.badge}`}>{TIP_CATEGORY_LABELS[tip.category]}</span>
        <h1 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight text-heading">{tip.title}</h1>
        <p className="text-[15px] leading-7 text-slate-600">{tip.summary}</p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-4 text-primary" />
            {formatTipDate(tip.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-4 text-primary" />
            {toBn(tip.readMinutes)} মিনিট পড়া
          </span>
        </p>
      </div>
    </section>
  );
}
