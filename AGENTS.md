# AGENTS.md — WIKI-LLM Schema & Instructions

> This file is the master instruction schema for **any** AI coding/knowledge agent
> (Claude, Copilot, Cursor, Cowork, etc.). It defines how the wiki is structured, the
> conventions to follow, and the exact workflows for ingesting sources, answering
> questions, capturing solutions, documenting code, and maintaining the wiki.
> **Do not delete this file.** Update it as the project evolves.

This template is **tool-neutral**. Instructions describe *what to do*, not which buttons
to press. Anything specific to one tool lives in Section 10 (Optional: Tool-Specific Add-ons).

---

## 0. Rules, Skills, Prerequisites & MCP (read first)

- **Rules**: Before operating this wiki, load every file in [`rules/`](rules/README.md) and
  **obey them** (raw-only ingest, checksum dedup, post-ingest summary, cite sources, no
  training-knowledge gap-filling). They are authoritative and user-editable.
- **Skills**: Operations follow the playbooks in [`skills/`](skills/README.md) —
  `ingest` for documents (default), `ingest-sourcecode` for code.
- **Prerequisites**: First-time setup runs [`tools/prerequisites.md`](tools/prerequisites.md)
  — checks Python + Node.js and installs document-extraction add-ons so
  `.docx`/`.pdf`/`.pptx`/`.xlsx` ingest later with no further prompts (via
  [`scripts/convert.py`](scripts/convert.py)).
- **MCP**: If a `codebase-memory` MCP is configured (`.mcp.json` for Claude Code,
  `.vscode/mcp.json` for VS Code) the agent uses it to analyze source code faster; otherwise
  it falls back to reading files directly. See §10.

### Command routing

| Command | Accepts | Playbook |
|---|---|---|
| `ingest <file \| folder \| URL>` (default) | docs (`.md .txt .pdf .pptx .docx .xlsx .html`), a folder, or a `http(s)://` URL (saved to `raw/web/`) | `skills/ingest-document.md` |
| `ingest-sourcecode <file-or-folder>` | code (`.cs .js .ts .py .java .cpp .c .go .rs .sql …`) | `skills/ingest-sourcecode.md` |

Documents are the default and priority. Source code requires the explicit
`ingest-sourcecode` command.

---

## 1. Project Context

**Project**: <PROJECT NAME>
**Purpose**: This wiki is the living knowledge base for the project. An AI agent builds and
maintains it from raw documents and source code. Team members use it to understand the
solution and to retrieve past answers.

**Versioning**: This environment is created and upgraded only via the `setup` skill.
The WIKI template version is recorded in [`docs/solution-profile.md`](docs/solution-profile.md)
(Section 1 + its Version History table) and stamped on every deployment.

> Replace this section when you adopt the template. See [`docs/solution-profile.md`](docs/solution-profile.md)
> for the full background and [`docs/solution-map.md`](docs/solution-map.md) for the program inventory.

---

## 2. Folder Layout

```
raw/                  ← Source documents (immutable — never edit these)
  requirements/  specs/  meetings/   (add more subfolders as needed)

wiki/                 ← Agent-generated and agent-maintained (do not hand-edit pages)
  index.md            ← Human catalog of all pages (REGENERATED from frontmatter)
  manifest.json       ← Machine catalog (REGENERATED from frontmatter)
  log.md              ← ACTIVITY LOG (timeline of every operation; for debugging)
  overview.md         ← Executive summary of the whole project
  entities/           ← WHO and WHAT: roles, actors, systems, data objects
  concepts/           ← HOW: business rules, workflows, processes
  solutions/          ← Solved problems & past answers (the QnA knowledge base)
  source-code/        ← Docs of source modules + code-map.md + ingest-ledger.md
  source-code-output/ ← Generated code reports (mermaid/json/html) — separate from the docs
  sources/            ← Doc summaries + ingest-ledger.md (one summary per raw source)

docs/                 ← Human-curated background (YOU own these)
  solution-profile.md  solution-map.md  architecture.md  glossary.md  subsystems/

sourcecode/           ← Your source code (optional; delete if not needed)
templates/            ← Page templates — every new page starts from one of these
tools/                ← Specs the agent follows (regenerate-index.md, prerequisites.md)
rules/                ← Authoritative, editable rules the agent must obey (see §0)
skills/               ← Operation playbooks (ingest-document, ingest-sourcecode)
scripts/              ← Helper scripts (convert.py for document extraction)
.mcp.json / .vscode/mcp.json   ← codebase-memory MCP config (Claude Code / VS Code)
CLAUDE.md             ← Pointer to this file for Claude Code (AGENTS.md is the source of truth)
```

### 2.0 Logs & records (don't mix them)
- `wiki/log.md` — **activity log**: human timeline of every operation (debugging/history).
- `wiki/sources/ingest-ledger.md` — **document dedup ledger**: per-file SHA-256 + timestamp.
- `wiki/source-code/ingest-ledger.md` — **code dedup ledger**: per-file SHA-256 + timestamp.

