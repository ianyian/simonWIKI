# Rule 02 — Folder-level ingest with checksum de-duplication

**Rule:** `ingest` (documents) and `ingest-sourcecode` (code) both accept either a single file
**or a folder**, and both only process files that are new or changed.

When given a folder (e.g. `ingest raw/meetings/` or `ingest-sourcecode sourcecode/services/`):

1. **List** all relevant files recursively (documents: `.md`/`.txt` and, with the extraction
   add-ons, `.docx`/`.pdf`/`.pptx`/`.xlsx`; code: source extensions like `.cs`/`.js`/`.ts`/
   `.py`/`.sql`/...).
2. **Compare against the ledger** — compute each file's **SHA-256** and check the matching
   ledger:
   - documents → `wiki/sources/ingest-ledger.md`
   - source code → `wiki/source-code/ingest-ledger.md`

   Absent from the ledger → **new** (process). Checksum differs → **changed** (re-process).
   Checksum matches → **skip** (no tokens spent re-reading it).
3. **Process only new/changed files.**
4. **Update the ledger** row for each processed file (path, short SHA-256, timestamp, status),
   and add an `ingest` / `ingest-sourcecode` entry to `wiki/log.md`.

This makes ingest **idempotent and cheap**: re-running on a folder only handles what actually
changed. To force a re-process, the user can say so explicitly (e.g. "re-ingest <file>").
