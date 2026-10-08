"use client";

import { useStore } from "@/shared/lib/useStore";
import { deliveryPlacesStore } from "../services/deliveryPlacesApi";

export function useDeliveryPlaces() {
  return useStore(deliveryPlacesStore);
}
