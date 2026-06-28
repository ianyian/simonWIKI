# Skill: reset-sourcecode

**Trigger:** `reset-sourcecode` — clear all source-code knowledge so the project is ready for
a new codebase. Use when switching the project to a different repo, or starting fresh.

> Documents are untouched — this only resets the **code** side.

## Steps (confirm with the user first — this deletes generated content)

1. **Confirm**: "This will remove all ingested source code, its docs, reports, and graph.
   Your documents and wiki knowledge stay. Proceed? (yes / cancel)". Stop if not yes.
2. **Delete the code itself** (optional, ask): empty `sourcecode/` if they want a clean slate.
3. **Clear the code docs**: delete every page in `wiki/source-code/` **except** `README.md`;
   reset `code-map.md` to its empty template row.
4. **Clear the reports**: delete everything in `wiki/source-code-output/` **except** `README.md`.
5. **Reset the code ledger**: blank `wiki/source-code/ingest-ledger.md` back to its empty table.
6. **Drop the MCP graph** (if the MCP is configured): `codebase-memory-mcp cli delete_project '{"project":"<name>"}'`
   (use `list_projects` to find the name), removing the SQLite graph from `~/.cache/...`.
7. **Reindex** the wiki and **log** it: `## [YYYY-MM-DD HH:MM] reset-sourcecode | cleared code docs, reports, ledger, graph`.
8. **Report** what was cleared.

Do **not** touch `raw/`, `wiki/sources/`, `wiki/entities/`, `wiki/concepts/`,
`wiki/solutions/`, or `docs/`.
