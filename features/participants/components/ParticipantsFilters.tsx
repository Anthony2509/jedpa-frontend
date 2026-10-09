import { FilterBar } from "@/shared/ui/FilterBar";
import { SearchInput } from "@/shared/ui/SearchInput";
import type { SelectOption } from "@/shared/ui/Select";
import { Select } from "@/shared/ui/Select";
import { PARTICIPANT_STATUSES, PARTICIPANT_STATUS_META } from "../domain/participantStatus";
import type { ParticipantFilters } from "../types";

interface ParticipantsFiltersProps {
  filters: ParticipantFilters;
  macroOptions: SelectOption[];
  typeOptions: SelectOption[];
  onChange: (key: keyof ParticipantFilters, value: string) => void;
}

// "Emitida" exists only in the mock flow: the API prints and issues in one step.
const STATUS_OPTIONS = PARTICIPANT_STATUSES.filter((status) => status !== "issued").map((status) => ({
  value: status,
  label: PARTICIPANT_STATUS_META[status].label,
}));

export function ParticipantsFilters({ filters, macroOptions, typeOptions, onChange }: ParticipantsFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={filters.search}
        placeholder="Buscar por nombre, documento o colegio"
        onChange={(value) => onChange("search", value)}
      />
      <Select value={filters.status} placeholder="Todos los estados" options={STATUS_OPTIONS} onChange={(v) => onChange("status", v)} />
      <Select value={filters.macro} placeholder="Todas las macros" options={macroOptions} onChange={(v) => onChange("macro", v)} />
      <Select value={filters.type} placeholder="Todos los tipos" options={typeOptions} onChange={(v) => onChange("type", v)} />
    </FilterBar>
  );
}
