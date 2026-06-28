# sourcecode/ — Your Source Code (optional)

**Put your source code — C#, JavaScript, SQL, anything — here in `sourcecode/`**, in whatever
structure your project already uses. No need to reorganize by feature or language; mirroring
your existing repo is fine, and mixed file types in one folder are fine.

The code lives in `sourcecode/`; the **documentation** of that code lives in
`wiki/source-code/` so it is searchable and cross-linked with the business knowledge.

## How code is documented

1. You add or change code in `sourcecode/`.
2. Ask your agent: `ingest-sourcecode sourcecode/<path>` (a file or a whole folder).
3. The agent analyzes it — using the **codebase-memory MCP** if configured, otherwise by
   reading the file directly — and creates/updates a page in `wiki/source-code/` describing
   purpose, classes, functions, dependencies, and relationships, linked to the concepts it
   implements.

> Index by the unit a person asks about (a service/module/feature), not one page per file.
> For **SQL**: schema (tables/relationships) → `docs/architecture.md` + entity pages;
> stored procedures / views / logic → code pages here.

## Only new or changed files are processed (token saving)

Every processed file is recorded in `wiki/source-code/ingest-ledger.md` with its **SHA-256
checksum** and **timestamp**. On the next `ingest-sourcecode` run the agent skips files whose
checksum is unchanged and only (re)processes new or modified ones — so dumping a few new
files never forces a full re-scan. (This is separate from `wiki/log.md`, the activity log.)

## Secrets

Never commit credentials, keys, tokens, `.env` files, or PII. See the project `.gitignore`.

> Don't want code in this project? Delete this `sourcecode/` folder and `wiki/source-code/`.
