import { ProgressBar } from "@/shared/ui/ProgressBar";
import type { DelegationSummary } from "../domain/buildDelegations";
import { getDeliveryPercent } from "../domain/delegationProgress";

interface DelegationProgressProps {
  delegation: DelegationSummary;
}

export function DelegationProgress({ delegation }: DelegationProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <ProgressBar percent={getDeliveryPercent(delegation)} className="w-24 shrink-0" />
      <span className="whitespace-nowrap text-xs tabular-nums text-neutral-500">
        <span className={delegation.delivered ? "font-semibold text-neutral-950" : ""}>{delegation.delivered}</span> de{" "}
        {delegation.members.length} entregadas
      </span>
    </div>
  );
}
