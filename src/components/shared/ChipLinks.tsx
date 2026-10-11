import Link from "next/link";
import { buildQuery, type RawSearchParams } from "@/lib/query";

type Props = {
  basePath: string;
  param: string;
  options: readonly { value: string; label: string }[];
  current: string | null;
  params: RawSearchParams;
};

export default function ChipLinks({ basePath, param, options, current, params }: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = (current ?? "") === o.value;
        return (
          <li key={o.value}>
            <Link
              aria-current={active ? "true" : undefined}
              className={active ? "chip chip-active" : "chip"}
              href={`${basePath}${buildQuery(params, { [param]: o.value || null, page: null })}`}
              scroll={false}
            >
              {o.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
