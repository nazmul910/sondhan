import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { TIP_CATEGORY_ICONS, TIP_CATEGORY_LABELS, TIP_CATEGORY_STYLES } from "@/data/tipOptions";
import { toBn } from "@/lib/format";
import type { HealthTip } from "@/types/tip";

export default function TipCard({ tip }: { tip: HealthTip }) {
  const Icon = TIP_CATEGORY_ICONS[tip.category];
  const style = TIP_CATEGORY_STYLES[tip.category];

  return (
    <article className="card card-interactive group relative flex flex-col gap-3.5 p-4">
      <div className={`grid h-28 place-items-center rounded-xl ${style.tile}`}>
        <Icon aria-hidden="true" className="size-12" strokeWidth={1.6} />
      </div>

      <span className={`badge w-fit ${style.badge}`}>{TIP_CATEGORY_LABELS[tip.category]}</span>

      <h3 className="line-clamp-2 text-base font-bold leading-snug text-heading">
        {/* after:inset-0 makes the whole card clickable */}
        <Link className="after:absolute after:inset-0" href={`/health-tips/${tip.id}`}>
          {tip.title}
        </Link>
      </h3>
      <p className="line-clamp-3 text-[13px] leading-6 text-slate-600">{tip.summary}</p>

      <div className="mt-auto flex items-center justify-between pt-1 text-[13px]">
        <span className="flex items-center gap-1.5 text-slate-500">
          <Clock3 aria-hidden="true" className="size-4 text-primary" />
          {toBn(tip.readMinutes)} মিনিট পড়া
        </span>
        <span className="flex items-center gap-1 font-bold text-primary-dark transition group-hover:gap-2">
          পড়ুন
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </article>
  );
}
