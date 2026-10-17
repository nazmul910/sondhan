import type { ReactNode } from "react";
import { AccountProvider } from "@/components/account/AccountProvider";
import AccountSidebar from "@/components/account/AccountSidebar";
import AuthGuard from "@/components/auth/AuthGuard";

/** Shared shell for every /account/* page: sidebar on the left, page on the right. Protected by AuthGuard. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AccountProvider>
        <div className="bg-[#f4f8f9]">
          <div className="page-container grid grid-cols-[minmax(0,1fr)] items-start gap-5 py-6 pb-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6 lg:py-9 lg:pb-16">
            <AccountSidebar />
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </AccountProvider>
    </AuthGuard>
  );
}

