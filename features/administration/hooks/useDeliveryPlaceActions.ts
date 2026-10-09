"use client";

import { useState } from "react";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { addDeliveryPlace, setDeliveryPlaceActive } from "../services/deliveryPlacesApi";
import type { DeliveryPlace } from "../types";

export function useDeliveryPlaceActions() {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run(action: () => Promise<void>): Promise<boolean> {
    setBusy(true);
    setError(null);
    try {
      await action();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function add() {
    if (!newName.trim() || busy) return;
    if (await run(() => addDeliveryPlace(newName))) setNewName("");
  }

  const toggle = (place: DeliveryPlace) => run(() => setDeliveryPlaceActive(place.id, !place.active));

  return { newName, setNewName, error, busy, add, toggle };
}
