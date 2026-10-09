import { apiGet, apiPatch, apiPost } from "@/shared/lib/apiClient";
import { invalidateQueries } from "@/shared/lib/useApiQuery";
import type { DeliveryPlace } from "../types";

interface DeliveryPlaceDto {
  id: string;
  name: string;
  isActive: boolean;
}

export const DELIVERY_PLACES_QUERY = "delivery-places";

const toDeliveryPlace = (dto: DeliveryPlaceDto): DeliveryPlace => ({ id: dto.id, name: dto.name, active: dto.isActive });

/** Includes inactive places: the admin screen lists them and the delivery forms filter them out. */
export async function fetchDeliveryPlaces(): Promise<DeliveryPlace[]> {
  const places = await apiGet<DeliveryPlaceDto[]>("/delivery-places", { includeInactive: true });
  return places.map(toDeliveryPlace);
}

export async function addDeliveryPlace(name: string): Promise<void> {
  await apiPost("/delivery-places", { name: name.trim() });
  invalidateQueries(DELIVERY_PLACES_QUERY);
}

export async function setDeliveryPlaceActive(id: string, active: boolean): Promise<void> {
  await apiPatch(`/delivery-places/${id}/active`, { isActive: active });
  invalidateQueries(DELIVERY_PLACES_QUERY);
}
