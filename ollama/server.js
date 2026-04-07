#!/usr/bin/env node
/**
 * server.js
 * ---------
 * Lightweight local API server for the Ollama Library Explorer.
 * Provides a single endpoint to trigger a data rescan.
 *
 * Endpoints:
 *   POST /api/update  — runs update_ollama_library.py then export_db_to_json.py,
 *                       streams newline-delimited JSON progress events, ends with
 *                       { done: true, exported_at: "..." } or { error: "..." }
 *
 * Usage:
 *   node server.js
 *   node server.js --port 3001
 */

import { createServer } from 'http';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = (() => {
  const i = process.argv.indexOf('--port');
  return i !== -1 ? parseInt(process.argv[i + 1], 10) : 3001;
})();

// Paths
const SCRAPER_SCRIPT = join(__dirname, '../util/llm-tools/update_ollama_library.py');
const EXPORTER_SCRIPT = join(__dirname, 'export_db_to_json.py');
const DB_PATH = join(__dirname, 'ollama_library.db');
const JSON_OUT = join(__dirname, 'site/public/data/models.json');

// Prefer the llm-tools venv which has all scraper dependencies installed
const PYTHON = join(__dirname, '../util/llm-tools/.venv/bin/python');

// Run a command, writing newline-delimited JSON log lines to `write(line)`
function runScript(cmd, args, write) {
  return new Promise((resolve, reject) => {
    write({ type: 'run', cmd: [cmd, ...args].join(' ') });
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    child.stdout.on('data', (d) =>
      d.toString().split('\n').filter(Boolean).forEach((l) => write({ type: 'log', text: l }))
    );
    child.stderr.on('data', (d) =>
      d.toString().split('\n').filter(Boolean).forEach((l) => write({ type: 'log', text: l }))
    );
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Process exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

let updateInProgress = false;

const server = createServer((req, res) => {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/update') {
    if (updateInProgress) {
      res.writeHead(409, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Update already in progress' }));
      return;
    }

    updateInProgress = true;
    res.writeHead(200, {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    });

    const write = (obj) => res.write(JSON.stringify(obj) + '\n');

    (async () => {
      try {
        write({ type: 'status', text: 'Starting scraper…' });
        await runScript(PYTHON, [SCRAPER_SCRIPT, '--no-arch', '--db', DB_PATH], write);

        write({ type: 'status', text: 'Exporting JSON…' });
        await runScript(PYTHON, [EXPORTER_SCRIPT, '--db', DB_PATH, '--out', JSON_OUT], write);

        const exported_at = JSON.parse(readFileSync(JSON_OUT, 'utf8')).exported_at;
        write({ type: 'done', exported_at });
      } catch (err) {
        write({ type: 'error', text: err.message });
      } finally {
        updateInProgress = false;
        res.end();
      }
    })();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Ollama Explorer API server listening on http://127.0.0.1:${PORT}`);
});
