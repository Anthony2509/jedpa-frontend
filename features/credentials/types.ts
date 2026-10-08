export interface CredentialField {
  label: string;
  value: string;
}

/** Only the variable data: the card art comes pre-printed from the print shop. */
export interface CredentialCardData {
  typeLabel: string;
  fullName: string;
  identity: string;
  fields: CredentialField[];
  accessLabel?: string;
  code: string;
  qrCells: boolean[][];
}

/** Step 3 is split in two sub-steps: generate (issue) and print. */
export type CredentialsView = "issue" | "print" | "printed";
