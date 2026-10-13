import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { children: ReactNode; showBack?: boolean };

export default function AuthShell({ children, showBack = false }: Props) {
  return (
    <main className="min-h-svh bg-white">
      <section className={`mx-auto w-full max-w-120 px-5.5 pb-8 ${showBack ? "pt-8" : "pt-16"}`}>
        {showBack && (
          <Link aria-label="লগইন পেজে ফিরে যান" className="mb-5 inline-flex size-7 items-center text-[#477f82]" href="/login">
            <ArrowLeft aria-hidden="true" className="size-6" />
          </Link>
        )}
        {children}
      </section>
    </main>
  );
}
