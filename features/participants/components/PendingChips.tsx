import { cn } from "@/shared/lib/cn";
import type { PendingSummary } from "../types";

interface PendingChipsProps {
  pending: PendingSummary;
}

// Square chips name documents; round badges stay reserved for statuses.
// Brand red marks what blocks the participant; routine work stays black on white.
const CHIP_CLASSES: Record<PendingSummary["tone"], string> = {
  observed: "border-brand bg-brand text-white",
  missing: "border-dashed border-brand/50 bg-white text-brand",
  review: "border-neutral-300 bg-white text-neutral-900",
  neutral: "border-neutral-200 bg-neutral-50 text-neutral-800",
};

export function PendingChips({ pending }: PendingChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {pending.lead && (
        <span className={cn("mr-0.5 text-xs", pending.tone === "observed" || pending.tone === "missing" ? "font-medium text-brand" : "text-neutral-500")}>
          {pending.lead}
        </span>
      )}
      {pending.items.map((item) => (
        <span key={item} className={cn("rounded-md border px-2 py-0.5 text-xs font-medium", CHIP_CLASSES[pending.tone])}>
          {item}
        </span>
      ))}
      {pending.code && <span className="font-mono text-[13px] font-medium tracking-tight text-neutral-950">{pending.code}</span>}
    </div>
  );
}
