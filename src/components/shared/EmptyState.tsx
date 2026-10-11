import Link from "next/link";
import { SearchX } from "lucide-react";

type Props = { title: string; hint: string; resetHref: string };

export default function EmptyState({ title, hint, resetHref }: Props) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
      <SearchX aria-hidden="true" className="size-10 text-slate-400" />
      <h2 className="text-lg font-bold text-heading">{title}</h2>
      <p className="max-w-sm text-sm text-slate-500">{hint}</p>
      <Link className="btn-outline mt-3" href={resetHref}>
        ফিল্টার রিসেট করুন
      </Link>
    </div>
  );
}
