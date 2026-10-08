export type RecordStepId = "data" | "documents" | "credential" | "delivery";

export type RecordStepState = "done" | "current" | "locked";

export interface RecordStep {
  id: RecordStepId;
  number: number;
  title: string;
  state: RecordStepState;
  summary: string;
  lockedReason?: string;
}

export interface RecordProblem {
  id: string;
  message: string;
  actionLabel: string;
  stepId: RecordStepId;
}
