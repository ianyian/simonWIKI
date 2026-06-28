# WIKI-LLM — A Living Knowledge Base Template

> Drop in your documents and code. An AI agent builds and maintains a structured wiki.
> You ask questions and get answers — and every answer is kept for next time.

This template implements the **WIKI-LLM pattern**: a persistent, *compounding* knowledge
base where an AI agent reads your raw project documents (and optionally source code) and
maintains a cross-linked wiki of synthesized knowledge. Unlike plain chat, the wiki
**accumulates** — every document enriches it, answers are saved as reusable solution
cards, cross-references are kept, and contradictions are flagged.

It is **tool-neutral**: works with Claude, GitHub Copilot, Cursor, Cowork, or any capable
AI agent. Nothing here depends on a specific editor or operating system.

---

## What you do vs. what the agent does

**You:** source documents, ask good questions, give direction.
**The agent:** summarizes & synthesizes, creates/updates wiki pages, cross-references,
documents code, files answers as solutions, flags contradictions and gaps, and answers
your questions from the wiki.

---

## How to share & set up — the setup skill

**The supported way to create or upgrade a WIKI-LLM environment is the
[`setup.md`](setup.md) skill.** Share that **one file** with a
teammate. They drop it into a folder and tell their agent:

> "Run the setup skill."

The same file handles two cases automatically:

- **Empty folder → fresh setup.** The agent creates the entire environment (folders,
  `AGENTS.md`, `README.md`, `PROMPTS.md`, templates, blank index/manifest/log) from scratch.
- **Existing project → upgrade.** The agent detects the project's version and upgrades it to
  the current template version, without touching your content.

No copying, no cleanup. (You can also just use this folder as-is and start ingesting, but
the skill is what you share.)

## Versioning

The template is version-controlled, starting at **1.0**. Each project records the template
version it was deployed with in **`docs/solution-profile.md`** (Section 1 + a Version History
table) — that's the file that also holds your project name. Every time the setup skill
runs (setup or upgrade) it stamps the version and logs a `deploy` entry. A project created
before version control existed is treated as **pre-version** and upgraded to 1.0 on the next
run. The full version history and migration steps live at the bottom of `setup.md`.

---

## Quick start (5 minutes)

1. **Set the project name** — edit [`AGENTS.md`](AGENTS.md) §1 and `docs/solution-profile.md`.
2. **Add a document** — put a `.md`/`.txt` into the right `raw/` subfolder
   (`requirements/`, `specs/`, `meetings/`).
3. **Ingest it** — tell your agent: `ingest raw/requirements/your-file.md`.
   The agent reads it, updates the wiki, and rebuilds the index.
4. **Ask questions** — e.g. *"What are the main user roles?"* The agent answers from the
   wiki and offers to save the answer as a reusable solution card.
5. **(Optional) Add & document code** — put your source in `sourcecode/`, then
   `ingest-sourcecode sourcecode/your-module.js`. See "Working with source code" below.

See [`PROMPTS.md`](PROMPTS.md) for a full library of ready-to-use prompts.

---

## Folder guide

