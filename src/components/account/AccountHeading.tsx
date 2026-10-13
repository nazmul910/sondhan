export default function AccountHeading({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-5">
      <h1 className="text-[clamp(26px,3.4vw,34px)] font-bold leading-tight tracking-tight text-heading">{title}</h1>
      <p className="mt-1.5 text-[15px] text-slate-500">{description}</p>
    </header>
  );
}
