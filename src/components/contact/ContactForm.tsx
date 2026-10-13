"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import FormField from "@/components/blood/FormField";
import { CONTACT_SUBJECTS, MESSAGE_MIN_LENGTH } from "@/data/contact";
import { toBn } from "@/lib/format";
import { isValidBdPhone } from "@/lib/phone";
import { isValidEmail } from "@/lib/validation";

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

/** Frontend only for now: `submit` is where the Redux thunk / API call goes later. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState<string>(CONTACT_SUBJECTS[0].value);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "আপনার নাম লিখুন";
    if (!isValidBdPhone(contact) && !isValidEmail(contact)) next.contact = "সঠিক মোবাইল নম্বর বা ইমেইল দিন";
    if (message.trim().length < MESSAGE_MIN_LENGTH) next.message = `বার্তা কমপক্ষে ${toBn(MESSAGE_MIN_LENGTH)} অক্ষরের হতে হবে`;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO(backend): dispatch(sendContactMessage({ name, contact, subject, message }))
    setSent(true);
  };

  const reset = () => {
    setName("");
    setContact("");
    setSubject(CONTACT_SUBJECTS[0].value);
    setMessage("");
    setSent(false);
  };

  if (sent) {
    return (
      <section className="card flex flex-col items-center gap-2 px-6 py-14 text-center" role="status">
        <CheckCircle2 aria-hidden="true" className="size-12 text-primary" strokeWidth={1.8} />
        <h2 className="text-xl font-bold text-heading">ধন্যবাদ, বার্তা পাঠানো হয়েছে</h2>
        <p className="max-w-sm text-sm leading-7 text-slate-600">আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
        <button className="btn-outline mt-3 h-11" onClick={reset} type="button">
          আরেকটি বার্তা পাঠান
        </button>
      </section>
    );
  }

  return (
    <form className="card flex flex-col gap-4 p-5 sm:p-7" noValidate onSubmit={submit}>
      <h2 className="section-title">বার্তা পাঠান</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField error={errors.name} htmlFor="contact-name" label="আপনার নাম">
          <input autoComplete="name" className="field" id="contact-name" onChange={(e) => setName(e.target.value)} placeholder="নাম লিখুন" type="text" value={name} />
        </FormField>

        <FormField error={errors.contact} htmlFor="contact-contact" label="মোবাইল / ইমেইল">
          <input autoComplete="email" className="field" id="contact-contact" onChange={(e) => setContact(e.target.value)} placeholder="যোগাযোগের মাধ্যম" type="text" value={contact} />
        </FormField>
      </div>

      <FormField htmlFor="contact-subject" label="বিষয়">
        <select className="field" id="contact-subject" onChange={(e) => setSubject(e.target.value)} value={subject}>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField error={errors.message} htmlFor="contact-message" label="বার্তা">
        <textarea className="field h-auto min-h-36 resize-y py-3 leading-7" id="contact-message" onChange={(e) => setMessage(e.target.value)} placeholder="আপনার বার্তা লিখুন..." rows={6} value={message} />
      </FormField>

      <button className="btn-primary h-11 sm:w-fit sm:min-w-44" type="submit">
        পাঠিয়ে দিন
      </button>
    </form>
  );
}
