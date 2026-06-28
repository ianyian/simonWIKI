# Source-Code Output — Generated Reports

Generated **report artifacts** for documented code modules. Kept separate from the analysis
pages in `wiki/source-code/` on purpose: those are the curated docs; these are machine-generated
visual/data reports you can regenerate any time.

`ingest-sourcecode` writes one set per module (named after the module):

| File | What it is |
|---|---|
| `<module>.graph.json` | Nodes + call edges from the codebase-memory MCP (machine-readable). |
| `<module>.mmd` | Mermaid call/dependency diagram (renders in GitHub / VS Code / md preview). |
| `<module>.html` | **Interactive animated graph** (vis-network) — the default. Labels, role colors brightened by connection count, edge thickness + flowing particles by relationship strength, a hands-free auto-tour (Pause/Play), and click-a-node to see callers/callees. Self-contained (data embedded); needs internet on first open (loads vis-network from CDN). |
| `<module>.graph.db.zst` | Zstd-compressed copy of the MCP's SQLite **knowledge graph** — the full reference you can re-query offline. |

## The `.db` snapshot and how to query it

`<module>.graph.db.zst` is a compressed copy of the SQLite graph the
`codebase-memory-mcp` engine built (its live copy lives in `~/.cache/codebase-memory-mcp/`).
Keep it here as the portable source of truth — decompress with `zstd -d <file>` and the MCP (or
any SQLite tool) can read it. After an `ingest-sourcecode` run you can ask the agent to query it
with these MCP functions:

| MCP function | Purpose — what you can check |
|---|---|
| `get_architecture` | Big picture: languages, packages, entry points, hotspots, clusters. |
| `search_graph` | Find symbols by name/label/file (e.g. all functions matching `.*Handler.*`). |
| `trace_path` | **Who calls a function / what it calls** — the calling chain (inbound/outbound). |
| `query_graph` | Cypher-like queries over nodes/edges (e.g. count callers per function). |
| `get_code_snippet` | Read the source of a symbol by its qualified name. |
| `detect_changes` | Map a git diff to impacted symbols + blast radius. |

These are derived from the MCP's knowledge graph (or the static fallback) — safe to delete and
regenerate. The human-readable summary for each module lives in `wiki/source-code/<module>.md`.
