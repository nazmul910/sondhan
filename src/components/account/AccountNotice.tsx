import { CheckCircle2, X } from "lucide-react";

/** Inline success banner shown at the top of an account card after an action. */
export default function AccountNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800" role="status">
      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-[18px] shrink-0" />
      <p className="flex-1">{message}</p>
      <button aria-label="বার্তা বন্ধ করুন" className="cursor-pointer rounded p-0.5 hover:bg-emerald-100" onClick={onDismiss} type="button">
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
