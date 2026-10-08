import { getCurrentUser } from "@/features/auth";
import { MACROS, type MacroId } from "@/features/participants";
import { createStore } from "@/shared/lib/createStore";
import { nowIso } from "@/shared/lib/formatDate";
import type { Resolution } from "../types";

const UPLOADED_AT = new Date(Date.UTC(2026, 8, 18, 15)).toISOString();

/** Mock: M8 not uploaded yet, to show the blocked case. */
export const resolutionsStore = createStore<Resolution[]>(
  MACROS.map((macro) =>
    macro === "M8"
      ? { macro }
      : { macro, fileName: `RD_${macro}.pdf`, uploadedAt: UPLOADED_AT, uploadedBy: "Luis Quispe" },
  ),
);

export async function uploadResolution(macro: MacroId, fileName: string): Promise<void> {
  const uploaded = { fileName, uploadedAt: nowIso(), uploadedBy: getCurrentUser().name };
  resolutionsStore.update((resolutions) => resolutions.map((r) => (r.macro === macro ? { ...r, ...uploaded } : r)));
}
