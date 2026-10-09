"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchParticipantsPage } from "@/features/participants";
import { useApiQuery } from "@/shared/lib/useApiQuery";

const MAX_RESULTS = 6;
const SEARCH_DELAY_MS = 300;
const MIN_LENGTH = 2;

/** Searches the API (name, document or school) after a short pause in typing. */
export function useGlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setTerm(query.trim()), SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const active = term.length >= MIN_LENGTH && term === query.trim();
  const results = useApiQuery(active ? `participants:search:${term}` : null, () => fetchParticipantsPage({ search: term, limit: MAX_RESULTS }));

  function open(participantId: string) {
    setQuery("");
    router.push(`/participants/${participantId}`);
  }

  return { query, setQuery, matches: active ? (results.data?.data ?? []) : [], open };
}