The ledgers tell the agent what to skip (unchanged) vs (re)process (new/changed). The log
tells a human what happened and when.

### 2.1 Scaling rule (important)

Within any `wiki/` category, once it passes **~15 pages, group by domain subfolder**
(a business area: `ordering`, `inventory`, `billing`, `auth`, …). Example:
`wiki/concepts/inventory/reservation-rules.md`. Domains are created **on demand** — never
predefine them. This is what lets the wiki scale to **hundreds of pages**. Navigate large
wikis by domain first, then by `tags`, then by full-text search.

---

## 3. Page Conventions

### 3.1 Naming
- lowercase-with-hyphens: `order-lifecycle.md`, `customer.md`
- Entity pages = the noun. Concept pages = the process. Solution pages = the problem.
  Source summaries mirror the raw filename. Code pages = the module name.

### 3.2 Frontmatter (on every page)
```yaml
---
title: Page Title
category: entity | concept | solution | code | source | overview | docs
domain: <business area or omit if unfiled>
tags: [tag1, tag2]
sources: [raw/path/file.md]      # or source_files: [...] for code pages
last_updated: YYYY-MM-DD
last_verified: YYYY-MM-DD         # solution & code pages only
status: active | superseded | draft
---
```

### 3.3 Linking
- Standard relative markdown links: `[Order](../entities/order.md)`. No `[[wikilinks]]`.
- Every page ends with `## Related Pages` and `## Sources`.
- Cross-link liberally — the value of the wiki is in its connections.

### 3.4 Templates
Always start a new page from the matching file in [`templates/`](templates/README.md).

---

## 4. Operations

### 4.1 Ingest — documents (the default)
Trigger: **"ingest <file | folder | URL>"**. Full steps in
[`skills/ingest-document.md`](skills/ingest-document.md). In short: resolve the input — a
**URL** is fetched and saved to `raw/web/` first; a **folder** is processed recursively; all
sources must end up under `raw/` (Rule 01) → checksum-dedup against
`wiki/sources/ingest-ledger.md`, process only new/changed files (Rule 02) → convert non-text
with `scripts/convert.py` → write source summary + update overview/entities/concepts + flag
contradictions → update ledger → regenerate index/manifest → log → summarize (Rule 03).

> One source may touch 5–10 pages. That is normal and intended.

### 4.2 Query — answer a question (and capture it)
1. Read `manifest.json` (or `index.md`) to find relevant pages by category/domain/tags.
2. Read those pages; synthesize an answer with inline links to the pages used.
3. **By default, file the answer as a solution card** in `wiki/solutions/` (from the
   template) when it is non-trivial or likely to be asked again — this is the compounding
   QnA layer and the main point of the wiki. For throwaway questions, skip filing.
4. If filed: set `last_verified`, regenerate the index, append to `log.md`.

### 4.3 Solution — capture a solved problem / decision
When a bug is fixed, a decision is made, or a reusable answer emerges:
1. Create a card in `wiki/solutions/` using `templates/solution.template.md`
   (Problem → Context → Root Cause → Solution → Verification).
2. Tag it; link to related concept/entity/code pages.
3. Regenerate the index; append to `log.md`.

### 4.4 Ingest-sourcecode — document source code
Trigger: **"ingest-sourcecode <file-or-folder>"** (code is opt-in; `ingest` stays for docs).
Full steps in [`skills/ingest-sourcecode.md`](skills/ingest-sourcecode.md). In short: resolve
files (normally under `sourcecode/`) → checksum-dedup against
`wiki/source-code/ingest-ledger.md`, process only new/changed (Rule 02) → analyze via the
**codebase-memory MCP** if configured, else read directly → write a page in
`wiki/source-code/` (purpose, classes, functions, dependencies, relationships) with
`language`/`source_files`/`last_verified` → also write reports to `wiki/source-code-output/`
(`.graph.json`, `.mmd`, `.html`, and the `.graph.db.zst` snapshot) → update `code-map.md` +
ledger → regenerate index → log → summarize. Afterwards the user can inspect calls via
`trace_path` / `search_graph` / `query_graph` (see §10).

### 4.4b Reset-sourcecode — clear code knowledge for a new project
Trigger: **"reset-sourcecode"**. Full steps in [`skills/reset-sourcecode.md`](skills/reset-sourcecode.md).
Confirms, then clears `wiki/source-code/` pages, `wiki/source-code-output/`, the code ledger,
and the MCP graph — leaving documents and the rest of the wiki untouched.

