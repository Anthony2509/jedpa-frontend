"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { MACRO_REGIONS_QUERY, SPORTS_QUERY, fetchMacroRegions, fetchSports, type CatalogOption, type MacroRegionOption } from "../services/catalogsApi";

const NONE: never[] = [];

export function useMacroRegions(): MacroRegionOption[] {
  return useApiQuery(MACRO_REGIONS_QUERY, fetchMacroRegions).data ?? NONE;
}

export function useSports(): CatalogOption[] {
  return useApiQuery(SPORTS_QUERY, fetchSports).data ?? NONE;
}
