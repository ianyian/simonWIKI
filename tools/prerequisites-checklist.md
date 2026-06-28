# Prerequisites Checklist — traceable component list

> Single, growing inventory of everything this environment may need. The setup skill and
> `tools/prerequisites.md` use this list; the agent fills in the **Status** column when it
> checks/installs (date + ok/missing). Edit freely — add a row when a new dependency appears.

## Core (always needed)

| # | Component | Purpose | Required | Check | Install | Status |
|---|-----------|---------|----------|-------|---------|--------|
| 1 | Python ≥ 3.9 | run scripts + extraction | yes | `python3 --version` | brew/apt/winget/python.org | _unchecked_ |
| 2 | pip | install Python add-ons | yes | `pip --version` | bundled with Python | _unchecked_ |
| 3 | git | clone repos, version history | yes | `git --version` | brew/apt/winget | _unchecked_ |

## Document extraction (for ingesting .docx/.pdf/.pptx/.xlsx)

| # | Component | Purpose | Required | Check | Install | Status |
|---|-----------|---------|----------|-------|---------|--------|
| 4 | python-docx | Word → text | for .docx | `python3 -c "import docx"` | `pip install python-docx` | _unchecked_ |
| 5 | python-pptx | PowerPoint → text | for .pptx | `python3 -c "import pptx"` | `pip install python-pptx` | _unchecked_ |
| 6 | pdfplumber | PDF → text | for .pdf | `python3 -c "import pdfplumber"` | `pip install pdfplumber` | _unchecked_ |
| 7 | pypdf | PDF fallback | for .pdf | `python3 -c "import pypdf"` | `pip install pypdf` | _unchecked_ |
| 8 | openpyxl | Excel → text | for .xlsx | `python3 -c "import openpyxl"` | `pip install openpyxl` | _unchecked_ |

## Code intelligence MCP (installed at setup; re-checked on upgrade)

> Powers `ingest-sourcecode`. **Setup installs it; upgrade re-checks and installs if missing.**
> Without it the skill falls back to static analysis. Easiest path: the **upstream prebuilt**
> binary (no compiler). Power path: **build the `-pro` fork from source** (extra `explore`
> tool + fixes) — needs the toolchain below.

| # | Component | Purpose | Required | Check | Install | Status |
|---|-----------|---------|----------|-------|---------|--------|
| 9  | Node.js (LTS) | JS tooling / some agents | recommended | `node --version` | brew/apt/winget/nodejs.org | _unchecked_ |
| 10 | codebase-memory-mcp | code knowledge-graph MCP | **at setup** (re-check on upgrade) | `codebase-memory-mcp --version` | prebuilt: `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh \| bash` (or build the -pro fork) | _unchecked_ |
| 11 | C compiler (gcc/clang) | build the `-pro` fork | optional* | `gcc --version` | macOS `xcode-select --install` · `apt install build-essential` | _unchecked_ |
| 12 | C++ compiler (g++/clang++) | build the `-pro` fork | optional* | `g++ --version` | same as above | _unchecked_ |
| 13 | make | build the `-pro` fork | optional* | `make --version` | build-essential | _unchecked_ |
| 14 | zlib dev headers | build the `-pro` fork | optional* | `ls /usr/include/zlib.h` | `apt install zlib1g-dev` (macOS: bundled) | _unchecked_ |
| 15 | zstd | graph artifact compression | optional | `zstd --version` | brew/apt/winget | _unchecked_ |

\* Only needed if you **build** the MCP fork from source. The prebuilt binary (row 10) needs none of 11–14.

## How to build the codebase-memory MCP fork (optional)

```bash
git clone https://github.com/win4r/codebase-memory-mcp-pro.git
cd codebase-memory-mcp-pro && ./scripts/build.sh        # → build/c/codebase-memory-mcp (a few min: 158 grammars)
cp build/c/codebase-memory-mcp ~/.local/bin/            # put on PATH
```
Then it matches the `codebase-memory` command in `.mcp.json` / `.vscode/mcp.json`.
