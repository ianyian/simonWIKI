# Skill: ingest-document  (the default `ingest`)

**Trigger:** `ingest <file | folder | URL>`. Accepts:
- a **single file** under `raw/` (`.md`, `.txt`, `.pdf`, `.pptx`, `.docx`, `.xlsx`, `.html`);
- a **folder** under `raw/` (processes every new/changed document in it, recursively);
- a **URL** (`http(s)://…`) — the page is fetched and saved into `raw/web/` first, then ingested.

**Obey** `rules/` (01 raw-only, 02 checksum dedup, 03 post-ingest summary).

## Steps

1. **Resolve the input:**
   - **URL** → fetch the page, convert to text/markdown, and **save it to
     `raw/web/<slug>.md`** with the source URL recorded at the top (e.g. `Source: <url>`,
     `Fetched: <date>`). Then continue as a normal file under `raw/` (this keeps Rule 01 true).
   - **File/folder** → it must be under `raw/` (Rule 01). If not, reject and tell the user to
     move it into the right `raw/` subfolder.
2. **Resolve the file set** — if a folder, list documents recursively. Compute each file's
   SHA-256 and compare to `wiki/sources/ingest-ledger.md`; process only **new/changed** files
   (Rule 02).
3. For each file to process:
   a. If not already markdown/text, convert it: `python scripts/convert.py raw/<file>`
      (uses the extraction add-ons installed by `tools/prerequisites.md`).
   b. Read the content.
   c. Create/update `wiki/sources/<slug>.md` from `templates/source-summary.template.md`
      (Summary, Key Points, Quotes/Notable Excerpts, Related, Open Questions).
   d. Update `wiki/overview.md`; create/update `entities/` and `concepts/` pages as needed;
      flag contradictions under `## Open Questions` on both pages.
   e. File pages into a domain subfolder if the category is large.
4. **Update the ledger** (`wiki/sources/ingest-ledger.md`) and **regenerate** the index +
   manifest (`tools/regenerate-index.md`).
5. **Log** to `wiki/log.md`: `## [YYYY-MM-DD HH:MM] ingest | <folder/file> | processed: … | skipped: …`.
6. **Summarize** (Rule 03): processed, skipped (with reason), follow-ups.
