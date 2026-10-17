"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, initialized, profileLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (initialized && !profileLoading && !isAuthenticated) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname || "/account/profile")}`;
      router.replace(redirectUrl);
    }
  }, [initialized, profileLoading, isAuthenticated, pathname, router]);

  if (!initialized || profileLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
          <p className="text-sm font-semibold text-slate-500">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
