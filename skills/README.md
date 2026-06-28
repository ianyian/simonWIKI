# skills/ — Operation Playbooks

Step-by-step playbooks the agent follows for each operation. They keep behavior consistent
and work with any tool (Claude Code, VS Code, etc.). `AGENTS.md` routes commands to these.

| Playbook | Trigger | For |
|---|---|---|
| [ingest-document.md](ingest-document.md) | `ingest <file-or-folder>` | Documents (default) |
| [ingest-sourcecode.md](ingest-sourcecode.md) | `ingest-sourcecode <file-or-folder>` | Source code |
| [reset-sourcecode.md](reset-sourcecode.md) | `reset-sourcecode` | Clear all code knowledge for a new project |

Documents are the **default and priority**; source code uses the explicit
`ingest-sourcecode` command. Both obey the rules in [`rules/`](../rules/README.md).
