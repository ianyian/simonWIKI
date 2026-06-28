# docs/ — Human-Curated Solution Background

You maintain these files (the agent helps, but you own them). They hold the durable,
high-level picture of the solution that does not change with every ingest.

- `solution-profile.md` — project purpose, business context, tech stack, key contacts
- `solution-map.md` — master inventory of every program / module / service / subsystem
- `architecture.md` — how subsystems connect: diagrams, integrations, data schemas
- `glossary.md` — single source of truth for business and technical terms
- `subsystems/` — one detailed doc per subsystem (business rules, data model, integrations)

When you update a `docs/` file, ask your agent to ingest it so the wiki stays in sync.
