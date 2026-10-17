"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Camera, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import AvatarDialog from "@/components/account/AvatarDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout, updateUserProfile } from "@/features/auth/authSlice";
import { ACCOUNT_NAV } from "@/data/account";
import { toBn } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "ব্যবহারকারী";

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  const handleAvatarSave = async (url: string | null, file?: File | null) => {
    if (file && user) {
      const res = await dispatch(
        updateUserProfile({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          bio: user.bio || "",
          avatar: file,
        })
      );
      if (updateUserProfile.fulfilled.match(res)) {
        toast.success("প্রোফাইল ছবি আপডেট হয়েছে।");
      } else {
        throw new Error(res.error.message || "ছবি আপলোড ব্যর্থ হয়েছে");
      }
    }
  };

  return (
    <aside aria-label="অ্যাকাউন্ট মেনু" className="card p-4 lg:sticky lg:top-24 lg:p-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 lg:pb-5">
        <button
          aria-label="প্রোফাইল ছবি পরিবর্তন করুন"
          className="group relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-soft text-primary-dark cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition lg:size-[54px]"
          onClick={() => setAvatarOpen(true)}
          title="প্রোফাইল ছবি পরিবর্তন করুন"
          type="button"
        >
          {user?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className="size-full object-cover" src={user.avatar} />
          ) : (
            <User aria-hidden="true" className="size-6 text-primary" />
          )}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 text-white opacity-0 transition group-hover:opacity-100">
            <Camera className="size-4" />
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-heading">{fullName || "[ব্যবহারকারীর নাম]"}</p>
          <p className="truncate text-[13px] text-slate-500">{user?.email || (user?.phone ? toBn(user.phone) : "")}</p>
          <button
            className="mt-0.5 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-primary hover:underline"
            onClick={() => setAvatarOpen(true)}
            type="button"
          >
            <Camera className="size-3" />
            {user?.avatar ? "ছবি পরিবর্তন" : "ছবি যোগ করুন"}
          </button>
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
        description="লগআউট করলে পরবর্তীতে অ্যাকাউন্ট ব্যবহারের জন্য আবার লগইন করতে হবে।"
        icon={<LogOut aria-hidden="true" className="size-6" />}
        onConfirm={handleLogout}
        onOpenChange={setLogoutOpen}
        open={logoutOpen}
        title="লগআউট করবেন?"
        tone="danger"
      />

      <AvatarDialog
        currentUrl={user?.avatar || null}
        onOpenChange={setAvatarOpen}
        onSave={handleAvatarSave}
        open={avatarOpen}
      />
    </aside>
  );
}
