# Skill: ingest-sourcecode

**Trigger:** `ingest-sourcecode <file-or-folder>` for code types
(`.cs`, `.js`, `.ts`, `.py`, `.java`, `.cpp`, `.c`, `.go`, `.rs`, `.sql`, …).
Source code is **opt-in** — the default `ingest` is for documents.
**Obey** `rules/` (02 checksum dedup, 03 post-ingest summary, 04 cite, 05 no-training).

## Steps

0. **Ensure the code folders exist** — if this project was set up without code, create
   `sourcecode/`, `wiki/source-code/` (+ README, code-map, ingest-ledger), and
   `wiki/source-code-output/` (+ README) on first use, so enabling code later "just works".
1. **Resolve the file set** — code normally lives in `sourcecode/` (a `raw/` path is also
   allowed for a one-off snapshot). If a folder, list source files recursively.
2. **Checksum dedup (Rule 02)** — compute each file's SHA-256 and compare to
   `wiki/source-code/ingest-ledger.md`. Process only **new or changed** files; skip unchanged
   ones (this is the main token saver for large codebases).
3. **Analyze each file to process:**
   - **If the `codebase-memory` MCP is configured** (see `.mcp.json` / `.vscode/mcp.json`),
     call it to get a structured memory object: purpose, classes (with descriptions), public
     functions/methods (signature + purpose), dependencies/imports, and relationships
     (what it calls / what calls it). This offloads the heavy reading and saves context.
   - **Otherwise (static fallback)** read the file directly and extract the same fields.
4. **Write the analysis page** `wiki/source-code/<slug>.md` from
   `templates/code-module.template.md` (Purpose, Classes, Functions, Dependencies,
   Relationships, Open Questions). Set `language`, `source_files`, `last_verified` (today);
   link to the concepts/entities it implements. Update `wiki/source-code/code-map.md`.
5. **Write the generated reports** into `wiki/source-code-output/` (one set per module):
   - `<slug>.graph.json` — nodes + call edges. Each node: `{id, file, role}` where role is one
     of `root|view|hub|shared|util|helper` (drives the colors). Edges: `{from, to}`.
   - `<slug>.mmd` — Mermaid call/dependency diagram (quick inline preview in md/GitHub).
   - `<slug>.html` — **interactive animated graph (the default, always produced)**. Fill
     `templates/code-graph.template.html`: replace `{{MODULE}}` and `{{GRAPH_JSON}}` (paste the
     `<slug>.graph.json` contents inline so the file is self-contained). Built on vis-network
     (CDN); features: node **labels**, **role colors brightened by connection count**, node
     **size by connections**, edge **thickness + particle count by relationship strength**,
     **animated particles flowing along every edge**, a **hands-free auto-tour** that brings each
     node to center in turn (Pause/Play), and **click a node** to inspect its callers/callees.
   - `<slug>.graph.db.zst` — if the MCP was used, a zstd-compressed copy of its SQLite graph
     from `~/.cache/codebase-memory-mcp/` (`zstd -19`), so the full graph is re-queryable
     offline. (Skip for the static fallback — there is no DB.)
   These are regenerable reports, kept separate from the curated `.md` page.
6. **Update the ledger** (`wiki/source-code/ingest-ledger.md`: path, short SHA-256, timestamp,
   status) and **regenerate** the index + manifest.
7. **Log** to `wiki/log.md`:
   `## [YYYY-MM-DD HH:MM] ingest-sourcecode | <folder/file> | processed: … | skipped: … | analyzer: mcp|static`.
8. **Summarize** (Rule 03): processed, skipped, whether MCP or fallback was used, follow-ups.

> SQL note: schema (tables/relationships) belongs in `docs/architecture.md` + entity pages;
> stored procedures / views / logic are documented here as code pages.

## Inspect afterwards (check calling functions)
After ingesting, the user can query the graph with the MCP functions — most useful:
`trace_path` (who calls X / what X calls), `search_graph` (find symbols), `query_graph`
(Cypher), `get_architecture` (overview), `get_code_snippet` (read a symbol).
Example: "trace_path for fetchFromAPI inbound" → lists every caller.
