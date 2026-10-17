"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, KeyRound, LogOut, LockKeyhole, AlertCircle, CheckCircle2 } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import SectionCard from "@/components/shared/SectionCard";
import FormField from "@/components/blood/FormField";
import { SETTINGS_LINKS } from "@/data/settings";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { changePassword } from "@/features/auth/authApi";

export default function SettingsPanel() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.auth);

  const [notice, setNotice] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  // Language state (matches Postman /v1/languages: English, Bengali, Arabic)
  const [selectedLang, setSelectedLang] = useState<"bn" | "en" | "ar">("bn");

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (!currentPassword) {
      setPwError("বর্তমান পাসওয়ার্ড দিন।");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPwError("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।");
      return;
    }
    if (!token) {
      setPwError("অনুগ্রহ করে প্রথমে লগইন করুন।");
      return;
    }

    setPwLoading(true);
    try {
      const res = await changePassword(token, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setPwSuccess(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : "পাসওয়ার্ড পরিবর্তন করা যায়নি।");
    } finally {
      setPwLoading(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="grid gap-4">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      {/* Change Password */}
      <SectionCard title="পাসওয়ার্ড পরিবর্তন">
        {pwError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            <AlertCircle className="size-4 shrink-0" />
            <span>{pwError}</span>
          </div>
        )}
        {pwSuccess && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{pwSuccess}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <FormField htmlFor="curr-pw" label="বর্তমান পাসওয়ার্ড">
            <div className="relative">
              <input
                autoComplete="current-password"
                className="field"
                id="curr-pw"
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
                required
                type="password"
                value={currentPassword}
              />
            </div>
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField htmlFor="new-pw" label="নতুন পাসওয়ার্ড">
              <input
                autoComplete="new-password"
                className="field"
                id="new-pw"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
                required
                type="password"
                value={newPassword}
              />
            </FormField>

            <FormField htmlFor="confirm-new-pw" label="নতুন পাসওয়ার্ড নিশ্চিত করুন">
              <input
                autoComplete="new-password"
                className="field"
                id="confirm-new-pw"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                required
                type="password"
                value={confirmPassword}
              />
            </FormField>
          </div>

          <button
            className="btn-primary h-11 px-6 disabled:opacity-60"
            disabled={pwLoading}
            type="submit"
          >
            <KeyRound aria-hidden="true" className="size-4" />
            {pwLoading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
          </button>
        </form>
      </SectionCard>

      {/* App Language */}
      <SectionCard title="অ্যাপের ভাষা">
        <div aria-label="অ্যাপের ভাষা" className="grid gap-3 sm:grid-cols-3" role="radiogroup">
          {[
            { value: "bn", label: "বাংলা (Bengali)" },
            { value: "en", label: "English" },
            { value: "ar", label: "العربية (Arabic)" },
          ].map(({ value, label }) => (
            <label
              className={cn(
                "flex h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-semibold text-heading transition",
                selectedLang === value ? "border-primary bg-primary-soft/50" : "border-slate-200 hover:border-primary/50",
              )}
              key={value}
            >
              <input
                checked={selectedLang === value}
                className="field-check"
                name="language"
                onChange={() => {
                  setSelectedLang(value as "bn" | "en" | "ar");
                  setNotice(`ভাষা পরিবর্তন করা হয়েছে (${label})`);
                }}
                type="radio"
                value={value}
              />
              {label}
            </label>
          ))}
        </div>
      </SectionCard>

      {/* Privacy and help links */}
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

      {/* Account / Logout */}
      <SectionCard title="অ্যাকাউন্ট">
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline h-11 px-5" onClick={() => setLogoutOpen(true)} type="button">
            <LogOut aria-hidden="true" className="size-4" />
            লগআউট
          </button>
        </div>
      </SectionCard>

      <ConfirmDialog
        confirmLabel="লগআউট করুন"
        description="লগআউট করলে পরবর্তীতে ব্যবহারের জন্য আবার লগইন করতে হবে।"
        icon={<LogOut aria-hidden="true" className="size-6" />}
        onConfirm={handleLogout}
        onOpenChange={setLogoutOpen}
        open={logoutOpen}
        title="লগআউট করবেন?"
        tone="danger"
      />
    </div>
  );
}
