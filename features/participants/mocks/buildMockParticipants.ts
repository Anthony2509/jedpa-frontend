import { DEFAULT_ACCESS } from "../domain/participantTypes";
import { MACROS } from "../domain/macros";
import type { MacroId, Participant, ParticipantType } from "../types";
import { buildCredential } from "./buildCredential";
import { buildDocuments } from "./buildDocuments";
import * as seed from "./seedData";

const BASE_TIME = Date.UTC(2026, 8, 20, 14);
const HOUR = 3_600_000;
const MEMBERS: ParticipantType[] = ["delegate", "coach", "athlete", "athlete", "athlete", "athlete"];

interface Slot {
  index: number;
  scenario: number;
  type: ParticipantType;
}

function basePerson({ index, scenario, type }: Slot, macro?: MacroId) {
  const idNumber = String(70123456 + index * 104729).slice(0, 8);
  const later = (hours: number) => new Date(BASE_TIME + (index * 2 + hours) * HOUR).toISOString();
  return {
    id: `p-${index + 1}`,
    idType: index % 9 === 4 ? ("ce" as const) : ("dni" as const),
    idNumber,
    firstName: seed.FIRST_NAMES[index % seed.FIRST_NAMES.length],
    lastName: seed.LAST_NAMES[(index * 5) % seed.LAST_NAMES.length],
    type,
    access: DEFAULT_ACCESS[type],
    documents: buildDocuments(type, scenario, idNumber, later(24), macro),
    credential: scenario >= 4 ? buildCredential(index, scenario, later) : undefined,
    createdAt: later(0),
  };
}

function buildDelegationMembers(macroIndex: number, delegationIndex: number, startIndex: number): Participant[] {
  const macro = MACROS[macroIndex];
  const regions = seed.MACRO_REGIONS[macro];
  const sport = seed.SPORTS[(macroIndex * 2 + delegationIndex) % seed.SPORTS.length];
  const delegation = {
    macro,
    region: regions[delegationIndex % regions.length],
    sport: sport.sport,
    sportCode: sport.code,
    category: seed.CATEGORIES[(macroIndex + delegationIndex) % seed.CATEGORIES.length],
    gender: (macroIndex + delegationIndex) % 2 === 0 ? ("D" as const) : ("V" as const),
  };
  const delegationNumber = macroIndex * 2 + delegationIndex;
  return MEMBERS.map((memberType, member) => {
    const index = startIndex + member;
    const isCompanion = memberType === "athlete" && member === 5 && delegationNumber % 3 === 0;
    const type = isCompanion ? "companion" : memberType;
    // M8 has no directoral resolution uploaded yet (see resolutions mock), so it cannot go past review.
    const raw = (delegationNumber + (member % 2)) % 7;
    const scenario = macro === "M8" ? Math.min(raw, 1) : raw;
    return { ...basePerson({ index, scenario, type }, macro), school: seed.SCHOOLS[index % seed.SCHOOLS.length], delegation };
  });
}

function buildSpecials(startIndex: number): Participant[] {
  return seed.SPECIAL_PEOPLE.map((person, offset) => {
    const index = startIndex + offset;
    const scenario = [3, 3, 4, 5, 6, 3][offset];
    return { ...basePerson({ index, scenario, type: person.type }), institution: person.institution };
  });
}

/** 8 macros × 2 delegations × 6 members, plus special credentials. Deterministic. */
export function buildMockParticipants(): Participant[] {
  const members = MACROS.flatMap((_, macroIndex) =>
    [0, 1].flatMap((delegationIndex) =>
      buildDelegationMembers(macroIndex, delegationIndex, (macroIndex * 2 + delegationIndex) * MEMBERS.length),
    ),
  );
  return [...members, ...buildSpecials(members.length)];
}
