import { useState } from 'react';
import logoImg from '../assets/llamallogo.png';

interface HeaderProps {
  officialMode: boolean;
  onOfficialModeChange: (v: boolean) => void;
}

export function Header({ officialMode, onOfficialModeChange }: HeaderProps) {
  const [hover, setHover] = useState(false);

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

        {/* Official Mode toggle */}
        <label
          className="flex cursor-pointer items-center gap-2 select-none text-sm text-[var(--color-secondary)]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title={
            officialMode
              ? 'Hides all useful charts and tables'
              : 'Show the minimal official layout'
          }
        >
          <span className={hover ? 'text-[var(--color-primary)]' : ''}>
            Official Mode
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={officialMode}
              onChange={(e) => onOfficialModeChange(e.target.checked)}
            />
            <div
              className={`h-5 w-9 rounded-full transition-colors ${
                officialMode ? 'bg-[var(--color-accent)]' : 'bg-gray-300'
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                officialMode ? 'translate-x-4' : ''
              }`}
            />
          </div>
        </label>
      </div>
    </header>
  );
}
