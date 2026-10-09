const TIME_ZONE = "America/Lima";

const dateTimeFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: TIME_ZONE,
  dateStyle: "short",
  timeStyle: "short",
});

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: TIME_ZONE,
  dateStyle: "medium",
});

export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function nowIso(): string {
  return new Date().toISOString();
}

const calendarFormatter = new Intl.DateTimeFormat("es-PE", { timeZone: "UTC", dateStyle: "medium" });

/** A date without time (AAAA-MM-DD, such as a birth date): no time-zone shift. */
export function formatCalendarDate(ymd: string): string {
  return calendarFormatter.format(new Date(`${ymd}T00:00:00Z`));
}
