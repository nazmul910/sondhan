export default function AuthHeading({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h1 className="text-[28px] font-bold leading-tight text-heading sm:text-3xl">{title}</h1>
      <p className="mt-1.5 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
