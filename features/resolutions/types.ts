import type { MacroId } from "@/features/participants";

/** One directoral resolution (8-10 page PDF) per macro-region. */
export interface Resolution {
  macro: MacroId;
  fileName?: string;
  uploadedAt?: string;
  uploadedBy?: string;
}
