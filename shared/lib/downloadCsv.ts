function escapeCell(value: string): string {
  return /[";\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Downloads a CSV that Excel opens correctly (UTF-8 BOM, semicolon separator). */
export function downloadCsv(fileName: string, rows: string[][]): void {
  const content = rows.map((row) => row.map(escapeCell).join(";")).join("\n");
  const blob = new Blob(["﻿" + content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
