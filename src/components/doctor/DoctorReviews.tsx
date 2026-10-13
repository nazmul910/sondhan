"use client";

import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { Stars } from "@/components/shared/Rating";

import { ratingDistribution } from "@/data/reviews";
import { formatRating, toBn } from "@/lib/format";
import type { Review } from "@/types/doctor";
import SectionCard from "../shared/SectionCard";

type Props = { rating: number; count: number; reviews: Review[] };

export default function DoctorReviews({ rating, count, reviews }: Props) {
  const [visibleReviews, setVisibleReviews] = useState(reviews);
  const [author, setAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const totalCount = count + visibleReviews.length - reviews.length;
  const addedReviews = visibleReviews.slice(reviews.length);
  const distribution = ratingDistribution.map((percent, index) => {
    if (!totalCount) return 0;
    const star = 5 - index;
    const previousCount = (percent / 100) * count;
    const addedCount = addedReviews.filter((review) => review.rating === star).length;
    return Math.round(((previousCount + addedCount) / totalCount) * 100);
  });
  const currentRating = visibleReviews.length === reviews.length
    ? rating
    : Number(((rating * count + addedReviews.reduce((sum, review) => sum + review.rating, 0)) / totalCount).toFixed(1));

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!author.trim() || !reviewText.trim()) {
      setError("নাম ও রিভিউ লিখুন।");
      return;
    }
    const newReview: Review = {
      id: `review-${Date.now()}`,
      author: author.trim(),
      rating: reviewRating,
      text: reviewText.trim(),
    };
    setVisibleReviews((current) => [...current, newReview]);
    setAuthor("");
    setReviewText("");
    setReviewRating(5);
    setError("");
    setSubmitted(true);
  };

  return (
    <SectionCard title="রোগীদের রিভিউ">
      <div className="flex flex-wrap items-center gap-7 pb-4">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-5xl font-bold leading-none text-heading">{formatRating(currentRating)}</span>
          <Stars className="size-4" />
          <span className="text-xs text-slate-500">{toBn(totalCount)} রিভিউ</span>
        </div>
        <div className="flex min-w-60 flex-1 flex-col gap-1.5">
          {distribution.map((percent, i) => (
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
        {visibleReviews.map((review) => (
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
      <div className="border-t border-slate-100 pt-4">
        <details>
          <summary className="btn-outline list-none">রিভিউ লিখুন</summary>
          {submitted && <p className="mt-3 text-sm font-semibold text-primary-dark" role="status">আপনার রিভিউ যোগ হয়েছে। ডেমোতে এটি শুধু এই পেজে দেখা যাবে।</p>}
          <form className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4" onSubmit={submitReview}>
            <label className="block text-sm font-semibold text-heading">
              আপনার নাম
              <input className="field mt-1.5" onChange={(event) => setAuthor(event.target.value)} required value={author} />
            </label>
            <fieldset>
              <legend className="text-sm font-semibold text-heading">রেটিং</legend>
              <div className="mt-1.5 flex gap-1">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    aria-label={`${toBn(score)} তারা`}
                    aria-pressed={reviewRating === score}
                    className="cursor-pointer rounded p-1"
                    key={score}
                    onClick={() => setReviewRating(score)}
                    type="button"
                  >
                    <Star aria-hidden="true" className={`size-6 ${score <= reviewRating ? "fill-rating text-rating" : "text-slate-300"}`} />
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-semibold text-heading">
              আপনার অভিজ্ঞতা
              <textarea
                className="field mt-1.5 min-h-24 resize-y py-2.5"
                onChange={(event) => setReviewText(event.target.value)}
                required
                value={reviewText}
              />
            </label>
            {error && <p className="text-sm font-semibold text-red-700" role="alert">{error}</p>}
            <button className="btn-primary" type="submit">রিভিউ জমা দিন</button>
          </form>
        </details>
      </div>
    </SectionCard>
  );
}
