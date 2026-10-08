import { DataTable, type Column } from "@/shared/ui/DataTable";
import { getFullName, getIdentityLabel } from "../domain/participantName";
import { getParticipantStatus } from "../domain/participantStatus";
import { getCurrentPending } from "../domain/pendingLabels";
import type { Participant } from "../types";
import { ParticipantIdentity } from "./ParticipantIdentity";
import { ParticipantStatusBadge } from "./ParticipantStatusBadge";
import { ParticipantSummary } from "./ParticipantSummary";
import { ParticipantTypeCell } from "./ParticipantTypeCell";
import { PendingChips } from "./PendingChips";

interface ParticipantsTableProps {
  participants: Participant[];
  onSelect: (participant: Participant) => void;
}

function Pending({ participant }: { participant: Participant }) {
  const pending = getCurrentPending(participant);
  return pending ? <PendingChips pending={pending} /> : <span className="text-neutral-300">—</span>;
}

const COLUMNS: Column<Participant>[] = [
  {
    key: "card",
    header: "",
    className: "hidden",
    mobile: "title",
    render: (p) => (
      <ParticipantSummary participant={p}>
        {/* The chips already say what is missing; the status badge is only needed when there are none. */}
        {getCurrentPending(p) ? <Pending participant={p} /> : <ParticipantStatusBadge status={getParticipantStatus(p)} />}
      </ParticipantSummary>
    ),
  },
  { key: "participant", header: "Participante", className: "w-[28%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
  { key: "type", header: "Tipo", className: "w-[20%]", mobile: "hidden", render: (p) => <ParticipantTypeCell participant={p} /> },
  { key: "status", header: "Estado", className: "w-[16%]", mobile: "hidden", render: (p) => <ParticipantStatusBadge status={getParticipantStatus(p)} /> },
  { key: "pending", header: "Pendiente", className: "hidden lg:table-cell", mobile: "hidden", render: (p) => <Pending participant={p} /> },
];

export function ParticipantsTable({ participants, onSelect }: ParticipantsTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={participants}
      getRowKey={(participant) => participant.id}
      onRowClick={onSelect}
      emptyMessage="No hay participantes que coincidan con los filtros."
    />
  );
}
