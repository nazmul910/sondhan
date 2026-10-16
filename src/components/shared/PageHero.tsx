import type { ReactNode } from "react";
import Breadcrumb, { type Crumb } from "./Breadcrumb";

type Props = {
  crumbs: Crumb[];
  title: string;
  accent: string;
  description: string;
  /** Search box, chips… anything shown under the text. */
  children?: ReactNode;
};

/** Hero for inner pages (doctors, hospitals, blood bank…). Home keeps its own HeroSection. */
export default function PageHero({ crumbs, title, accent, description, children }: Props) {
  return (
    <section className="hero-gradient">
      <div className="page-container py-8 sm:py-20">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-3 text-[clamp(30px,4vw,44px)] font-bold leading-[1.25] tracking-tight text-heading">
          {title} <span className="text-primary">{accent}</span>
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-7 text-slate-600">{description}</p>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}
