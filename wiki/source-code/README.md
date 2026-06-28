# Source-Code — Documentation of Source Modules

One page per code module/service, describing what it does in plain language and linking it to
the business knowledge it implements. The code lives in `sourcecode/`; this folder describes it.

- Created by `ingest-sourcecode` (see [`skills/ingest-sourcecode.md`](../../skills/ingest-sourcecode.md)).
- Use [`templates/code-module.template.md`](../../templates/code-module.template.md).
- Group by domain subfolder once this passes ~15 pages: `source-code/ordering/order-service.md`.
- Each page lists `source_files:` and a `last_verified:` date (drift rule — see `sourcecode/README.md`).
- `code-map.md` indexes all code pages and maps them to subsystems.
- `ingest-ledger.md` records every processed file with its checksum + timestamp (for dedup).
