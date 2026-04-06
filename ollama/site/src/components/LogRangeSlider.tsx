import { useMemo, useCallback } from 'react';

interface LogRangeSliderProps {
  /** Minimum size in GB */
  minGB: number;
  /** Maximum size in GB */
  maxGB: number;
  /** Absolute floor in GB */
  floor: number;
  /** Absolute ceiling in GB (values >= this mean "any") */
  ceiling: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}

// Internal: work in log-space for the slider positions
const LOG_FLOOR = Math.log10(0.01); // 10 MB
const LOG_CEIL = Math.log10(500);   // 500 GB
const STEPS = 1000;
// Width of the slider track in px (matches w-52 = 208px)
const TRACK_PX = 208;
// Minimum px between tick labels (8px font, longest label ~4 chars = ~22px + margin)
const MIN_TICK_GAP_PX = 30;

function gbToSlider(gb: number): number {
  if (gb <= 0.01) return 0;
  if (gb >= 500) return STEPS;
  const log = Math.log10(gb);
  return Math.round(((log - LOG_FLOOR) / (LOG_CEIL - LOG_FLOOR)) * STEPS);
}

function sliderToGb(pos: number): number {
  if (pos <= 0) return 0;
  if (pos >= STEPS) return 500;
  const log = LOG_FLOOR + (pos / STEPS) * (LOG_CEIL - LOG_FLOOR);
  return Math.round(Math.pow(10, log) * 100) / 100;
}

function formatLabel(gb: number, ceiling: number): string {
  if (gb >= ceiling) return 'Any';
  if (gb <= 0.01) return '0';
  if (gb < 1) return `${Math.round(gb * 1024)} MB`;
  if (gb >= 100) return `${Math.round(gb)} GB`;
  return `${gb.toFixed(1)} GB`;
}

function formatTickLabel(gb: number): string {
  if (gb < 1) return `${Math.round(gb * 1024)}M`;
  if (gb >= 1000) return `${gb / 1000}T`;
  if (gb >= 100) return `${Math.round(gb)}G`;
  return `${gb}G`;
}

// Decade tick candidates: one per power-of-10 between 0.01 GB and 500 GB
const TICK_CANDIDATES_GB = [0.01, 0.1, 1, 10, 100];

export function LogRangeSlider({
  minGB,
  maxGB,
  floor: _floor,
  ceiling,
  onMinChange,
  onMaxChange,
}: LogRangeSliderProps) {
  const minPos = gbToSlider(minGB);
  const maxPos = gbToSlider(maxGB);

  // Compute which ticks to show, skipping any that would overlap
  const ticks = useMemo(() => {
    const all = TICK_CANDIDATES_GB.map((gb) => ({
      gb,
      pct: (gbToSlider(gb) / STEPS) * 100,
      px: (gbToSlider(gb) / STEPS) * TRACK_PX,
    }));
    // Greedy: keep a tick only if ≥ MIN_TICK_GAP_PX from the previous kept tick
    const kept: typeof all = [];
    let lastPx = -Infinity;
    for (const t of all) {
      if (t.px - lastPx >= MIN_TICK_GAP_PX) {
        kept.push(t);
        lastPx = t.px;
      }
    }
    return kept;
  }, []);

  const handleMinInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pos = Number(e.target.value);
      const gb = sliderToGb(pos);
      if (gbToSlider(gb) < gbToSlider(maxGB) - 10) {
        onMinChange(gb);
      }
    },
    [maxGB, onMinChange],
  );

  const handleMaxInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pos = Number(e.target.value);
      const gb = sliderToGb(pos);
      if (gbToSlider(gb) > gbToSlider(minGB) + 10) {
        onMaxChange(gb);
      }
    },
    [minGB, onMaxChange],
  );

  // Calculate the highlight bar position (percentage)
  const leftPct = (minPos / STEPS) * 100;
  const rightPct = 100 - (maxPos / STEPS) * 100;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[var(--color-secondary)]">
        Size range:{' '}
        <span className="text-[var(--color-primary)]">
          {formatLabel(minGB, ceiling)} – {formatLabel(maxGB, ceiling)}
        </span>
      </label>

      {/* Dual-range slider */}
      <div className="relative h-6 w-52">
        {/* Track background */}
        <div className="absolute top-2.5 h-1 w-full rounded bg-gray-200" />
        {/* Active range highlight */}
        <div
          className="absolute top-2.5 h-1 rounded bg-[var(--color-accent)]"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={0}
          max={STEPS}
          value={minPos}
          onChange={handleMinInput}
          className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
          style={{ zIndex: 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={0}
          max={STEPS}
          value={maxPos}
          onChange={handleMaxInput}
          className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Tick marks — only ticks with enough spacing are shown */}
      <div className="relative h-4 w-52">
        {ticks.map((t) => (
          <div
            key={t.gb}
            className="absolute flex flex-col items-center"
            style={{ left: `${t.pct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="h-1.5 w-px bg-gray-300" />
            <span className="text-[8px] leading-tight text-gray-400">{formatTickLabel(t.gb)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
