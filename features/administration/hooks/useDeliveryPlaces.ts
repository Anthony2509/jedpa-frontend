"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { DELIVERY_PLACES_QUERY, fetchDeliveryPlaces } from "../services/deliveryPlacesApi";
import type { DeliveryPlace } from "../types";

const NO_PLACES: DeliveryPlace[] = [];

export function useDeliveryPlacesQuery() {
  return useApiQuery(DELIVERY_PLACES_QUERY, fetchDeliveryPlaces);
}

/** All places (active and inactive); empty while loading. */
export function useDeliveryPlaces(): DeliveryPlace[] {
  return useDeliveryPlacesQuery().data ?? NO_PLACES;
}
