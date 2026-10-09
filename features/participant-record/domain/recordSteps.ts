import {
  getDelegationCode,
  getIdentityLabel,
  getLatestCopy,
  getParticipantContext,
  getParticipantStatus,
  getRequiredDocuments,
  isMockParticipantId,
  isSpecialType,
  type Participant,
} from "@/features/participants";
import type { RecordStep, RecordStepId } from "../types";

type FormatDate = (iso: string) => string;
type StepDraft = Omit<RecordStep, "number">;

function documentsStep(participant: Participant): StepDraft {
  const required = getRequiredDocuments(participant);
  const approved = required.filter((document) => document.status === "approved").length;
  const observed = required.filter((document) => document.status === "observed").length;
  const summary = required.length
    ? `${approved} de ${required.length} obligatorios aprobados${observed ? ` · ${observed} observado(s)` : ""}`
    : "Sin documentos obligatorios";
  return { id: "documents", title: "Documentos", state: approved === required.length ? "done" : "current", summary };
}

function credentialStep(participant: Participant, documentsDone: boolean): StepDraft {
  const base = { id: "credential" as const, title: "Credencial" };
  const credential = participant.credential;
  if (!documentsDone) {
    return { ...base, state: "locked", summary: "", lockedReason: "Se habilita cuando se aprueben todos los documentos obligatorios." };
  }
  const mock = isMockParticipantId(participant.id);
  if (!credential) return { ...base, state: "current", summary: mock ? "Lista para generar" : "Lista para imprimir" };
  if (credential.copies.length === 0) return { ...base, state: "current", summary: `${credential.code} · falta imprimir` };
  const duplicates = credential.copies.length - 1;
  // API codes are the QR token: long and meaningless to people, so only the copies are listed.
  const prefix = mock ? `${credential.code} · ` : "";
  return { ...base, state: "done", summary: `${prefix}Original${duplicates ? ` + ${duplicates} duplicado(s)` : ""} impreso` };
}

function deliveryStep(participant: Participant, formatDate: FormatDate): StepDraft {
  const base = { id: "delivery" as const, title: "Entrega" };
  const latest = getLatestCopy(participant);
  if (latest?.delivery) return { ...base, state: "done", summary: `${latest.delivery.placeName} · ${formatDate(latest.delivery.at)}` };
  if (getParticipantStatus(participant) === "printed") return { ...base, state: "current", summary: "Hay una copia impresa pendiente de entrega" };
  return { ...base, state: "locked", summary: "", lockedReason: "Se habilita cuando se imprima la credencial." };
}

/**
 * The record as the steps of the happy path. Special credentials (MINEDU, guests, suppliers)
 * have no documents step.
 */
export function buildRecordSteps(participant: Participant, formatDate: FormatDate): RecordStep[] {
  const data: StepDraft = {
    id: "data",
    title: "Datos personales",
    state: "done",
    summary: `${getIdentityLabel(participant)} · ${getDelegationCode(participant) ?? getParticipantContext(participant)}`,
  };
  const special = isSpecialType(participant.type);
  const documents = documentsStep(participant);
  const steps = special
    ? [data, credentialStep(participant, true), deliveryStep(participant, formatDate)]
    : [data, documents, credentialStep(participant, documents.state === "done"), deliveryStep(participant, formatDate)];
  return steps.map((step, index) => ({ ...step, number: index + 1 }));
}

export function parseRecordStepId(value: string | null): RecordStepId | null {
  return value === "data" || value === "documents" || value === "credential" || value === "delivery" ? value : null;
}
