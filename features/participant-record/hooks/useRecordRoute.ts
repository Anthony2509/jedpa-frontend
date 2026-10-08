"use client";

import { useParams, useSearchParams } from "next/navigation";
import { parseWorkQueueId } from "@/features/participants";
import { parseRecordStepId } from "../domain/recordSteps";

/** Reads the record URL: /participants/[id]?from=<queue>&step=<step> */
export function useRecordRoute() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  return {
    id,
    fromQueue: parseWorkQueueId(searchParams.get("from")),
    initialStep: parseRecordStepId(searchParams.get("step")),
  };
}
