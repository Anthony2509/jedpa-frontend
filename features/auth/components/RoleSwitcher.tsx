import type { Role } from "../types";
import { ROLES, ROLE_META } from "../domain/roles";

interface RoleSwitcherProps {
  role: Role;
  onChange: (role: Role) => void;
}

/** Prototype helper, clearly labeled so nobody mistakes it for a real feature. */
export function RoleSwitcher({ role, onChange }: RoleSwitcherProps) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-dashed border-neutral-300 px-2 py-1 text-xs text-neutral-500">
      Ver como
      <select
        value={role}
        onChange={(event) => onChange(event.target.value as Role)}
        className="bg-transparent text-xs font-medium text-neutral-900 focus:outline-none"
      >
        {ROLES.map((item) => (
          <option key={item} value={item}>{ROLE_META[item].label}</option>
        ))}
      </select>
    </label>
  );
}
