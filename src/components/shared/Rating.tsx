import { Star } from "lucide-react";
import { formatRating, toBn } from "@/lib/format";

type Props = { value: number; count?: number; className?: string };

export default function Rating({ value, count, className = "" }: Props) {
  return (
    <p className={`flex items-center gap-1.5 text-sm font-semibold text-slate-600 ${className}`}>
      <Star aria-hidden="true" className="size-[18px] fill-rating text-rating" />
      {formatRating(value)}
      {count !== undefined && <span className="font-normal text-slate-400">({toBn(count)})</span>}
    </p>
  );
}

export function Stars({ count = 5, className = "size-3.5" }: { count?: number; className?: string }) {
  return (
    <span aria-label={`${toBn(count)} তারা`} className="flex gap-0.5" role="img">
      {Array.from({ length: count }, (_, i) => (
        <Star aria-hidden="true" className={`${className} fill-rating text-rating`} key={i} />
      ))}
    </span>
  );
}
