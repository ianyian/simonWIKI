# raw/ — Immutable Source Documents

Drop your source material here. **Never edit a file once it is added** — these are the
ground truth the wiki is derived from. If a document changes, add a new version
(e.g. `user-stories-v2.md`) and let the agent mark the old one superseded.

## Subfolders

- `requirements/` — briefs, user stories, scope docs
- `specs/` — functional and technical specifications
- `meetings/` — meeting notes, transcripts, decision logs
- `web/` — content fetched from URLs (the agent saves the page text here on `ingest <url>`)

Add more subfolders as needed (e.g. `emails/`, `support-tickets/`, `vendor-docs/`).

## Supported formats

`.md` and `.txt` ingest directly. For `.docx`, `.pdf`, `.pptx`, ask your agent to extract
the text first (most modern agents can read these directly, or you can export to text).

## Do not commit secrets

Never put credentials, API keys, tokens, or personal data (PII) in `raw/`. See the
project `.gitignore` and the secrets rule in `AGENTS.md`.
