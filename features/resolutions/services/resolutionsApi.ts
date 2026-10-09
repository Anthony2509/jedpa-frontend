import { MACROS } from "@/features/participants";
import { createStore } from "@/shared/lib/createStore";
import type { Resolution } from "../types";

const UPLOADED_AT = new Date(Date.UTC(2026, 8, 18, 15)).toISOString();

/** TEMP: mock resolutions, only for the mock participants' records. M8 not uploaded, to show the blocked case. */
export const resolutionsStore = createStore<Resolution[]>(
  MACROS.map((macro) =>
    macro === "M8"
      ? { macro }
      : { macro, fileName: `RD_${macro}.pdf`, uploadedAt: UPLOADED_AT, uploadedBy: "Luis Quispe" },
  ),
);
