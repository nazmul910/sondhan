import type { ReactNode } from "react";

type Props = { label: string; htmlFor: string; error?: string; children: ReactNode };

export default function FormField({ label, htmlFor, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-bold text-heading" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
