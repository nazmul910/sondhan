"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { REPORT_TYPES } from "@/data/account";
import { formatFileSize } from "@/lib/files";
import { formatDate, toBn } from "@/lib/format";
import type { ReportDraft } from "@/types/account";

type Step = "confirm" | "uploading" | "done";

type Props = {
  open: boolean;
  /** Called on every close except while uploading. */
  onOpenChange: (open: boolean) => void;
  file: File;
  draft: ReportDraft;
  /** Fires when the upload is confirmed. Should resolve when upload succeeds, or throw on error. */
  onUploaded: () => Promise<void> | void;
  /** "আরেকটি আপলোড" */
  onAnother: () => void;
};

export default function UploadDialog({ open, onOpenChange, file, draft, onUploaded, onAnother }: Props) {
  const [step, setStep] = useState<Step>("confirm");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const uploading = step === "uploading";

  const handleStart = async () => {
    setErrorMsg("");
    setStep("uploading");
    setProgress(20);

    const timer = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 12 : p));
    }, 200);

    try {
      await onUploaded();
      clearInterval(timer);
      setProgress(100);
      setStep("done");
      toast.success("রিপোর্ট সফলভাবে আপলোড হয়েছে।");
    } catch (err: unknown) {
      clearInterval(timer);
      const msg = err instanceof Error ? err.message : "ফাইল আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      setErrorMsg(msg);
      setStep("confirm");
      toast.error(msg);
    }
  };

  return (
    <Dialog onOpenChange={(next) => !uploading && onOpenChange(next)} open={open}>
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={(event) => uploading && event.preventDefault()}
        onInteractOutside={(event) => uploading && event.preventDefault()}
        showCloseButton={!uploading}
      >
        {step === "confirm" && (
          <ConfirmStep
            draft={draft}
            errorMsg={errorMsg}
            file={file}
            onBack={() => onOpenChange(false)}
            onStart={handleStart}
          />
        )}

        {step === "uploading" && (
          <>
            <DialogHeader>
              <DialogTitle>আপলোড হচ্ছে…</DialogTitle>
              <DialogDescription>অনুগ্রহ করে অপেক্ষা করুন, পেজটি বন্ধ করবেন না।</DialogDescription>
            </DialogHeader>
            <div>
              <div
                aria-label="আপলোডের অগ্রগতি"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={progress}
                className="h-2.5 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
              >
                <div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 flex justify-between text-[13px] text-slate-500">
                <span className="truncate pr-3">{file.name}</span>
                <span className="font-semibold text-primary-dark">{toBn(progress)}%</span>
              </p>
            </div>
          </>
        )}

        {step === "done" && (
          <>
            <div className="flex flex-col items-center gap-2 pt-2 text-center">
              <CheckCircle2 aria-hidden="true" className="size-14 text-primary" strokeWidth={1.7} />
              <DialogTitle>রিপোর্ট আপলোড হয়েছে</DialogTitle>
              <DialogDescription>আপনার রিপোর্টটি মেডিকেল রিপোর্ট তালিকায় যোগ করা হয়েছে।</DialogDescription>
            </div>
            <DialogFooter>
              <button className="btn-outline h-11 px-6 cursor-pointer" onClick={onAnother} type="button">
                আরেকটি আপলোড
              </button>
              <Link className="btn-primary h-11 px-6" href="/account/reports">
                রিপোর্ট দেখুন
              </Link>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ConfirmStep({
  file,
  draft,
  errorMsg,
  onBack,
  onStart,
}: {
  file: File;
  draft: ReportDraft;
  errorMsg?: string;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>রিপোর্ট আপলোড করবেন?</DialogTitle>
        <DialogDescription>আপলোড করার আগে তথ্যগুলো একবার দেখে নিন।</DialogDescription>
      </DialogHeader>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <FileText aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-heading">{file.name}</p>
          <p className="text-[13px] text-slate-500">{formatFileSize(file.size)}</p>
        </div>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-sm">
        <dt className="text-slate-500">ধরন</dt>
        <dd className="font-semibold text-heading">{REPORT_TYPES[draft.type].label}</dd>
        <dt className="text-slate-500">তারিখ</dt>
        <dd className="font-semibold text-heading">{formatDate(draft.date)}</dd>
        <dt className="text-slate-500">প্রতিষ্ঠান</dt>
        <dd className="font-semibold text-heading">{draft.provider}</dd>
        {draft.doctor && (
          <>
            <dt className="text-slate-500">ডাক্তার</dt>
            <dd className="font-semibold text-heading">{draft.doctor}</dd>
          </>
        )}
      </dl>

      <DialogFooter>
        <button className="btn-outline h-11 px-6 cursor-pointer" onClick={onBack} type="button">
          ফিরে যান
        </button>
        <button className="btn-primary h-11 px-6 cursor-pointer" onClick={onStart} type="button">
          <Upload aria-hidden="true" className="size-4" />
          আপলোড নিশ্চিত করুন
        </button>
      </DialogFooter>
    </>
  );
}
