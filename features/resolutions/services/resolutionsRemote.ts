import { MACRO_REGIONS_QUERY, refreshParticipants } from "@/features/participants";
import { apiGet, apiUpload } from "@/shared/lib/apiClient";
import { invalidateQueries } from "@/shared/lib/useApiQuery";

/** Uploads (or replaces) the macro's directoral resolution: one PDF of 8-10 pages. */
export async function uploadMacroResolution(macroRegionId: string, file: File): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  await apiUpload(`/macro-regions/${macroRegionId}/resolution`, form);
  invalidateQueries(MACRO_REGIONS_QUERY);
  refreshParticipants();
}

/** Short-lived signed link to the PDF (audited). */
export async function fetchResolutionLink(macroRegionId: string): Promise<string> {
  const link = await apiGet<{ url: string }>(`/macro-regions/${macroRegionId}/resolution/file`);
  return link.url;
}
