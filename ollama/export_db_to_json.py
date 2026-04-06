#!/usr/bin/env python3
"""
export_db_to_json.py
--------------------
Exports the ollama_library.db SQLite database to a JSON file suitable
for consumption by the static React front-end.

Produces public/data/models.json with each model's tags nested inline.

Usage:
    python export_db_to_json.py [--db path/to/ollama_library.db] [--out public/data/models.json]
"""

from __future__ import annotations

import argparse
import json
import re
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path


DEFAULT_DB = Path(__file__).resolve().parent.parent / "llm-tools" / "ollama_library.db"
DEFAULT_OUT = Path(__file__).resolve().parent / "site" / "public" / "data" / "models.json"


# ---------------------------------------------------------------------------
# Relative date → approximate ISO date + days-ago
# ---------------------------------------------------------------------------
_RELATIVE_RE = re.compile(r"(\d+)\s+(year|month|week|day|hour|minute)s?\s+ago", re.I)

_UNIT_TO_DAYS = {
    "year": 365,
    "month": 30,
    "week": 7,
    "day": 1,
    "hour": 1 / 24,
    "minute": 1 / 1440,
}

_FALLBACK_DAYS = 7   # used when the string cannot be parsed (e.g. "yesterday", None)


def _relative_to_date(relative: str | None, ref: datetime | None = None) -> tuple[str | None, int]:
    """
    Convert e.g. '9 months ago' → ('2025-07-06', 274).
    Always returns an integer days value; falls back to _FALLBACK_DAYS for
    unparseable strings such as 'yesterday', 'today', or None.
    Returns (approx_iso_date, days_ago).
    """
    ref = ref or datetime.now(timezone.utc)

    if not relative:
        approx = ref - timedelta(days=_FALLBACK_DAYS)
        return approx.strftime("%Y-%m-%d"), _FALLBACK_DAYS

    # Handle plain English near-terms
    lower = relative.strip().lower()
    if lower in ("today", "just now", "moments ago"):
        return ref.strftime("%Y-%m-%d"), 0
    if lower == "yesterday":
        approx = ref - timedelta(days=1)
        return approx.strftime("%Y-%m-%d"), 1

    m = _RELATIVE_RE.search(relative)
    if not m:
        approx = ref - timedelta(days=_FALLBACK_DAYS)
        return approx.strftime("%Y-%m-%d"), _FALLBACK_DAYS

    n = int(m.group(1))
    unit = m.group(2).lower()
    days = int(n * _UNIT_TO_DAYS.get(unit, 0))
    approx = ref - timedelta(days=days)
    return approx.strftime("%Y-%m-%d"), days


# ---------------------------------------------------------------------------
# Infer family from model name
# ---------------------------------------------------------------------------
_FAMILY_PATTERNS: list[tuple[re.Pattern, str]] = [
    (re.compile(r"^llama", re.I), "llama"),
    (re.compile(r"^codellama", re.I), "llama"),
    (re.compile(r"^tinyllama", re.I), "llama"),
    (re.compile(r"^yarn-llama", re.I), "llama"),
    (re.compile(r"^medllama", re.I), "llama"),
    (re.compile(r"^llava", re.I), "llava"),
    (re.compile(r"^bakllava", re.I), "llava"),
    (re.compile(r"^gemma", re.I), "gemma"),
    (re.compile(r"^codegemma", re.I), "gemma"),
    (re.compile(r"^embeddinggemma", re.I), "gemma"),
    (re.compile(r"^functiongemma", re.I), "gemma"),
    (re.compile(r"^shieldgemma", re.I), "gemma"),
    (re.compile(r"^phi", re.I), "phi"),
    (re.compile(r"^qwen", re.I), "qwen"),
    (re.compile(r"^codeqwen", re.I), "qwen"),
    (re.compile(r"^qwq", re.I), "qwen"),
    (re.compile(r"^mistral", re.I), "mistral"),
    (re.compile(r"^mixtral", re.I), "mistral"),
    (re.compile(r"^codestral", re.I), "mistral"),
    (re.compile(r"^mathstral", re.I), "mistral"),
    (re.compile(r"^ministral", re.I), "mistral"),
    (re.compile(r"^magistral", re.I), "mistral"),
    (re.compile(r"^devstral", re.I), "mistral"),
    (re.compile(r"^yarn-mistral", re.I), "mistral"),
    (re.compile(r"^samantha-mistral", re.I), "mistral"),
    (re.compile(r"^deepseek", re.I), "deepseek"),
    (re.compile(r"^deepcoder", re.I), "deepseek"),
    (re.compile(r"^deepscaler", re.I), "deepseek"),
    (re.compile(r"^starcoder", re.I), "starcoder"),
    (re.compile(r"^command-", re.I), "command"),
    (re.compile(r"^nomic", re.I), "nomic"),
    (re.compile(r"^falcon", re.I), "falcon"),
    (re.compile(r"^vicuna", re.I), "vicuna"),
    (re.compile(r"^wizard", re.I), "wizard"),
    (re.compile(r"^yi-?", re.I), "yi"),
    (re.compile(r"^solar", re.I), "solar"),
    (re.compile(r"^orca", re.I), "orca"),
    (re.compile(r"^open-orca", re.I), "orca"),
    (re.compile(r"^granite", re.I), "granite"),
    (re.compile(r"^glm", re.I), "glm"),
    (re.compile(r"^smollm", re.I), "smollm"),
    (re.compile(r"^stablelm", re.I), "stablelm"),
    (re.compile(r"^stable-", re.I), "stablelm"),
    (re.compile(r"^dolphin", re.I), "dolphin"),
    (re.compile(r"^tinydolphin", re.I), "dolphin"),
    (re.compile(r"^megadolphin", re.I), "dolphin"),
    (re.compile(r"^zephyr", re.I), "zephyr"),
    (re.compile(r"^mxbai", re.I), "mxbai"),
    (re.compile(r"^snowflake", re.I), "snowflake"),
    (re.compile(r"^internlm", re.I), "internlm"),
    (re.compile(r"^nemotron", re.I), "nemotron"),
    (re.compile(r"^moondream", re.I), "moondream"),
    (re.compile(r"^minimax", re.I), "minimax"),
    (re.compile(r"^olmo", re.I), "olmo"),
    (re.compile(r"^gemini", re.I), "gemini"),
    (re.compile(r"^hermes", re.I), "hermes"),
    (re.compile(r"^nous-hermes", re.I), "hermes"),
    (re.compile(r"^openhermes", re.I), "hermes"),
    (re.compile(r"^kimi", re.I), "kimi"),
    (re.compile(r"^exaone", re.I), "exaone"),
    (re.compile(r"^aya", re.I), "aya"),
    (re.compile(r"^cogito", re.I), "cogito"),
    (re.compile(r"^openchat", re.I), "openchat"),
    (re.compile(r"^opencoder", re.I), "opencoder"),
    (re.compile(r"^minicpm", re.I), "minicpm"),
    (re.compile(r"^sailor", re.I), "sailor"),
    (re.compile(r"^tulu", re.I), "tulu"),
    (re.compile(r"^lfm", re.I), "lfm"),
    (re.compile(r"^translategemma", re.I), "gemma"),
]


