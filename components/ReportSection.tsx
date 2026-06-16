import type { ReactNode } from "react";

interface ReportSectionProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

export function ReportSection({ title, eyebrow, children }: ReportSectionProps) {
  return (
    <section className="premium-card glass-panel rounded-soft p-5">
      {eyebrow ? <p className="text-xs font-semibold uppercase text-sage">{eyebrow}</p> : null}
      <h2 className="font-serif-display mt-1 text-3xl font-semibold tracking-normal text-plum">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
