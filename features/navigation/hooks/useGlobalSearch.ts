"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { matchesSearch, useParticipants, type Participant } from "@/features/participants";

const MAX_RESULTS = 6;

export function useGlobalSearch() {
  const router = useRouter();
  const participants = useParticipants();
  const [query, setQuery] = useState("");

  const matches: Participant[] = query.trim()
    ? participants.filter((p) => matchesSearch(p, query)).slice(0, MAX_RESULTS)
    : [];

  function open(participantId: string) {
    setQuery("");
    router.push(`/participants/${participantId}`);
  }

  return { query, setQuery, matches, open };
}
