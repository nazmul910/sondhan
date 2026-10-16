import Link from "next/link";
import { SearchX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  hint: string;
  resetHref?: string;
  actionLabel?: string;
  icon?: LucideIcon;
};

export default function EmptyState({
  title,
  hint,
  resetHref,
  actionLabel = "ফিল্টার রিসেট করুন",
  icon: Icon = SearchX,
}: Props) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
        <Icon aria-hidden="true" className="size-8" />
      </span>
      <h2 className="text-lg font-bold text-heading">{title}</h2>
      <p className="max-w-sm text-sm text-slate-500">{hint}</p>
      {resetHref && (
        <Link className="btn-outline mt-2" href={resetHref}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
