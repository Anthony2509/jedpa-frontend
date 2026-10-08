import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface ProcessStepCardProps {
  step: number;
  label: string;
  description: string;
  count: number;
  cta: string;
  href: string;
}

export function ProcessStepCard({ step, label, description, count, cta, href }: ProcessStepCardProps) {
  const done = count === 0;
  return (
    <div className={cn("flex flex-col rounded-lg border bg-white p-4 sm:p-5", done ? "border-neutral-200" : "border-neutral-300")}>
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <span className={cn("flex size-5 items-center justify-center rounded-full text-[11px] text-white", done ? "bg-neutral-300" : "bg-brand")}>{step}</span>
        {label}
      </div>
      <p className={cn("mt-3 text-4xl font-semibold tabular-nums sm:mt-4 sm:text-5xl", done ? "text-neutral-300" : "text-neutral-950")}>{count}</p>
      <p className="mt-1 flex-1 text-xs text-neutral-500 sm:text-sm">{description}</p>
      {done ? (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500">
          <Check className="size-4" /> Al día
        </p>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-300 px-2 text-xs font-medium sm:h-10 sm:px-4 sm:text-sm text-neutral-900 hover:border-neutral-900"
        >
          {cta} <ArrowRight className="hidden size-4 sm:block" />
        </Link>
      )}
    </div>
  );
}
