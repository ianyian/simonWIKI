# Tool Spec: Prerequisite Check & Install (first-time setup)

> A specification the agent follows during **fresh setup**, and re-checks on **upgrade**.
> The commands are OS-specific but the steps are the same everywhere. Run only after the
> user has accepted in the skill's Step 0.
>
> **The full, traceable component list lives in
> [`prerequisites-checklist.md`](prerequisites-checklist.md)** — update its Status column as
> you check/install. This file describes *how* to run the check; that file is the inventory.

## Goal

Make sure the machine can run the wiki and **ingest rich documents (Word / PDF / PowerPoint /
Excel) with no further install prompts later**. Doing this once at setup means the user can
ingest those file types anytime without being asked to approve an installation.

## 1. Runtime checks

- **Python ≥ 3.9** — check `python3 --version` (or `python --version`). If missing or older,
  tell the user how to install the latest:
  - macOS: `brew install python` · Windows: `winget install Python.Python.3` ·
    Debian/Ubuntu: `sudo apt install python3 python3-pip` · or download from python.org.
- **Node.js (LTS)** — check `node --version`. If missing:
  - macOS: `brew install node` · Windows: `winget install OpenJS.NodeJS.LTS` ·
    Debian/Ubuntu: `sudo apt install nodejs npm` · or download from nodejs.org.

## 2. Document-extraction add-ons (Python)

Install these so `.docx`, `.pdf`, `.pptx`, `.xlsx` can be ingested directly:

- `python-docx` (Word), `python-pptx` (PowerPoint), `pdfplumber` + `pypdf` (PDF),
  `openpyxl` (Excel).

Install command (add `--break-system-packages` if pip refuses on a managed system):

```
pip install python-docx python-pptx pdfplumber pypdf openpyxl
```

Verify import succeeds for each before reporting success. These power
[`scripts/convert.py`](../scripts/convert.py), which `ingest` uses to turn `.docx`/`.pdf`/
`.pptx`/`.xlsx`/`.html` into Markdown.

## 3. Code-intelligence MCP (install at setup; re-check on upgrade)

**Install the `codebase-memory-mcp` engine as part of setup** (and on upgrade, check it and
install if missing) so `ingest-sourcecode` gets full analysis out of the box.

1. **Check:** `codebase-memory-mcp --version`. If it responds, it's installed — done.
2. **If missing, install** (ask the user before downloading/compiling):
   - **Prebuilt (fastest, no compiler):**
     `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash`
     (Windows: the `install.ps1` from the same repo.)
   - **Build the `-pro` fork (more features; needs C/C++ toolchain + zlib + make):**
     `git clone https://github.com/win4r/codebase-memory-mcp-pro.git && cd codebase-memory-mcp-pro && ./scripts/build.sh`
     → copy `build/c/codebase-memory-mcp` onto your PATH. See `prerequisites-checklist.md` rows 10–14.
3. **Confirm wiring:** the binary name must match the `codebase-memory` command in
   `.mcp.json` / `.vscode/mcp.json`.

Graceful fallback: if the user declines or has no install rights, `ingest-sourcecode` still
works via static analysis (just slower / less precise). Record which path was taken.

## 4. Record the result

- Append to `wiki/log.md`:
  `## [YYYY-MM-DD] setup | prerequisites OK (python <ver>, node <ver>, extraction add-ons, MCP: yes/no)`.
- Update the **Status** column in `prerequisites-checklist.md` for each component.
- Note any item the user must install manually.

## Notes

If the user is on a locked-down machine without install rights, ingest still works for
`.md` / `.txt`; rich formats then need either these add-ons or the text pasted into a
`.txt` under `raw/`.
