import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import type { DeliveryPlace } from "../types";

interface DeliveryPlacesTableProps {
  places: DeliveryPlace[];
  onToggleActive: (place: DeliveryPlace) => void;
}

export function DeliveryPlacesTable({ places, onToggleActive }: DeliveryPlacesTableProps) {
  const columns: Column<DeliveryPlace>[] = [
    {
      key: "name",
      header: "Lugar",
      render: (p) => (
        <div className="leading-snug">
          <p className={p.active ? "font-medium text-neutral-950" : "font-medium text-neutral-400"}>{p.name}</p>
          {!p.active && <p className="text-xs text-neutral-500 md:hidden">Inactivo · no aparece al registrar entregas</p>}
        </div>
      ),
    },
    { key: "status", header: "Estado", mobile: "hidden", render: (p) => <Badge tone={p.active ? "muted" : "outline"}>{p.active ? "Activo" : "Inactivo"}</Badge> },
    {
      key: "actions",
      header: "",
      className: "w-px text-right",
      render: (p) => (
        <Button size="sm" variant="secondary" onClick={() => onToggleActive(p)}>
          {p.active ? "Desactivar" : "Activar"}
        </Button>
      ),
    },
  ];
  return <DataTable columns={columns} rows={places} getRowKey={(p) => p.id} />;
}
