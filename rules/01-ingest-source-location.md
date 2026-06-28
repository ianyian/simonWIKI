# Rule 01 — Ingest sources must live under `raw/`

**Rule:** The agent may only ingest files located under the `raw/` folder, in the
appropriate subfolder — e.g. meeting notes in `raw/meetings/`, requirements in
`raw/requirements/`, specs in `raw/specs/`.

**URLs are allowed** as an ingest input: when given a `http(s)://` URL, the agent first
**fetches the page and saves it to `raw/web/<slug>.md`** (recording the source URL), then
ingests that file. So the rule still holds — every ingested source ends up under `raw/`.

**If asked to ingest a file outside `raw/`:** do NOT ingest it. Reject politely and tell the
user to place the file in the correct `raw/` subfolder first, for example:

> "I can only ingest files from `raw/`. Please move this file into the right subfolder —
>  meeting notes → `raw/meetings/`, requirements → `raw/requirements/`,
>  specs → `raw/specs/` — then run ingest again."

**Why:** `raw/` is the immutable source-of-truth. Keeping every source there guarantees
provenance, lets the de-duplication log (Rule 02) work, and keeps the wiki auditable.

**Exception:** `docs/` files are human-curated background and may be ingested directly
(see `PROMPTS.md` → "docs/ in sync"). Edit this rule if your team needs other exceptions.
