import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import type { RecordProblem } from "../types";

interface ProblemBannerProps {
  problems: RecordProblem[];
  onAction: (problem: RecordProblem) => void;
}

export function ProblemBanner({ problems, onAction }: ProblemBannerProps) {
  if (problems.length === 0) return null;
  return (
    <div className="mb-4 space-y-2 rounded-lg border border-brand/30 bg-brand-soft p-4">
      {problems.map((problem) => (
        <div key={problem.id} className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-neutral-900">
            <AlertTriangle className="size-4 shrink-0 text-brand" />
            {problem.message}
          </p>
          <Button size="sm" variant="secondary" onClick={() => onAction(problem)}>
            {problem.actionLabel}
          </Button>
        </div>
      ))}
    </div>
  );
}
