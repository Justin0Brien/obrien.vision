import { useState, useMemo } from 'react';
import './App.css';
import { useModelsData } from './hooks/useModelsData';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ScatterPlot } from './components/ScatterPlot';
import { ModelTable } from './components/ModelTable';
import type { Model } from './types';

function App() {
  const { data, loading, error, refetch } = useModelsData();
  const [search, setSearch] = useState('');
  const [minSizeGB, setMinSizeGB] = useState(0);
  const [maxSizeGB, setMaxSizeGB] = useState(500);
  const [familyFilter, setFamilyFilter] = useState('');
  const [capFilter, setCapFilter] = useState('');

  const filteredModels = useMemo<Model[]>(() => {
    if (!data) return [];
    return data.models.filter((m) => {
      // Text search
      if (search) {
        const s = search.toLowerCase();
        const matches =
          m.name.toLowerCase().includes(s) ||
          (m.description ?? '').toLowerCase().includes(s) ||
          (m.family ?? '').toLowerCase().includes(s) ||
          m.capabilities.some((c) => c.toLowerCase().includes(s));
        if (!matches) return false;
      }
      // Size filter
      if (m.default_size_bytes) {
        if (minSizeGB > 0 && m.default_size_bytes < minSizeGB * 1e9) return false;
        if (maxSizeGB < 500 && m.default_size_bytes > maxSizeGB * 1e9) return false;
      }
      // Family filter
      if (familyFilter && m.family !== familyFilter) return false;
      // Capability filter
      if (capFilter && !m.capabilities.includes(capFilter)) return false;
      return true;
    });
  }, [data, search, minSizeGB, maxSizeGB, familyFilter, capFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-[var(--color-secondary)]">Loading model data…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-red-600">
          Failed to load data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        exportedAt={data?.exported_at ?? null}
        onRefreshComplete={refetch}
      />

      <>
        <ControlPanel
          models={filteredModels}
          search={search}
          onSearchChange={setSearch}
          minSizeGB={minSizeGB}
          onMinSizeGBChange={setMinSizeGB}
          maxSizeGB={maxSizeGB}
          onMaxSizeGBChange={setMaxSizeGB}
          familyFilter={familyFilter}
          onFamilyFilterChange={setFamilyFilter}
          capFilter={capFilter}
          onCapFilterChange={setCapFilter}
        />

        {/* Scatter Plot */}
        <section className="mx-auto max-w-6xl px-6 py-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Size vs Parameter Count
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-white p-2">
            <ScatterPlot models={filteredModels} />
          </div>
        </section>

        {/* Data Table */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Model Catalogue
          </h2>
          <div className="rounded-lg border border-[var(--color-border)]">
            <ModelTable models={filteredModels} globalFilter={search} />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-secondary)]">
          Data sourced from{' '}
          <a
            href="https://ollama.com/library"
            className="text-[var(--color-accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ollama.com/library
          </a>
          {data && (
            <span className="ml-2">
              · {data.count} models · exported {data.exported_at.split('T')[0]}
            </span>
          )}
        </footer>
      </>
    </div>
  );
}

export default App;
