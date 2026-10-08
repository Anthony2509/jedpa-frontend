import {
  ParticipantIdentity,
  ParticipantStatusBadge,
  ParticipantSummary,
  PARTICIPANT_TYPE_LABELS,
  PendingChips,
  getCurrentPending,
  getFullName,
  getIdentityLabel,
  getParticipantStatus,
  type Participant,
} from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface DelegationMembersTableProps {
  members: Participant[];
  onOpen: (participant: Participant) => void;
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
      <ParticipantSummary participant={p} context={PARTICIPANT_TYPE_LABELS[p.type]}>
        {/* The chips already say what is missing; the status badge is only needed when there are none. */}
        {getCurrentPending(p) ? <Pending participant={p} /> : <ParticipantStatusBadge status={getParticipantStatus(p)} />}
      </ParticipantSummary>
    ),
  },
  { key: "person", header: "Integrante", className: "w-[30%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
  { key: "type", header: "Condición", className: "w-[16%]", mobile: "hidden", render: (p) => <span className="text-neutral-900">{PARTICIPANT_TYPE_LABELS[p.type]}</span> },
  { key: "status", header: "Estado", className: "w-[16%]", mobile: "hidden", render: (p) => <ParticipantStatusBadge status={getParticipantStatus(p)} /> },
  { key: "pending", header: "Pendiente", mobile: "hidden", render: (p) => <Pending participant={p} /> },
];

export function DelegationMembersTable({ members, onOpen }: DelegationMembersTableProps) {
  return <DataTable columns={COLUMNS} rows={members} getRowKey={(p) => p.id} onRowClick={onOpen} />;
}
