import { ROLES, ROLE_META } from "@/features/auth";
import { Card } from "@/shared/ui/Card";

export function RolesOverview() {
  return (
    <Card title="Roles definidos por el cliente">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role}>
            <dt className="text-sm font-medium text-neutral-900">{ROLE_META[role].label}</dt>
            <dd className="text-xs text-neutral-500">{ROLE_META[role].description}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
