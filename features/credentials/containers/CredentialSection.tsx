"use client";

import type { Participant } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { CredentialActionPanel } from "../components/CredentialActionPanel";
import { CredentialCard } from "../components/CredentialCard";
import { CopiesTable } from "../components/CopiesTable";
import { buildCredentialCardData, getCredentialAvailability } from "../domain/credentialActions";
import { useCredentialActions } from "../hooks/useCredentialActions";

interface CredentialSectionProps {
  participant: Participant;
}

export function CredentialSection({ participant }: CredentialSectionProps) {
  const actions = useCredentialActions(participant.id);
  const availability = getCredentialAvailability(participant);
  const copies = participant.credential?.copies ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-8">
        <CredentialCard data={buildCredentialCardData(participant)} draft={!participant.credential} />
        <CredentialActionPanel
          canIssue={availability.canIssue}
          canPrint={availability.canPrint}
          onIssue={actions.issue}
          onPrint={actions.print}
        />
      </div>
      {participant.credential && (
        <a href={`/verify/${participant.credential.code}`} target="_blank" rel="noreferrer" className="inline-block text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
          Ver lo que muestra el QR al escanearlo
        </a>
      )}
      {copies.length > 0 && <CopiesTable copies={copies} formatDate={formatDateTime} />}
    </div>
  );
}
