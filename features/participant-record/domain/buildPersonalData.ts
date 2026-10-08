import {
  ACCESS_LABELS,
  GENDER_LABELS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_TYPE_LABELS,
  getDelegationCode,
  type Participant,
} from "@/features/participants";
import type { DefinitionItem } from "@/shared/ui/DefinitionList";

export function buildPersonalData(participant: Participant, formatDate: (iso: string) => string): DefinitionItem[] {
  const identity: DefinitionItem[] = [
    { label: "Nombres", value: participant.firstName },
    { label: "Apellidos", value: participant.lastName },
    { label: IDENTITY_TYPE_LABELS[participant.idType], value: participant.idNumber },
    { label: "Tipo de participante", value: PARTICIPANT_TYPE_LABELS[participant.type] },
  ];
  const d = participant.delegation;
  const context: DefinitionItem[] = d
    ? [
        { label: "Delegación", value: getDelegationCode(participant) },
        { label: "Macrorregión / Región", value: `${d.macro} · ${d.region}` },
        { label: "Disciplina", value: `${d.sport} ${GENDER_LABELS[d.gender].toLowerCase()} · categoría ${d.category}` },
        { label: "Institución educativa", value: participant.school },
      ]
    : [
        { label: "Servicio / Institución", value: participant.institution },
        { label: "Acceso", value: participant.access ? ACCESS_LABELS[participant.access] : undefined },
      ];
  return [...identity, ...context, { label: "Fecha de registro", value: formatDate(participant.createdAt) }];
}
