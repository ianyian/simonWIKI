# Document Ingest Ledger

> **Purpose:** record every document processed by `ingest`, with its checksum and timestamp,
> so re-running on a folder only (re)processes **new or changed** files and skips unchanged ones.
>
> This is **not** the activity log. For the operation timeline see [`../log.md`](../log.md).
>
> **How it works:** same as the source-code ledger — match the file's SHA-256: absent → new,
> different → changed (re-process), same → skip.

| File | SHA-256 (short) | Last processed | Status |
|------|-----------------|----------------|--------|
| _(none yet)_ | | | |
