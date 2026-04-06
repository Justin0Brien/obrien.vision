import type { Model } from '../types';
import { uniqueSorted } from '../utils';
import { LogRangeSlider } from './LogRangeSlider';

interface ControlPanelProps {
  models: Model[];
  search: string;
  onSearchChange: (v: string) => void;
  minSizeGB: number;
  onMinSizeGBChange: (v: number) => void;
  maxSizeGB: number;
  onMaxSizeGBChange: (v: number) => void;
  familyFilter: string;
  onFamilyFilterChange: (v: string) => void;
  capFilter: string;
  onCapFilterChange: (v: string) => void;
}

const SIZE_CEILING = 500; // GB

export function ControlPanel({
  models,
  search,
  onSearchChange,
  minSizeGB,
  onMinSizeGBChange,
  maxSizeGB,
  onMaxSizeGBChange,
  familyFilter,
  onFamilyFilterChange,
  capFilter,
  onCapFilterChange,
}: ControlPanelProps) {
  const families = uniqueSorted(models.map((m) => m.family));
  const capabilities = uniqueSorted(models.flatMap((m) => m.capabilities));

  return (
    <div className="border-b border-[var(--color-border)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end gap-4 px-6 py-4">
        {/* Search */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-secondary)]">
            Search
          </label>
          <input
            type="text"
            placeholder="Filter models…"
            className="h-9 w-56 rounded-md border border-[var(--color-border)] px-3 text-sm
              focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]
              focus:outline-none"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Size range slider */}
        <LogRangeSlider
          minGB={minSizeGB}
          maxGB={maxSizeGB}
          floor={0}
          ceiling={SIZE_CEILING}
          onMinChange={onMinSizeGBChange}
          onMaxChange={onMaxSizeGBChange}
        />

        {/* Family dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-secondary)]">
            Family
          </label>
          <select
            className="h-9 rounded-md border border-[var(--color-border)] px-2 text-sm
              focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]
              focus:outline-none"
            value={familyFilter}
            onChange={(e) => onFamilyFilterChange(e.target.value)}
          >
            <option value="">All families</option>
            {families.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Capability dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-secondary)]">
            Capability
          </label>
          <select
            className="h-9 rounded-md border border-[var(--color-border)] px-2 text-sm
              focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]
              focus:outline-none"
            value={capFilter}
            onChange={(e) => onCapFilterChange(e.target.value)}
          >
            <option value="">All capabilities</option>
            {capabilities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Result count */}
        <span className="ml-auto text-xs text-[var(--color-secondary)]">
          {models.length} model{models.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
