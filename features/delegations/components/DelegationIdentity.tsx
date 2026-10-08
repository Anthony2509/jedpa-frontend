import { describeDiscipline } from "@/features/participants";
import type { DelegationSummary } from "../domain/buildDelegations";

interface DelegationIdentityProps {
  delegation: DelegationSummary;
}

export function DelegationIdentity({ delegation }: DelegationIdentityProps) {
  return (
    <div className="leading-snug">
      <p className="font-mono font-semibold tracking-tight text-neutral-950">{delegation.code}</p>
      <p className="text-xs text-neutral-500">{describeDiscipline(delegation.info)} · cat. {delegation.info.category}</p>
    </div>
  );
}
