import type { Role } from "@/features/auth";

export interface DeliveryPlace {
  id: string;
  name: string;
  active: boolean;
}

/** Role option for the user form; `id` is the API's role UUID. */
export interface RoleOption {
  id: string;
  role: Role;
}

export interface UserDraft {
  name: string;
  email: string;
  role: Role;
  /** Required to create; on edit, empty keeps the current password. */
  password: string;
}
