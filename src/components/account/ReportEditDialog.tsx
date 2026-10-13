"use client";

import { useState, type FormEvent } from "react";
import ReportMetaFields from "@/components/account/ReportMetaFields";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trimDraft, validateDraft, type DraftErrors } from "@/lib/reports";
import type { Report, ReportDraft } from "@/types/account";

type Props = {
  report: Report;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (draft: ReportDraft) => void;
};

export default function ReportEditDialog({ report, open, onOpenChange, onSave }: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-2xl">
        {/* Body mounts fresh on every open, so the form always starts from the saved values. */}
        <EditBody onClose={() => onOpenChange(false)} onSave={onSave} report={report} />
      </DialogContent>
    </Dialog>
  );
}

function EditBody({ report, onSave, onClose }: { report: Report; onSave: (draft: ReportDraft) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<ReportDraft>({
    title: report.title,
    type: report.type,
    date: report.date,
    provider: report.provider,
    doctor: report.doctor,
    note: report.note,
  });
  const [errors, setErrors] = useState<DraftErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = validateDraft(draft, true);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave(trimDraft(draft));
    onClose();
  };

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={submit}>
      <DialogHeader>
        <DialogTitle>রিপোর্ট সম্পাদনা</DialogTitle>
        <DialogDescription>ফাইলটি অপরিবর্তিত থাকবে, শুধু তথ্য বদলাবে।</DialogDescription>
      </DialogHeader>

      <ReportMetaFields draft={draft} errors={errors} idPrefix="edit" onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} showTitle />

      <DialogFooter>
        <button className="btn-outline h-11 px-6" onClick={onClose} type="button">
          বাতিল
        </button>
        <button className="btn-primary h-11 px-6" type="submit">
          পরিবর্তন সংরক্ষণ করুন
        </button>
      </DialogFooter>
    </form>
  );
}
