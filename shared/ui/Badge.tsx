import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeTone = "muted" | "outline" | "strong" | "dark" | "darker" | "solid" | "brand" | "brandOutline";

const TONE_CLASSES: Record<BadgeTone, string> = {
  muted: "bg-neutral-100 text-neutral-600 border-transparent",
  outline: "bg-white text-neutral-600 border-neutral-300",
  strong: "bg-white text-neutral-900 border-neutral-900",
  dark: "bg-neutral-500 text-white border-transparent",
  darker: "bg-neutral-700 text-white border-transparent",
  solid: "bg-neutral-900 text-white border-transparent",
  brand: "bg-brand-soft text-brand border-brand/30",
  brandOutline: "bg-white text-brand border-brand/40",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone = "muted", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
