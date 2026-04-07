import { useState, useCallback } from 'react';
import logoImg from '../assets/llamallogo.png';

interface HeaderProps {
  exportedAt: string | null;
  onRefreshComplete: () => void;
}

function formatAge(iso: string | null): string {
  if (!iso) return 'unknown';
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60_000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

type UpdateState = 'idle' | 'running' | 'done' | 'error';

export function Header({ exportedAt, onRefreshComplete }: HeaderProps) {
  const [updateState, setUpdateState] = useState<UpdateState>('idle');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [showLog, setShowLog] = useState(false);

  const handleUpdate = useCallback(async () => {
    if (updateState === 'running') return;
    setUpdateState('running');
    setLogLines([]);
    setShowLog(true);

    try {
      const res = await fetch('/api/update', { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          let event: { type: string; text?: string; exported_at?: string };
          try {
            event = JSON.parse(line);
          } catch {
            // non-JSON line — show it raw so nothing is hidden
            setLogLines((prev) => [...prev, line]);
            continue;
          }
          if (event.type === 'log' || event.type === 'status') {
            setLogLines((prev) => [...prev, event.text ?? '']);
            setShowLog(true);
          } else if (event.type === 'done') {
            setUpdateState('done');
            onRefreshComplete();
            setTimeout(() => setUpdateState('idle'), 3000);
          } else if (event.type === 'error') {
            setLogLines((prev) => [...prev, `ERROR: ${event.text ?? 'unknown'}`]);
            setShowLog(true);
            setUpdateState('error');
            return;
          } else if (event.type === 'run') {
            // skip internal run-cmd events silently
          }
        }
      }
    } catch (err) {
      setLogLines((prev) => [...prev, String(err)]);
      setShowLog(true);
      setUpdateState('error');
    }
  }, [updateState, onRefreshComplete]);

  return (
    <header className="border-b border-[var(--color-border)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Ollama Explorer" className="h-9 w-9" />
          <h1 className="text-xl font-bold tracking-tight text-[var(--color-primary)]">
            Ollama Library Explorer
          </h1>
        </div>

        {/* Update controls */}
        <div className="flex items-center gap-3">
          {/* Last scanned */}
          <span className="text-xs text-[var(--color-secondary)]">
            Last scanned:{' '}
            <span className="font-medium text-[var(--color-primary)]">
              {formatAge(exportedAt)}
            </span>
          </span>

          {/* Update button */}
          <button
            onClick={handleUpdate}
            disabled={updateState === 'running'}
            title={
              updateState === 'running'
                ? 'Scan in progress…'
                : 'Rescan the Ollama library and refresh data'
            }
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              updateState === 'running'
                ? 'cursor-not-allowed bg-gray-100 text-[var(--color-secondary)]'
                : updateState === 'done'
                ? 'bg-green-50 text-green-700'
                : updateState === 'error'
                ? 'bg-red-50 text-red-700 hover:bg-red-100'
                : 'bg-[var(--color-accent)] text-white hover:bg-blue-600'
            }`}
          >
            {updateState === 'running' ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Scanning…
              </>
            ) : updateState === 'done' ? (
              <>✓ Updated</>
            ) : updateState === 'error' ? (
              <>⚠ Retry</>
            ) : (
              <>↻ Update</>
            )}
          </button>

          {/* Show log toggle (only after activity) */}
          {logLines.length > 0 && (
            <button
              onClick={() => setShowLog((v) => !v)}
              className="text-xs text-[var(--color-secondary)] underline hover:text-[var(--color-primary)]"
            >
              {showLog ? 'hide log' : 'show log'}
            </button>
          )}
        </div>
      </div>

      {/* Collapsible log panel */}
      {showLog && logLines.length > 0 && (
        <div className="border-t border-[var(--color-border)] bg-gray-50 px-6 py-3">
          <pre className="max-h-40 overflow-y-auto text-xs text-gray-600 whitespace-pre-wrap">
            {logLines.join('\n')}
          </pre>
        </div>
      )}
    </header>
  );
}
