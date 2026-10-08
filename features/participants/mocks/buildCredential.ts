import type { Credential, CredentialCopy } from "../types";
import { DELIVERY_USER_NAME, PRINTER_NAME } from "./seedData";

const PLACES = [
  { id: "meliton", name: "IEE Melitón Carvajal, Lince" },
  { id: "bros", name: "Local Bros, Magdalena" },
  { id: "videna", name: "Sede competencia – Videna, San Luis" },
];

/** Scenario 4 issued, 5 printed, 6 delivered (some with a delivered duplicate). */
export function buildCredential(index: number, scenario: number, later: (hours: number) => string): Credential {
  const code = `JEDPA-2026-${String(index + 1).padStart(4, "0")}`;
  const place = PLACES[index % PLACES.length];
  const copies: CredentialCopy[] = [];

  if (scenario >= 5) copies.push({ number: 0, printedAt: later(48), printedBy: PRINTER_NAME });
  if (scenario === 6) {
    copies[0].delivery = { placeId: place.id, placeName: place.name, at: later(72), by: DELIVERY_USER_NAME };
    if (index % 5 === 0) {
      copies.push({
        number: 1,
        printedAt: later(96),
        printedBy: PRINTER_NAME,
        reason: "Credencial extraviada",
        delivery: { placeId: place.id, placeName: place.name, at: later(98), by: DELIVERY_USER_NAME },
      });
    }
  }
  return { code, issuedAt: later(40), issuedBy: PRINTER_NAME, copies };
}
