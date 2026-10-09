/**
 * HTTP client for the JEDPA API. Generic on purpose: it knows nothing about features.
 * The session (features/auth) gives it the token and what to do on a 401.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const FALLBACK_MESSAGE = "Ocurrió un error inesperado. Intenta de nuevo.";
const NETWORK_MESSAGE = "No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.";
const STATUS_MESSAGES: Record<number, string> = {
  429: "Demasiados intentos. Espera un minuto y vuelve a intentar.",
};

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Paginated list as returned by the API. */
export interface Paginated<T> {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

let authToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export function setApiToken(token: string | null): void {
  authToken = token;
}

/** Called when an authenticated request gets a 401 (expired or invalid session). */
export function setUnauthorizedHandler(handler: () => void): void {
  unauthorizedHandler = handler;
}

function buildUrl(path: string, params?: QueryParams): string {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  const query = search.toString();
  return `${BASE_URL}${path}${query ? `?${query}` : ""}`;
}

/** The API sends `message` as a text or as a list of texts (validation errors). */
async function readErrorMessage(response: Response): Promise<string> {
  if (STATUS_MESSAGES[response.status]) return STATUS_MESSAGES[response.status];
  try {
    const body = (await response.json()) as { message?: unknown };
    if (Array.isArray(body.message)) return body.message.join(" ");
    if (typeof body.message === "string" && body.message) return body.message;
  } catch {
    // Body was not JSON: fall through to the generic message.
  }
  return FALLBACK_MESSAGE;
}

async function request<T>(method: string, path: string, body?: unknown, params?: QueryParams): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, NETWORK_MESSAGE);
  }

  if (response.status === 401 && authToken) unauthorizedHandler?.();
  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response));
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const apiGet = <T>(path: string, params?: QueryParams) => request<T>("GET", path, undefined, params);
export const apiPost = <T>(path: string, body: unknown) => request<T>("POST", path, body);
export const apiPatch = <T>(path: string, body: unknown) => request<T>("PATCH", path, body);

export function getErrorMessage(error: unknown, fallback = FALLBACK_MESSAGE): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
