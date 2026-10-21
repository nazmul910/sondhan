import Link from "next/link";
import { toBn } from "@/lib/format";
import { buildQuery, type RawSearchParams } from "@/lib/query";

type Props = {
  basePath: string;
  page: number;
  pageCount: number;
  params: RawSearchParams;
  pageParam?: string;
};

export default function Pagination({
  basePath,
  page,
  pageCount,
  params,
  pageParam = "page",
}: Props) {
  if (pageCount <= 1) return null;

  const href = (p: number) =>
    `${basePath}${buildQuery(params, { [pageParam]: p === 1 ? null : String(p) })}`;
  const windowSize = 5;
  const startPage = Math.max(1, Math.min(page - Math.floor(windowSize / 2), pageCount - windowSize + 1));
  const endPage = Math.min(pageCount, startPage + windowSize - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav aria-label="পেজ নেভিগেশন" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <>
          {/* <Link aria-label="প্রথম পেজ" className="page-btn border border-slate-200 bg-white text-slate-700 hover:border-primary" href={href(1)}>
            প্রথম
          </Link> */}
          <Link aria-label="আগের পেজ" className="page-btn border border-slate-200 bg-white px-4 font-semibold text-primary-dark" href={href(page - 1)}>
            আগের
          </Link>
        </>
      )}
      {startPage > 1 && <span aria-hidden="true" className="px-1 text-slate-400">…</span>}
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
      {endPage < pageCount && <span aria-hidden="true" className="px-1 text-slate-400">…</span>}
      {page < pageCount && (
        <>
          <Link aria-label="পরের পেজ" className="page-btn border border-slate-200 bg-white px-4 font-semibold text-primary-dark" href={href(page + 1)} key="next">
          পরের পেজ
          </Link>
          {/* <Link aria-label="শেষ পেজ" className="page-btn border border-slate-200 bg-white text-slate-700 hover:border-primary" href={href(pageCount)} key="last">
            শেষ
          </Link> */}
        </>
      )}
    </nav>
  );
}
