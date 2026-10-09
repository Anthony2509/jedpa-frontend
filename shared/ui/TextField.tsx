import { Field } from "./Field";
import { TextInput } from "./TextInput";

interface TextFieldProps {
  label: string;
  id: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

/** A labeled text input: the most common form row. */
export function TextField({ label, id, value, required, onChange }: TextFieldProps) {
  return (
    <Field label={label} htmlFor={id} required={required}>
      <TextInput id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}
