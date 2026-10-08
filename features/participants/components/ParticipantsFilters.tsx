import { FilterBar } from "@/shared/ui/FilterBar";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Select } from "@/shared/ui/Select";
import { MACROS } from "../domain/macros";
import { PARTICIPANT_STATUSES, PARTICIPANT_STATUS_META } from "../domain/participantStatus";
import { PARTICIPANT_TYPES, PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import type { ParticipantFilters } from "../types";

interface ParticipantsFiltersProps {
  filters: ParticipantFilters;
  showStatus?: boolean;
  onChange: (key: keyof ParticipantFilters, value: string) => void;
}

const STATUS_OPTIONS = PARTICIPANT_STATUSES.map((status) => ({ value: status, label: PARTICIPANT_STATUS_META[status].label }));
const TYPE_OPTIONS = PARTICIPANT_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));
const MACRO_OPTIONS = MACROS.map((macro) => ({ value: macro, label: `Macro ${macro.slice(1)}` }));

export function ParticipantsFilters({ filters, showStatus = true, onChange }: ParticipantsFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={filters.search}
        placeholder="Buscar por nombre, documento o delegación"
        onChange={(value) => onChange("search", value)}
      />
      {showStatus && (
        <Select value={filters.status} placeholder="Todos los estados" options={STATUS_OPTIONS} onChange={(v) => onChange("status", v)} />
      )}
      <Select value={filters.macro} placeholder="Todas las macros" options={MACRO_OPTIONS} onChange={(v) => onChange("macro", v)} />
      <Select value={filters.type} placeholder="Todos los tipos" options={TYPE_OPTIONS} onChange={(v) => onChange("type", v)} />
    </FilterBar>
  );
}
