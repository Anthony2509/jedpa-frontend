import type { User } from "@/features/auth";

export interface DeliveryPlace {
  id: string;
  name: string;
  active: boolean;
}

export type UserDraft = Omit<User, "id">;
