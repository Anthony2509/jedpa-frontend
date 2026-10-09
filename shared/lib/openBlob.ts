/** Opens a downloaded file (a PDF) in a new tab; the browser handles printing from there. */
export function openBlob(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const tab = window.open(url, "_blank");
  // Popup blocked: fall back to downloading the file.
  if (!tab) {
    const link = document.createElement("a");
    link.href = url;
    link.download = "credenciales.pdf";
    link.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
