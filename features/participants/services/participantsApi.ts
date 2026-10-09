import { apiGet, apiPatch, apiPost, type Paginated, type QueryParams } from "@/shared/lib/apiClient";
import { invalidateQueries } from "@/shared/lib/useApiQuery";
import type { Participant, ParticipantEditDraft, ParticipantTypeInfo, SpecialDraft } from "../types";
import type { CredentialCopyDto, DocumentChecklistDto, ParticipantDto, ParticipantTypeDto } from "./participantDtos";
import { toParticipant, toParticipantTypeInfo } from "./participantMapper";
import { toParticipantRecord } from "./recordMapper";
import { toCreateSpecialBody, toUpdateBody } from "./writeMapper";

export const PARTICIPANTS_QUERY = "participants";
export const PARTICIPANT_TYPES_QUERY = "participant-types";
/** Menu counters: kept apart from PARTICIPANTS_QUERY so they are not reloaded on every action. */
export const QUEUE_COUNTS_QUERY = "queue-counts";
/** The API's maximum page size. */
export const MAX_PAGE_SIZE = 100;

export async function fetchParticipantTypes(): Promise<ParticipantTypeInfo[]> {
  const types = await apiGet<ParticipantTypeDto[]>("/participant-types");
  return types.map(toParticipantTypeInfo);
}

/** One page of GET /participants with the given filters (search, status, participantTypeId…). */
export async function fetchParticipantsPage(params: QueryParams): Promise<Paginated<Participant>> {
  const page = await apiGet<Paginated<ParticipantDto>>("/participants", params);
  return { ...page, data: page.data.map(toParticipant) };
}

/** The record: personal data, document checklist and printed copies. */
export async function fetchParticipantRecord(id: string): Promise<Participant> {
  const [participant, checklist, copies] = await Promise.all([
    apiGet<ParticipantDto>(`/participants/${id}`),
    apiGet<DocumentChecklistDto>(`/participants/${id}/documents`),
    apiGet<CredentialCopyDto[]>(`/participants/${id}/credentials`),
  ]);
  return toParticipantRecord(participant, checklist.documents, copies);
}

export interface ParticipantsByTypes {
  participants: Participant[];
  /** Total in the API; more than `participants.length` means the list was cut. */
  total: number;
}

/**
 * TEMP(backend): the API filters by one type at a time and has no category filter, so this asks
 * once per type and merges the first page of each (up to 100 per type), sorted by last name.
 */
export async function fetchParticipantsByTypes(typeIds: string[]): Promise<ParticipantsByTypes> {
  const pages = await Promise.all(typeIds.map((participantTypeId) => fetchParticipantsPage({ participantTypeId, page: 1, limit: MAX_PAGE_SIZE })));
  const participants = pages
    .flatMap((page) => page.data)
    .sort((a, b) => a.lastName.localeCompare(b.lastName, "es") || a.firstName.localeCompare(b.firstName, "es"));
  return { participants, total: pages.reduce((sum, page) => sum + page.meta.total, 0) };
}

/** Several actions in a row (approving 4 documents) update the counters once. */
const COUNTS_DELAY_MS = 1500;
let countsTimer: ReturnType<typeof setTimeout> | undefined;

/** After any change: lists, the record and its history reload now; the menu counters shortly after. */
export function refreshParticipants(): void {
  invalidateQueries(PARTICIPANTS_QUERY);
  invalidateQueries("audit-logs");
  clearTimeout(countsTimer);
  countsTimer = setTimeout(() => invalidateQueries(QUEUE_COUNTS_QUERY), COUNTS_DELAY_MS);
}

/** MINEDU, guests and suppliers: no delegation, `institution` required. Admin and coordinator only. */
export async function createSpecialParticipant(draft: SpecialDraft, participantTypeId: string): Promise<Participant> {
  const created = await apiPost<ParticipantDto>("/participants", toCreateSpecialBody(draft, participantTypeId));
  refreshParticipants();
  return toParticipant(created);
}

export async function updateParticipantData(participant: Participant, draft: ParticipantEditDraft, special: boolean): Promise<void> {
  await apiPatch(`/participants/${participant.id}`, toUpdateBody(draft, special));
  refreshParticipants();
}

/** Same category, so the API allows it; the API recalculates the status. */
export async function changeParticipantType(participantId: string, participantTypeId: string): Promise<void> {
  await apiPatch(`/participants/${participantId}`, { participantTypeId });
  refreshParticipants();
}
