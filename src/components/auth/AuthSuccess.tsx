import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Props = { title: string; text: string; href: string; cta: string };

export default function AuthSuccess({ title, text, href, cta }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
      <CheckCircle2 aria-hidden="true" className="size-14 text-primary" strokeWidth={1.8} />
      <h1 className="text-2xl font-bold text-heading">{title}</h1>
      <p className="max-w-xs text-sm leading-7 text-slate-600">{text}</p>
      <Link className="btn-primary mt-2 h-11 min-w-44" href={href}>
        {cta}
      </Link>
    </div>
  );
}
