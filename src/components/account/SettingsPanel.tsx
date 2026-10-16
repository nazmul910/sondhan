"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut, Trash2 } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import { useAccount } from "@/components/account/AccountProvider";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import SectionCard from "@/components/shared/SectionCard";
import { LANGUAGE_OPTIONS, NOTIFICATION_OPTIONS, SETTINGS_LINKS } from "@/data/settings";
import { cn } from "@/lib/utils";
import type { AppLanguage, NotificationKey } from "@/types/account";

type Dialog = "logout" | "delete" | null;

export default function SettingsPanel() {
  const router = useRouter();
  const { settings, updateSettings } = useAccount();
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<Dialog>(null);

  const close = (next: Exclude<Dialog, null>) => (open: boolean) => {
    if (!open && dialog === next) setDialog(null);
  };

  const changeLanguage = (language: AppLanguage) => {
    if (language === settings.language) return;
    // TODO(i18n): switch the app locale here (only the preference is stored for now)
    updateSettings({ ...settings, language });
    setNotice(`অ্যাপের ভাষা ${LANGUAGE_OPTIONS.find((o) => o.value === language)?.label} নির্বাচন করা হয়েছে।`);
  };

  const toggleNotification = (key: NotificationKey) => {
    updateSettings({ ...settings, notifications: { ...settings.notifications, [key]: !settings.notifications[key] } });
    setNotice("নোটিফিকেশন সেটিংস সংরক্ষণ করা হয়েছে।");
  };

  const logout = () => {
    // TODO(backend): dispatch(logout()) then clear the session
    router.push("/login");
  };

  const deleteAccount = () => {
    // TODO(backend): await dispatch(deleteAccount()).unwrap(), then clear the session
    router.push("/");
  };

  return (
    <div className="grid gap-4">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      <SectionCard title="অ্যাপের ভাষা">
        <div aria-label="অ্যাপের ভাষা" className="grid gap-3 sm:grid-cols-2" role="radiogroup">
          {LANGUAGE_OPTIONS.map(({ value, label }) => (
            <label
              className={cn(
                "flex h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-semibold text-heading transition",
                settings.language === value ? "border-primary bg-primary-soft/50" : "border-slate-200 hover:border-primary/50",
              )}
              key={value}
            >
              <input checked={settings.language === value} className="field-check" name="language" onChange={() => changeLanguage(value)} type="radio" value={value} />
              {label}
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="নোটিফিকেশন">
        <ul className="divide-y divide-slate-100">
          {NOTIFICATION_OPTIONS.map(({ key, title, hint }) => (
            <li key={key}>
              <label className="flex cursor-pointer items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <span className="min-w-0">
                  <span className="block font-bold text-heading">{title}</span>
                  <span className="block text-[13px] text-slate-500">{hint}</span>
                </span>
                <input checked={settings.notifications[key]} className="field-check shrink-0" onChange={() => toggleNotification(key)} type="checkbox" />
              </label>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="গোপনীয়তা ও সহায়তা">
        <ul className="divide-y divide-slate-100">
          {SETTINGS_LINKS.map(({ label, href, Icon }) => (
            <li key={href}>
              <Link className="group flex items-center gap-3 py-3.5 font-bold text-heading first:pt-0 last:pb-0 hover:text-primary-dark" href={href}>
                <Icon aria-hidden="true" className="size-[18px] text-primary" />
                <span className="flex-1">{label}</span>
                <ChevronRight aria-hidden="true" className="size-[18px] text-slate-400 transition group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="অ্যাকাউন্ট">
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline h-11 px-5" onClick={() => setDialog("logout")} type="button">
            <LogOut aria-hidden="true" className="size-4" />
            লগআউট
          </button>
          <button
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 text-sm font-bold text-red-600 transition hover:bg-red-50"
            onClick={() => setDialog("delete")}
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            অ্যাকাউন্ট মুছুন
          </button>
        </div>
      </SectionCard>

      <ConfirmDialog
        confirmLabel="লগআউট করুন"
        description="লগআউট করলে আবার আপনার মোবাইল নম্বর দিয়ে লগইন করতে হবে।"
        icon={<LogOut aria-hidden="true" className="size-6" />}
        onConfirm={logout}
        onOpenChange={close("logout")}
        open={dialog === "logout"}
        title="লগআউট করবেন?"
        tone="danger"
      />

      <ConfirmDialog
        confirmLabel="হ্যাঁ, অ্যাকাউন্ট মুছুন"
        description="আপনার প্রোফাইল, মেডিকেল রিপোর্ট ও প্রিয় ডাক্তারের তালিকা স্থায়ীভাবে মুছে যাবে। এটি আর ফিরিয়ে আনা যাবে না।"
        icon={<Trash2 aria-hidden="true" className="size-6" />}
        onConfirm={deleteAccount}
        onOpenChange={close("delete")}
        open={dialog === "delete"}
        title="অ্যাকাউন্ট মুছে ফেলবেন?"
        tone="danger"
      />
    </div>
  );
}
