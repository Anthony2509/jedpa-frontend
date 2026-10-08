"use client";

import type { MacroId } from "@/features/participants";
import { useStore } from "@/shared/lib/useStore";
import { resolutionsStore } from "../services/resolutionsApi";

export function useResolutions() {
  return useStore(resolutionsStore);
}

export function useResolution(macro: MacroId | undefined) {
  return useResolutions().find((resolution) => resolution.macro === macro);
}
