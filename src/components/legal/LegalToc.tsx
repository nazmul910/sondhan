import { toBn } from "@/lib/format";
import type { LegalSection } from "@/types/legal";

/** Plain anchor links, so it works without any client JS. */
export default function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="সূচিপত্র" className="card mb-5 p-5 lg:sticky lg:top-24 lg:mb-0 lg:w-[270px] lg:shrink-0">
      <strong className="text-[15px] text-heading">সূচিপত্র</strong>
      <ol className="mt-3 flex flex-col gap-2.5">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a className="text-sm text-slate-600 transition hover:text-primary-dark" href={`#${section.id}`}>
              {toBn(i + 1)}. {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
