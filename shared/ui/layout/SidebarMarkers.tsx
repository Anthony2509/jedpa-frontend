import { cn } from "@/shared/lib/cn";

interface StepNumberProps {
  step: number;
  active: boolean;
}

export function StepNumber({ step, active }: StepNumberProps) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
        active ? "bg-brand text-white" : "bg-neutral-200 text-neutral-700",
      )}
    >
      {step}
    </span>
  );
}

interface CountBadgeProps {
  count: number;
}

export function CountBadge({ count }: CountBadgeProps) {
  return <span className="min-w-4 text-right text-xs font-medium tabular-nums text-neutral-500">{count}</span>;
}
