import Link from "next/link";
import { toBn } from "@/lib/format";
import { buildQuery, type RawSearchParams } from "@/lib/query";

type Props = { basePath: string; page: number; pageCount: number; params: RawSearchParams };

export default function Pagination({ basePath, page, pageCount, params }: Props) {
  if (pageCount <= 1) return null;

  const href = (p: number) => `${basePath}${buildQuery(params, { page: p === 1 ? null : String(p) })}`;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="পেজ নেভিগেশন" className="mt-8 flex flex-wrap justify-center gap-2">
      {pages.map((p) =>
        p === page ? (
          <span aria-current="page" className="page-btn bg-primary font-bold text-white" key={p}>
            {toBn(p)}
          </span>
        ) : (
          <Link className="page-btn border border-slate-200 bg-white text-slate-700 hover:border-primary" href={href(p)} key={p}>
            {toBn(p)}
          </Link>
        ),
      )}
      {page < pageCount && (
        <Link className="page-btn border border-slate-200 bg-white px-4 font-semibold text-primary-dark" href={href(page + 1)}>
          পরের পেজ
        </Link>
      )}
    </nav>
  );
}
