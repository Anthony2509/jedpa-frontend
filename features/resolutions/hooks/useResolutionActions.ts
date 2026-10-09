"use client";

import { useState } from "react";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { fetchResolutionLink, uploadMacroResolution } from "../services/resolutionsRemote";

export function useResolutionActions() {
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function run(macroRegionId: string, action: () => Promise<void>) {
    setBusyId(macroRegionId);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  return {
    error,
    busyId,
    upload: (macroRegionId: string, file: File) => run(macroRegionId, () => uploadMacroResolution(macroRegionId, file)),
    view: (macroRegionId: string) =>
      run(macroRegionId, async () => {
        window.open(await fetchResolutionLink(macroRegionId), "_blank");
      }),
  };
}
