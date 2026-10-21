"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Sparkles, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AiLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AiLoginModal({ open, onOpenChange }: AiLoginModalProps) {
  const pathname = usePathname();
  const redirectParam = encodeURIComponent(pathname || "/");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] p-6 text-center sm:rounded-2xl">
        <div className="mx-auto flex flex-col items-center">
          <div className="relative mb-3 flex size-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary-soft shadow-inner">
            <Image
              src="/assets/ai-robot.jpg"
              alt="Shondhan AI সহকারী"
              width={80}
              height={80}
              className="object-cover"
            />
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-white shadow-sm">
              <Sparkles className="size-3" />
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
            <span className="size-1.5 rounded-full bg-primary" />
            AI স্বাস্থ্য সহকারী
          </span>
        </div>

        <DialogHeader className="p-0 text-center">
          <DialogTitle className="text-xl font-bold text-heading">
            AI সহকারী ব্যবহার করতে লগইন করুন
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6 text-slate-600">
            সন্ধান এআই সহকারীর সাথে সরাসরি স্বাস্থ্য পরামর্শ করতে, লক্ষণ পর্যালোচনা ও হাসপাতালে এন্টিভেনম তথ্য যাচাই করতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-2.5">
          <Link
            href={`/login?redirect=${redirectParam}`}
            onClick={() => onOpenChange(false)}
            className="btn-primary w-full gap-2 py-2.5 text-sm font-bold shadow-md shadow-primary/20"
          >
            <LogIn className="size-4" />
            লগইন করুন
          </Link>

          <Link
            href={`/register?redirect=${redirectParam}`}
            onClick={() => onOpenChange(false)}
            className="btn-outline w-full gap-2 py-2.5 text-sm font-semibold"
          >
            <UserPlus className="size-4" />
            নতুন অ্যাকাউন্ট খুলুন
          </Link>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          লগইন করার সাথে সাথেই আপনি যেকোনো সময় এআই সহকারীর সাথে চ্যাট করতে পারবেন।
        </p>
      </DialogContent>
    </Dialog>
  );
}
