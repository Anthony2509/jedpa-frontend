interface QrPlaceholderProps {
  cells: boolean[][];
  size?: number;
}

export function QrPlaceholder({ cells, size = 96 }: QrPlaceholderProps) {
  const count = cells.length;
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${count + 2} ${count + 2}`} role="img" aria-label="Código QR">
      <rect x={-1} y={-1} width={count + 2} height={count + 2} fill="#fff" />
      {cells.flatMap((row, y) =>
        row.map((filled, x) => (filled ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#111" /> : null)),
      )}
    </svg>
  );
}
