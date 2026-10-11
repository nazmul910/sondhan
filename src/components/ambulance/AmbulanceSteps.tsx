const steps = [
  { title: "অ্যাম্বুলেন্সের ধরন বেছে নিন", text: "নরমাল, এসি, আইসিইউ বা ফ্রিজিং।" },
  { title: "কাছের সার্ভিসে কল করুন", text: "তালিকা থেকে সরাসরি কল বাটন চাপুন।" },
  { title: "অবস্থান জানান", text: "রোগীর ঠিকানা ও গন্তব্য হাসপাতাল বলুন।" },
];

export default function AmbulanceSteps() {
  return (
    <section className="mt-11 rounded-2xl bg-slate-50 p-7">
      <h2 className="section-title mb-4">কীভাবে অ্যাম্বুলেন্স ডাকবেন</h2>
      <ol className="flex flex-wrap gap-6">
        {steps.map((s, i) => (
          <li className="flex flex-1 basis-60 gap-3.5" key={s.title}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{"১২৩"[i]}</span>
            <div>
              <strong className="mb-1 block text-base text-heading">{s.title}</strong>
              <span className="text-sm leading-7 text-slate-600">{s.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
