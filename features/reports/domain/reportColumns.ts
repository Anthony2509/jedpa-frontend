import {
  DOCUMENT_STATUS_META,
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_LABELS,
  GENDER_LABELS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_STATUS_META,
  PARTICIPANT_TYPE_LABELS,
  getCopyLabel,
  getDelegationCode,
  getParticipantStatus,
  type DocumentType,
  type Participant,
} from "@/features/participants";

type FormatDate = (iso: string) => string;

export interface ReportColumn {
  header: string;
  value: (participant: Participant, formatDate: FormatDate) => string;
}

function documentColumn(type: DocumentType): ReportColumn {
  return {
    header: DOCUMENT_TYPE_LABELS[type],
    value: (p) => {
      const document = p.documents.find((item) => item.type === type);
      return document ? DOCUMENT_STATUS_META[document.status].label : "";
    },
  };
}

function describeDeliveries(p: Participant, formatDate: FormatDate): string {
  return (p.credential?.copies ?? [])
    .map((copy) => `${getCopyLabel(copy)}: ${copy.delivery ? `${copy.delivery.placeName} (${formatDate(copy.delivery.at)}, ${copy.delivery.by})` : "pendiente"}`)
    .join(" | ");
}

/** Columns follow the client's 2024 spreadsheet ("LISTA LIMPIA"), plus the delivery data per copy. */
export const REPORT_COLUMNS: ReportColumn[] = [
  { header: "ID", value: (p) => p.id },
  { header: "Macro", value: (p) => p.delegation?.macro ?? "" },
  { header: "Región", value: (p) => p.delegation?.region ?? "" },
  { header: "Cat.", value: (p) => p.delegation?.category ?? "" },
  { header: "Disciplina", value: (p) => (p.delegation ? `${p.delegation.sport} ${GENDER_LABELS[p.delegation.gender]}` : "") },
  { header: "Delegación", value: (p) => getDelegationCode(p) ?? "" },
  { header: "Tipo doc.", value: (p) => IDENTITY_TYPE_LABELS[p.idType] },
  { header: "Documento de identidad", value: (p) => p.idNumber },
  { header: "Apellidos", value: (p) => p.lastName },
  { header: "Nombres", value: (p) => p.firstName },
  { header: "Condición", value: (p) => PARTICIPANT_TYPE_LABELS[p.type] },
  { header: "I.E. / Institución", value: (p) => p.school ?? p.institution ?? "" },
  ...DOCUMENT_TYPES.map(documentColumn),
  { header: "Estado de la credencial", value: (p) => PARTICIPANT_STATUS_META[getParticipantStatus(p)].label },
  { header: "Código", value: (p) => p.credential?.code ?? "" },
  { header: "Copias impresas", value: (p) => String(p.credential?.copies.length ?? 0) },
  { header: "Entregas", value: describeDeliveries },
];

export function buildReportRows(participants: Participant[], formatDate: FormatDate): string[][] {
  return participants.map((participant) => REPORT_COLUMNS.map((column) => column.value(participant, formatDate)));
}

export function buildReportSheet(participants: Participant[], formatDate: FormatDate): string[][] {
  return [REPORT_COLUMNS.map((column) => column.header), ...buildReportRows(participants, formatDate)];
}
