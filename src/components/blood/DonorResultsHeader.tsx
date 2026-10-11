import { Suspense } from "react";
import { BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { toBn } from "@/lib/format";
import type { BloodGroup, BloodSort } from "@/types/blood";
import DonorSort from "./DonorSort";

type Props = { total: number; group: BloodGroup; sort: BloodSort };

export default function DonorResultsHeader({ total, group, sort }: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[15px] text-slate-600">
        <strong className="text-heading">
          {toBn(total)} জন {BLOOD_GROUP_LABELS[group]} ডোনার
        </strong>{" "}
        পাওয়া গেছে
      </p>
      <Suspense>
        <DonorSort value={sort} />
      </Suspense>
    </div>
  );
}
