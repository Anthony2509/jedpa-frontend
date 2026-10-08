import type { ReactNode } from "react";

interface RowSummaryProps {
  title: ReactNode;
  /** Main context, readable but secondary (e.g. "Deportista · M1-AJD-A-D"). */
  subtitle?: ReactNode;
  /** Faint reference data (e.g. the ID number). */
  note?: ReactNode;
  /** What matters about this row right now: chips, a status, a progress bar. */
  children?: ReactNode;
}

/** Phone card content: three text levels at most, then the highlighted bit with room to breathe. */
export function RowSummary({ title, subtitle, note, children }: RowSummaryProps) {
  return (
    <div className="min-w-0">
      <p className="pr-6 text-[15px] font-semibold leading-snug text-neutral-950">{title}</p>
      {subtitle && <p className="mt-0.5 text-[13px] leading-snug text-neutral-600">{subtitle}</p>}
      {note && <p className="mt-0.5 text-xs leading-snug text-neutral-400">{note}</p>}
      {children && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}
