import { Button } from "@/shared/ui/Button";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { getFullName, getIdentityLabel } from "../domain/participantName";
import type { Participant, PendingSummary } from "../types";
import { ParticipantIdentity } from "./ParticipantIdentity";
import { ParticipantSummary } from "./ParticipantSummary";
import { ParticipantTypeCell } from "./ParticipantTypeCell";
import { PendingChips } from "./PendingChips";

interface WorkQueueTableProps {
  participants: Participant[];
  pendingHeader?: string;
  getPending?: (participant: Participant) => PendingSummary | null;
  actionLabel: string;
  /** false when the row action only opens the record: phones then show the whole card as tappable. */
  mobileAction?: boolean;
  /** Shorter label for phones, where the button shares the row with the name. */
  mobileActionLabel?: string;
  onAction: (participant: Participant) => void;
  onOpen: (participant: Participant) => void;
}

/** The rest of the queue: quiet on purpose, so the next-up card stays the focus. */
export function WorkQueueTable(props: WorkQueueTableProps) {
  const pendingOf = (p: Participant) => props.getPending?.(p) ?? null;

  const columns: Column<Participant>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (p) => {
        const pending = pendingOf(p);
        return (
          <ParticipantSummary participant={p}>{pending && <PendingChips pending={pending} />}</ParticipantSummary>
        );
      },
    },
    { key: "participant", header: "Participante", className: props.getPending ? "w-[30%]" : "w-[40%]", mobile: "hidden", render: (p) => <ParticipantIdentity fullName={getFullName(p)} identity={getIdentityLabel(p)} /> },
    { key: "type", header: "Tipo", className: "w-[22%]", mobile: "hidden", render: (p) => <ParticipantTypeCell participant={p} /> },
    ...(props.getPending
      ? [{ key: "pending", header: props.pendingHeader ?? "", mobile: "hidden" as const, render: (p: Participant) => { const pending = pendingOf(p); return pending && <PendingChips pending={pending} />; } }]
      : []),
    {
      key: "action",
      header: "",
      className: "w-px text-right",
      mobile: props.mobileAction === false ? "hidden" : "action",
      render: (p) => (
        <Button
          size="sm"
          variant="secondary"
          onClick={(event) => {
            event.stopPropagation();
            props.onAction(p);
          }}
        >
          {props.mobileActionLabel ? (
            <>
              <span className="md:hidden">{props.mobileActionLabel}</span>
              <span className="hidden md:inline">{props.actionLabel}</span>
            </>
          ) : (
            props.actionLabel
          )}
        </Button>
      ),
    },
  ];

  return <DataTable columns={columns} rows={props.participants} getRowKey={(p) => p.id} onRowClick={props.onOpen} />;
}
