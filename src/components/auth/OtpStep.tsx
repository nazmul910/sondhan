"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { toBn } from "@/lib/format";
import { toEnglishDigits } from "@/lib/phone";
import AuthHeading from "./AuthHeading";

const LENGTH = 6;
const RESEND_SECONDS = 30;

type Props = {
  /** Phone number shown in the text, already formatted. */
  phone: string;
  submitLabel: string;
  onVerify: (code: string) => void;
  onBack: () => void;
};

/** 6-box OTP entry shared by login and register. Frontend only: any 6 digits are accepted. */
export default function OtpStep({ phone, submitLabel, onVerify, onBack }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => inputs.current[0]?.focus(), []);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const setDigit = (index: number, value: string) => {
    const digit = toEnglishDigits(value).replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((d, i) => (i === index ? digit : d)));
    if (digit && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = toEnglishDigits(event.clipboardData.getData("text")).replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    event.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => pasted[i] ?? ""));
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const resend = () => {
    // TODO(backend): dispatch(sendOtp({ phone }))
    setDigits(Array(LENGTH).fill(""));
    setError(null);
    setSeconds(RESEND_SECONDS);
    inputs.current[0]?.focus();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = digits.join("");
    if (code.length < LENGTH) {
      setError(`${toBn(LENGTH)} সংখ্যার কোডটি পুরোটা দিন`);
      return;
    }
    setError(null);
    onVerify(code);
  };

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={submit}>
      <button className="flex w-fit cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-primary-dark" onClick={onBack} type="button">
        <ArrowLeft aria-hidden="true" className="size-4" />
        নম্বর পরিবর্তন করুন
      </button>

      <AuthHeading text={`${phone} নম্বরে পাঠানো ${toBn(LENGTH)} সংখ্যার কোডটি দিন।`} title="OTP যাচাই করুন" />

      <div aria-label="OTP কোড" className="flex gap-2 sm:gap-3" role="group">
        {digits.map((digit, i) => (
          <input
            aria-label={`${toBn(i + 1)} নম্বর সংখ্যা`}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            className="field h-12 min-w-0 flex-1 px-0 text-center text-xl font-bold sm:h-14"
            inputMode="numeric"
            key={i}
            maxLength={1}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            value={digit}
          />
        ))}
      </div>
      {error && (
        <p className="-mt-2 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <button className="btn-primary h-11 w-full" type="submit">
        {submitLabel}
      </button>

      <p className="text-center text-sm text-slate-500">
        কোড পাননি?{" "}
        {seconds > 0 ? (
          <span>{toBn(seconds)} সেকেন্ড পর আবার পাঠাতে পারবেন</span>
        ) : (
          <button className="cursor-pointer font-bold text-primary-dark" onClick={resend} type="button">
            আবার পাঠান
          </button>
        )}
      </p>
    </form>
  );
}
