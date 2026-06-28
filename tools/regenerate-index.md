# Tool Spec: Regenerate the Index & Manifest

> This is a **specification the agent follows** — not a script tied to any one language
> or OS. Ask your agent: "rebuild the wiki index" or "reindex".

## Goal

Rebuild `wiki/index.md` (human catalog) and `wiki/manifest.json` (machine catalog) from
the frontmatter of every wiki page, so the catalog is always accurate and never
hand-maintained. This is what keeps the wiki navigable at hundreds of pages.

## Steps

1. **Scan** every `*.md` under `wiki/` (skip `README.md` files, `index.md`, `log.md`).
2. **Read frontmatter** from each: `title`, `category`, `tags`, `sources`, `domain`
   (infer `domain` from the subfolder if not set), `last_updated`, `last_verified`,
   `status` (default `active`).
3. **Build `manifest.json`** with: `project`, `generated` (today), `page_count`,
   `domains` (sorted unique list), and a `pages` array of one object per page:
   `{ path, title, category, domain, tags, sources, last_updated, last_verified, status }`.
   Skip pages with `status: superseded` from default listings but keep them in the array.
4. **Build `index.md`** grouped by category, then by domain subfolder within each category.
   For categories with more than ~15 pages, render a per-domain subheading.
5. **Append to `log.md`**: `## [YYYY-MM-DD] reindex | rebuilt index.md + manifest.json (N pages)`.

## Notes

- Keep `index.md` human-friendly (tables, navigation hints). Keep `manifest.json` strict JSON.
- Never invent pages. The catalog reflects only files that exist on disk.
