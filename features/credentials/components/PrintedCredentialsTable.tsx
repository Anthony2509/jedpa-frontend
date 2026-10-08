import {
  ParticipantIdentity,
  ParticipantSummary,
  ParticipantTypeCell,
  getCopyLabel,
  getFullName,
  getIdentityLabel,
  getLatestCopy,
  type Participant,
} from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface PrintedCredentialsTableProps {
  participants: Participant[];
  formatDate: (iso: string) => string;
  onOpen: (participant: Participant) => void;
}

function LastPrint({ participant, formatDate }: { participant: Participant; formatDate: (iso: string) => string }) {
  const copy = getLatestCopy(participant);
  if (!copy) return <span className="text-neutral-300">—</span>;
  return (
    <div className="leading-snug">
      <p className="text-neutral-900">{getCopyLabel(copy)}</p>
      <p className="text-xs text-neutral-500">{formatDate(copy.printedAt)}</p>
    </div>
  );
}

export function PrintedCredentialsTable({ participants, formatDate, onOpen }: PrintedCredentialsTableProps) {
  const columns: Column<Participant>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (p) => {
        const copy = getLatestCopy(p);
        return (
          <ParticipantSummary participant={p}>
            <p className="flex flex-wrap items-baseline gap-x-2 text-xs text-neutral-500">
              <span className="font-mono text-[13px] font-medium tracking-tight text-neutral-950">{p.credential?.code}</span>
              {copy && <span>{getCopyLabel(copy)} · {formatDate(copy.printedAt)}</span>}
            </p>
          </ParticipantSummary>
        );
      },
    },
    { key: "participant", header: "Participante", className: "w-[30%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
    { key: "type", header: "Tipo", className: "w-[22%]", mobile: "hidden", render: (p) => <ParticipantTypeCell participant={p} /> },
    { key: "code", header: "Código", mobile: "hidden", render: (p) => <span className="font-mono text-[13px] font-medium tracking-tight text-neutral-950">{p.credential?.code}</span> },
    { key: "copy", header: "Última impresión", mobile: "hidden", render: (p) => <LastPrint participant={p} formatDate={formatDate} /> },
  ];
  return (
    <DataTable columns={columns} rows={participants} getRowKey={(p) => p.id} onRowClick={onOpen} emptyMessage="Aún no se imprimieron credenciales." />
  );
}
