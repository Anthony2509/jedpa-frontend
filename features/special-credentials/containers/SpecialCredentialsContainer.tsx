"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { isSpecialType, useParticipants } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SpecialFormModal } from "../components/SpecialFormModal";
import { SpecialsTable } from "../components/SpecialsTable";
import { useSpecialForm } from "../hooks/useSpecialForm";

export function SpecialCredentialsContainer() {
  const router = useRouter();
  const specials = useParticipants().filter((participant) => isSpecialType(participant.type));
  const form = useSpecialForm();

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
      <SpecialsTable participants={specials} onOpen={(p) => router.push(`/participants/${p.id}`)} />
      <SpecialFormModal
        open={form.open}
        draft={form.draft}
        error={form.error}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </>
  );
}
