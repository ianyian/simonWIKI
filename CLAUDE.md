# CLAUDE.md

> Pointer file for Claude Code (and the Claude Code VS Code extension), which auto-reads
> `CLAUDE.md`. The real, tool-neutral schema lives in **[`AGENTS.md`](AGENTS.md)** — read it
> first and follow it.

**Read [`AGENTS.md`](AGENTS.md) at the start of every session and obey it**, including:

- the rules in [`rules/`](rules/README.md) (ingest only from `raw/`, checksum dedup,
  post-ingest summary, cite sources, no training-knowledge gap-filling);
- the operation playbooks in [`skills/`](skills/README.md)
  (`ingest` for documents, `ingest-sourcecode` for code);
- the optional **codebase-memory MCP** (see `.mcp.json` / `.vscode/mcp.json`) for fast code
  analysis, with a static fallback when it is not configured.

Do not duplicate the schema here — `AGENTS.md` is the single source of truth.
