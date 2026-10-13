import Link from "next/link";
import { toBn } from "@/lib/format";
import type { LegalSection } from "@/types/legal";

export default function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section, i) => (
        <section className="scroll-mt-24" id={section.id} key={section.id}>
          <h2 className="mb-2.5 text-xl font-bold text-heading">
            {toBn(i + 1)}. {section.title}
          </h2>
          {section.paragraphs?.map((p) => (
            <p className="mb-2.5 text-[15px] leading-8 text-slate-600" key={p}>
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-7 text-slate-600 marker:text-primary">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.cta && (
            <Link className="btn-outline mt-3" href={section.cta.href}>
              {section.cta.label}
            </Link>
          )}
        </section>
      ))}
    </div>
  );
}
