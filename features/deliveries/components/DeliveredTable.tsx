import { ParticipantIdentity, ParticipantSummary, getCopyLabel, getFullName, getIdentityLabel, getLatestCopy, type Participant } from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface DeliveredTableProps {
  participants: Participant[];
  formatDate: (iso: string) => string;
  onOpen: (participant: Participant) => void;
}

const deliveryOf = (p: Participant) => getLatestCopy(p)?.delivery;

export function DeliveredTable({ participants, formatDate, onOpen }: DeliveredTableProps) {
  const columns: Column<Participant>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (p) => {
        const copy = getLatestCopy(p);
        const delivery = deliveryOf(p);
        return (
          <ParticipantSummary participant={p}>
            <div className="leading-snug">
              <p className="text-[13px] text-neutral-900">{delivery?.placeName}</p>
              <p className="text-xs text-neutral-500">
                {copy && `${getCopyLabel(copy)} · `}
                {delivery && `${formatDate(delivery.at)} · ${delivery.by}`}
              </p>
            </div>
          </ParticipantSummary>
        );
      },
    },
    { key: "participant", header: "Participante", className: "w-[28%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
    { key: "copy", header: "Copia", className: "w-[12%]", mobile: "hidden", render: (p) => { const copy = getLatestCopy(p); return <span className="text-neutral-900">{copy ? getCopyLabel(copy) : ""}</span>; } },
    {
      key: "place",
      header: "Lugar y fecha",
      mobile: "hidden",
      render: (p) => {
        const delivery = deliveryOf(p);
        return (
          <div className="leading-snug">
            <p className="text-neutral-900">{delivery?.placeName}</p>
            <p className="text-xs text-neutral-500">{delivery ? formatDate(delivery.at) : ""}</p>
          </div>
        );
      },
    },
    { key: "by", header: "Responsable", className: "hidden xl:table-cell", mobile: "hidden", render: (p) => <span className="text-neutral-600">{deliveryOf(p)?.by}</span> },
  ];
  return (
    <DataTable columns={columns} rows={participants} getRowKey={(p) => p.id} onRowClick={onOpen} emptyMessage="Aún no hay entregas registradas." />
  );
}
