import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="text-[13px] text-slate-500">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, i) => (
          <li className="flex items-center gap-2" key={item.label}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link className="hover:text-primary-dark" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-primary-dark">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
