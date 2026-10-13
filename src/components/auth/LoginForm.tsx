"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { isValidBdPhone, normalizePhone } from "@/lib/phone";
import { toBn } from "@/lib/format";
import AuthHeading from "./AuthHeading";
import AuthSuccess from "./AuthSuccess";
import GoogleButton from "./GoogleButton";
import OtpStep from "./OtpStep";
import PhoneInput from "./PhoneInput";
import OrDivider from "./OrDivider";


type Step = "phone" | "otp" | "done";

/** Frontend only. The TODO(backend) lines are where the Redux thunks go later. */
export default function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>();

  const sendOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidBdPhone(phone)) {
      setError("সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)");
      return;
    }
    setError(undefined);
    // TODO(backend): dispatch(sendOtp({ phone: normalizePhone(phone) }))
    setStep("otp");
  };

  if (step === "done") {
    // TODO(backend): store the session/token, then router.push(next ?? "/")
    return <AuthSuccess cta="হোমে যান" href="/" text="আপনার অ্যাকাউন্টে সফলভাবে প্রবেশ করেছেন।" title="লগইন সফল হয়েছে" />;
  }

  if (step === "otp") {
    return (
      <OtpStep
        onBack={() => setStep("phone")}
        onVerify={() => {
          // TODO(backend): dispatch(verifyOtp({ phone: normalizePhone(phone), code }))
          setStep("done");
        }}
        phone={`+৮৮${toBn(normalizePhone(phone))}`}
        submitLabel="যাচাই করে লগইন করুন"
      />
    );
  }

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={sendOtp}>
      <AuthHeading text="আপনার মোবাইল নম্বরে একটি OTP পাঠানো হবে।" title="লগইন" />
      <PhoneInput error={error} id="login-phone" onChange={setPhone} value={phone} />
      <button className="btn-primary h-11 w-full" type="submit">
        OTP পাঠান
      </button>
      <OrDivider />
      <GoogleButton />
      <p className="text-center text-sm text-slate-600">
        নতুন ব্যবহারকারী?{" "}
        <Link className="font-bold text-primary-dark" href="/register">
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </form>
  );
}
