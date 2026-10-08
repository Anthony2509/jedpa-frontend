import { cn } from "@/shared/lib/cn";

interface ProgressBarProps {
  percent: number;
  className?: string;
}

/** Brand-colored progress: delivery progress is one of the things the app highlights. */
export function ProgressBar({ percent, className }: ProgressBarProps) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-neutral-100", className)}>
      <div className="h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
    </div>
  );
}
