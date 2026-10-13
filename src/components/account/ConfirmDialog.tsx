"use client";

import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** "danger" = red confirm button (delete, logout, discard). */
  tone?: "default" | "danger";
  /** Icon shown above the title. */
  icon?: ReactNode;
  /** May be async; the dialog shows a spinner and closes when it resolves. */
  onConfirm: () => void | Promise<void>;
};

/** One reusable "are you sure?" modal (shadcn AlertDialog) for delete, logout, save and discard. */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "বাতিল",
  tone = "default",
  icon,
  onConfirm,
}: Props) {
  const [pending, setPending] = useState(false);

  const handleConfirm = async (event: React.MouseEvent) => {
    event.preventDefault(); // keep it open until onConfirm finishes
    setPending(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog onOpenChange={(next) => !pending && onOpenChange(next)} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {icon && (
            <span
              className={cn(
                "mb-1 grid size-12 place-items-center rounded-full",
                tone === "danger" ? "bg-red-50 text-red-600" : "bg-primary-soft text-primary-dark",
              )}
            >
              {icon}
            </span>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            className={tone === "danger" ? "bg-[#c83228] hover:bg-[#a82a21]" : undefined}
            disabled={pending}
            onClick={handleConfirm}
          >
            {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
