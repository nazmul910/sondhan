"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  redirectUrl?: string;
};

export default function LoginRequiredDialog({
  open,
  onOpenChange,
  title = "লগইন প্রয়োজন",
  description = "এই সেবাটি ব্যবহারের জন্য অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।",
  redirectUrl = "/login",
}: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
            <LogIn className="size-6" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            className="btn-outline h-11 w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            বাতিল
          </button>
          <Link
            className="btn-primary h-11 w-full justify-center sm:w-auto"
            href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
            onClick={() => onOpenChange(false)}
          >
            লগইন করুন
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
