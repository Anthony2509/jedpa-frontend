"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SpecialFormModal } from "../components/SpecialFormModal";
import { SpecialsTable } from "../components/SpecialsTable";
import { getAccessLabel } from "../domain/accessLabel";
import { useSpecialCredentials } from "../hooks/useSpecialCredentials";
import { useSpecialForm } from "../hooks/useSpecialForm";

export function SpecialCredentialsContainer() {
  const specials = useSpecialCredentials();
  const form = useSpecialForm(specials.specialTypes);
  const shown = specials.participants?.length ?? 0;

  return (
    <>
      <PageHeader
        title="Credenciales especiales"
        description="MINEDU, invitados y proveedores. Se crean sin documentos y pasan directo al paso 3 (Credenciales) para generarlas e imprimirlas."
        actions={
          <Button variant="brand" icon={<Plus className="size-4" />} onClick={form.openForm}>
            Nueva credencial especial
          </Button>
        }
      />
      {specials.participants ? (
        <>
          <SpecialsTable participants={specials.participants} />
          {specials.total > shown && (
            <p className="mt-4 text-sm text-neutral-500">Se muestran {shown} de {specials.total} credenciales especiales.</p>
          )}
        </>
      ) : (
        <EmptyState message={specials.error ?? "Cargando credenciales especiales…"} />
      )}
      <SpecialFormModal
        open={form.open}
        draft={form.draft}
        accessLabel={getAccessLabel(form.selectedType?.access)}
        error={form.error}
        submitting={form.submitting}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </>
  );
}
