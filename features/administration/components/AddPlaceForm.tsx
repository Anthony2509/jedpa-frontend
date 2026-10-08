import type { FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { TextInput } from "@/shared/ui/TextInput";

interface AddPlaceFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AddPlaceForm({ value, onChange, onSubmit }: AddPlaceFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={handleSubmit} className="mb-4 flex max-w-xl gap-2">
      <TextInput value={value} placeholder="Nombre del nuevo lugar" onChange={(e) => onChange(e.target.value)} />
      <Button type="submit" icon={<Plus className="size-4" />} disabled={!value.trim()}>
        Agregar
      </Button>
    </form>
  );
}
