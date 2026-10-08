"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { describeDiscipline, useParticipants } from "@/features/participants";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { BulkDeliveryModal } from "../components/BulkDeliveryModal";
import { DelegationActions } from "../components/DelegationActions";
import { DelegationMembersTable } from "../components/DelegationMembersTable";
import { buildDelegations } from "../domain/buildDelegations";
import { useDelegationBulk } from "../hooks/useDelegationBulk";

export function DelegationDetailContainer() {
  const router = useRouter();
  const { code } = useParams<{ code: string }>();
  const delegation = buildDelegations(useParticipants()).find((d) => d.code === decodeURIComponent(code));
  const bulk = useDelegationBulk(delegation);

  if (!delegation) return <EmptyState message="No se encontró la delegación." />;
  const { info } = delegation;

  return (
    <>
      <Link href="/delegations" className="mb-4 inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="size-3.5" /> Delegaciones
      </Link>
      <PageHeader
        eyebrow={`Macrorregión ${info.macro} · ${info.region}`}
        title={delegation.code}
        description={`${describeDiscipline(info)}, categoría ${info.category} · ${delegation.members.length} integrantes`}
      />
      <DelegationActions
        readyToPrint={delegation.readyToPrint}
        toDeliver={delegation.toDeliver}
        pendingDocuments={delegation.pendingDocuments}
        onPrintReady={bulk.printReady}
        onDeliverAll={bulk.openDelivery}
      />
      <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">Integrantes</h2>
      <DelegationMembersTable members={delegation.members} onOpen={(p) => router.push(`/participants/${p.id}`)} />
      <BulkDeliveryModal
        open={bulk.deliveryOpen}
        count={delegation.toDeliver}
        delegationCode={delegation.code}
        placeOptions={bulk.placeOptions}
        placeId={bulk.placeId}
        observation={bulk.observation}
        onPlaceChange={bulk.setPlaceId}
        onObservationChange={bulk.setObservation}
        onConfirm={bulk.deliverAll}
        onClose={bulk.closeDelivery}
      />
    </>
  );
}
