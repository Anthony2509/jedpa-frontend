"use client";

import type { ReactNode } from "react";
import { participantsStore } from "../services/participantsStore";

interface ParticipantsDataProviderProps {
  children: ReactNode;
}

/**
 * Initializes the participants data (mock store + its audit history) for every app page,
 * so screens that only read the audit log see the same data on server and client.
 * When the real API exists, this becomes the place for the data-fetching provider.
 */
export function ParticipantsDataProvider({ children }: ParticipantsDataProviderProps) {
  participantsStore.getSnapshot();
  return children;
}
