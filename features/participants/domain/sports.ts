/** Sports catalog with the code used in delegation names (client's 2024 spreadsheet). */
export const SPORTS = [
  { sport: "Ajedrez", code: "AJD" },
  { sport: "Atletismo", code: "ATL" },
  { sport: "Natación", code: "NAT" },
  { sport: "Vóley", code: "VOL" },
  { sport: "Fútbol", code: "FTB" },
  { sport: "Básquet", code: "BSQ" },
  { sport: "Judo", code: "JUD" },
  { sport: "Tenis de mesa", code: "TNM" },
  { sport: "Handball", code: "HAN" },
  { sport: "Futsal", code: "FTS" },
];

export const CATEGORIES = ["A", "B", "C", "D", "E"];

export function findSportCode(sport: string): string {
  return SPORTS.find((item) => item.sport === sport)?.code ?? "";
}
