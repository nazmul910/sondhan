"use client";

import { useState, type FormEvent } from "react";
import { BLOOD_GROUP_KEYS, BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { isValidBdPhone } from "@/lib/phone";
import type { BloodGroup } from "@/types/blood";
import FormField from "./FormField";

type Errors = Partial<Record<"patient" | "hospital" | "phone", string>>;

/** Frontend only for now: `submit` is where the Redux thunk / API call goes later. */
export default function BloodRequestForm({ defaultGroup }: { defaultGroup: BloodGroup }) {
  const [patient, setPatient] = useState("");
  const [group, setGroup] = useState<BloodGroup>(defaultGroup);
  const [hospital, setHospital] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!patient.trim()) next.patient = "রোগীর নাম লিখুন";
    if (!hospital.trim()) next.hospital = "হাসপাতালের নাম লিখুন";
    if (!isValidBdPhone(phone)) next.phone = "সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO(backend): dispatch(createBloodRequest({ patient, group, hospital, phone }))
    setSent(true);
    setPatient("");
    setHospital("");
    setPhone("");
  };

  return (
    <form className="card flex flex-col gap-4 p-5 sm:p-6" noValidate onSubmit={submit}>
      <div>
        <h2 className="text-xl font-bold text-heading">রক্তের জন্য অনুরোধ</h2>
        <p className="mt-1 text-[13px] text-slate-500">জরুরি প্রয়োজনে ফর্মটি পূরণ করুন।</p>
      </div>

      <FormField error={errors.patient} htmlFor="req-patient" label="রোগীর নাম">
        <input className="field" id="req-patient" onChange={(e) => setPatient(e.target.value)} placeholder="রোগীর নাম লিখুন" type="text" value={patient} />
      </FormField>

      <FormField htmlFor="req-group" label="রক্তের গ্রুপ">
        <select className="field" id="req-group" onChange={(e) => setGroup(e.target.value as BloodGroup)} value={group}>
          {BLOOD_GROUP_KEYS.map((key) => (
            <option key={key} value={key}>
              {BLOOD_GROUP_LABELS[key]}
            </option>
          ))}
        </select>
      </FormField>

      <FormField error={errors.hospital} htmlFor="req-hospital" label="হাসপাতাল">
        <input className="field" id="req-hospital" onChange={(e) => setHospital(e.target.value)} placeholder="হাসপাতালের নাম" type="text" value={hospital} />
      </FormField>

      <FormField error={errors.phone} htmlFor="req-phone" label="যোগাযোগের নম্বর">
        <input className="field" id="req-phone" inputMode="tel" onChange={(e) => setPhone(e.target.value)} placeholder="০১XXX-XXXXXX" type="tel" value={phone} />
      </FormField>

      <button className="btn-blood h-11" type="submit">
        অনুরোধ পাঠান
      </button>

      {sent && (
        <p className="rounded-lg bg-emerald-50 px-3.5 py-2.5 text-[13px] font-medium text-emerald-700" role="status">
          আপনার অনুরোধ গ্রহণ করা হয়েছে। উপযুক্ত ডোনাররা শীঘ্রই যোগাযোগ করবেন।
        </p>
      )}
    </form>
  );
}
