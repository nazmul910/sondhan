import { Phone } from "lucide-react";

type Props = {
  phone: string | null;
  label: string;
  variant?: "primary" | "outline" | "danger";
  className?: string;
};

const styles = { primary: "btn-primary", outline: "btn-outline", danger: "btn-danger" };

/** tel: link. When the number is not known yet it renders a disabled button instead of a dead link. */
export default function CallButton({ phone, label, variant = "primary", className = "" }: Props) {
  const content = (
    <>
      <Phone aria-hidden="true" className="size-4" />
      {label}
    </>
  );

  if (!phone) {
    return (
      <span aria-disabled="true" className={`${styles[variant]} cursor-not-allowed opacity-50 ${className}`} title="ফোন নম্বর শীঘ্রই যোগ হবে">
        {content}
      </span>
    );
  }
  return (
    <a className={`${styles[variant]} ${className}`} href={`tel:${phone}`}>
      {content}
    </a>
  );
}
