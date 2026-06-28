# PROMPTS.md — Ready-to-Use Prompt Library

> Copy-paste these into your AI agent's chat. Adjust file names and questions to match
> your project. These prompts are **tool-neutral** — they work with any capable agent.
> (Tool-specific export prompts are in the appendix at the bottom.)

---

## 🟢 Ingest — Add a New Document

> **Rules (see `rules/`):** sources must live under `raw/` (Rule 01); you can ingest a whole
> folder and only new files are processed (Rule 02); you always get a processed/skipped
> summary afterwards (Rule 03). Rich formats (`.docx`/`.pdf`/`.pptx`/`.xlsx`) work once the
> setup prerequisites are installed.

### Ingest a single document
```
ingest raw/requirements/project-brief.md
```

### Ingest a whole folder (only new files are processed)
```
ingest raw/meetings/
```

### Ingest from a website URL (fetched + saved to raw/web/ first)
```
ingest https://example.com/some-article
```

### Re-ingest one file on purpose (override dedup)
```
re-ingest raw/meetings/2026-06-08.md
```

### Ingest with emphasis guidance
```
ingest raw/specs/system-overview.txt

Focus especially on integration points between systems and any stated performance requirements.
```

### Ingest a meeting note
```
ingest raw/meetings/kickoff-2026-05-15.md

Capture any decisions made, action items, and open questions raised.
```

### Ingest and flag contradictions
```
ingest raw/requirements/user-stories-v2.md

After ingesting, check whether any new requirements contradict the existing wiki and report conflicts.
This is version 2 — mark anything it supersedes.
```

---

## 🔵 Query — Ask Business Questions

> By default the agent will offer to save substantial answers as a **solution card**.

### Understand a process
```
Explain the order fulfilment process end-to-end based on the wiki.
```

### List roles and responsibilities
```
What are all the user roles in this system? Summarise what each can do.
```

### Everything about one entity
```
Tell me everything the wiki knows about the Customer entity — attributes, relationships, and business rules.
```

### Compare two things
```
Compare the Warehouse Manager and Inventory Controller roles. Where do their responsibilities overlap?
```

### Find gaps and open questions
```
What are the unresolved questions or unclear requirements currently noted in the wiki?
```

### Trace a requirement to its source
```
Which raw source documents mention the real-time stock update requirement?
```

---

## 🟢 Solutions — The QnA Knowledge Base

> This is the compounding layer. Capture answers and fixes so they are reusable forever.

### Save the last answer as a solution
```
Save that as a solution card. Tag it and link it to the related concept and code pages.
```

### Record a fixed bug
```
Create a solution card: stock was over-sold when two outlets confirmed the same SKU at once.
Root cause was a missing reservation lock. Fix: row-level lock on reserve. Verified with a concurrency test.
```

### Record a decision and its rationale
```
Capture a solution card for the decision to allow partial order fulfilment, including why we chose it over all-or-nothing.
```

### Retrieve a past solution
```
Has anyone solved anything related to duplicate stock reservations before? Check wiki/solutions.
```

### Browse solutions by topic
```
List all solution cards tagged "inventory", newest first.
```

---

## 🟣 Code — Document & Query Source Code

> **Where to put your code:** drop your source files — **C#, JavaScript, SQL, anything** —
> into the **`sourcecode/`** folder, in whatever structure you already use. `sourcecode/`
> holds the code; `wiki/source-code/` holds the agent's documentation of it. Code uses the
> explicit `ingest-sourcecode` command (the default `ingest` is for documents).
>
> If a `codebase-memory` MCP is configured it's used automatically (faster); otherwise the
> agent reads files directly. Unchanged files are skipped via checksum dedup.
>
> **SQL tip:** schema (tables/relationships) → `docs/architecture.md` + entity pages;
> stored procedures / logic → code pages.

### Document a module
```
ingest-sourcecode sourcecode/services/order-service.cs
```

### Document a folder (only new/changed files are processed)
```
ingest-sourcecode sourcecode/services/

Create one code page per module and link each to the concepts it implements.
```

### Ask how something is implemented
```
Where in the code is the reservation timeout enforced, and which business rule does it implement?
```

### Check for drift (stale code docs)
```
Which code pages are stale — their source files changed after the page was last verified?
```

