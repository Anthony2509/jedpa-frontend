"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { RolesOverview } from "../components/RolesOverview";
import { UserFormModal } from "../components/UserFormModal";
import { UsersTable } from "../components/UsersTable";
import { useUserForm } from "../hooks/useUserForm";
import { useUsers } from "../hooks/useUsers";
import { toggleUserActive } from "../services/usersApi";

export function UsersContainer() {
  const users = useUsers();
  const form = useUserForm();

  return (
    <>
      <PageHeader
        title="Usuarios"
        description="Usuarios administrativos con acceso a la plataforma."
        actions={<Button icon={<Plus className="size-4" />} onClick={() => form.openForm()}>Nuevo usuario</Button>}
      />
      <div className="space-y-6">
        <UsersTable users={users} onEdit={form.openForm} onToggleActive={(user) => toggleUserActive(user.id)} />
        <RolesOverview />
      </div>
      <UserFormModal
        open={form.open}
        isEditing={form.isEditing}
        draft={form.draft}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </>
  );
}
