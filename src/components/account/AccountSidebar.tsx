"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import { useAccount } from "@/components/account/AccountProvider";
import { ACCOUNT_NAV } from "@/data/account";
import { toBn } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAccount();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logout = () => {
    // TODO(backend): dispatch(logout()) then clear the session
    router.push("/login");
  };

  return (
    <aside aria-label="অ্যাকাউন্ট মেনু" className="card p-4 lg:sticky lg:top-24 lg:p-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 lg:pb-5">
        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-soft text-primary-dark lg:size-[54px]">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob/user URL, next/image cannot optimise it
            <img alt="" className="size-full object-cover" src={profile.avatarUrl} />
          ) : (
            <User aria-hidden="true" className="size-6" />
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-heading">{profile.name || "[ব্যবহারকারীর নাম]"}</p>
          <p className="truncate text-[13px] text-slate-500">{toBn(`+88${profile.phone}`)}</p>
        </div>
      </div>

      <nav aria-label="অ্যাকাউন্ট নেভিগেশন" className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-4 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {ACCOUNT_NAV.map(({ label, href, Icon }) => {
          const active = pathname === href;

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-11 shrink-0 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold whitespace-nowrap transition",
                active ? "bg-primary-soft text-primary-dark" : "text-slate-600 hover:bg-slate-50 hover:text-primary-dark",
              )}
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" className="size-[18px]" />
              {label}
            </Link>
          );
        })}

        <div className="shrink-0 lg:mt-2.5 lg:border-t lg:border-slate-100 lg:pt-3">
          <button
            className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 text-sm font-semibold whitespace-nowrap text-red-600 transition hover:bg-red-50"
            onClick={() => setLogoutOpen(true)}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-[18px]" />
            লগআউট
          </button>
        </div>
      </nav>

      <ConfirmDialog
        confirmLabel="লগআউট করুন"
        description="লগআউট করলে আবার আপনার মোবাইল নম্বর দিয়ে লগইন করতে হবে।"
        icon={<LogOut aria-hidden="true" className="size-6" />}
        onConfirm={logout}
        onOpenChange={setLogoutOpen}
        open={logoutOpen}
        title="লগআউট করবেন?"
        tone="danger"
      />
    </aside>
  );
}
