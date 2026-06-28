# Source-Code Ingest Ledger

> **Purpose:** record every source file processed by `ingest-sourcecode`, with its checksum
> and timestamp, so re-runs only (re)process **new or changed** files and skip unchanged ones.
> This saves tokens — dumping a few new files never forces a full re-scan.
>
> This is **not** the activity log. For the operation timeline see [`../log.md`](../log.md).
>
> **How it works:** the agent computes each file's SHA-256. If the file is absent here → new
> (process it). If present but the checksum differs → changed (re-process, update the row).
> If present and the checksum matches → skip.

| File | SHA-256 (short) | Last processed | Status |
|------|-----------------|----------------|--------|
| sourcecode/uber-clone-yt/App.js | d61e350b | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/app.json | b3c370cf | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/babel.config.js | 352abf93 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/components/Map.js | e0ac97b2 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/components/NavFavourites.js | 23faab29 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/components/NavOptions.js | 37a35645 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/package.json | 606ded4f | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/readme.txt | f2d91ccc | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/screens/HomeScreen.js | 7fbbd3d4 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/screens/MapScreen.js | 1d26cc9a | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/screens/NavigateCard.js | 8a205650 | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/screens/RideOptionsCard.js | 5f78f92f | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/slices/navSlice.js | 0210151d | 2026-06-28 06:04 | ingested |
| sourcecode/uber-clone-yt/store.js | 75d84fe0 | 2026-06-28 06:04 | ingested |
