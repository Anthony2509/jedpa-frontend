import { ApiError, apiGet, apiPost, setApiToken, setUnauthorizedHandler } from "@/shared/lib/apiClient";
import { createStore } from "@/shared/lib/createStore";
import { clearQueryCache } from "@/shared/lib/useApiQuery";
import type { SessionState, User } from "../types";
import { fromApiRole } from "./apiRoles";

interface SessionUserDto {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface LoginResponseDto {
  accessToken: string;
  user: SessionUserDto;
}

/** Token lives in memory plus sessionStorage (not localStorage): it dies with the tab. */
const TOKEN_KEY = "jedpa.accessToken";

/** Placeholder while there is no session; screens never render with it (AuthGuard). */
const NO_USER: User = { id: "", name: "", email: "", role: "operator", active: false };

export const sessionStore = createStore<SessionState>({ status: "loading", user: null });

let restoring: Promise<void> | null = null;

function toUser(dto: SessionUserDto): User {
  return { id: dto.id, name: dto.fullName, email: dto.email, role: fromApiRole(dto.role), active: true };
}

function storeToken(token: string | null): void {
  setApiToken(token);
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage blocked (private mode): the session still works until the tab is reloaded.
  }
}

function readToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getCurrentUser(): User {
  return sessionStore.getSnapshot().user ?? NO_USER;
}

export async function login(email: string, password: string): Promise<User> {
  if (!email.trim() || !password) throw new Error("Ingresa tu correo y contraseña.");
  const response = await apiPost<LoginResponseDto>("/auth/login", { email: email.trim(), password });
  const user = toUser(response.user);
  storeToken(response.accessToken);
  clearQueryCache();
  sessionStore.update(() => ({ status: "authenticated", user }));
  return user;
}

export function logout(): void {
  storeToken(null);
  clearQueryCache();
  restoring = null;
  sessionStore.update(() => ({ status: "anonymous", user: null }));
}

/** On app load: validates the saved token with /auth/me. Safe to call many times. */
export function restoreSession(): Promise<void> {
  if (sessionStore.getSnapshot().status !== "loading") return Promise.resolve();
  restoring ??= (async () => {
    const token = readToken();
    if (!token) return logout();
    setApiToken(token);
    try {
      const user = toUser(await apiGet<SessionUserDto>("/auth/me"));
      sessionStore.update(() => ({ status: "authenticated", user }));
    } catch (error) {
      // 401 already logged out through the handler; any other failure also asks to sign in again.
      if (!(error instanceof ApiError && error.status === 401)) logout();
    }
  })();
  return restoring;
}

// Any 401 on an authenticated request (expired token, deactivated user) ends the session.
setUnauthorizedHandler(logout);
