import { apiUpload } from "@/shared/lib/apiClient";
import { refreshParticipants } from "./participantsApi";

export interface ImportPreview {
  sheet: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  toCreate: number;
  alreadyRegistered: number;
  newDelegations: string[];
  byType: Record<string, number>;
  errors: { row: number; errors: string[] }[];
}

export interface ImportResult {
  created: number;
  skippedExisting: number;
  delegationsCreated: string[];
}

const formWith = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return form;
};

/** Validates the Excel row by row without saving anything. */
export function previewImport(file: File): Promise<ImportPreview> {
  return apiUpload<ImportPreview>("/participants/import/preview", formWith(file));
}

/** Imports everything in one transaction: with a single invalid row nothing is imported. */
export async function confirmImport(file: File): Promise<ImportResult> {
  const result = await apiUpload<ImportResult>("/participants/import", formWith(file));
  refreshParticipants();
  return result;
}
