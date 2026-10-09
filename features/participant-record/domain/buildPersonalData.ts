import {
  ACCESS_LABELS,
  GENDER_LABELS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_TYPE_LABELS,
  PERSON_GENDER_LABELS,
  getDelegationCode,
  type Participant,
} from "@/features/participants";
import type { DefinitionItem } from "@/shared/ui/DefinitionList";

type FormatDate = (iso: string) => string;

export function buildPersonalData(participant: Participant, formatDateTime: FormatDate, formatCalendarDate: FormatDate): DefinitionItem[] {
  const api = participant.api;
  const identity: DefinitionItem[] = [
    { label: "Nombres", value: participant.firstName },
    { label: "Apellidos", value: participant.lastName },
    { label: IDENTITY_TYPE_LABELS[participant.idType], value: participant.idNumber },
    { label: "Tipo de participante", value: PARTICIPANT_TYPE_LABELS[participant.type] },
  ];
  const person: DefinitionItem[] = api
    ? [
        { label: "Sexo", value: api.gender ? PERSON_GENDER_LABELS[api.gender] : undefined },
        { label: "Fecha de nacimiento", value: api.birthDate ? formatCalendarDate(api.birthDate) : undefined },
      ]
    : [];
  const d = participant.delegation;
  const context: DefinitionItem[] = d
    ? [
        { label: "Delegación", value: getDelegationCode(participant) },
        { label: "Macrorregión / Región", value: d.region ? `${d.macro} · ${d.region}` : d.macro },
        { label: "Disciplina", value: `${d.sport} ${GENDER_LABELS[d.gender].toLowerCase()} · categoría ${d.category}` },
        { label: "Institución educativa", value: participant.school },
      ]
    : [
        { label: "Servicio / Institución", value: participant.institution },
        { label: "Acceso", value: participant.access ? ACCESS_LABELS[participant.access] : "Por definir" },
      ];
  return [...identity, ...person, ...context, { label: "Fecha de registro", value: formatDateTime(participant.createdAt) }];
}
