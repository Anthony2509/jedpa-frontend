import Link from "next/link";
import { PARTICIPANT_STATUSES, PARTICIPANT_STATUS_META, type ParticipantStatus } from "@/features/participants";
import { Badge } from "@/shared/ui/Badge";

interface StatusOverviewProps {
  total: number;
  delivered: number;
  byStatus: Record<ParticipantStatus, number>;
}

export function StatusOverview({ total, delivered, byStatus }: StatusOverviewProps) {
  const progress = total ? Math.round((delivered / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-neutral-600">Credenciales entregadas</span>
        <span className="font-semibold tabular-nums text-neutral-900">{delivered} / {total}</span>
      </div>
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
      </div>
      <ul className="-my-1.5 divide-y divide-neutral-100">
        {PARTICIPANT_STATUSES.map((status) => (
          <li key={status}>
            <Link
              href={`/participants?status=${status}`}
              className="flex items-center justify-between py-2 text-sm hover:bg-neutral-50"
            >
              <Badge tone={PARTICIPANT_STATUS_META[status].tone}>{PARTICIPANT_STATUS_META[status].label}</Badge>
              <span className={byStatus[status] ? "font-semibold tabular-nums text-neutral-950" : "tabular-nums text-neutral-300"}>{byStatus[status]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
