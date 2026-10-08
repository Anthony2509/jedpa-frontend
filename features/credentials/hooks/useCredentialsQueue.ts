"use client";

import { useState } from "react";
import {
  getParticipantStatus,
  issueCredential,
  printCredential,
  useParticipants,
  type Participant,
} from "@/features/participants";
import type { CredentialsView } from "../types";

const VIEW_STATUSES: Record<CredentialsView, string[]> = {
  issue: ["ready_to_print"],
  print: ["issued"],
  printed: ["printed", "delivered"],
};

export function useCredentialsQueue() {
  const participants = useParticipants();
  const [view, setView] = useState<CredentialsView>("issue");

  const byView = (target: CredentialsView) =>
    participants
      .filter((p) => VIEW_STATUSES[target].includes(getParticipantStatus(p)))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const toIssue = byView("issue");
  const toPrint = byView("print");

  async function runAll(list: Participant[], action: (id: string) => Promise<void>) {
    for (const participant of list) await action(participant.id);
  }

  return {
    view,
    setView,
    toIssue,
    toPrint,
    printed: byView("printed"),
    issue: (p: Participant) => issueCredential(p.id),
    print: (p: Participant) => printCredential(p.id),
    issueAll: () => runAll(toIssue, issueCredential),
    printAll: () => runAll(toPrint, printCredential),
  };
}
