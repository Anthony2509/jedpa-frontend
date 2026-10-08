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
  | "administration";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}
