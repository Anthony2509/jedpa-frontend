import type { Participant } from "../types";
import { countDocumentsToReview, getParticipantStatus } from "./participantStatus";

export type WorkQueueId = "registration" | "review" | "credentials" | "delivery";

export interface WorkQueueMeta {
  step: number;
  label: string;
  href: string;
  description: string;
  cta: string;
}

/** The happy path, in order. Every screen and menu follows this sequence. */
export const WORK_QUEUES: Record<WorkQueueId, WorkQueueMeta> = {
  registration: {
    step: 1,
    label: "Registro",
    href: "/registration",
    description: "Participantes con documentos faltantes u observados",
    cta: "Completar documentos",
  },
  review: {
    step: 2,
    label: "Revisión",
    href: "/review",
    description: "Participantes con documentos por revisar",
    cta: "Empezar a revisar",
  },
  credentials: {
    step: 3,
    label: "Credenciales",
    href: "/credentials",
    description: "Credenciales por generar o imprimir",
    cta: "Generar e imprimir",
  },
  delivery: {
    step: 4,
    label: "Entrega",
    href: "/deliveries",
    description: "Credenciales impresas pendientes de entrega",
    cta: "Registrar entregas",
  },
};

export const WORK_QUEUE_IDS = Object.keys(WORK_QUEUES) as WorkQueueId[];

export function isInWorkQueue(queue: WorkQueueId, participant: Participant): boolean {
  const status = getParticipantStatus(participant);
  switch (queue) {
    case "registration":
      return status === "pending_documents" || status === "observed";
    case "review":
      return countDocumentsToReview(participant) > 0 && status !== "delivered";
    case "credentials":
      return status === "ready_to_print" || status === "issued";
    case "delivery":
      return status === "printed";
  }
}

/** Queue members, oldest registration first (first come, first served). */
export function getWorkQueue(queue: WorkQueueId, participants: Participant[]): Participant[] {
  return participants
    .filter((participant) => isInWorkQueue(queue, participant))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function parseWorkQueueId(value: string | null): WorkQueueId | null {
  return WORK_QUEUE_IDS.includes(value as WorkQueueId) ? (value as WorkQueueId) : null;
}
