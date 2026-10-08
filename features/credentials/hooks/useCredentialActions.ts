"use client";

import { issueCredential, printCredential } from "@/features/participants";

export function useCredentialActions(participantId: string) {
  return {
    issue: () => issueCredential(participantId),
    print: () => printCredential(participantId),
  };
}
