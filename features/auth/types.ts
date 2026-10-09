/** The 3 user roles defined by the client ("Respuestas preguntas", question 7). */
export type Role = "admin" | "coordinator" | "operator";

export type Permission =
  | "participants"
  | "special_credentials"
  | "diplomas"
  | "reports_basic"
  | "reports_full"
  | "audit"
  | "resolutions"
  | "administration"
  /** Excel import and creating delegations: the API allows only ADMIN and COORDINADOR. */
  | "import_participants"
  | "manage_delegations"
  /** Printer calibration sheet (ADMIN and COORDINADOR in the API). */
  | "calibrate_printer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}

export interface SessionState {
  /** "loading" until the saved token is checked against the API. */
  status: "loading" | "authenticated" | "anonymous";
  user: User | null;
}
