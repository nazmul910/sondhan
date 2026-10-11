import Link from "next/link";
import { TIP_CATEGORY_ICONS, TIP_CATEGORY_STYLES } from "@/data/tipOptions";
import { toBn } from "@/lib/format";
import type { HealthTip } from "@/types/tip";

export default function RelatedTips({ tips }: { tips: HealthTip[] }) {
  if (tips.length === 0) return null;

  return (
    <section className="card p-5">
      <h2 className="mb-4 text-[17px] font-bold text-heading">আরও পড়ুন</h2>
      <ul className="flex flex-col gap-4">
        {tips.map((tip) => {
          const Icon = TIP_CATEGORY_ICONS[tip.category];
          return (
            <li key={tip.id}>
              <Link className="group flex items-center gap-3.5" href={`/health-tips/${tip.id}`}>
                <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${TIP_CATEGORY_STYLES[tip.category].tile}`}>
                  <Icon aria-hidden="true" className="size-7" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <strong className="line-clamp-2 block text-sm font-bold leading-snug text-heading transition group-hover:text-primary-dark">{tip.title}</strong>
                  <small className="mt-0.5 block text-xs text-slate-500">{toBn(tip.readMinutes)} মিনিট পড়া</small>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link className="btn-outline mt-5 w-full" href="/health-tips">
        সব টিপস দেখুন
      </Link>
    </section>
  );
}
