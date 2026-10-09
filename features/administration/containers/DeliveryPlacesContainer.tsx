"use client";

import { EmptyState } from "@/shared/ui/EmptyState";
import { InlineError } from "@/shared/ui/InlineError";
import { PageHeader } from "@/shared/ui/PageHeader";
import { AddPlaceForm } from "../components/AddPlaceForm";
import { DeliveryPlacesTable } from "../components/DeliveryPlacesTable";
import { useDeliveryPlaceActions } from "../hooks/useDeliveryPlaceActions";
import { useDeliveryPlacesQuery } from "../hooks/useDeliveryPlaces";

export function DeliveryPlacesContainer() {
  const query = useDeliveryPlacesQuery();
  const actions = useDeliveryPlaceActions();

  return (
    <>
      <PageHeader
        title="Lugares de entrega"
        description="Catálogo configurable. Los lugares inactivos no aparecen al registrar una entrega."
      />
      <AddPlaceForm value={actions.newName} disabled={actions.busy} onChange={actions.setNewName} onSubmit={actions.add} />
      <InlineError message={actions.error} className="-mt-2 mb-4" />
      {query.data ? (
        <DeliveryPlacesTable places={query.data} disabled={actions.busy} onToggleActive={actions.toggle} />
      ) : (
        <EmptyState message={query.error ?? "Cargando lugares de entrega…"} />
      )}
    </>
  );
}