### 4.5 Lint — health check
When the user says **"lint the wiki"**, report and offer fixes for:
- **Contradictions** between pages
- **Orphan pages** (no inbound links)
- **Stale claims** superseded by newer sources
- **Drift**: any `code`/`solution` page whose source changed after `last_verified` (for code,
  compare the file's current SHA-256 to `wiki/source-code/ingest-ledger.md`)
- **Missing pages**: important concepts mentioned but undocumented
- **Broken links** and **index/manifest mismatches** (catalog vs. files on disk)
Append a `lint` entry to `log.md` after fixing.

### 4.6 Reindex — rebuild the catalog
Follow `tools/regenerate-index.md` to rebuild `index.md` and `manifest.json` from page
frontmatter. Run this after any batch of changes. The catalog is **never hand-maintained**.

### 4.7 Supersede — handle changed sources
`raw/` is immutable, so when a document is revised, add the new version (e.g.
`user-stories-v2.md`) and ingest it. Mark superseded pages/sources with
`status: superseded` and a note pointing to the replacement, rather than deleting them.

---

## 5. Behaviour Rules
- **Never modify files in `raw/`** — immutable source truth.
- **Never invent catalog entries** — `index.md`/`manifest.json` reflect only real files.
- **Always regenerate the index** after creating/deleting/moving pages.
- **Always append to `wiki/log.md`** after ingest, ingest-sourcecode, solution, lint, reindex, or deploy.
- **Always obey `rules/`** — they are authoritative (see §0), including: cite the wiki page
  behind each claim (Rule 04) and never fill project gaps from training knowledge (Rule 05).
- **Prefer updating existing pages** over creating redundant ones.
- **Flag uncertainty** under `## Open Questions` rather than guessing.
- **Synthesize, don't dump** — pages are distilled knowledge, not pasted raw text.
- **Never commit secrets** — no credentials, keys, tokens, or PII in `raw/`, `sourcecode/`, or wiki.

---

## 6. Supported Input Formats
`.md` and `.txt` ingest directly. `.docx`, `.pdf`, `.pptx`, `.xlsx` ingest directly once the
extraction add-ons from `tools/prerequisites.md` are installed (done at first-time setup) —
no per-file install approval needed. On a machine without those add-ons, paste the text into
a `.txt`/`.md` under `raw/` instead. All ingest sources must live under `raw/` (Rule 01).

---

## 7. Domains Registry (optional)
List active domains here as they emerge, so naming stays consistent across the team:

| Domain | Description |
|---|---|
| _(none yet)_ | |

---

## 8. Updating This Schema
Any team member may propose changes to `AGENTS.md`. The agent follows the latest committed
version. Update it for new folder conventions, domain-specific entity types, or custom
workflows.

---

## 9. Quick Command Reference

| Say this to your agent | It does |
|---|---|
| `ingest raw/<file-or-folder>` | Documents: summarize + update wiki + reindex (only new/changed) |
| `ingest-sourcecode sourcecode/<path>` | Document code in `wiki/source-code/` + reports in `wiki/source-code-output/` (MCP if available) |
| `reset-sourcecode` | Clear all code docs/reports/graph for a new project (docs untouched) |
| `answer: <question>` | Synthesize from the wiki (cited) + optionally file a solution |
| `save that as a solution` | Create a solution card from the last answer |
| `lint the wiki` | Health check (contradictions, drift, orphans, broken links) |
| `reindex` | Rebuild `index.md` + `manifest.json` |

---

## 10. Optional: Tool-Specific Add-ons

### codebase-memory MCP (recommended for source code)
A local engine ([win4r/codebase-memory-mcp-pro](https://github.com/win4r/codebase-memory-mcp-pro),
fork of DeusData) that indexes code into a **SQLite knowledge graph** and answers structural
queries as JSON, so `ingest-sourcecode` is faster and uses far less context. **Optional** —
without it the agent reads files directly (static fallback).

**Install** (see `tools/prerequisites-checklist.md` rows 10–14): prebuilt one-line installer,
or build the fork (`./scripts/build.sh` → put `codebase-memory-mcp` on PATH).

**Config** — it's a **stdio command**, not a URL:
- **Claude Code** (CLI + VS Code extension): **`.mcp.json`** —
  `{ "mcpServers": { "codebase-memory": { "command": "codebase-memory-mcp", "args": [] } } }`.
- **VS Code** (native MCP): **`.vscode/mcp.json`** —
  `{ "servers": { "codebase-memory": { "command": "codebase-memory-mcp", "args": [] } } }`.
- `CLAUDE.md` points Claude Code here; this `AGENTS.md` is the source of truth.

**Where its data lives & key functions** — it stores the graph at
`~/.cache/codebase-memory-mcp/<project>.db`; `ingest-sourcecode` also saves a compressed copy
to `wiki/source-code-output/<module>.graph.db.zst`. Query it (or the snapshot) with:

| Function | Purpose |
|---|---|
| `index_repository` | Build/refresh the graph for a repo. |
| `get_architecture` | Overview: languages, packages, entry points, hotspots. |
| `search_graph` | Find symbols by name / label / file. |
| `trace_path` | Who calls a function / what it calls (the calling chain). |
| `query_graph` | Cypher-like queries over nodes/edges. |
| `get_code_snippet` | Read a symbol's source by qualified name. |
| `detect_changes` | Map a git diff to impacted symbols + blast radius. |
