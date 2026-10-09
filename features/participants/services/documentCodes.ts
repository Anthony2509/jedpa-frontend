import { DOCUMENT_TYPE_LABELS } from "../domain/documentTypes";
import { DOCUMENT_FROM_API } from "./apiCodes";

/** Spanish name of a document from its API code (RESOLUCION_DIRECTORAL → Resolución directoral). */
export function documentLabelFromApiCode(code: string): string {
  const type = DOCUMENT_FROM_API[code];
  return type ? DOCUMENT_TYPE_LABELS[type] : code;
}
