import Rating, { Stars } from "@/components/shared/Rating";

import { ratingDistribution } from "@/data/reviews";
import { formatRating, toBn } from "@/lib/format";
import type { Review } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

type Props = { rating: number; count: number; reviews: Review[] };

export default function DoctorReviews({ rating, count, reviews }: Props) {
  return (
    <SectionCard title="রোগীদের রিভিউ">
      <div className="flex flex-wrap items-center gap-7 pb-4">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-5xl font-bold leading-none text-heading">{formatRating(rating)}</span>
          <Stars className="size-4" />
          <span className="text-xs text-slate-500">{toBn(count)} রিভিউ</span>
        </div>
        <div className="flex min-w-60 flex-1 flex-col gap-1.5">
          {ratingDistribution.map((percent, i) => (
            <div className="flex items-center gap-2.5 text-xs text-slate-500" key={i}>
              <span className="w-3.5">{toBn(5 - i)}</span>
              <div className="h-2 flex-1 rounded bg-slate-100">
                <div className="h-2 rounded bg-rating" style={{ width: `${percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul>
        {reviews.map((review) => (
          <li className="border-t border-slate-100 py-4" key={review.id}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-primary-soft font-bold text-primary-dark">{review.author.charAt(0)}</span>
                <strong className="text-sm text-heading">{review.author}</strong>
              </div>
              <Stars count={review.rating} />
            </div>
            <p className="mt-2.5 text-sm leading-7 text-slate-600">{review.text}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
