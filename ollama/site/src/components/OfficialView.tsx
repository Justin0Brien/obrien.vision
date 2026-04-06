import type { Model } from '../types';

interface OfficialViewProps {
  models: Model[];
  search: string;
  onSearchChange: (v: string) => void;
}

export function OfficialView({ models, search, onSearchChange }: OfficialViewProps) {
  const filtered = models.filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.description ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <input
        type="text"
        placeholder="Search models"
        className="mb-8 h-10 w-full rounded-md border border-[var(--color-border)] px-4 text-sm
          focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]
          focus:outline-none"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="divide-y divide-[var(--color-border)]">
        {filtered.map((m) => (
          <a
            key={m.name}
            href={`https://ollama.com/library/${m.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-6 transition-colors hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold text-[var(--color-primary)] md:text-2xl">
              {m.name}
            </h2>
            <p className="mt-1 break-words text-[var(--color-secondary)]">
              {m.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.capabilities.map((c) => (
                <span
                  key={c}
                  className="inline-block rounded bg-[var(--color-accent-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]"
                >
                  {c}
                </span>
              ))}
              {m.param_sizes.map((p) => (
                <span
                  key={p}
                  className="inline-block rounded bg-[var(--color-tag-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-tag-text)]"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-3 flex gap-5 text-[13px] font-medium text-[var(--color-secondary)]">
              <span>{m.pulls ?? '—'} Pulls</span>
              <span>{m.tag_count ?? '—'} Tags</span>
              <span>Updated {m.last_updated ?? '—'}</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
