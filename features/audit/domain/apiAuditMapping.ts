import type { AuditAction } from "../types";

/** One change as the API stores it: `{ field: { old, new } }`. */
export type AuditChanges = Record<string, { old?: unknown; new?: unknown }>;

/** Backend action + entity → the frontend's action (what the person did, in plain words). */
export function toAuditAction(action: string, entity: string, changes: AuditChanges): AuditAction {
  switch (action) {
    case "CREATE":
      if (entity === "Participant") return "participant_created";
      return entity === "ParticipantDocument" ? "document_uploaded" : "record_created";
    case "UPDATE":
      if (entity === "Participant") return "participant_updated";
      return entity === "ParticipantDocument" ? "document_uploaded" : "record_updated";
    case "DOCUMENT_REVIEW": {
      // TEMP(backend): reviews currently arrive without the new status (bug in saveDocument), so the
      // generic "document_reviewed" is the usual case until the backend logs it.
      const status = changes.status?.new;
      if (status === "APPROVED") return "document_approved";
      if (status === "OBSERVED") return "document_observed";
      return status === "PENDING" ? "document_review_undone" : "document_reviewed";
    }
    case "PRINT":
      return "credential_printed";
    case "REPRINT":
      return "credential_reprinted";
    case "DELIVER":
      return "credential_delivered";
    case "STATUS_CHANGE":
      return "status_changed";
    case "FILE_ACCESS":
      return entity === "CredentialCopy" ? "pdf_downloaded" : "file_accessed";
    case "IMPORT":
      return "imported";
    case "ACTIVATE":
      return "activated";
    case "DEACTIVATE":
      return "deactivated";
    default:
      return "record_updated";
  }
}

/** Filter options: the backend's own actions (the filter goes to the API as is). */
export const API_ACTION_OPTIONS = [
  { value: "CREATE", label: "Altas" },
  { value: "UPDATE", label: "Ediciones" },
  { value: "DOCUMENT_REVIEW", label: "Revisión de documentos" },
  { value: "STATUS_CHANGE", label: "Cambios de estado" },
  { value: "PRINT", label: "Impresiones" },
  { value: "REPRINT", label: "Duplicados" },
  { value: "DELIVER", label: "Entregas" },
  { value: "FILE_ACCESS", label: "Acceso a archivos" },
  { value: "IMPORT", label: "Importaciones" },
  { value: "ACTIVATE", label: "Activaciones" },
  { value: "DEACTIVATE", label: "Desactivaciones" },
];
