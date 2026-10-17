"use client";

import { useState, type MouseEvent } from "react";
import { Heart } from "lucide-react";

export type FavoriteControl = { saved: boolean; onToggle: () => void };

type Props = { name: string; variant?: "icon" | "button"; favorite?: FavoriteControl };

export default function FavoriteButton({ name, variant = "icon", favorite }: Props) {
  const [localSaved, setLocalSaved] = useState(false);
  const saved = favorite?.saved ?? localSaved;

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      favorite.onToggle();
      return;
    }
    setLocalSaved((value) => !value);
  };

  const heart = (
    <Heart
      aria-hidden="true"
      className={`size-[18px] transition-transform duration-200 active:scale-125 ${
        saved ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"
      }`}
    />
  );

  if (variant === "button") {
    return (
      <button
        aria-pressed={saved}
        className="btn-outline cursor-pointer"
        onClick={toggle}
        type="button"
      >
        {heart}
        {saved ? "প্রিয় তালিকায় আছে" : "প্রিয় তালিকায় যোগ"}
      </button>
    );
  }

  return (
    <button
      aria-label={`${name} ${saved ? "প্রিয় তালিকা থেকে সরান" : "প্রিয় তালিকায় যোগ করুন"}`}
      aria-pressed={saved}
      className={`grid size-8.5 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-100 bg-white/90 shadow-sm backdrop-blur-sm transition hover:border-rose-200 hover:bg-white hover:shadow-md active:scale-90 ${
        saved ? "border-rose-200 bg-rose-50/60" : ""
      }`}
      onClick={toggle}
      title={saved ? "প্রিয় তালিকা থেকে সরান" : "প্রিয় তালিকায় যোগ করুন"}
      type="button"
    >
      {heart}
    </button>
  );
}
