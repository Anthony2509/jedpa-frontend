import { FilterBar } from "@/shared/ui/FilterBar";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { API_ACTION_OPTIONS } from "../domain/apiAuditMapping";
import type { AuditApiFilters } from "../types";

interface AuditApiFiltersBarProps {
  filters: AuditApiFilters;
  userOptions: SelectOption[];
  onChange: (key: keyof AuditApiFilters, value: string) => void;
}

export function AuditApiFiltersBar({ filters, userOptions, onChange }: AuditApiFiltersBarProps) {
  return (
    <FilterBar>
      <Select value={filters.userId} placeholder="Todos los usuarios" options={userOptions} onChange={(v) => onChange("userId", v)} />
      <Select value={filters.action} placeholder="Todas las acciones" options={API_ACTION_OPTIONS} onChange={(v) => onChange("action", v)} />
      <TextInput type="date" aria-label="Desde" value={filters.from} onChange={(e) => onChange("from", e.target.value)} />
      <TextInput type="date" aria-label="Hasta" value={filters.to} onChange={(e) => onChange("to", e.target.value)} />
    </FilterBar>
  );
}