| Folder / File | Who manages it | Purpose |
|---|---|---|
| `raw/` | **You** | Source documents. Immutable — never edit once added. |
| `wiki/` | **Agent** | Auto-generated knowledge: `sources/`, `entities/`, `concepts/`, `solutions/` (QnA), `source-code/` (code docs), `source-code-output/` (generated mermaid/json/html reports). |
| `docs/` | **You** | Curated background: profile, solution map, architecture, glossary. |
| `sourcecode/` | **You** | Your actual source code (C#, JS, SQL, anything). |
| `templates/` | Shared | Page templates the agent fills in. |
| `tools/` | Shared | Specs the agent follows (rebuild index, prerequisites). |
| `scripts/` | Shared | Helper scripts (e.g. `convert.py` for document extraction). |
| `rules/` | **You** | Editable rules the agent must obey. |
| `skills/` | Shared | Operation playbooks (`ingest`, `ingest-sourcecode`). |
| `AGENTS.md` | **You + Agent** | The schema (source of truth). `CLAUDE.md` points to it. |
| `PROMPTS.md` | **You** | Copy-paste prompt library. |

**Two ingest commands.** `ingest <file/folder>` is the default, for **documents**.
`ingest-sourcecode <file/folder>` is for **code**. Both skip files that haven't changed
(SHA-256 checksums in the per-area *ingest ledgers*) so re-runs are cheap.

**Prerequisites, rules & MCP.** First-time setup checks Python + Node.js and installs
document-extraction add-ons (so `.docx`/`.pdf`/`.pptx`/`.xlsx` ingest with no later prompts) —
see [`tools/prerequisites.md`](tools/prerequisites.md). Hard rules live in
[`rules/`](rules/README.md) (yours to edit): ingest only from `raw/`, checksum dedup,
post-ingest summary, cite sources, no training-knowledge gap-filling. An optional
**codebase-memory MCP** (`.mcp.json` / `.vscode/mcp.json`) speeds up code analysis, with a
static fallback when it's not set.

---

## How it scales to hundreds of pages

- **Domain subfolders**: once a category passes ~15 pages, the agent groups it by business
  area (`wiki/concepts/inventory/…`). Domains are created on demand.
- **Tags**: every page is tagged, so you can retrieve by topic across categories.
- **Regenerable catalog**: `wiki/index.md` (human) and `wiki/manifest.json` (machine) are
  rebuilt from page frontmatter — never hand-maintained, so they stay accurate at any size.
- **Solutions layer**: answers compound in `wiki/solutions/` instead of being re-derived.

---

## Working with source code

Put your actual source code — **C#, JavaScript, SQL, anything** — in the **`sourcecode/`**
folder, in whatever structure your project already uses (no need to reorganize).

Two separate things, kept straight:

- **`sourcecode/`** holds the *code itself*.
- **`wiki/source-code/`** holds the agent's *plain-language documentation* of that code
  (purpose, classes, functions, dependencies, relationships), linked to the business rules it
  implements. The agent creates these for you.

How to use it:

1. Add or change code in `sourcecode/`.
2. Document it: `ingest-sourcecode sourcecode/<path>` — one file or a whole folder. The agent
   analyzes it (via the codebase-memory MCP if set, else by reading it) and writes/updates a
   page in `wiki/source-code/`. Unchanged files are skipped (checksum dedup), so re-runs are cheap.
3. Keep it fresh with **`lint the wiki`** (see below).

Notes:

- **SQL** splits in two: schema (tables, relationships) → `docs/architecture.md` + entity
  pages; stored procedures / views / logic → code pages.
- Don't want code here? Delete `sourcecode/` and `wiki/source-code/`.
- Never commit secrets (connection strings, keys, tokens) — see `.gitignore`.

## Keeping it fresh — `lint the wiki`

You do **not** re-document everything on a schedule. Run **`lint the wiki`** periodically
(weekly or per sprint is a good default). It's a lightweight pass that flags only what has
**drifted** — code pages whose source files changed since they were last verified, plus
broken links, contradictions, and orphan pages — so you re-index just those few pages
instead of the whole codebase. That is how code knowledge stays current cheaply.

Rhythm that works well: **index-on-change → weekly `lint the wiki` → occasional full sweep**
(e.g. each major release). For a fast-moving codebase, weekly lint is the sweet spot; for a
stable one, monthly is plenty.

---

## Adapting for your project

1. Update `AGENTS.md` §1 and `docs/solution-profile.md`.
2. The `wiki/`, `raw/`, and `docs/` folders are already blank — just start ingesting.
3. See [`PROMPTS.md`](PROMPTS.md) for ready-to-use prompts covering every operation.

---

## Tips

- Full-text search across `wiki/` is your fastest navigation tool; `tags` and `manifest.json` are next.
- The wiki is just markdown — commit it to git for full version history.
- Run **lint the wiki** weekly/per-sprint — the lightweight way to refresh drifted code & docs (see above).
- One source can update many pages — that is intended.
- [`PROMPTS.md`](PROMPTS.md) is the single source of prompt instructions — start there.
