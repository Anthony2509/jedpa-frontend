import type { AuditAction } from "../types";

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  participant_created: "Alta de participante",
  participant_updated: "Edición de participante",
  document_uploaded: "Documento cargado",
  document_approved: "Documento aprobado",
  document_observed: "Documento observado",
  credential_issued: "Credencial generada",
  credential_printed: "Credencial impresa",
  credential_reprinted: "Credencial reimpresa",
  credential_delivered: "Credencial entregada",
  document_reviewed: "Documento revisado",
  document_review_undone: "Revisión deshecha",
  pdf_downloaded: "PDF de credencial descargado",
  status_changed: "Cambio de estado",
  file_accessed: "Acceso a un archivo",
  imported: "Importación",
  activated: "Activación",
  deactivated: "Desactivación",
  record_created: "Alta",
  record_updated: "Edición",
};

export const AUDIT_ACTIONS = Object.keys(AUDIT_ACTION_LABELS) as AuditAction[];
