import { Suspense } from "react";
import { toBn } from "@/lib/format";
import SortSelect from "./SortSelect";

type Props = { total: number; unit: string; sort: string };

export default function ResultsHeader({ total, unit, sort }: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[15px] text-slate-600">
        <strong className="text-heading">
          {toBn(total)} {unit}
        </strong>{" "}
        পাওয়া গেছে
      </p>
      <Suspense>
        <SortSelect value={sort} />
      </Suspense>
    </div>
  );
}
