# Solutions — Solved Problems & Past Answers (QnA Knowledge Base)

This folder is the **compounding QnA layer**. Whenever a question is answered, a problem
is debugged, or a decision resolves something non-obvious, the agent files a **solution
card** here so the knowledge is reusable forever instead of being re-derived each time.

This is the part of the wiki people come back to most. Treat filing a solution as the
**default** after any substantive question — not an afterthought.

## Conventions

- One card per file, named after the problem: `stock-oversell-on-concurrent-orders.md`
- Group into domain subfolders once this grows past ~15 cards: `solutions/ordering/...`
- Every card uses [`templates/solution.template.md`](../../templates/solution.template.md)
- Every card has `tags:` so it is findable by topic, and links to related concept/entity/code pages
- Cards have a `last_verified` date; the lint pass flags cards older than their related sources/code

## What belongs here

- "How do we handle X?" answers worth keeping
- Bug → root cause → fix write-ups
- Decisions and their rationale ("why we chose Y over Z")
- Workarounds and gotchas

## What does NOT belong here

- Raw source text (that goes in `raw/`)
- Definitions of an actor or data object (that is an `entities/` page)
- A general process description (that is a `concepts/` page)
