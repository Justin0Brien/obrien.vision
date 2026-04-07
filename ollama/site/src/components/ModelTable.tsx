import { useMemo, useState, Fragment, useCallback, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table';
import type { Model } from '../types';
import { parseParams, parsePulls, formatBytes } from '../utils';

interface ModelTableProps {
  models: Model[];
  globalFilter: string;
}

const col = createColumnHelper<Model>();

/** Hardware acceleration tags detected from tag name */
interface HwTag {
  label: string;
  title: string;
  bg: string;
  text: string;
}

function hwTags(tagName: string): HwTag[] {
  const lower = tagName.toLowerCase();
  const tags: HwTag[] = [];
  if (lower.includes('mlx')) {
    tags.push({ label: 'MLX', title: 'Optimised for Apple Silicon (MLX framework)', bg: '#f0fdf4', text: '#16a34a' });
  }
  if (lower.includes('nvfp4')) {
    tags.push({ label: 'NVIDIA', title: 'Optimised for NVIDIA GPUs (FP4 precision)', bg: '#f0f9ff', text: '#0369a1' });
  }
  if (lower.includes('mxfp8')) {
    tags.push({ label: 'MX FP8', title: 'Microscaling FP8 – optimised for hardware with MX (Microscaling) support', bg: '#fdf4ff', text: '#9333ea' });
  }
  return tags;
}

/** Copy a table element's data as TSV to the clipboard */
function copyTableAsText(tableEl: HTMLTableElement): Promise<void> {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  const tsv = rows
    .map((row) =>
      Array.from(row.querySelectorAll('th, td'))
        .map((cell) => (cell as HTMLElement).innerText.replace(/\t/g, ' ').trim())
        .join('\t'),
    )
    .join('\n');
  return navigator.clipboard.writeText(tsv);
}

/** Inline copy-button component with ✓ feedback */
function CopyButton({ tableRef }: { tableRef: React.RefObject<HTMLTableElement | null> }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    if (!tableRef.current) return;
    await copyTableAsText(tableRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [tableRef]);

  return (
    <button
      onClick={handleCopy}
      title="Copy table to clipboard (paste into spreadsheet or ChatGPT)"
      className="flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium transition-colors"
      style={{
        borderColor: copied ? '#16a34a' : 'var(--color-border)',
        color: copied ? '#16a34a' : 'var(--color-secondary)',
        background: copied ? '#f0fdf4' : 'transparent',
      }}
    >
      {copied ? '✓ Copied' : '⎘ Copy'}
    </button>
  );
}

/** Expanded versions sub-table with copy button and hardware tags */
function VersionsTable({ tags }: { tags: import('../types').ModelTag[] }) {
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div className="mt-2 rounded border border-[var(--color-border)]">
      {/* Toolbar */}
      <div className="flex items-center justify-end border-b border-[var(--color-border)] bg-gray-50 px-2 py-1">
        <CopyButton tableRef={tableRef} />
      </div>
      <div className="max-h-64 overflow-y-auto">
        <table ref={tableRef} className="w-full text-xs">
          <thead className="sticky top-0 bg-gray-50">
            <tr className="text-left text-[var(--color-secondary)]">
              <th className="px-2 py-1">Tag</th>
              <th className="px-2 py-1">Params</th>
              <th className="px-2 py-1">Quant</th>
              <th className="px-2 py-1">Size</th>
              <th className="px-2 py-1">Context</th>
              <th className="px-2 py-1">Input</th>
              <th className="px-2 py-1">Updated</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((t) => {
              const hw = hwTags(t.tag_name);
              return (
                <tr
                  key={t.tag_name}
                  className="border-t border-[var(--color-border)] hover:bg-gray-50"
                >
                  <td className="px-2 py-1">
                    <span className="font-mono">{t.tag_name}</span>
                    {hw.map((h) => (
                      <span
                        key={h.label}
                        title={h.title}
                        className="ml-1.5 inline-block rounded px-1 py-0 text-[9px] font-semibold leading-4"
                        style={{ background: h.bg, color: h.text }}
                      >
                        {h.label}
                      </span>
                    ))}
                  </td>
                  <td className="px-2 py-1">{t.parameters ?? '—'}</td>
                  <td className="px-2 py-1">{t.quantization ?? '—'}</td>
                  <td className="px-2 py-1">{t.size_str ?? '—'}</td>
                  <td className="px-2 py-1">{t.context_window ?? '—'}</td>
                  <td className="px-2 py-1">{t.input_type ?? '—'}</td>
                  <td className="px-2 py-1 text-[var(--color-secondary)]">
                    {t.updated_at ?? '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ModelTable({ models, globalFilter }: ModelTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [pullsPerMonth, setPullsPerMonth] = useState(false);

  const columns = useMemo(
    () => [
      col.accessor('name', {
        header: 'Model',
        cell: (info) => (
          <a
            href={`https://ollama.com/library/${info.getValue()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
          >
            {info.getValue()}
          </a>
        ),
      }),
      col.accessor('family', {
        header: 'Family',
        cell: (info) => (
          <span className="text-sm text-[var(--color-secondary)]">
            {info.getValue() ?? '—'}
          </span>
        ),
      }),
      col.accessor('param_sizes', {
        header: 'Parameters',
        sortingFn: (a, b) => {
          const aMax = Math.max(0, ...a.original.param_sizes.map(parseParams));
          const bMax = Math.max(0, ...b.original.param_sizes.map(parseParams));
          return aMax - bMax;
        },
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((p) => (
              <span
                key={p}
                className="inline-block rounded bg-[var(--color-tag-bg)] px-1.5 py-0.5 text-xs font-medium text-[var(--color-tag-text)]"
              >
                {p}
              </span>
            ))}
          </div>
        ),
      }),
      col.accessor('default_size_bytes', {
        header: 'Size',
        cell: (info) => (
          <span className="text-sm">{formatBytes(info.getValue())}</span>
        ),
      }),
      col.accessor('default_quant', {
        header: 'Quantisation',
        cell: (info) => (
          <span className="text-sm text-[var(--color-secondary)]">
            {info.getValue() ?? '—'}
          </span>
        ),
      }),
      col.accessor('capabilities', {
        header: 'Capabilities',
        enableSorting: false,
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((c) => (
              <span
                key={c}
                className="inline-block rounded bg-[var(--color-accent-bg)] px-1.5 py-0.5 text-xs font-medium text-[var(--color-accent)]"
              >
                {c}
              </span>
            ))}
          </div>
        ),
      }),
      col.accessor('pulls', {
        id: 'pulls',
        header: () => (
          <span className="flex flex-col items-start gap-0.5">
            <button
              className="rounded px-1 py-0 text-[8px] font-medium leading-tight tracking-wide
                border transition-colors select-none"
              style={{
                borderColor: pullsPerMonth ? 'var(--color-accent)' : 'var(--color-border)',
                color: pullsPerMonth ? 'var(--color-accent)' : 'var(--color-secondary)',
                background: pullsPerMonth ? 'var(--color-accent-bg)' : 'transparent',
              }}
              onClick={(e) => { e.stopPropagation(); setPullsPerMonth((v) => !v); }}
              title={pullsPerMonth ? 'Showing pulls / month — click for total' : 'Showing total pulls — click for per month'}
            >
              {pullsPerMonth ? '/mo' : 'total'}
            </button>
            <span>Pulls</span>
          </span>
        ),
        sortingFn: (a, b) => {
          const toVal = (m: Model) => {
            const total = parsePulls(m.pulls);
            if (!pullsPerMonth) return total;
            const months = Math.max(1, m.updated_days_ago / 30);
            return total / months;
          };
          return toVal(a.original) - toVal(b.original);
        },
        cell: (info) => {
          const total = parsePulls(info.getValue());
          if (total === 0) return <span className="text-sm text-[var(--color-secondary)]">—</span>;
          let display: string;
          if (pullsPerMonth) {
            const months = Math.max(1, info.row.original.updated_days_ago / 30);
            const perMonth = total / months;
            if (perMonth >= 1e6) display = `${(perMonth / 1e6).toFixed(1)}M`;
            else if (perMonth >= 1e3) display = `${(perMonth / 1e3).toFixed(1)}K`;
            else display = `${Math.round(perMonth)}`;
          } else {
            display = info.getValue() ?? '—';
          }
          return (
            <span className="text-sm text-[var(--color-secondary)]">
              {display}
            </span>
          );
        },
      }),
      col.accessor('updated_days_ago', {
        header: 'Updated',
        sortingFn: (a, b) => a.original.updated_days_ago - b.original.updated_days_ago,
        cell: (info) => {
          const days = info.getValue();
          const date = info.row.original.updated_date;
          const label = days === 0 ? 'today' : `${days}d ago`;
          return (
            <span
              className="text-sm text-[var(--color-secondary)]"
              title={date ?? undefined}
            >
              {label}
            </span>
          );
        },
      }),
    ],
    [pullsPerMonth],
  );

  const table = useReactTable({
    data: models,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const s = filterValue.toLowerCase();
      const m = row.original;
      return (
        m.name.toLowerCase().includes(s) ||
        (m.description ?? '').toLowerCase().includes(s) ||
        (m.family ?? '').toLowerCase().includes(s) ||
        m.capabilities.some((c) => c.toLowerCase().includes(s))
      );
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-[var(--color-border)]">
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)] select-none"
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <span className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted() as string] ?? ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const m = row.original;
            const isExpanded = expanded[m.name] ?? false;
            return (
              <Fragment key={row.id}>
                <tr
                  className="border-b border-[var(--color-border)] transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {/* Description row */}
                <tr
                  className="border-b border-[var(--color-border)]"
                >
                  <td colSpan={columns.length} className="px-3 pb-3 pt-0">
                    <p className="text-sm text-[var(--color-secondary)]">
                      {m.description ?? ''}
                    </p>
                    {m.tags.length > 0 && (
                      <button
                        className="mt-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [m.name]: !isExpanded }))
                        }
                      >
                        {isExpanded
                          ? 'Hide versions ▲'
                          : `Show ${m.tags.length} version${m.tags.length !== 1 ? 's' : ''} ▼`}
                      </button>
                    )}
                    {isExpanded && (
                      <VersionsTable tags={m.tags} />
                    )}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
