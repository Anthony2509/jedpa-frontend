/** TEMP: marks the screens that still show test data while the backend catches up. */
export function MockDataNotice() {
  return (
    <p className="mb-6 rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-600">
      Usa datos de prueba: pendiente de conexión con el backend.
    </p>
  );
}
