"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Camera, Trash2, User, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AVATAR_ACCEPTED_MIME, AVATAR_MAX_BYTES } from "@/data/account";
import { validateFile } from "@/lib/files";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUrl: string | null;
  /** `null` = remove the photo. */
  onSave: (url: string | null, file?: File | null) => Promise<void> | void;
};

export default function AvatarDialog({ open, onOpenChange, currentUrl, onSave }: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-md">
        {/* Body mounts fresh on every open, so picked file / errors never leak between openings. */}
        <AvatarDialogBody currentUrl={currentUrl} onClose={() => onOpenChange(false)} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}

function AvatarDialogBody({
  currentUrl,
  onClose,
  onSave,
}: Omit<Props, "open" | "onOpenChange"> & { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const shown = removed ? null : (previewUrl ?? currentUrl);
  const changed = removed || file !== null;

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0];
    event.target.value = ""; // allow picking the same file again
    if (!next) return;

    const problem = validateFile(next, AVATAR_ACCEPTED_MIME, AVATAR_MAX_BYTES, "JPG বা PNG");
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setRemoved(false);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
  };

  const remove = () => {
    setError("");
    setFile(null);
    setPreviewUrl(null);
    setRemoved(true);
  };

  const save = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      if (file) {
        await onSave(previewUrl, file);
      } else if (removed) {
        await onSave(null, null);
      }
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "ছবি সংরক্ষণ করতে সমস্যা হয়েছে।";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>প্রোফাইল ছবি পরিবর্তন</DialogTitle>
        <DialogDescription>JPG বা PNG ছবি দিন, সর্বোচ্চ ২ এমবি।</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-3.5 py-3">
        <span className="relative grid size-36 place-items-center overflow-hidden rounded-full bg-primary-soft text-primary-dark ring-4 ring-primary/10 shadow-inner">
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="প্রোফাইল ছবির প্রিভিউ" className="size-full object-cover" src={shown} />
          ) : (
            <User aria-hidden="true" className="size-16 text-primary" strokeWidth={1.8} />
          )}
        </span>

        {!shown && (
          <p className="text-xs text-slate-500">কোনো ছবি নেই। নতুন ছবি যোগ করতে নিচের বোতাম চাপুন।</p>
        )}

        {file && <p className="max-w-full truncate text-[13px] font-medium text-slate-700">{file.name}</p>}

        {error && (
          <div className="flex items-center gap-1.5 text-center text-xs font-medium text-red-600" role="alert">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <input
          accept={AVATAR_ACCEPTED_MIME.join(",")}
          className="sr-only"
          onChange={pick}
          ref={inputRef}
          tabIndex={-1}
          type="file"
        />

        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            className="btn-outline h-10 px-4"
            disabled={isSubmitting}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            <Camera aria-hidden="true" className="size-4" />
            {shown ? "অন্য ছবি বেছে নিন" : "ছবি বেছে নিন"}
          </button>
          {shown && (
            <button
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              disabled={isSubmitting}
              onClick={remove}
              type="button"
            >
              <Trash2 aria-hidden="true" className="size-4" />
              ছবি মুছুন
            </button>
          )}
        </div>
      </div>

      <DialogFooter>
        <button className="btn-outline h-11 px-6" disabled={isSubmitting} onClick={onClose} type="button">
          বাতিল
        </button>
        <button
          className="btn-primary h-11 px-6 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!changed || isSubmitting}
          onClick={save}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              আপলোড হচ্ছে...
            </>
          ) : (
            "সংরক্ষণ করুন"
          )}
        </button>
      </DialogFooter>
    </>
  );
}
