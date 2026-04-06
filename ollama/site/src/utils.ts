/** Parse a pull count string like "63.8M" → a numeric value for sorting. */
export function parsePulls(pulls: string | null): number {
  if (!pulls) return 0;
  const m = pulls.match(/^([\d.]+)([KMB]?)$/i);
  if (!m) return 0;
  const n = parseFloat(m[1]);
  switch (m[2].toUpperCase()) {
    case 'B': return n * 1e9;
    case 'M': return n * 1e6;
    case 'K': return n * 1e3;
    default: return n;
  }
}

/** Parse a parameter string like "7b", "1.5b", "8x7b", "335m" → billions. */
export function parseParams(p: string | null): number {
  if (!p) return 0;
  const s = p.toLowerCase().trim();
  // MoE: "8x7b"
  const moe = s.match(/^(\d+)x(\d+(?:\.\d+)?)(b|m|k)$/);
  if (moe) {
    const mult = { b: 1, m: 1e-3, k: 1e-6 }[moe[3]] ?? 1;
    return parseInt(moe[1]) * parseFloat(moe[2]) * mult;
  }
  // Standard: "7b", "1.5b", "335m", "270m"
  const std = s.match(/^e?(\d+(?:\.\d+)?)(b|m|k)$/);
  if (std) {
    const mult = { b: 1, m: 1e-3, k: 1e-6 }[std[2]] ?? 1;
    return parseFloat(std[1]) * mult;
  }
  return 0;
}

/** Format bytes to human-readable. */
export function formatBytes(bytes: number | null): string {
  if (!bytes || bytes <= 0) return '—';
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

/** Get unique sorted values from a list, skipping nulls. */
export function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => !!v))].sort();
}
