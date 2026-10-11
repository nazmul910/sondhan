import { CircleCheck } from "lucide-react";
import SectionCard from "@/components/shared/SectionCard";
import type { HealthTip } from "@/types/tip";

export default function TipArticleBody({ tip }: { tip: HealthTip }) {
  return (
    <>
      <SectionCard title="মূল কথা">
        <ul className="flex flex-col gap-3">
          {tip.keyPoints.map((point) => (
            <li className="flex items-start gap-3 text-[15px] leading-7 text-slate-700" key={point}>
              <CircleCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="বিস্তারিত">
        <div className="flex flex-col gap-4 text-[15px] leading-8 text-slate-700">
          {tip.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
