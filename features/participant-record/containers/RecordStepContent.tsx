"use client";

import { CredentialSection } from "@/features/credentials";
import { DeliverySection } from "@/features/deliveries";
import { DocumentsSection } from "@/features/documents";
import { isMockParticipantId, type Participant } from "@/features/participants";
import { formatCalendarDate, formatDateTime } from "@/shared/lib/formatDate";
import { PersonalDataPanel } from "../components/PersonalDataPanel";
import { buildPersonalData } from "../domain/buildPersonalData";
import type { RecordStepId } from "../types";

interface RecordStepContentProps {
  stepId: RecordStepId;
  participant: Participant;
  onEdit: () => void;
}

export function RecordStepContent({ stepId, participant, onEdit }: RecordStepContentProps) {
  switch (stepId) {
    case "documents":
      return <DocumentsSection participant={participant} />;
    case "credential":
      return <CredentialSection participant={participant} />;
    case "delivery":
      return <DeliverySection participant={participant} />;
    default:
      return (
        <PersonalDataPanel
          items={buildPersonalData(participant, formatDateTime, formatCalendarDate)}
          canEdit={!isMockParticipantId(participant.id)}
          onEdit={onEdit}
        />
      );
  }
}
