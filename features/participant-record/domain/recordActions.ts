import {
  canPrintDuplicate,
  getMissingRequirements,
  getNextCopyLabel,
  type Participant,
} from "@/features/participants";
import type { ActionMenuItem } from "@/shared/ui/ActionMenu";

export type RecordActionId = "duplicate" | "companion" | "void" | "undo-delivery";

/** Exception actions: kept out of the happy path, inside "Más acciones". */
export function buildRecordActions(participant: Participant): ActionMenuItem[] {
  const duplicate = canPrintDuplicate(participant);
  const companion = participant.type === "athlete" && !participant.credential && getMissingRequirements(participant).length > 0;
  return [
    {
      id: "duplicate",
      label: duplicate ? `Imprimir ${getNextCopyLabel(participant).toLowerCase()}` : "Imprimir duplicado",
      disabled: !duplicate,
      hint: duplicate ? "Por pérdida o daño; queda registrado el motivo" : "Disponible después de imprimir el original (máx. 3)",
    },
    {
      id: "companion",
      label: "Pasar a acompañante",
      disabled: !companion,
      hint: companion ? "Para deportistas que no completaron documentos" : "Solo deportistas con documentos pendientes",
    },
    { id: "void", label: "Anular credencial", disabled: true, hint: "Regla pendiente de definir con el cliente" },
    { id: "undo-delivery", label: "Deshacer entrega", disabled: true, hint: "Regla pendiente de definir con el cliente" },
  ];
}
