import { apiGet, apiPost, type Paginated } from "@/shared/lib/apiClient";
import { invalidateQueries } from "@/shared/lib/useApiQuery";
import type { Participant, ParticipantTypeInfo, SpecialDraft } from "../types";
import type { ParticipantDto, ParticipantTypeDto } from "./participantDtos";
import { toCreateSpecialDto, toParticipant, toParticipantTypeInfo } from "./participantMapper";

export const PARTICIPANTS_QUERY = "participants";
export const PARTICIPANT_TYPES_QUERY = "participant-types";

/** The API's maximum page size. */
const MAX_PAGE_SIZE = 100;

export async function fetchParticipantTypes(): Promise<ParticipantTypeInfo[]> {
  const types = await apiGet<ParticipantTypeDto[]>("/participant-types");
  return types.map(toParticipantTypeInfo);
}

export interface ParticipantsByTypes {
  participants: Participant[];
  /** Total in the API; more than `participants.length` means the list was cut. */
  total: number;
}

/**
 * TEMP(backend): the API filters by one type at a time and has no category filter, so this asks
 * once per type and merges the first page of each (up to 100 per type), sorted by last name.
 * Replace with `?category=SPECIAL` and server pagination when the backend adds it.
 */
export async function fetchParticipantsByTypes(typeIds: string[]): Promise<ParticipantsByTypes> {
  const pages = await Promise.all(
    typeIds.map((participantTypeId) =>
      apiGet<Paginated<ParticipantDto>>("/participants", { participantTypeId, page: 1, limit: MAX_PAGE_SIZE }),
    ),
  );
  const participants = pages
    .flatMap((page) => page.data.map(toParticipant))
    .sort((a, b) => a.lastName.localeCompare(b.lastName, "es") || a.firstName.localeCompare(b.firstName, "es"));
  return { participants, total: pages.reduce((sum, page) => sum + page.meta.total, 0) };
}

/** MINEDU, guests and suppliers: no delegation, `institution` required. Admin and coordinator only. */
export async function createSpecialParticipant(draft: SpecialDraft, participantTypeId: string): Promise<Participant> {
  const created = await apiPost<ParticipantDto>("/participants", toCreateSpecialDto(draft, participantTypeId));
  invalidateQueries(PARTICIPANTS_QUERY);
  return toParticipant(created);
}
