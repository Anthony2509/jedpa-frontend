"use client";

import { useState } from "react";
import type { RecordStep, RecordStepId } from "../types";

type Overrides = Partial<Record<RecordStepId, boolean>>;

/** The current step is open by default; the user can open or close any unlocked step. */
export function useRecordExpansion(initialStep: RecordStepId | null) {
  const [overrides, setOverrides] = useState<Overrides>(initialStep ? { [initialStep]: true } : {});

  function isExpanded(step: RecordStep): boolean {
    return overrides[step.id] ?? (step.state === "current" && step.id !== "data");
  }

  function toggle(step: RecordStep) {
    setOverrides((current) => ({ ...current, [step.id]: !isExpanded(step) }));
  }

  function reveal(id: RecordStepId) {
    setOverrides((current) => ({ ...current, [id]: true }));
    document.getElementById(`step-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return { isExpanded, toggle, reveal };
}
