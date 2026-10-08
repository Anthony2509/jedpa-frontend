import { describeDiscipline } from "@/features/participants";
import { cn } from "@/shared/lib/cn";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import type { DelegationSummary } from "../domain/buildDelegations";
import { getDeliveryPercent } from "../domain/delegationProgress";

interface DelegationCardProps {
  delegation: DelegationSummary;
}

/**
 * Phone card: who the delegation is on top, then the two numbers that matter side by side
 * (pending documents in red, deliveries), and the delivery bar across the full width.
 */
export function DelegationCard({ delegation }: DelegationCardProps) {
  const { info, members, pendingDocuments, delivered } = delegation;
  return (
    <div>
      <p className="pr-6 font-mono text-[15px] font-semibold leading-snug tracking-tight text-neutral-950">{delegation.code}</p>
      <p className="mt-0.5 text-[13px] leading-snug text-neutral-600">
        {describeDiscipline(info)} · cat. {info.category}
      </p>
      <p className="text-xs leading-snug text-neutral-400">
        {info.region} · {members.length} integrantes
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-3">
        <div className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-xs text-neutral-500">{pendingDocuments ? "con docs. pendientes" : "docs. al día"}</dt>
          <dd className={cn("text-2xl font-semibold leading-none tabular-nums", pendingDocuments ? "text-brand" : "text-neutral-300")}>
            {pendingDocuments}
          </dd>
        </div>
        <div className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-xs text-neutral-500">entregadas</dt>
          <dd className="text-2xl font-semibold leading-none tabular-nums text-neutral-950">
            {delivered}
            <span className="text-sm font-normal text-neutral-400"> de {members.length}</span>
          </dd>
        </div>
      </dl>
      <ProgressBar percent={getDeliveryPercent(delegation)} className="mt-3" />
    </div>
  );
}
