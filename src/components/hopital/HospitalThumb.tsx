"use client";

import { useState } from "react";
import { Hospital } from "lucide-react";

export default function HospitalThumb({
  size = "md",
  src,
  alt = "Hospital image",
}: {
  size?: "md" | "lg" | "sm";
  src?: string | null;
  alt?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const box = { sm: "size-14", md: "size-24", lg: "size-32" }[size];
  const icon = { sm: "size-7", md: "size-12", lg: "size-16" }[size];

  if (src && !hasError) {
    return (
      <div className={`${box} relative shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100`}>
        {/* We can use standard img or Next Image */}
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${box} grid shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary`}>
      <Hospital aria-hidden="true" className={icon} strokeWidth={1.8} />
    </div>
  );
}
