import {
  ParticipantIdentity,
  ParticipantStatusBadge,
  ParticipantSummary,
  ParticipantTypeCell,
  getFullName,
  getIdentityLabel,
  getParticipantStatus,
  type Participant,
} from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface PrintedCredentialsTableProps {
  participants: Participant[];
  onOpen: (participant: Participant) => void;
}

/** TEMP(backend): the list has no copies yet; each record shows its copies and their PDFs. */
const COLUMNS: Column<Participant>[] = [
  {
    key: "card",
    header: "",
    className: "hidden",
    mobile: "title",
    render: (p) => (
      <ParticipantSummary participant={p}>
        <ParticipantStatusBadge status={getParticipantStatus(p)} />
      </ParticipantSummary>
    ),
  },
  { key: "participant", header: "Participante", className: "w-[36%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
  { key: "type", header: "Tipo", className: "w-[30%]", mobile: "hidden", render: (p) => <ParticipantTypeCell participant={p} /> },
  { key: "status", header: "Estado", mobile: "hidden", render: (p) => <ParticipantStatusBadge status={getParticipantStatus(p)} /> },
];

export function PrintedCredentialsTable({ participants, onOpen }: PrintedCredentialsTableProps) {
  return (
    <DataTable columns={COLUMNS} rows={participants} getRowKey={(p) => p.id} onRowClick={onOpen} emptyMessage="Aún no se imprimieron credenciales." />
  );
}
