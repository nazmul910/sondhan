import { Hospital } from "lucide-react";

export default function HospitalThumb({ size = "md" }: { size?: "md" | "lg" | "sm" }) {
  const box = { sm: "size-14", md: "size-24", lg: "size-32" }[size];
  const icon = { sm: "size-7", md: "size-12", lg: "size-16" }[size];
  return (
    <div className={`${box} grid shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary`}>
      <Hospital aria-hidden="true" className={icon} strokeWidth={1.8} />
    </div>
  );
}
