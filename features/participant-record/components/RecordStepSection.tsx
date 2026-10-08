import type { ReactNode } from "react";
import { Check, ChevronDown, Lock } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { RecordStep } from "../types";

interface RecordStepSectionProps {
  step: RecordStep;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function StepMarker({ step }: { step: RecordStep }) {
  if (step.state === "done") {
    return <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900 text-white"><Check className="size-4" /></span>;
  }
  if (step.state === "locked") {
    return <span className="flex size-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-400"><Lock className="size-3.5" /></span>;
  }
  return <span className="flex size-7 items-center justify-center rounded-full border-2 border-brand text-sm font-semibold text-brand">{step.number}</span>;
}

export function RecordStepSection({ step, expanded, onToggle, children }: RecordStepSectionProps) {
  const locked = step.state === "locked";
  return (
    <section id={`step-${step.id}`} className={cn("scroll-mt-6 rounded-xl bg-white", step.state === "current" ? "border-2 border-neutral-900 shadow-sm" : "border border-neutral-200", locked && "bg-neutral-50")}>
      <button
        type="button"
        disabled={locked}
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-4 text-left disabled:cursor-default sm:gap-4 sm:px-5"
      >
        <StepMarker step={step} />
        <div className="min-w-0 flex-1">
          <p className={cn("font-semibold", step.state === "current" ? "text-base text-neutral-950" : "text-sm", locked ? "text-neutral-400" : "text-neutral-800")}>
            {step.title}
          </p>
          <p className="truncate text-xs text-neutral-500">{locked ? step.lockedReason : step.summary}</p>
        </div>
        {step.state === "current" && <span className="hidden text-sm font-medium text-brand sm:inline">Paso actual</span>}
        {!locked && <ChevronDown className={cn("size-4 text-neutral-400 transition-transform", expanded && "rotate-180")} />}
      </button>
      {expanded && !locked && <div className="border-t border-neutral-100 px-4 py-4 sm:px-5 sm:py-5">{children}</div>}
    </section>
  );
}
