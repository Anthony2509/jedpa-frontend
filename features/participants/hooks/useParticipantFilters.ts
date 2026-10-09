"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ParticipantFilters } from "../types";

const SEARCH_DELAY_MS = 350;

/** Filters live in the URL (shareable, survive reloads). The search box waits for a pause in typing. */
export function useParticipantFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters: ParticipantFilters = {
    search: params.get("q") ?? "",
    status: params.get("status") ?? "",
    macro: params.get("macro") ?? "",
    type: params.get("type") ?? "",
  };
  const page = Math.max(1, Number(params.get("page")) || 1);
  const [searchInput, setSearchInput] = useState(filters.search);

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!("page" in changes)) next.delete("page");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  useEffect(() => {
    if (searchInput === filters.search) return;
    const timer = setTimeout(() => update({ q: searchInput.trim() }), SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  });

  function setFilter(key: keyof ParticipantFilters, value: string) {
    if (key === "search") return setSearchInput(value);
    update({ [key]: value });
  }

  return { filters: { ...filters, search: searchInput }, applied: filters, page, setFilter, setPage: (n: number) => update({ page: String(n) }) };
}
