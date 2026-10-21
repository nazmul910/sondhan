"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  User,
  Shield,
  Bell,
  Trash2,
  FileText,
  Heart,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import AccountNotice from "@/components/account/AccountNotice";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import SectionCard from "@/components/shared/SectionCard";
import FormField from "@/components/blood/FormField";
import { SETTINGS_LINKS } from "@/data/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { changePassword } from "@/features/auth/authApi";

interface NotificationPreferences {
  emergencyAlerts: boolean;
  bloodRequests: boolean;
  reportUpdates: boolean;
  healthTips: boolean;
}

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  emergencyAlerts: true,
  bloodRequests: true,
  reportUpdates: true,
  healthTips: false,
};

export default function SettingsPanel() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((s) => s.auth);

  const [notice, setNotice] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [clearCacheOpen, setClearCacheOpen] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  // Notification preferences (persisted locally)
  const [notifications, setNotifications] = useState<NotificationPreferences>(DEFAULT_NOTIFICATIONS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shondhan_notification_prefs");
      if (stored) {
        try {
          setNotifications(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (typeof window !== "undefined") {
        localStorage.setItem("shondhan_notification_prefs", JSON.stringify(next));
      }
      toast.success("বিজ্ঞপ্তি পছন্দ সংরক্ষিত হয়েছে");
      return next;
    });
  };

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
      setPwSuccess(res.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।");
      toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "পাসওয়ার্ড পরিবর্তন করা যায়নি।";
      setPwError(msg);
      toast.error(msg);
    } finally {
      setPwLoading(false);
    }
  };

  const handleClearCache = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shondhan_chat_id");
      localStorage.removeItem("shondhan_recent_searches");
      sessionStorage.clear();
      setClearCacheOpen(false);
      toast.success("লোকাল ক্যাশ ও হিস্ট্রি সফলভাবে পরিষ্কার করা হয়েছে।");
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("সফলভাবে লগআউট হয়েছে।");
    router.push("/login");
  };

  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "ব্যবহারকারী";

  return (
    <div className="grid gap-5">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      {/* 1. Account Info Overview (from Profile API) */}
      <SectionCard title="অ্যাকাউন্ট ও ব্যবহারকারী তথ্য">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary-dark border border-primary/20">
              <User className="size-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-heading truncate">{fullName}</h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                  {user?.role === "user" ? "সাধারণ ব্যবহারকারী" : (user?.role || "সক্রিয়")}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email || "ইমেইল নেই"}</p>
              {user?.bio && (
                <p className="text-xs text-slate-600 line-clamp-1 mt-1 italic">{user.bio}</p>
              )}
            </div>
          </div>

          <Link
            href="/account/profile"
            className="btn-outline h-10 px-4 text-xs font-bold shrink-0 text-center"
          >
            প্রোফাইল সম্পাদন করুন
          </Link>
        </div>

        {/* Quick Shortcuts */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 pt-4 border-t border-slate-100 sm:grid-cols-2">
          <Link
            href="/account/reports"
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 text-xs font-semibold text-slate-700 transition hover:border-primary/40 hover:bg-primary-soft/30 hover:text-primary"
          >
            <span className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              মেডিকেল ফাইল ও রিপোর্ট
            </span>
            <ChevronRight className="size-4 text-slate-400" />
          </Link>

          <Link
            href="/account/favorites"
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 text-xs font-semibold text-slate-700 transition hover:border-primary/40 hover:bg-primary-soft/30 hover:text-primary"
          >
            <span className="flex items-center gap-2">
              <Heart className="size-4 text-rose-500" />
              সংরক্ষিত প্রিয় ডাক্তার
            </span>
            <ChevronRight className="size-4 text-slate-400" />
          </Link>
        </div>
      </SectionCard>

      {/* 2. Change Password (API: POST /v1/auth/profile/password) */}
      <SectionCard title="পাসওয়ার্ড পরিবর্তন ও নিরাপত্তা">
        <p className="text-[14px] text-slate-500 mb-4">
          আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে নিয়মিত শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।
        </p>

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
                className="field pr-10"
                id="curr-pw"
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
                required
                type={showCurrentPw ? "text" : "password"}
                value={currentPassword}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showCurrentPw ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              >
                {showCurrentPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField htmlFor="new-pw" label="নতুন পাসওয়ার্ড">
              <div className="relative">
                <input
                  autoComplete="new-password"
                  className="field pr-10"
                  id="new-pw"
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
                  required
                  type={showNewPw ? "text" : "password"}
                  value={newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showNewPw ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showNewPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </FormField>

            <FormField htmlFor="confirm-new-pw" label="নতুন পাসওয়ার্ড নিশ্চিত করুন">
              <div className="relative">
                <input
                  autoComplete="new-password"
                  className="field pr-10"
                  id="confirm-new-pw"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                  required
                  type={showConfirmPw ? "text" : "password"}
                  value={confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showConfirmPw ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showConfirmPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
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

      {/* 3. Notifications & Emergency Alerts Preferences */}
      <SectionCard title="বিজ্ঞপ্তি ও জরুরি অ্যালার্ট প্রিফারেন্স">
        <p className="text-[14px] text-slate-500 mb-4">
          আপনার পছন্দ অনুযায়ী কোন কোন বিষয়ে বিজ্ঞপ্তি বা আপডেট পেতে চান তা নির্ধারণ করুন।
        </p>

        <div className="space-y-3.5">
          <label className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 transition cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600 mt-0.5">
                <Bell className="size-4" />
              </span>
              <div>
                <strong className="block text-xs sm:text-sm font-semibold text-heading">
                  জরুরি অ্যান্টিভেনম ও রক্তদানের সতর্কতা
                </strong>
                <span className="text-[14px] text-slate-500 leading-normal">
                  আপনার এলাকায় জরুরি অ্যান্টিভেনম মজুত পরিবর্তন বা রক্তের অনুরোধ এলে জানানো হবে।
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.emergencyAlerts}
              onChange={() => toggleNotification("emergencyAlerts")}
              className="size-5 rounded-md accent-primary cursor-pointer shrink-0"
            />
          </label>

          <label className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 transition cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600 mt-0.5">
                <FileText className="size-4" />
              </span>
              <div>
                <strong className="block text-xs sm:text-sm font-semibold text-heading">
                  মেডিকেল ফাইল ও প্রেসক্রিপশন আপডেট
                </strong>
                <span className="text-[14px] text-slate-500 leading-normal">
                  নতুন প্রেসক্রিপশন বা ল্যাব টেস্ট রিপোর্ট সফলভাবে আপলোড হলে বিজ্ঞপ্তি পান।
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.reportUpdates}
              onChange={() => toggleNotification("reportUpdates")}
              className="size-5 rounded-md accent-primary cursor-pointer shrink-0"
            />
          </label>

          <label className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 transition cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                <Shield className="size-4" />
              </span>
              <div>
                <strong className="block text-xs sm:text-sm font-semibold text-heading">
                  স্বাস্থ্য সচেতনতা ও সাপ্তাহিক টিপস
                </strong>
                <span className="text-[14px] text-slate-500 leading-normal">
                  মৌসুমি স্বাস্থ্য পরামর্শ, পুষ্টি ও জরুরি ফার্স্ট-এইড নির্দেশিকা সম্পর্কে জানুন।
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.healthTips}
              onChange={() => toggleNotification("healthTips")}
              className="size-5 rounded-md accent-primary cursor-pointer shrink-0"
            />
          </label>
        </div>
      </SectionCard>

      {/* 4. Local Data & Cache Management */}
      <SectionCard title="অ্যাপ ডেটা ও নিরাপত্তা ব্যবস্থাপনা">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-heading">
              লোকাল ক্যাশ ও সংরক্ষিত হিস্ট্রি পরিষ্কার
            </h4>
            <p className="text-[14px] text-slate-500 mt-0.5">
              ব্রাউজারে সেভ থাকা পুরনো এআই চ্যাট সেশন আইডি ও সার্চ ক্যাশ মুছে ফেলুন।
            </p>
          </div>

          <button
            type="button"
            onClick={() => setClearCacheOpen(true)}
            className="btn-outline h-9 px-3.5 text-xs shrink-0 gap-1.5 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="size-3.5" />
            ক্যাশ মুছুন
          </button>
        </div>
      </SectionCard>

      {/* 5. Privacy, Help & Contact */}
      <SectionCard title="সহায়তা ও শর্তাবলী">
        <ul className="divide-y divide-slate-100 text-xs sm:text-sm">
          {SETTINGS_LINKS.map(({ label, href, Icon }) => (
            <li key={href}>
              <Link
                className="group flex items-center  h-10 gap-3 py-3 font-semibold text-heading first:pt-0 last:pb-0 hover:text-primary transition"
                href={href}
              >
                <Icon aria-hidden="true" className="size-4 text-primary shrink-0" />
                <span className="flex-1">{label}</span>
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 text-slate-400 transition group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 6. Account Logout (API: POST /v1/auth/logout) */}
      <SectionCard title="সেশন ও অ্যাকাউন্ট নিষ্ক্রিয়করণ">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-heading">অ্যাকাউন্ট থেকে লগআউট</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              বর্তমানে সক্রিয় সেশন শেষ করতে লগআউট করুন। পরবর্তীতে আবার লগইন করতে হবে।
            </p>
          </div>

          <button
            className="btn-danger h-10 px-5 text-xs font-bold shrink-0 gap-1.5"
            onClick={() => setLogoutOpen(true)}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-4" />
            লগআউট করুন
          </button>
        </div>
      </SectionCard>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        confirmLabel="লগআউট করুন"
        description="লগআউট করলে পরবর্তীতে অ্যাকাউন্ট ব্যবহারের জন্য আপনার ইমেইল ও পাসওয়ার্ড দিয়ে আবার লগইন করতে হবে।"
        icon={<LogOut aria-hidden="true" className="size-6" />}
        onConfirm={handleLogout}
        onOpenChange={setLogoutOpen}
        open={logoutOpen}
        title="লগআউট করতে চান?"
        tone="danger"
      />

      {/* Clear Cache Confirmation Dialog */}
      <ConfirmDialog
        confirmLabel="ক্যাশ পরিষ্কার করুন"
        description="এটি ব্রাউজারে সংরক্ষিত লোকাল চ্যাট ও ফিল্টার হিস্ট্রি মুছে ফেলবে। আপনার প্রোফাইল বা অ্যাকাউন্ট কোনোভাবে ক্ষতিগ্রস্ত হবে না।"
        icon={<Trash2 aria-hidden="true" className="size-6" />}
        onConfirm={handleClearCache}
        onOpenChange={setClearCacheOpen}
        open={clearCacheOpen}
        title="ক্যাশ ও লোকাল ডেটা মুছবেন?"
        tone="danger"
      />
    </div>
  );
}
