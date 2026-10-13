"use client";

import { useRef, useState, type DragEvent } from "react";
import { FileText, Upload, X } from "lucide-react";
import { formatFileSize } from "@/lib/files";
import { cn } from "@/lib/utils";

type Props = {
  file: File | null;
  /** Object URL for image files, null for PDFs. */
  previewUrl: string | null;
  error?: string;
  accept: string;
  /** Caller validates the file (type / size) and decides what to do with it. */
  onPick: (file: File) => void;
  onClear: () => void;
};

export default function FileDropzone({ file, previewUrl, error, accept, onPick, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onPick(dropped);
  };

  return (
    <div>
      <div
        className={cn(
          "rounded-2xl border-2 border-dashed px-5 py-9 text-center transition sm:py-11",
          error ? "border-red-400 bg-red-50/40" : dragging ? "border-primary bg-primary-soft" : "border-primary/60 bg-white",
        )}
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDrop={onDrop}
      >
        <input
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const picked = event.target.files?.[0];
            event.target.value = ""; // lets people re-pick the same file after clearing it
            if (picked) onPick(picked);
          }}
          ref={inputRef}
          tabIndex={-1}
          type="file"
        />

        {file ? (
          <div className="mx-auto flex max-w-md items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm">
            <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-blue-50 text-blue-600">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- blob URL, next/image cannot optimise it
                <img alt="" className="size-full object-cover" src={previewUrl} />
              ) : (
                <FileText aria-hidden="true" className="size-7" strokeWidth={1.8} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-heading">{file.name}</p>
              <p className="text-[13px] text-slate-500">{formatFileSize(file.size)}</p>
              <button className="mt-0.5 cursor-pointer text-[13px] font-bold text-primary-dark hover:underline" onClick={() => inputRef.current?.click()} type="button">
                অন্য ফাইল বেছে নিন
              </button>
            </div>
            <button
              aria-label="ফাইল সরিয়ে ফেলুন"
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              onClick={onClear}
              type="button"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        ) : (
          <>
            <span className="mx-auto grid size-[52px] place-items-center rounded-full bg-primary-soft text-primary-dark">
              <Upload aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-4 font-bold text-heading">ফাইল এখানে টেনে আনুন</p>
            <p className="mt-1.5 text-[13px] text-slate-500">PDF, JPG বা PNG • সর্বোচ্চ ১০ এমবি</p>
            <button className="btn-outline mt-4 h-11 px-6" onClick={() => inputRef.current?.click()} type="button">
              ফাইল বেছে নিন
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
