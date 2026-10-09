import { Field } from "@/shared/ui/Field";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { IDENTITY_TYPES, IDENTITY_TYPE_LABELS } from "../domain/participantTypes";
import type { IdentityType } from "../types";

export interface IdentityValues {
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
}

interface IdentityFieldsProps {
  values: IdentityValues;
  onChange: (key: keyof IdentityValues, value: string) => void;
}

const ID_OPTIONS = IDENTITY_TYPES.map((type) => ({ value: type, label: IDENTITY_TYPE_LABELS[type] }));

/** Identity as the API stores it: paternal and maternal last names apart. */
export function IdentityFields({ values, onChange }: IdentityFieldsProps) {
  return (
    <>
      <Field label="Tipo de documento" required>
        <Select value={values.idType} options={ID_OPTIONS} onChange={(v) => onChange("idType", v)} />
      </Field>
      <Field label="Número de documento" htmlFor="id-number" required>
        <TextInput id="id-number" value={values.idNumber} onChange={(e) => onChange("idNumber", e.target.value.trim())} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Nombres" htmlFor="first-name" required>
          <TextInput id="first-name" value={values.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
        </Field>
      </div>
      <Field label="Apellido paterno" htmlFor="paternal-last-name" required>
        <TextInput id="paternal-last-name" value={values.paternalLastName} onChange={(e) => onChange("paternalLastName", e.target.value)} />
      </Field>
      <Field label="Apellido materno" htmlFor="maternal-last-name">
        <TextInput id="maternal-last-name" value={values.maternalLastName} onChange={(e) => onChange("maternalLastName", e.target.value)} />
      </Field>
    </>
  );
}
