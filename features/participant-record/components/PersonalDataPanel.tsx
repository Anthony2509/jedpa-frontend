import { Pencil } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { DefinitionList, type DefinitionItem } from "@/shared/ui/DefinitionList";

interface PersonalDataPanelProps {
  items: DefinitionItem[];
}

export function PersonalDataPanel({ items }: PersonalDataPanelProps) {
  return (
    <div>
      <DefinitionList items={items} />
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">Campos provisionales: la lista definitiva sale del Excel original del cliente.</p>
        <Button variant="secondary" size="sm" icon={<Pencil className="size-3.5" />}>Editar datos</Button>
      </div>
    </div>
  );
}
