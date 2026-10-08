import { DOCUMENT_TYPE_LABELS, getRequiredDocuments, type Participant } from "@/features/participants";
import type { RecordProblem } from "../types";

/** Problems that block the happy path, shown at the top of the record with their fix. */
export function getRecordProblems(participant: Participant): RecordProblem[] {
  return getRequiredDocuments(participant)
    .filter((document) => document.status === "observed")
    .map((document) => ({
      id: document.type,
      message: `${DOCUMENT_TYPE_LABELS[document.type]} observado: ${document.observation ?? "sin detalle"}`,
      actionLabel: "Ir a documentos",
      stepId: "documents",
    }));
}
