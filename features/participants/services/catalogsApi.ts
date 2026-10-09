import { apiGet } from "@/shared/lib/apiClient";
import type { CatalogItemDto, MacroRegionDto } from "./participantDtos";

export const MACRO_REGIONS_QUERY = "macro-regions";
export const SPORTS_QUERY = "sports";

export interface CatalogOption {
  id: string;
  code: string;
  name: string;
}

export interface MacroRegionOption extends CatalogOption {
  /** Whether its directoral resolution is uploaded (one PDF per macro). */
  hasResolution: boolean;
}

export async function fetchMacroRegions(): Promise<MacroRegionOption[]> {
  const regions = await apiGet<MacroRegionDto[]>("/macro-regions");
  return regions.map((r) => ({ id: r.id, code: r.code, name: r.name, hasResolution: Boolean(r.resolutionFileId) }));
}

export async function fetchSports(): Promise<CatalogOption[]> {
  const sports = await apiGet<CatalogItemDto[]>("/sports");
  return sports.map((s) => ({ id: s.id, code: s.code, name: s.name }));
}
