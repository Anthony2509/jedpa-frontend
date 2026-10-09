import { Field } from "@/shared/ui/Field";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { PERSON_GENDER_LABELS } from "../domain/participantTypes";
import type { PersonGender } from "../types";

export interface PersonValues {
  personGender: PersonGender | "";
  birthDate: string;
}

interface PersonFieldsProps {
  values: PersonValues;
  required: boolean;
  onChange: (key: keyof PersonValues, value: string) => void;
}

const GENDER_OPTIONS = (Object.keys(PERSON_GENDER_LABELS) as PersonGender[]).map((g) => ({ value: g, label: PERSON_GENDER_LABELS[g] }));

/** Required for delegation members (the API needs them to place the athlete in a category). */
export function PersonFields({ values, required, onChange }: PersonFieldsProps) {
  return (
    <>
      <Field label="Sexo" required={required}>
        <Select value={values.personGender} placeholder="Selecciona" options={GENDER_OPTIONS} onChange={(v) => onChange("personGender", v)} />
      </Field>
      <Field label="Fecha de nacimiento" htmlFor="birth-date" required={required}>
        <TextInput id="birth-date" type="date" value={values.birthDate} onChange={(e) => onChange("birthDate", e.target.value)} />
      </Field>
    </>
  );
}
