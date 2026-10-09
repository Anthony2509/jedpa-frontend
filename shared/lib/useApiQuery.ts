"use client";

import { useEffect } from "react";
import { createStore } from "./createStore";
import { getErrorMessage } from "./apiClient";
import { useStore } from "./useStore";

interface QueryEntry {
  data?: unknown;
  error?: string;
  /** Marked by invalidateQueries: refetched on the next render, keeping the old data meanwhile. */
  stale: boolean;
}

/**
 * Client-side cache keyed by string. Only filled from effects, so it stays empty on the
 * server and is never shared between requests or users.
 */
const queryCache = createStore<Record<string, QueryEntry>>({});
const inFlight = new Set<string>();

function setEntry(key: string, entry: QueryEntry): void {
  queryCache.update((cache) => ({ ...cache, [key]: entry }));
}

async function load(key: string, fetcher: () => Promise<unknown>): Promise<void> {
  inFlight.add(key);
  const previous = queryCache.getSnapshot()[key];
  try {
    setEntry(key, { data: await fetcher(), stale: false });
  } catch (error) {
    setEntry(key, { data: previous?.data, error: getErrorMessage(error), stale: false });
  } finally {
    inFlight.delete(key);
  }
}

/** Refetches every query whose key starts with the prefix (call it after a mutation). */
export function invalidateQueries(prefix: string): void {
  queryCache.update((cache) =>
    Object.fromEntries(Object.entries(cache).map(([key, entry]) => [key, key.startsWith(prefix) ? { ...entry, stale: true } : entry])),
  );
}

/** Drops everything (logout), so the next user never sees the previous user's data. */
export function clearQueryCache(): void {
  queryCache.update(() => ({}));
}

/**
 * Loads `fetcher` once per key and shares the result between components.
 * Pass `null` as key to wait (for example, until another query returns an id).
 */
export function useApiQuery<T>(key: string | null, fetcher: () => Promise<T>) {
  const cache = useStore(queryCache);
  const entry = key ? cache[key] : undefined;

  useEffect(() => {
    if (!key || inFlight.has(key)) return;
    const current = queryCache.getSnapshot()[key];
    if (!current || current.stale) void load(key, fetcher);
  });

  return {
    data: entry?.data as T | undefined,
    error: entry?.error ?? null,
    loading: Boolean(key) && entry?.data === undefined && !entry?.error,
    reload: () => key && invalidateQueries(key),
  };
}

