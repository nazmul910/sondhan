"use client";

import { useState, type FormEvent } from "react";
import { Camera, Save, Trash2, User } from "lucide-react";
import AccountNotice from "@/components/account/AccountNotice";
import { useAccount } from "@/components/account/AccountProvider";
import AvatarDialog from "@/components/account/AvatarDialog";
import ConfirmDialog from "@/components/account/ConfirmDialog";
import FormField from "@/components/blood/FormField";
import { GENDER_OPTIONS } from "@/data/account";
import { BLOOD_GROUP_KEYS, BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { DIVISIONS } from "@/data/divisions";
import { todayIso } from "@/lib/files";
import { toBn } from "@/lib/format";
import { isValidEmail } from "@/lib/validation";
import type { BloodGroup } from "@/types/blood";
import type { Gender, Profile } from "@/types/account";

type Fields = Omit<Profile, "avatarUrl" | "phone">;
type Errors = Partial<Record<"name" | "email" | "birthDate", string>>;

const toFields = (p: Profile): Fields => ({
  name: p.name,
  email: p.email,
  birthDate: p.birthDate,
  gender: p.gender,
  bloodGroup: p.bloodGroup,
  division: p.division,
  address: p.address,
  isDonor: p.isDonor,
});
const isSame = (a: Fields, b: Fields) => (Object.keys(a) as (keyof Fields)[]).every((key) => a[key] === b[key]);

export default function ProfileForm() {
  const { profile, updateProfile } = useAccount();
  const saved = toFields(profile);

  const [form, setForm] = useState<Fields>(saved);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  const dirty = !isSame(form, saved);
  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!form.name.trim()) next.name = "আপনার নাম লিখুন";
    if (form.email.trim() && !isValidEmail(form.email)) next.email = "সঠিক ইমেইল ঠিকানা দিন";
    if (form.birthDate && form.birthDate > todayIso()) next.birthDate = "জন্ম তারিখ ভবিষ্যতের হতে পারে না";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaveOpen(true);
  };

  const confirmSave = () => {
    // TODO(backend): await dispatch(updateProfile(form)).unwrap()
    const clean: Fields = { ...form, name: form.name.trim(), email: form.email.trim(), address: form.address.trim() };
    updateProfile({ ...profile, ...clean });
    setForm(clean); // keep the form in sync so trimmed text does not look like an unsaved change
    setNotice("আপনার প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে।");
  };

  const discard = () => {
    setForm(saved);
    setErrors({});
  };

  const saveAvatar = (url: string | null) => {
    updateProfile({ ...profile, avatarUrl: url });
    setNotice(url ? "প্রোফাইল ছবি আপডেট হয়েছে।" : "প্রোফাইল ছবি মুছে ফেলা হয়েছে।");
  };

  return (
    <section className="card p-5 sm:p-8">
      {notice && <AccountNotice message={notice} onDismiss={() => setNotice("")} />}

      <div className="flex items-center gap-5">
        <button
          aria-label="প্রোফাইল ছবি পরিবর্তন করুন"
          className="group relative shrink-0 cursor-pointer rounded-full"
          onClick={() => setAvatarOpen(true)}
          type="button"
        >
          <span className="grid size-20 place-items-center overflow-hidden rounded-full bg-primary-soft text-primary-dark sm:size-[104px]">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob/user URL, next/image cannot optimise it
              <img alt="" className="size-full object-cover" src={profile.avatarUrl} />
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
          {profile.avatarUrl && (
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

      <form className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2" noValidate onSubmit={submit}>
        <FormField error={errors.name} htmlFor="pf-name" label="পূর্ণ নাম">
          <input autoComplete="name" className="field" id="pf-name" onChange={(e) => set("name", e.target.value)} placeholder="আপনার নাম" type="text" value={form.name} />
        </FormField>

        <FormField htmlFor="pf-phone" label="মোবাইল নম্বর">
          <input aria-describedby="pf-phone-hint" className="field cursor-not-allowed bg-slate-100 font-semibold text-heading" id="pf-phone" readOnly type="text" value={toBn(`+88${profile.phone}`)} />
          <span className="sr-only" id="pf-phone-hint">
            মোবাইল নম্বর পরিবর্তন করা যায় না
          </span>
        </FormField>

        <FormField error={errors.email} htmlFor="pf-email" label="ইমেইল (ঐচ্ছিক)">
          <input autoComplete="email" className="field" id="pf-email" inputMode="email" onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" type="email" value={form.email} />
        </FormField>

        <FormField error={errors.birthDate} htmlFor="pf-birth" label="জন্ম তারিখ">
          <input autoComplete="bday" className="field" id="pf-birth" onChange={(e) => set("birthDate", e.target.value)} type="date" value={form.birthDate} />
        </FormField>

        <FormField htmlFor="pf-gender" label="লিঙ্গ">
          <select className="field font-semibold" id="pf-gender" onChange={(e) => set("gender", e.target.value as Gender)} value={form.gender}>
            {GENDER_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField htmlFor="pf-blood" label="রক্তের গ্রুপ">
          <select className="field font-semibold" id="pf-blood" onChange={(e) => set("bloodGroup", e.target.value as BloodGroup)} value={form.bloodGroup}>
            {BLOOD_GROUP_KEYS.map((key) => (
              <option key={key} value={key}>
                {BLOOD_GROUP_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField htmlFor="pf-division" label="বিভাগ">
          <select className="field font-semibold" id="pf-division" onChange={(e) => set("division", e.target.value)} value={form.division}>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </FormField>

        <FormField htmlFor="pf-address" label="এলাকা / ঠিকানা">
          <input autoComplete="street-address" className="field" id="pf-address" onChange={(e) => set("address", e.target.value)} placeholder="ঠিকানা লিখুন" type="text" value={form.address} />
        </FormField>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 sm:col-span-2">
          <input checked={form.isDonor} className="field-check" onChange={(e) => set("isDonor", e.target.checked)} type="checkbox" />
          আমি রক্তদাতা হিসেবে যুক্ত থাকতে চাই
        </label>

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className="btn-primary h-12 px-7" type="submit">
            <Save aria-hidden="true" className="size-4" />
            সংরক্ষণ করুন
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

      <AvatarDialog currentUrl={profile.avatarUrl} onOpenChange={setAvatarOpen} onSave={saveAvatar} open={avatarOpen} />

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
