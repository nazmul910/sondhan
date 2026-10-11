import type { ReactNode } from "react";

export default function SectionCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <h2 className="section-title mb-4">{title}</h2>
      {children}
    </section>
  );
}
