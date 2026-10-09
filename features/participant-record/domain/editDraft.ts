import type { Participant, ParticipantEditDraft } from "@/features/participants";

/** The edit form starts from the API data (paternal and maternal last names apart). */
export function buildEditDraft(participant: Participant): ParticipantEditDraft {
  const api = participant.api;
  return {
    idType: participant.idType,
    idNumber: participant.idNumber,
    firstName: participant.firstName,
    paternalLastName: api?.paternalLastName ?? participant.lastName,
    maternalLastName: api?.maternalLastName ?? "",
    personGender: api?.gender ?? "",
    birthDate: api?.birthDate ?? "",
    region: api?.region ?? "",
    school: api?.schoolName ?? participant.school ?? "",
    institution: participant.institution ?? "",
  };
}
