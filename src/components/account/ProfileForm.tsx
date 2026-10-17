"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Camera, Save, Trash2, User, ShieldCheck, Hash, Phone, AlertCircle } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import AvatarDialog from "@/components/account/AvatarDialog";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import FormField from "@/components/blood/FormField";
import { toBn } from "@/lib/format";
import { isValidEmail } from "@/lib/validation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateUserProfile } from "@/features/auth/authSlice";

type Errors = Partial<Record<"first_name" | "last_name" | "email", string>>;

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const { user, loading, error: authError } = useAppSelector((s) => s.auth);

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  // Sync when user loads
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar || null);
    }
  }, [user]);

  const dirty =
    firstName !== (user?.first_name || "") ||
    lastName !== (user?.last_name || "") ||
    email !== (user?.email || "") ||
    bio !== (user?.bio || "") ||
    avatarFile !== null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!firstName.trim()) next.first_name = "নামের প্রথমাংশ লিখুন";
    if (!lastName.trim()) next.last_name = "নামের শেষাংশ লিখুন";
    if (!email.trim()) {
      next.email = "ইমেইল ঠিকানা লিখুন";
    } else if (!isValidEmail(email)) {
      next.email = "সঠিক ইমেইল ঠিকানা দিন";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaveOpen(true);
  };

  const confirmSave = async () => {
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanEmail = email.trim();
    const cleanBio = bio.trim();

    const result = await dispatch(
      updateUserProfile({
        first_name: cleanFirst,
        last_name: cleanLast,
        email: cleanEmail,
        bio: cleanBio,
        avatar: avatarFile,
      })
    );

    if (updateUserProfile.fulfilled.match(result)) {
      setNotice("আপনার প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে।");
      setAvatarFile(null);
    }
  };

  const discard = () => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar || null);
      setAvatarFile(null);
    }
    setErrors({});
  };

  const handleAvatarSave = (url: string | null, file?: File | null) => {
    setAvatarUrl(url);
    setAvatarFile(file || null);
    setNotice(url ? "প্রোফাইল ছবি পরিবর্তন করা হয়েছে। পরিবর্তন সংরক্ষণ করতে 'সংরক্ষণ করুন' চাপুন।" : "প্রোফাইল ছবি সরানো হয়েছে।");
  };

  return (
    <section className="card p-5 sm:p-8">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      {authError && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600" role="alert">
          <AlertCircle className="size-5 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Avatar Header */}
      <div className="flex items-center gap-5">
        <button
          aria-label="প্রোফাইল ছবি পরিবর্তন করুন"
          className="group relative shrink-0 cursor-pointer rounded-full"
          onClick={() => setAvatarOpen(true)}
          type="button"
        >
          <span className="grid size-20 place-items-center overflow-hidden rounded-full bg-primary-soft text-primary-dark sm:size-[104px]">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" className="size-full object-cover" src={avatarUrl} />
            ) : (
              <User aria-hidden="true" className="size-10 sm:size-12" strokeWidth={1.8} />
            )}
          </span>
          <span className="absolute right-0 bottom-0 grid size-8 place-items-center rounded-full border-2 border-white bg-primary text-white transition group-hover:bg-primary-dark">
            <Camera aria-hidden="true" className="size-4" />
          </span>
        </button>
        <div>
          <h2 className="text-lg font-bold text-heading">প্রোফাইল ছবি</h2>
          <p className="mt-0.5 text-[13px] text-slate-500">JPG বা PNG, সর্বোচ্চ ২ এমবি</p>
          {avatarUrl && (
            <button
              className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-red-600 hover:underline"
              onClick={() => setAvatarOpen(true)}
              type="button"
            >
              <Trash2 aria-hidden="true" className="size-3.5" />
              ছবি পরিবর্তন / মুছুন
            </button>
          )}
        </div>
      </div>

      {/* Account Info Badges */}
      <div className="mt-6 flex flex-wrap gap-2.5 border-y border-slate-100 py-3 text-xs text-slate-600">
        {user?.uuid && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
            <Hash className="size-3.5 text-primary" />
            আইডি: {toBn(user.uuid)}
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          ভূমিকা: {user?.role === "admin" ? "অ্যাডমিন" : "সাধারণ ব্যবহারকারী"}
        </span>
        {user?.phone && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
            <Phone className="size-3.5 text-primary" />
            মোবাইল: {toBn(user.phone)}
          </span>
        )}
      </div>

      {/* Form Fields: Only API-supported fields */}
      <form className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2" noValidate onSubmit={submit}>
        <FormField error={errors.first_name} htmlFor="pf-first-name" label="নামের প্রথমাংশ">
          <input
            autoComplete="given-name"
            className="field"
            id="pf-first-name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="আপনার নামের প্রথমাংশ"
            required
            type="text"
            value={firstName}
          />
        </FormField>

        <FormField error={errors.last_name} htmlFor="pf-last-name" label="নামের শেষাংশ">
          <input
            autoComplete="family-name"
            className="field"
            id="pf-last-name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="আপনার নামের শেষাংশ"
            required
            type="text"
            value={lastName}
          />
        </FormField>

        <FormField error={errors.email} htmlFor="pf-email" label="ইমেইল ঠিকানা">
          <input
            autoComplete="email"
            className="field"
            id="pf-email"
            inputMode="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            type="email"
            value={email}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField htmlFor="pf-bio" label="পরিচিতি / বায়ো (ঐচ্ছিক)">
            <textarea
              className="field min-h-24 resize-y py-2.5"
              id="pf-bio"
              onChange={(e) => setBio(e.target.value)}
              placeholder="আপনার সম্পর্কে কিছু লিখুন..."
              rows={3}
              value={bio}
            />
          </FormField>
        </div>

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className="btn-primary h-12 px-7 disabled:opacity-60" disabled={loading} type="submit">
            <Save aria-hidden="true" className="size-4" />
            {loading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </button>
          <button
            className="btn-outline h-12 px-7"
            onClick={() => (dirty ? setDiscardOpen(true) : discard())}
            type="button"
          >
            বাতিল
          </button>
        </div>
      </form>

      <AvatarDialog currentUrl={avatarUrl} onOpenChange={setAvatarOpen} onSave={handleAvatarSave} open={avatarOpen} />

      <ConfirmDialog
        confirmLabel="হ্যাঁ, সংরক্ষণ করুন"
        description="আপনার প্রোফাইলের তথ্য নতুন মান দিয়ে আপডেট করা হবে।"
        icon={<Save aria-hidden="true" className="size-6" />}
        onConfirm={confirmSave}
        onOpenChange={setSaveOpen}
        open={saveOpen}
        title="পরিবর্তন সংরক্ষণ করবেন?"
      />

      <ConfirmDialog
        cancelLabel="সম্পাদনা চালিয়ে যান"
        confirmLabel="পরিবর্তন বাতিল করুন"
        description="আপনি যা পরিবর্তন করেছেন তা সংরক্ষিত হয়নি। বাতিল করলে আগের তথ্য ফিরে আসবে।"
        icon={<Trash2 aria-hidden="true" className="size-6" />}
        onConfirm={discard}
        onOpenChange={setDiscardOpen}
        open={discardOpen}
        title="পরিবর্তন বাতিল করবেন?"
        tone="danger"
      />
    </section>
  );
}
