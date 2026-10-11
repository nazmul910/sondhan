import Link from "next/link";
import { BLOOD_GROUP_KEYS, BLOOD_GROUP_LABELS } from "@/data/bloodOptions";
import { buildQuery, type RawSearchParams } from "@/lib/query";
import type { BloodGroup } from "@/types/blood";

type Props = { current: BloodGroup; params: RawSearchParams };

/** Blood group buttons built from plain links: the group lives in the URL (?group=o-pos). */
export default function BloodGroupPicker({ current, params }: Props) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-bold text-heading" id="blood-group-label">
        রক্তের গ্রুপ
      </p>
      <ul aria-labelledby="blood-group-label" className="flex flex-wrap gap-2.5">
        {BLOOD_GROUP_KEYS.map((key) => {
          const active = key === current;
          return (
            <li key={key}>
              <Link
                aria-current={active ? "true" : undefined}
                className={`grid h-[50px] min-w-[58px] place-items-center rounded-xl border px-3 text-[17px] font-bold transition ${
                  active ? "border-blood bg-blood text-white shadow-md shadow-blood/25" : "border-pink-200 bg-white text-blood hover:border-blood"
                }`}
                href={`/blood-bank${buildQuery(params, { group: key, page: null })}`}
                scroll={false}
              >
                {BLOOD_GROUP_LABELS[key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
