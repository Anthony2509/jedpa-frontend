import { Field } from "@/shared/ui/Field";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { GENDER_LABELS } from "../domain/macros";
import { CATEGORIES } from "../domain/sports";
import type { Gender, ParticipantDraft } from "../types";

type DelegationKey = "macroRegionId" | "region" | "sportId" | "category" | "gender" | "school";

interface DelegationFieldsProps {
  draft: ParticipantDraft;
  macroOptions: SelectOption[];
  sportOptions: SelectOption[];
  /** Code of the delegation the data points to (M1-AJD-B-D), once complete. */
  delegationCode: string | null;
  onChange: (key: DelegationKey, value: string) => void;
}

const CATEGORY_OPTIONS = CATEGORIES.map((value) => ({ value, label: value }));
const GENDER_OPTIONS = (["V", "D"] as Gender[]).map((g) => ({ value: g, label: GENDER_LABELS[g] }));

export function DelegationFields({ draft, macroOptions, sportOptions, delegationCode, onChange }: DelegationFieldsProps) {
  return (
    <>
      <Field label="Macrorregión" required>
        <Select value={draft.macroRegionId} placeholder="Selecciona" options={macroOptions} onChange={(v) => onChange("macroRegionId", v)} />
      </Field>
      <Field label="Región" htmlFor="region">
        <TextInput id="region" value={draft.region} onChange={(e) => onChange("region", e.target.value)} />
      </Field>
      <Field label="Disciplina" required>
        <Select value={draft.sportId} placeholder="Selecciona" options={sportOptions} onChange={(v) => onChange("sportId", v)} />
      </Field>
      <Field label="Categoría" required>
        <Select value={draft.category} placeholder="Selecciona" options={CATEGORY_OPTIONS} onChange={(v) => onChange("category", v)} />
      </Field>
      <Field label="Rama" required>
        <Select value={draft.gender} placeholder="Selecciona" options={GENDER_OPTIONS} onChange={(v) => onChange("gender", v)} />
      </Field>
      <Field label="Institución educativa" htmlFor="school">
        <TextInput id="school" value={draft.school} onChange={(e) => onChange("school", e.target.value)} />
      </Field>
      <div className="sm:col-span-2 rounded-md bg-neutral-50 px-4 py-3 text-sm">
        <span className="text-neutral-500">Delegación: </span>
        <span className="font-semibold text-neutral-900">{delegationCode ?? "Completa los datos deportivos"}</span>
      </div>
    </>
  );
}