def _infer_family(model_name: str) -> str | None:
    for pat, family in _FAMILY_PATTERNS:
        if pat.match(model_name):
            return family
    return None


def export(db_path: Path, out_path: Path) -> None:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    now = datetime.now(timezone.utc)

    models_rows = conn.execute(
        "SELECT id, name, description, family, capabilities, pulls, tag_count, "
        "last_updated, fetched_at FROM models ORDER BY pulls DESC"
    ).fetchall()

    models = []
    for mr in models_rows:
        model = dict(mr)
        model_id = model.pop("id")

        # Parse capabilities JSON string
        caps = model.get("capabilities", "[]")
        try:
            model["capabilities"] = json.loads(caps) if caps else []
        except (json.JSONDecodeError, TypeError):
            model["capabilities"] = []

        # Infer family from name if not set from architecture lookup
        if not model.get("family"):
            model["family"] = _infer_family(model["name"])

        # Convert relative last_updated to approx date + days_ago
        approx_date, days = _relative_to_date(model.get("last_updated"), now)
        model["updated_date"] = approx_date
        model["updated_days_ago"] = days

        # Fetch nested tags
        tag_rows = conn.execute(
            "SELECT tag_name, parameters, quantization, variant, size_str, "
            "size_bytes, context_window, input_type, digest, updated_at "
            "FROM tags WHERE model_id=? ORDER BY size_bytes ASC NULLS LAST",
            (model_id,),
        ).fetchall()
        model["tags"] = [dict(tr) for tr in tag_rows]

        # Derive convenience fields for the scatter plot / table:
        # - default_size_bytes: size of the default (first listed) tag
        # - default_params: parameter label of the default tag
        # - default_quant: quantisation of the default tag
        if model["tags"]:
            default_tag = model["tags"][0]
            model["default_size_bytes"] = default_tag.get("size_bytes")
            model["default_params"] = default_tag.get("parameters")
            model["default_quant"] = default_tag.get("quantization")
        else:
            model["default_size_bytes"] = None
            model["default_params"] = None
            model["default_quant"] = None

        # Collect unique parameter sizes for the model
        unique_params = sorted(
            {t["parameters"] for t in model["tags"] if t.get("parameters")},
            key=lambda p: _param_sort_key(p),
        )
        model["param_sizes"] = unique_params

        # Collect unique families from tags (for list display)
        unique_families = sorted(
            {t.get("family") for t in model["tags"] if t.get("family")}
        )
        if not unique_families and model.get("family"):
            unique_families = [model["family"]]

        models.append(model)

    conn.close()

    # Write output
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(
            {"exported_at": _now_iso(), "count": len(models), "models": models},
            f,
            indent=2,
            ensure_ascii=False,
        )
    print(f"Exported {len(models)} models ({sum(len(m['tags']) for m in models)} tags) → {out_path}")


def _param_sort_key(p: str) -> float:
    """Sort parameter strings numerically: '0.5b' < '1b' < '7b' < '70b'."""
    import re
    p = p.lower().strip()
    # Handle MoE formats like "8x7b"
    m = re.match(r"(\d+)x(\d+(?:\.\d+)?)(b|m|k)", p)
    if m:
        multiplier = {"b": 1e9, "m": 1e6, "k": 1e3}[m.group(3)]
        return int(m.group(1)) * float(m.group(2)) * multiplier
    m = re.match(r"e?(\d+(?:\.\d+)?)(b|m|k)", p)
    if m:
        multiplier = {"b": 1e9, "m": 1e6, "k": 1e3}[m.group(2)]
        return float(m.group(1)) * multiplier
    return 0


def _now_iso() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).isoformat()


def main():
    p = argparse.ArgumentParser(description="Export ollama_library.db to JSON")
    p.add_argument("--db", type=Path, default=DEFAULT_DB)
    p.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = p.parse_args()
    export(args.db, args.out)


if __name__ == "__main__":
    main()
