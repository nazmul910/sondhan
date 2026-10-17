"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Upload } from "lucide-react";
import { useAccount } from "@/components/account/AccountProvider";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import FileDropzone from "@/components/account/FileDropzone";
import ReportMetaFields from "@/components/account/ReportMetaFields";
import UploadDialog from "@/components/account/UploadDialog";
import { REPORT_ACCEPTED_MIME, REPORT_MAX_BYTES } from "@/data/account";
import { validateFile } from "@/lib/files";
import { emptyDraft, trimDraft, validateDraft, withDefaultTitle, type DraftErrors } from "@/lib/reports";
import type { ReportDraft } from "@/types/account";

type Picked = { file: File; previewUrl: string | null };

const isDraftChanged = (draft: ReportDraft) => (Object.keys(emptyDraft) as (keyof ReportDraft)[]).some((key) => draft[key] !== emptyDraft[key]);

export default function UploadForm() {
  const router = useRouter();
  const { addReport } = useAccount();

  const [picked, setPicked] = useState<Picked | null>(null);
  const [fileError, setFileError] = useState("");
  const [draft, setDraft] = useState<ReportDraft>(emptyDraft);
  const [errors, setErrors] = useState<DraftErrors>({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [session, setSession] = useState(0); // new key = UploadDialog starts again at "confirm"
  const [uploaded, setUploaded] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  const previewUrl = picked?.previewUrl ?? null;
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const dirty = picked !== null || isDraftChanged(draft);

  const pick = (file: File) => {
    const problem = validateFile(file, REPORT_ACCEPTED_MIME, REPORT_MAX_BYTES, "PDF, JPG বা PNG");
    if (problem) {
      setFileError(problem);
      return;
    }
    setFileError("");
    setPicked({ file, previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null });
  };

  const resetForm = () => {
    setPicked(null);
    setFileError("");
    setDraft(emptyDraft);
    setErrors({});
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = validateDraft(draft, false);
    setErrors(next);
    setFileError(picked ? "" : "আপলোডের জন্য একটি ফাইল বেছে নিন");
    if (!picked || Object.keys(next).length > 0) return;

    setUploaded(false);
    setSession((s) => s + 1);
    setDialogOpen(true);
  };

  const onDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open && uploaded) resetForm(); // closed after success: the form starts clean
  };

  const handleUploaded = async () => {
    if (!picked) return;
    await addReport(withDefaultTitle(trimDraft(draft)), picked.file);
    setUploaded(true);
  };

  const another = () => {
    setDialogOpen(false);
    resetForm();
  };

  const cancel = () => (dirty ? setDiscardOpen(true) : router.push("/account/reports"));

  return (
    <form className="card flex flex-col gap-6 p-5 sm:p-8" noValidate onSubmit={submit}>
      <FileDropzone
        accept={REPORT_ACCEPTED_MIME.join(",")}
        error={fileError}
        file={picked?.file ?? null}
        onClear={() => {
          setPicked(null);
          setFileError("");
        }}
        onPick={pick}
        previewUrl={previewUrl}
      />

      <ReportMetaFields draft={draft} errors={errors} idPrefix="up" onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary h-12 px-7" type="submit">
          <Upload aria-hidden="true" className="size-[18px]" />
          আপলোড করুন
        </button>
        <button className="btn-outline h-12 px-7" onClick={cancel} type="button">
          বাতিল
        </button>
      </div>

      {picked && (
        <UploadDialog
          draft={draft}
          file={picked.file}
          key={session}
          onAnother={another}
          onOpenChange={onDialogOpenChange}
          onUploaded={handleUploaded}
          open={dialogOpen}
        />
      )}

      <ConfirmDialog
        cancelLabel="ফিরে যান"
        confirmLabel="হ্যাঁ, বাতিল করুন"
        description="আপনার বেছে নেওয়া ফাইল ও লেখা তথ্য সংরক্ষিত হবে না।"
        icon={<Trash2 aria-hidden="true" className="size-6" />}
        onConfirm={() => router.push("/account/reports")}
        onOpenChange={setDiscardOpen}
        open={discardOpen}
        title="আপলোড বাতিল করবেন?"
        tone="danger"
      />
    </form>
  );
}
