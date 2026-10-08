import { createStore } from "@/shared/lib/createStore";
import type { Role, User } from "../types";

/** Mock session. Will be replaced by the real authentication API. */
export const sessionStore = createStore<User>({
  id: "u-1",
  name: "Ana Torres",
  email: "ana.torres@ipd.gob.pe",
  role: "admin",
  active: true,
});

export function getCurrentUser(): User {
  return sessionStore.getSnapshot();
}

/** Prototype only: lets the team preview the app as each role. */
export function setDemoRole(role: Role): void {
  sessionStore.update((user) => ({ ...user, role }));
}

export async function login(email: string, password: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!email || !password) throw new Error("Ingresa tu correo y contraseña.");
  return getCurrentUser();
}
