import type { Participant, PendingSummary } from "@/features/participants";
import type { CredentialsView } from "../types";

export const CREDENTIALS_VIEW_META: Record<
  Exclude<CredentialsView, "printed">,
  { pendingHeader?: string; nextCtaLabel: string; actionLabel: string; bulkLabel: string; doneTitle: string; doneMessage: string }
> = {
  issue: {
    nextCtaLabel: "Generar credencial",
    actionLabel: "Generar",
    bulkLabel: "Generar todas",
    doneTitle: "No hay credenciales por generar",
    doneMessage: "Aparecerán aquí cuando un participante tenga todos sus documentos aprobados.",
  },
  print: {
    pendingHeader: "Credencial",
    nextCtaLabel: "Imprimir credencial",
    actionLabel: "Imprimir",
    bulkLabel: "Imprimir todas",
    doneTitle: "No hay credenciales por imprimir",
    doneMessage: "Genera credenciales en la pestaña anterior para poder imprimirlas.",
  },
};

/** "Por generar" needs no pending column: every row already has its documents approved. */
export function getCredentialPending(view: CredentialsView, participant: Participant): PendingSummary | null {
  if (view === "issue" || !participant.credential) return null;
  return { tone: "neutral", items: [], code: participant.credential.code };
}
