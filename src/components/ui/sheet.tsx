"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-[rgb(17_29_47/45%)] backdrop-blur-xs transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className
      )}
      {...props}
    />
  );
}

interface SheetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  side?: "top" | "bottom" | "left" | "right";
  showCloseButton?: boolean;
}

function SheetContent({
  side = "right",
  className,
  children,
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
    bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-full border-l border-slate-200 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:max-w-md md:max-w-lg",
  }[side];

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out outline-none",
          sideClasses,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className="absolute top-4 right-4 grid size-8 cursor-pointer place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">বন্ধ করুন</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-5 text-left border-b border-slate-100", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-5 border-t border-slate-100", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-bold text-heading", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-xs leading-5 text-slate-500", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
