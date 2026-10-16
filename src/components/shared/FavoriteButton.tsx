"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export type FavoriteControl = { saved: boolean; onToggle: () => void };

type Props = { name: string; variant?: "icon" | "button"; favorite?: FavoriteControl };

export default function FavoriteButton({ name, variant = "icon", favorite }: Props) {
  const [localSaved, setLocalSaved] = useState(false);
  // TODO: persist to /account/favorites (needs login). Redirect guests to /login.
  const saved = favorite?.saved ?? localSaved;
  const toggle = () => {
    if (favorite) {
      favorite.onToggle();
      return;
    }
    setLocalSaved((value) => !value);
  };
  const heart = <Heart aria-hidden="true" className={`size-[17px] ${saved ? "fill-rose-500 text-rose-500" : ""}`} />;

  if (variant === "button") {
    return (
      <button aria-pressed={saved} className="btn-outline" onClick={toggle} type="button">
        {heart}
        {saved ? "প্রিয় তালিকায় আছে" : "প্রিয় তালিকায় যোগ"}
      </button>
    );
  }

  return (
    <button
      aria-label={`${name} ${saved ? "প্রিয় তালিকা থেকে সরান" : "প্রিয় তালিকায় যোগ করুন"}`}
      aria-pressed={saved}
      className="grid size-6 shrink-0 place-items-center rounded-full text-slate-500 transition hover:scale-110 hover:text-rose-500"
      onClick={toggle}
      type="button"
    >
      {heart}
    </button>
  );
}
