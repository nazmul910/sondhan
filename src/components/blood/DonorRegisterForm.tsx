"use client";

import { useState, type FormEvent } from "react";
import { BLOOD_AREAS, BLOOD_GROUP_KEYS, BLOOD_GROUP_LABELS, DEFAULT_BLOOD_GROUP, LAST_DONATION_OPTIONS } from "@/data/bloodOptions";
import { isValidBdPhone } from "@/lib/phone";
import type { BloodGroup } from "@/types/blood";
import FormField from "./FormField";

type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

/** Frontend only for now: `submit` is where the Redux thunk / API call goes later. */
export default function DonorRegisterForm() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState<BloodGroup>(DEFAULT_BLOOD_GROUP);
  const [area, setArea] = useState(BLOOD_AREAS[0]);
  const [phone, setPhone] = useState("");
  const [lastDonation, setLastDonation] = useState<string>("never");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "আপনার নাম লিখুন";
    if (!isValidBdPhone(phone)) next.phone = "সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)";
    if (!consent) next.consent = "চালিয়ে যেতে সম্মতি দিন";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO(backend): dispatch(registerDonor({ name, group, area, phone, lastDonation }))
    setDone(true);
  };

  if (done) {
    return (
      <section className="card flex flex-col items-center gap-2 px-6 py-14 text-center" role="status">
        <h2 className="text-xl font-bold text-heading">ধন্যবাদ, আপনি এখন একজন ডোনার!</h2>
        <p className="max-w-sm text-sm leading-7 text-slate-600">প্রয়োজনে রক্তপ্রার্থীরা আপনার সাথে যোগাযোগ করবেন। আপনার একটি রক্তদান একটি জীবন বাঁচাতে পারে।</p>
      </section>
    );
  }

  return (
    <form className="card flex flex-col gap-4 p-5 sm:p-6" noValidate onSubmit={submit}>
      <div>
        <h2 className="section-title">ডোনার হিসেবে যুক্ত হোন</h2>
        <p className="mt-1 text-[13px] text-slate-500">আপনার তথ্য দিন, প্রয়োজনে মানুষ আপনার সাথে যোগাযোগ করবে।</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField error={errors.name} htmlFor="don-name" label="আপনার নাম">
          <input className="field" id="don-name" onChange={(e) => setName(e.target.value)} placeholder="পুরো নাম লিখুন" type="text" value={name} />
        </FormField>

        <FormField error={errors.phone} htmlFor="don-phone" label="মোবাইল নম্বর">
          <input className="field" id="don-phone" inputMode="tel" onChange={(e) => setPhone(e.target.value)} placeholder="০১XXX-XXXXXX" type="tel" value={phone} />
        </FormField>

        <FormField htmlFor="don-group" label="রক্তের গ্রুপ">
          <select className="field" id="don-group" onChange={(e) => setGroup(e.target.value as BloodGroup)} value={group}>
            {BLOOD_GROUP_KEYS.map((key) => (
              <option key={key} value={key}>
                {BLOOD_GROUP_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField htmlFor="don-area" label="এলাকা">
          <select className="field" id="don-area" onChange={(e) => setArea(e.target.value)} value={area}>
            {BLOOD_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField htmlFor="don-last" label="শেষ রক্তদান">
        <select className="field" id="don-last" onChange={(e) => setLastDonation(e.target.value)} value={lastDonation}>
          {LAST_DONATION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
          <input checked={consent} className="field-check mt-1" onChange={(e) => setConsent(e.target.checked)} type="checkbox" />
          রক্তপ্রার্থীদের সাথে আমার মোবাইল নম্বর শেয়ার করতে আমি সম্মত।
        </label>
        {errors.consent && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <button className="btn-blood h-11 sm:w-fit sm:min-w-56" type="submit">
        ডোনার হিসেবে যুক্ত হোন
      </button>
    </form>
  );
}
