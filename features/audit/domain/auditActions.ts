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
};

export const AUDIT_ACTIONS = Object.keys(AUDIT_ACTION_LABELS) as AuditAction[];
