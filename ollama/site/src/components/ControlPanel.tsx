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
  capFilters: string[];
  onCapFiltersChange: (v: string[]) => void;
}

const SIZE_CEILING = 500; // GB

// Ordered local capability pills
const LOCAL_CAPS: { id: string; label: string; title: string }[] = [
  { id: 'audio',     label: 'Audio',     title: 'Processes audio input' },
  { id: 'embedding', label: 'Embedding', title: 'Generates vector embeddings' },
  { id: 'thinking',  label: 'Thinking',  title: 'Extended chain-of-thought reasoning' },
  { id: 'tools',     label: 'Tools',     title: 'Supports function / tool calling' },
  { id: 'vision',    label: 'Vision',    title: 'Processes image input' },
];

const CLOUD_CAP = {
  id: 'cloud',
  label: '☁\ufe0e Cloud',
  title: 'Model is hosted remotely — ollama proxies calls to the cloud; nothing is downloaded locally',
};

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
  capFilters,
  onCapFiltersChange,
}: ControlPanelProps) {
  const families = uniqueSorted(models.map((m) => m.family));

  function toggleCap(id: string) {
    onCapFiltersChange(
      capFilters.includes(id) ? capFilters.filter((c) => c !== id) : [...capFilters, id],
    );
  }

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

        {/* Capability pills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--color-secondary)]">
            Capabilities
          </label>
          <div className="flex items-center gap-1.5">
            {LOCAL_CAPS.map(({ id, label, title }) => {
              const active = capFilters.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleCap(id)}
                  title={title}
                  className={`inline-flex h-7 cursor-pointer items-center rounded-full border px-3 text-xs font-medium
                    transition-colors select-none ${
                    active
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                      : 'border-[var(--color-border)] bg-white text-[var(--color-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* Divider */}
            <span className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />

            {/* Cloud pill — visually distinct */}
            {(() => {
              const active = capFilters.includes(CLOUD_CAP.id);
              return (
                <button
                  onClick={() => toggleCap(CLOUD_CAP.id)}
                  title={CLOUD_CAP.title}
                  className={`inline-flex h-7 cursor-pointer items-center rounded-full border px-3 text-xs font-medium
                    transition-colors select-none ${
                    active
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400 hover:bg-amber-100'
                  }`}
                >
                  {CLOUD_CAP.label}
                </button>
              );
            })()}
          </div>
        </div>

        {/* Result count */}
        <span className="ml-auto text-xs text-[var(--color-secondary)]">
          {models.length} model{models.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

