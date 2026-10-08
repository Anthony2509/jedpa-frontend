import { RequirePermission } from "@/features/auth";
import { DeliveryPlacesContainer } from "@/features/administration";

export default function DeliveryPlacesPage() {
  return (
    <RequirePermission permission="administration">
      <DeliveryPlacesContainer />
    </RequirePermission>
  );
}
