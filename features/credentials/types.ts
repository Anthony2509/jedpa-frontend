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

/** Step 3 with the API: print (creates the copy and its QR) and the printed list. */
export type CredentialsView = "print" | "printed";
