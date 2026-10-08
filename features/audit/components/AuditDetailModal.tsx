import { DefinitionList } from "@/shared/ui/DefinitionList";
import { Modal } from "@/shared/ui/Modal";
import { AUDIT_ACTION_LABELS } from "../domain/auditActions";
import type { AuditEntry } from "../types";

interface AuditDetailModalProps {
  entry: AuditEntry | null;
  formatDate: (iso: string) => string;
  onClose: () => void;
}

export function AuditDetailModal({ entry, formatDate, onClose }: AuditDetailModalProps) {
  if (!entry) return null;
  return (
    <Modal open title={AUDIT_ACTION_LABELS[entry.action]} description="Registro de solo lectura" onClose={onClose}>
      <DefinitionList
        items={[
          { label: "Participante", value: `${entry.participantName} (${entry.participantId})` },
          { label: "Usuario responsable", value: entry.userName },
          { label: "Fecha y hora", value: formatDate(entry.at) },
          { label: "Campo afectado", value: entry.field },
          { label: "Valor anterior", value: entry.before },
          { label: "Valor nuevo", value: entry.after },
          { label: "Detalle", value: entry.detail },
        ]}
      />
    </Modal>
  );
}
