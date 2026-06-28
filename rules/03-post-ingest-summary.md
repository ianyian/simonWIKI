# Rule 03 — Post-ingest summary (required)

**Rule:** After any ingest (single file or folder), the agent must give the user a short
summary before moving on:

- **Processed:** each file newly ingested, and which wiki pages it created/updated.
- **Skipped:** each file not ingested, with the reason — *already ingested* (Rule 02),
  *unsupported type*, or *outside `raw/`* (Rule 01).
- **Follow-ups:** anything worth flagging (contradictions found, missing info, open questions).

Keep it brief — a few lines or a small table. Example:

```
Ingest summary — raw/meetings/
Processed (2): 2026-06-08.md → updated overview, order-lifecycle; kickoff.md → created kickoff-summary
Skipped (1): 2026-05-15.md (already ingested)
Follow-ups: 1 contradiction flagged on entities/user-roles.md
```

This gives the user confidence about exactly what changed.
