import { FilterBar } from "@/shared/ui/FilterBar";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Select } from "@/shared/ui/Select";
import { AUDIT_ACTIONS, AUDIT_ACTION_LABELS } from "../domain/auditActions";
import type { AuditFilters } from "../types";

interface AuditFiltersBarProps {
  filters: AuditFilters;
  userNames: string[];
  onChange: (key: keyof AuditFilters, value: string) => void;
}

const ACTION_OPTIONS = AUDIT_ACTIONS.map((action) => ({ value: action, label: AUDIT_ACTION_LABELS[action] }));

export function AuditFiltersBar({ filters, userNames, onChange }: AuditFiltersBarProps) {
  return (
    <FilterBar>
      <SearchInput value={filters.search} placeholder="Buscar por participante" onChange={(v) => onChange("search", v)} />
      <Select
        value={filters.userName}
        placeholder="Todos los usuarios"
        options={userNames.map((name) => ({ value: name, label: name }))}
        onChange={(v) => onChange("userName", v)}
      />
      <Select value={filters.action} placeholder="Todas las acciones" options={ACTION_OPTIONS} onChange={(v) => onChange("action", v)} />
    </FilterBar>
  );
}
