import { documentLabelFromApiCode } from "@/features/participants";
import type { AuditChanges } from "./apiAuditMapping";

const FIELD_LABELS: Record<string, string> = {
  firstNames: "Nombres",
  paternalLastName: "Apellido paterno",
  maternalLastName: "Apellido materno",
  documentType: "Documento",
  documentNumber: "Número de documento",
  participantTypeId: "Tipo",
  delegationId: "Delegación",
  birthDate: "Fecha de nacimiento",
  gender: "Sexo",
  institution: "Institución",
  schoolName: "Institución educativa",
  region: "Región",
  status: "Estado",
  observation: "Observación",
  fileId: "Archivo",
  copyNumber: "Ejemplar",
  reason: "Motivo",
  isActive: "Activo",
  name: "Nombre",
  fullName: "Nombre",
  email: "Correo",
  roleId: "Rol",
  copy: "Ejemplar",
  pdf: "PDF",
  resolutionFileId: "Archivo",
  code: "Código",
  category: "Categoría",
};

const VALUE_LABELS: Record<string, string> = {
  PENDING_DOCUMENTS: "Pendiente de documentos",
  IN_REVIEW: "En revisión",
  OBSERVED: "Observado",
  READY_TO_PRINT: "Lista para imprimir",
  PRINTED: "Impresa",
  DELIVERED: "Entregada",
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  NOT_APPLICABLE: "No aplica",
  FEMALE: "Femenino",
  MALE: "Masculino",
  true: "Sí",
  false: "No",
};

const isId = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(value);

function show(field: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  const text = String(value);
  if (isId(text)) return "(actualizado)";
  if (field === "documentType") return documentLabelFromApiCode(text);
  return VALUE_LABELS[text] ?? text;
}

/** One line per changed field: "Estado: En revisión → Lista para imprimir". */
export function describeApiChanges(changes: AuditChanges | null): string | undefined {
  const lines = Object.entries(changes ?? {}).map(([field, change]) => {
    const label = FIELD_LABELS[field] ?? field;
    if (change.old === undefined || change.old === null || change.old === change.new) return `${label}: ${show(field, change.new)}`;
    return `${label}: ${show(field, change.old)} → ${show(field, change.new)}`;
  });
  return lines.length ? lines.join(" · ") : undefined;
}
