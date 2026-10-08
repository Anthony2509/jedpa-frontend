import { Field } from "@/shared/ui/Field";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { IDENTITY_TYPES, IDENTITY_TYPE_LABELS } from "../domain/participantTypes";
import type { IdentityType } from "../types";

export interface IdentityValues {
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  lastName: string;
}

interface IdentityFieldsProps {
  values: IdentityValues;
  onChange: (key: keyof IdentityValues, value: string) => void;
}

const ID_OPTIONS = IDENTITY_TYPES.map((type) => ({ value: type, label: IDENTITY_TYPE_LABELS[type] }));

export function IdentityFields({ values, onChange }: IdentityFieldsProps) {
  return (
    <>
      <Field label="Tipo de documento" required>
        <Select value={values.idType} options={ID_OPTIONS} onChange={(v) => onChange("idType", v)} />
      </Field>
      <Field label="Número de documento" required>
        <TextInput value={values.idNumber} onChange={(e) => onChange("idNumber", e.target.value.trim())} />
      </Field>
      <Field label="Nombres" required>
        <TextInput value={values.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
      </Field>
      <Field label="Apellidos" required>
        <TextInput value={values.lastName} onChange={(e) => onChange("lastName", e.target.value)} />
      </Field>
    </>
  );
}
