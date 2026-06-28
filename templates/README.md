# templates/ — Page Templates

Blank templates the agent (and humans) use so every wiki page is consistent. Copy the
matching template, fill it in, and place the result in the right `wiki/` folder.

| Template | Use for | Goes in |
|---|---|---|
| `entity.template.md` | An actor, role, system, or data object | `wiki/entities/` |
| `concept.template.md` | A business rule, workflow, or process | `wiki/concepts/` |
| `solution.template.md` | A solved problem / reusable answer (QnA) | `wiki/solutions/` |
| `code-module.template.md` | Documentation of a code module | `wiki/source-code/` |
| `source-summary.template.md` | A summary of one ingested raw document | `wiki/sources/` |
| `code-graph.template.html` | Interactive force-directed code graph (filled by ingest-sourcecode) | `wiki/source-code-output/` |

Every page carries frontmatter (`title`, `category`, `domain`, `tags`, `sources`,
`last_updated`, `status`) so the index and `manifest.json` can be regenerated from it.
