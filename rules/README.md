# rules/ — Project Rules (authoritative & editable)

These files define hard rules the agent must follow when operating this wiki. They are
loaded via [`AGENTS.md`](../AGENTS.md). **You may edit any rule** to fit your team — the
agent obeys the latest committed version. Keep each rule short and unambiguous.

| Rule | Summary |
|---|---|
| [01-ingest-source-location.md](01-ingest-source-location.md) | Documents ingest only from `raw/`. |
| [02-ingest-folder-dedup.md](02-ingest-folder-dedup.md) | Folder ingest; checksum dedup (process only new/changed files). |
| [03-post-ingest-summary.md](03-post-ingest-summary.md) | After ingest, report processed vs skipped. |
| [04-cite-sources.md](04-cite-sources.md) | Cite the wiki page behind every claim. |
| [05-no-training-knowledge.md](05-no-training-knowledge.md) | Answer from the wiki, not training knowledge; say so if missing. |

To add a rule, create a new `NN-name.md` here, keep it short, and add a row above.
To relax a rule, edit its file. To disable one, delete its file (or note it as inactive).
