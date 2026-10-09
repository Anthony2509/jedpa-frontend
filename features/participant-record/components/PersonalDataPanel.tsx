import { Pencil } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { DefinitionList, type DefinitionItem } from "@/shared/ui/DefinitionList";

interface PersonalDataPanelProps {
  items: DefinitionItem[];
  canEdit: boolean;
  onEdit: () => void;
}

export function PersonalDataPanel({ items, canEdit, onEdit }: PersonalDataPanelProps) {
  return (
    <div>
      <DefinitionList items={items} />
      {canEdit && (
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" size="sm" icon={<Pencil className="size-3.5" />} onClick={onEdit}>Editar datos</Button>
        </div>
      )}
    </div>
  );
}
