import { IDENTITY_TYPES, IDENTITY_TYPE_LABELS, type SpecialDraft } from "@/features/participants";
import { Field } from "@/shared/ui/Field";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";

interface SpecialIdentityFieldsProps {
  values: SpecialDraft;
  onChange: (key: keyof SpecialDraft, value: string) => void;
}

const ID_OPTIONS = IDENTITY_TYPES.map((type) => ({ value: type, label: IDENTITY_TYPE_LABELS[type] }));

/** Identity as the API stores it: paternal and maternal last names apart. */
export function SpecialIdentityFields({ values, onChange }: SpecialIdentityFieldsProps) {
  return (
    <>
      <Field label="Tipo de documento" required>
        <Select value={values.idType} options={ID_OPTIONS} onChange={(v) => onChange("idType", v)} />
      </Field>
      <Field label="Número de documento" htmlFor="special-id-number" required>
        <TextInput id="special-id-number" value={values.idNumber} onChange={(e) => onChange("idNumber", e.target.value.trim())} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Nombres" htmlFor="special-first-name" required>
          <TextInput id="special-first-name" value={values.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
        </Field>
      </div>
      <Field label="Apellido paterno" htmlFor="special-paternal" required>
        <TextInput id="special-paternal" value={values.paternalLastName} onChange={(e) => onChange("paternalLastName", e.target.value)} />
      </Field>
      <Field label="Apellido materno" htmlFor="special-maternal">
        <TextInput id="special-maternal" value={values.maternalLastName} onChange={(e) => onChange("maternalLastName", e.target.value)} />
      </Field>
    </>
  );
}
