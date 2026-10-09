"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { InlineError } from "@/shared/ui/InlineError";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Pagination } from "@/shared/ui/Pagination";
import { RolesOverview } from "../components/RolesOverview";
import { UserFormModal } from "../components/UserFormModal";
import { UsersTable } from "../components/UsersTable";
import { useUserActivation } from "../hooks/useUserActivation";
import { useUserForm } from "../hooks/useUserForm";
import { useRoleOptions, useUsers } from "../hooks/useUsers";

export function UsersContainer() {
  const users = useUsers();
  const form = useUserForm(useRoleOptions());
  const activation = useUserActivation();
  const meta = users.data?.meta;

  return (
    <>
      <PageHeader
        title="Usuarios"
        description="Usuarios administrativos con acceso a la plataforma."
        actions={<Button icon={<Plus className="size-4" />} onClick={() => form.openForm()}>Nuevo usuario</Button>}
      />
      <div className="space-y-6">
        <InlineError message={activation.error} />
        {users.data ? (
          <div>
            <UsersTable users={users.data.data} disabled={activation.busy} onEdit={form.openForm} onToggleActive={activation.toggle} />
            {meta && <Pagination page={meta.page} pageCount={meta.totalPages} total={meta.total} onChange={users.setPage} />}
          </div>
        ) : (
          <EmptyState message={users.error ?? "Cargando usuarios…"} />
        )}
        <RolesOverview />
      </div>
      <UserFormModal
        open={form.open}
        isEditing={form.isEditing}
        draft={form.draft}
        error={form.error}
        submitting={form.submitting}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </>
  );
}
