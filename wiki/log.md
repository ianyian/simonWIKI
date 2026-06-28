# Wiki Activity Log

> **This is the activity log** — the human-readable timeline of every operation, for debugging
> and history. It is NOT the dedup record: per-file checksums live in the *ingest ledgers*
> (`wiki/sources/ingest-ledger.md`, `wiki/source-code/ingest-ledger.md`).
>
> Append-only. Do not edit past entries.
> Format: `## [YYYY-MM-DD HH:MM] <operation> | <description>`
> Operations: `ingest`, `ingest-sourcecode`, `query`, `solution`, `lint`, `reindex`, `setup`, `deploy`.

---

## [YYYY-MM-DD] deploy | Fresh setup at template v1.0.

## [2026-06-27 18:59] ingest-sourcecode | sourcecode/youtube-clone | processed: 17 files | analyzer: mcp (codebase-memory) | nodes 78, edges 128 | page: wiki/source-code/youtube-clone.md

## [2026-06-28 06:04] reset-sourcecode | cleared youtube-clone code docs/reports/ledger/graph (docs untouched)
## [2026-06-28 06:04] ingest-sourcecode | sourcecode/uber-clone-yt | processed: 14 files | analyzer: mcp (codebase-memory) | nodes 82, edges 109 | page: wiki/source-code/uber-clone-yt.md
