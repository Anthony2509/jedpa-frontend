import { createStore } from "@/shared/lib/createStore";
import { MOCK_DELIVERY_PLACES } from "../mocks/deliveryPlaces";
import type { DeliveryPlace } from "../types";

export const deliveryPlacesStore = createStore<DeliveryPlace[]>(MOCK_DELIVERY_PLACES);

export function addDeliveryPlace(name: string): void {
  const place: DeliveryPlace = { id: `place-${Date.now()}`, name: name.trim(), active: true };
  deliveryPlacesStore.update((places) => [...places, place]);
}

export function toggleDeliveryPlace(id: string): void {
  deliveryPlacesStore.update((places) =>
    places.map((place) => (place.id === id ? { ...place, active: !place.active } : place)),
  );
}
