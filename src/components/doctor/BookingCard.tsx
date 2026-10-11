"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { formatFee } from "@/lib/format";

type Props = { doctorId: string; fee: number | null; slots: string[] };

export default function BookingCard({ doctorId, fee, slots }: Props) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = () => {
    if (date < new Date().toISOString().slice(0, 10)) {
      setError("অতীতের তারিখ বেছে নেওয়া যাবে না।");
      return;
    }
    setError(null);
    // TODO: if the user is a guest -> router.push(`/login?next=/doctors/${doctorId}`)
    // TODO: POST /api/appointments { doctorId, date, slot }
    setRequested(true);
  };

  return (
    <div className="card p-5" id="booking">
      <strong className="text-lg text-heading">অ্যাপয়েন্টমেন্ট বুক করুন</strong>
      <p className="mt-1.5 text-[13px] text-slate-500">কনসালটেশন ফি: {formatFee(fee)}</p>

      <label className="mt-4 flex flex-col gap-1.5 text-[13px] font-semibold text-slate-700">
        তারিখ
        <input
          className="field"
          onChange={(e) => setDate(e.target.value)}
          type="date"
          value={date}
        />
      </label>

      <fieldset className="mt-4">
        <legend className="text-[13px] font-semibold text-heading">সময় বেছে নিন</legend>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {slots.map((s) => (
            <button
              aria-pressed={slot === s}
              className={slot === s ? "chip chip-active justify-center rounded-lg" : "chip justify-center rounded-lg"}
              key={s}
              onClick={() => setSlot(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <button className="btn-primary mt-5 w-full min-h-11 disabled:cursor-not-allowed disabled:opacity-50" disabled={!date || !slot} onClick={confirm} type="button">
        কনফার্ম করুন
      </button>

      {error && (
        <p className="mt-3 text-center text-[13px] font-semibold text-red-700" role="alert">
          {error}
        </p>
      )}
      {requested ? (
        <p className="mt-3 text-center text-[13px] font-semibold text-primary-dark" role="status">
          অনুরোধ গ্রহণ করা হয়েছে (ডেমো)
        </p>
      ) : (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Lock aria-hidden="true" className="size-3.5" />
          বুক করতে লগইন করতে হবে
        </p>
      )}
    </div>
  );
}
