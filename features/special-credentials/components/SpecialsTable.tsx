import {
  ACCESS_LABELS,
  PARTICIPANT_TYPE_LABELS,
  ParticipantIdentity,
  ParticipantStatusBadge,
  ParticipantSummary,
  getFullName,
  getIdentityLabel,
  getParticipantStatus,
  type Participant,
} from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface SpecialsTableProps {
  participants: Participant[];
  onOpen: (participant: Participant) => void;
}

const accessOf = (p: Participant) => (p.access ? ACCESS_LABELS[p.access] : "—");

const COLUMNS: Column<Participant>[] = [
  {
    key: "card",
    header: "",
    className: "hidden",
    mobile: "title",
    render: (p) => (
      <ParticipantSummary participant={p} context={`${PARTICIPANT_TYPE_LABELS[p.type]} · ${accessOf(p)}`}>
        <p className="text-[13px] leading-snug text-neutral-700">{p.institution}</p>
        <ParticipantStatusBadge status={getParticipantStatus(p)} />
      </ParticipantSummary>
    ),
  },
  { key: "person", header: "Persona", className: "w-[28%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
  {
    key: "type",
    header: "Tipo y acceso",
    className: "w-[20%]",
    mobile: "hidden",
    render: (p) => (
      <div className="leading-snug">
        <p className="text-neutral-900">{PARTICIPANT_TYPE_LABELS[p.type]}</p>
        <p className="text-xs text-neutral-500">{accessOf(p)}</p>
      </div>
    ),
  },
  { key: "institution", header: "Servicio / Institución", mobile: "hidden", render: (p) => <span className="text-neutral-700">{p.institution}</span> },
  { key: "status", header: "Estado", className: "w-[14%]", mobile: "hidden", render: (p) => <ParticipantStatusBadge status={getParticipantStatus(p)} /> },
];

export function SpecialsTable({ participants, onOpen }: SpecialsTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={participants}
      getRowKey={(p) => p.id}
      onRowClick={onOpen}
      emptyMessage="Todavía no hay credenciales especiales. Crea la primera con el botón de arriba."
    />
  );
}
