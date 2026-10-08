import { ROLE_META, type User } from "@/features/auth";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { RowSummary } from "@/shared/ui/RowSummary";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleActive: (user: User) => void;
}

function Identity({ user }: { user: User }) {
  return (
    <div className="min-w-0 leading-snug">
      <p className={user.active ? "font-medium text-neutral-950" : "font-medium text-neutral-500"}>{user.name}</p>
      <p className="break-all text-xs text-neutral-500">{user.email}</p>
    </div>
  );
}

// Active is the normal state, so it stays quiet; an inactive account is the exception worth seeing.
const StatusBadge = ({ user }: { user: User }) => <Badge tone={user.active ? "muted" : "outline"}>{user.active ? "Activo" : "Inactivo"}</Badge>;

export function UsersTable({ users, onEdit, onToggleActive }: UsersTableProps) {
  const actions = (u: User) => (
    <div className="flex gap-2 md:justify-end">
      <Button size="sm" variant="ghost" onClick={() => onEdit(u)}>Editar</Button>
      <Button size="sm" variant="secondary" onClick={() => onToggleActive(u)}>{u.active ? "Desactivar" : "Activar"}</Button>
    </div>
  );
  const columns: Column<User>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (u) => (
        <RowSummary title={u.name} subtitle={ROLE_META[u.role].label} note={u.email}>
          <div className="-ml-3">{actions(u)}</div>
        </RowSummary>
      ),
    },
    { key: "name", header: "Usuario", className: "w-[36%]", mobile: "hidden", render: (u) => <Identity user={u} /> },
    { key: "role", header: "Rol", mobile: "hidden", render: (u) => <span className="text-neutral-900">{ROLE_META[u.role].label}</span> },
    { key: "status", header: "Estado", mobile: "action", render: (u) => <StatusBadge user={u} /> },
    { key: "actions", header: "", className: "w-px text-right", mobile: "hidden", render: actions },
  ];
  return <DataTable columns={columns} rows={users} getRowKey={(u) => u.id} />;
}
