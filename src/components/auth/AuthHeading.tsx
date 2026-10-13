export default function AuthHeading({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h1 className="text-[25px] font-bold leading-tight text-[#477f82]">{title}</h1>
      <p className="mt-2 text-[13px] leading-6 text-[#929292]">{text}</p>
    </div>
  );
}
