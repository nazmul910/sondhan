import { Info } from "lucide-react";

export default function DraftNotice() {
  return (
    <p className="mb-7 flex items-center gap-2.5 rounded-xl bg-amber-50 px-4 py-3 text-[13px] leading-6 text-amber-800" role="note">
      <Info aria-hidden="true" className="size-[18px] shrink-0" />
      খসড়া — প্রকাশের আগে আইনি পর্যালোচনা প্রয়োজন।
    </p>
  );
}
