"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import FormField from "@/components/blood/FormField";
import { BLOOD_GROUP_KEYS, BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { DIVISIONS } from "@/data/divisions";
import { toBn } from "@/lib/format";
import { isValidBdPhone, normalizePhone } from "@/lib/phone";
import AuthHeading from "./AuthHeading";
import AuthSuccess from "./AuthSuccess";
import OtpStep from "./OtpStep";
import PhoneInput from "./PhoneInput";

type Step = "form" | "otp" | "done";
type Errors = Partial<Record<"name" | "phone" | "terms", string>>;

/** Frontend only. The TODO(backend) lines are where the Redux thunks go later. */
export default function RegisterForm() {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [isDonor, setIsDonor] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "আপনার নাম লিখুন";
    if (!isValidBdPhone(phone)) next.phone = "সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)";
    if (!terms) next.terms = "চালিয়ে যেতে শর্তে সম্মতি দিন";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO(backend): dispatch(sendOtp({ phone: normalizePhone(phone) }))
    setStep("otp");
  };

  if (step === "done") {
    // TODO(backend): dispatch(registerUser({ name, phone, division, bloodGroup, isDonor, code }))
    return <AuthSuccess cta="লগইন করুন" href="/login" text="আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন লগইন করে সেবা নিন।" title="রেজিস্ট্রেশন সফল হয়েছে" />;
  }

  if (step === "otp") {
    return <OtpStep onBack={() => setStep("form")} onVerify={() => setStep("done")} phone={`+৮৮${toBn(normalizePhone(phone))}`} submitLabel="যাচাই করে অ্যাকাউন্ট খুলুন" />;
  }

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={submit}>
      <AuthHeading text="কয়েকটি তথ্য দিয়ে অ্যাকাউন্ট খুলুন।" title="রেজিস্ট্রেশন" />

      <FormField error={errors.name} htmlFor="reg-name" label="পূর্ণ নাম">
        <input autoComplete="name" className="field" id="reg-name" onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম লিখুন" type="text" value={name} />
      </FormField>

      <PhoneInput error={errors.phone} id="reg-phone" onChange={setPhone} value={phone} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField htmlFor="reg-division" label="বিভাগ">
          <select className="field" id="reg-division" onChange={(e) => setDivision(e.target.value)} value={division}>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </FormField>

        <FormField htmlFor="reg-group" label="রক্তের গ্রুপ">
          <select className="field" id="reg-group" onChange={(e) => setBloodGroup(e.target.value)} value={bloodGroup}>
            <option value="">জানি না</option>
            {BLOOD_GROUP_KEYS.map((key) => (
              <option key={key} value={key}>
                {BLOOD_GROUP_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <label className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
        <input checked={isDonor} className="field-check mt-1" onChange={(e) => setIsDonor(e.target.checked)} type="checkbox" />
        আমি রক্তদাতা হিসেবে যুক্ত হতে চাই
      </label>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
          <input checked={terms} className="field-check mt-1" onChange={(e) => setTerms(e.target.checked)} type="checkbox" />
          <span>
            আমি{" "}
            <Link className="font-bold text-primary-dark" href="/privacy">
              গোপনীয়তা নীতি
            </Link>{" "}
            ও শর্তাবলী মেনে নিচ্ছি
          </span>
        </label>
        {errors.terms && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.terms}
          </p>
        )}
      </div>

      <button className="btn-primary h-11 w-full" type="submit">
        অ্যাকাউন্ট খুলুন
      </button>

      <p className="text-center text-sm text-slate-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link className="font-bold text-primary-dark" href="/login">
          লগইন করুন
        </Link>
      </p>
    </form>
  );
}
