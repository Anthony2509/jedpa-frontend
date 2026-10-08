import type { DelegationSummary } from "./buildDelegations";

export function getDeliveryPercent(delegation: DelegationSummary): number {
  const total = delegation.members.length;
  return total ? Math.round((delegation.delivered / total) * 100) : 0;
}
