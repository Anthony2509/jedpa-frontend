import { Suspense } from "react";
import { DelegationDetailContainer } from "@/features/delegations";

export default function DelegationPage() {
  return (
    <Suspense fallback={<p className="text-sm text-neutral-500">Cargando delegación…</p>}>
      <DelegationDetailContainer />
    </Suspense>
  );
}