### What you get after `ingest-sourcecode`
- A doc page: `wiki/source-code/<module>.md` (purpose, classes, functions, relationships).
- Reports in `wiki/source-code-output/<module>.*`:
  - `.html` — **interactive animated graph** (labels, role colors, flowing edge particles,
    hands-free auto-tour, click a node for callers/callees). Open in a browser.
  - `.mmd` — Mermaid diagram for quick inline preview.
  - `.graph.json` — nodes + edges (machine-readable).
  - `.graph.db.zst` — compressed copy of the MCP's SQLite graph (re-queryable offline).
- A ledger row (checksum) + an activity-log entry.

### One-time: set up the code-intelligence MCP (optional, faster)
```
Check tools/prerequisites-checklist.md and set up the codebase-memory MCP:
install the binary (prebuilt or build the fork), then confirm .mcp.json / .vscode/mcp.json
point to it. Without it, ingest-sourcecode still works via the static fallback.
```

### Inspect the graph (who calls what)
```
Using the codebase-memory MCP, trace_path for <function> inbound — list every caller.
```
```
Run query_graph: MATCH (a)-[:CALLS]->(b) RETURN b.name, count(a) ORDER BY count(a) DESC — show the hotspots.
```

### Reset code knowledge for a new project (documents untouched)
```
reset-sourcecode
```

---

## 🟡 Synthesis — Generate Useful Outputs

### One-page executive summary
```
Generate a one-page executive summary of the project from the wiki. Save it as a wiki page.
```

### Feature list
```
List all features in the wiki as a table: Feature | Description | Related Roles.
```

### Glossary
```
Build a glossary of all business terms in the wiki: Term | Definition | Related Pages. Save to docs/glossary.md.
```

### Acceptance criteria roll-up
```
Summarise all acceptance criteria across the wiki into one list grouped by feature area.
```

---

## 🔴 Lint & Reindex — Keep It Healthy

> **`lint the wiki` is your lightweight refresh.** Run it weekly or per sprint. It flags
> only what has drifted — code pages whose source changed since they were last verified,
> plus broken links, contradictions, and orphans — so you re-index just those few pages
> instead of re-documenting the whole codebase.

### Full health check
```
lint the wiki

Check for: contradictions, orphan pages, missing cross-links, stale claims, code/solution drift, and broken links.
```

### Lightweight code refresh (drift only)
```
lint the wiki for code drift only

List code pages whose source files changed after last_verified, then re-index just those.
```

### Rebuild the catalog
```
reindex

Rebuild wiki/index.md and wiki/manifest.json from page frontmatter, then log it.
```

### Contradictions only
```
Are there any wiki pages that contradict each other? List them with the conflict.
```

### Missing coverage
```
Based on the raw sources, what important topics or entities are mentioned but have no wiki page yet?
```

---

## 🏗️ Solution Background — Keep docs/ in Sync

> Update the relevant `docs/` file first, then ingest it.

| What changed | Update | Then run |
|---|---|---|
| Purpose, context, tech stack, contacts | `docs/solution-profile.md` | `ingest docs/solution-profile.md` |
| New program/module/service | `docs/solution-map.md` | `ingest docs/solution-map.md` |
| Integration, diagram, DB schema | `docs/architecture.md` | `ingest docs/architecture.md` |
| New term | `docs/glossary.md` | `ingest docs/glossary.md` |

### Ask about a specific program
```
What does the Stock Reservation Engine do, and which modules depend on it?
```

### Find all programs in a phase
```
List all programs and modules planned for Phase 2, grouped by subsystem.
```

---

## 💡 Onboarding — New Team Member

### Get up to speed fast
```
I'm new to this project. Give me a 5-minute briefing: what it's about, who the key users are, and the main features.
```

### Understand scope
```
What is in scope and out of scope based on the wiki?
```

### What to read first
```
Which 5 wiki pages should I read first to understand this project?
```

---

## 🛠️ Setup & Upgrade

### New setup (from the skill)
```
Run the setup skill to create a fresh blank WIKI-LLM project in this folder.
Project name: <PROJECT NAME>
```

### Upgrade an existing project to the latest template version
```
Run the setup skill to upgrade this project. Back up first, tell me the current and new
version, and ask me to confirm before changing anything.
```

### Re-check / install prerequisites
```
Check prerequisites per tools/prerequisites.md: verify Python and Node.js and install the
document-extraction add-ons (docx, pdf, pptx, xlsx) so I can ingest those files directly.
```

### Reset this template to blank
```
Reset this project to a blank wiki: clear raw/, wiki/ pages, and sourcecode/, keep the folder
structure and templates, and re-create empty index.md, manifest.json, log.md, and overview.md.
```
