import { Clock3, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { CONTACT_ITEMS, type ContactItem } from "@/data/contact";

const icons: Record<ContactItem["key"], LucideIcon> = { phone: Phone, email: Mail, address: MapPin, hours: Clock3 };

export default function ContactInfo() {
  return (
    <ul className="flex flex-col gap-3.5">
      {CONTACT_ITEMS.map(({ key, label, value, href }) => {
        const Icon = icons[key];
        return (
          <li className="card flex items-center gap-3.5 p-4" key={key}>
            <span className="grid size-[46px] shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-dark">
              <Icon aria-hidden="true" className="size-[22px]" />
            </span>
            <div className="min-w-0">
              <span className="block text-xs text-slate-500">{label}</span>
              {href ? (
                <a className="break-words text-[15px] font-bold text-heading hover:text-primary-dark" href={href}>
                  {value}
                </a>
              ) : (
                <strong className="break-words text-[15px] text-heading">{value}</strong>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
