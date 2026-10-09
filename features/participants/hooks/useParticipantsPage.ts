"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { STATUS_TO_API } from "../services/apiCodes";
import { PARTICIPANTS_QUERY, fetchParticipantsPage } from "../services/participantsApi";
import type { ParticipantFilters, ParticipantStatus } from "../types";

export const PARTICIPANTS_PAGE_SIZE = 20;

/** One page of the participants list, filtered on the server. */
export function useParticipantsPage(filters: ParticipantFilters, page: number) {
  const params = {
    search: filters.search,
    status: filters.status ? STATUS_TO_API[filters.status as ParticipantStatus] : undefined,
    macroRegionId: filters.macro,
    participantTypeId: filters.type,
    page,
    limit: PARTICIPANTS_PAGE_SIZE,
  };
  return useApiQuery(`${PARTICIPANTS_QUERY}?${JSON.stringify(params)}`, () => fetchParticipantsPage(params));
}
