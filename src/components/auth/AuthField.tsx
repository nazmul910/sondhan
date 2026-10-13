"use client";

import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type Props = {
  autoComplete: string;
  icon: LucideIcon;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: "email" | "password" | "text";
};

export default function AuthField({
  autoComplete,
  icon: Icon,
  id,
  label,
  name,
  placeholder,
  type = "text",
}: Props) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-[#477f82]" htmlFor={id}>{label}</label>
      <span className="flex h-[52px] items-center gap-3 rounded-xl border border-[#dedede] px-3 transition focus-within:border-[#477f82] focus-within:ring-2 focus-within:ring-[#477f82]/10">
        <Icon aria-hidden="true" className="size-5 shrink-0 text-[#477f82]" strokeWidth={1.9} />
        <input
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-[#777]"
          id={id}
          name={name}
          placeholder={placeholder}
          required
          type={isPassword && visible ? "text" : type}
        />
        {isPassword && (
          <button
            aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
            className="grid size-7 shrink-0 cursor-pointer place-items-center text-[#477f82]"
            onClick={() => setVisible((current) => !current)}
            type="button"
          >
            {visible ? <Eye aria-hidden="true" className="size-5" /> : <EyeOff aria-hidden="true" className="size-5" />}
          </button>
        )}
      </span>
    </div>
  );
}
