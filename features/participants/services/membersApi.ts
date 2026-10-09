import { apiGet, apiPost, type Paginated } from "@/shared/lib/apiClient";
import type { Participant, ParticipantDraft } from "../types";
import type { DelegationDto, ParticipantDto } from "./participantDtos";
import { toParticipant } from "./participantMapper";
import { refreshParticipants } from "./participantsApi";
import { toCreateMemberBody } from "./writeMapper";

export class MissingDelegationError extends Error {}

type DelegationKey = Pick<ParticipantDraft, "macroRegionId" | "sportId" | "category" | "gender">;

/** The delegation is unique per macro, sport, category and gender. */
async function findDelegation(key: DelegationKey): Promise<DelegationDto | undefined> {
  const page = await apiGet<Paginated<DelegationDto>>("/delegations", { ...key, isActive: true, limit: 10 });
  return page.data.find((d) => d.category === key.category.toUpperCase() && d.gender === key.gender);
}

/**
 * Registers a delegation member. If the delegation does not exist yet, ADMIN and COORDINADOR create
 * it on the fly; an operator gets MissingDelegationError (the API only lets them create it).
 */
export async function createMember(draft: ParticipantDraft, participantTypeId: string, canCreateDelegation: boolean): Promise<Participant> {
  const key = { macroRegionId: draft.macroRegionId, sportId: draft.sportId, category: draft.category, gender: draft.gender };
  let delegation = await findDelegation(key);
  if (!delegation) {
    if (!canCreateDelegation) throw new MissingDelegationError("Esa delegación todavía no existe. Pídele a un coordinador que la cree.");
    delegation = await apiPost<DelegationDto>("/delegations", key);
  }
  const created = await apiPost<ParticipantDto>("/participants", toCreateMemberBody(draft, participantTypeId, delegation.id));
  refreshParticipants();
  return toParticipant(created);
}
