import { Field } from "@/shared/ui/Field";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { GENDER_LABELS, MACROS, buildDelegationCode } from "../domain/macros";
import { CATEGORIES, SPORTS } from "../domain/sports";
import type { Gender, MacroId, ParticipantDraft } from "../types";

type DelegationKey = "macro" | "region" | "sport" | "category" | "gender" | "school";

interface DelegationFieldsProps {
  draft: ParticipantDraft;
  onChange: (key: DelegationKey, value: string) => void;
}

const options = (values: string[]) => values.map((value) => ({ value, label: value }));
const GENDER_OPTIONS = (["V", "D"] as Gender[]).map((g) => ({ value: g, label: GENDER_LABELS[g] }));

export function DelegationFields({ draft, onChange }: DelegationFieldsProps) {
  const complete = draft.macro && draft.sportCode && draft.category && draft.gender;
  const code = complete
    ? buildDelegationCode({ macro: draft.macro as MacroId, sportCode: draft.sportCode, category: draft.category, gender: draft.gender as Gender })
    : "Completa los datos deportivos";

  return (
    <>
      <Field label="Macrorregión" required>
        <Select value={draft.macro} placeholder="Selecciona" options={options(MACROS)} onChange={(v) => onChange("macro", v)} />
      </Field>
      <Field label="Región" required>
        <TextInput value={draft.region} onChange={(e) => onChange("region", e.target.value)} />
      </Field>
      <Field label="Disciplina" required>
        <Select value={draft.sport} placeholder="Selecciona" options={options(SPORTS.map((s) => s.sport))} onChange={(v) => onChange("sport", v)} />
      </Field>
      <Field label="Categoría" required>
        <Select value={draft.category} placeholder="Selecciona" options={options(CATEGORIES)} onChange={(v) => onChange("category", v)} />
      </Field>
      <Field label="Género" required>
        <Select value={draft.gender} placeholder="Selecciona" options={GENDER_OPTIONS} onChange={(v) => onChange("gender", v)} />
      </Field>
      <Field label="Institución educativa">
        <TextInput value={draft.school} onChange={(e) => onChange("school", e.target.value)} />
      </Field>
      <div className="sm:col-span-2 rounded-md bg-neutral-50 px-4 py-3 text-sm">
        <span className="text-neutral-500">Delegación: </span>
        <span className="font-semibold text-neutral-900">{code}</span>
      </div>
    </>
  );
}
