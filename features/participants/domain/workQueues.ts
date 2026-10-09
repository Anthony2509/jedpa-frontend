import type { Participant, ParticipantStatus } from "../types";
import { countDocumentsToReview, getParticipantStatus } from "./participantStatus";

export type WorkQueueId = "registration" | "review" | "credentials" | "delivery";

export interface WorkQueueMeta {
  step: number;
  /** Menu and page title: says what is waiting there ("Pendientes de revisión"). */
  label: string;
  /** For the phone's bottom bar, where five items share one row. */
  shortLabel: string;
  href: string;
  description: string;
  cta: string;
}

/** The happy path, in order. Every screen and menu follows this sequence. */
export const WORK_QUEUES: Record<WorkQueueId, WorkQueueMeta> = {
  registration: {
    step: 1,
    label: "Registro",
    shortLabel: "Registro",
    href: "/registration",
    description: "Participantes con documentos faltantes u observados",
    cta: "Completar documentos",
  },
  review: {
    step: 2,
    label: "Pendientes de revisión",
    shortLabel: "Revisión",
    href: "/review",
    description: "Participantes con documentos por revisar",
    cta: "Empezar a revisar",
  },
  credentials: {
    step: 3,
    label: "Pendientes de impresión",
    shortLabel: "Impresión",
    href: "/credentials",
    description: "Credenciales por generar o imprimir",
    cta: "Generar e imprimir",
  },
  delivery: {
    step: 4,
    label: "Pendientes de entrega",
    shortLabel: "Entrega",
    href: "/deliveries",
    description: "Credenciales impresas pendientes de entrega",
    cta: "Registrar entregas",
  },
};

export const WORK_QUEUE_IDS = Object.keys(WORK_QUEUES) as WorkQueueId[];

/**
 * TEMP(backend): with the API each queue is a set of statuses until it has a queue filter. "Revisión"
 * only gets participants with every required document uploaded (IN_REVIEW); someone with some
 * documents uploaded and others missing stays in "Registro", where they can also be reviewed.
 */
export const QUEUE_STATUSES: Record<WorkQueueId, ParticipantStatus[]> = {
  registration: ["pending_documents", "observed"],
  review: ["in_review"],
  credentials: ["ready_to_print"],
  delivery: ["printed"],
};

export function isInWorkQueue(queue: WorkQueueId, participant: Participant): boolean {
  if (participant.status) return QUEUE_STATUSES[queue].includes(participant.status);
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
