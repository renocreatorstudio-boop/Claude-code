# Memory: installed Claude Code skills/plugins

This file is a durable, git-tracked record of the plugin marketplaces and
skills set up for this account, so a future Claude Code session (in this
repo, or anywhere this file is read) can restore or reference them without
re-deriving the setup from scratch.

> **Important caveat:** plugin installs live in `~/.claude/plugins` on
> whatever machine/container runs the session — they are **not** stored in
> this git repo and do **not** automatically follow you to a new chat, a new
> device, or a fresh ephemeral container. This file records *what* is
> installed and the *exact commands* to reinstall it. To make plugins
> available automatically at the start of every session in an environment,
> use a `SessionStart` hook that runs the "Add marketplaces" + "Install
> plugins" commands below (see the `session-start-hook` skill).

## Marketplaces

```bash
claude plugin marketplace add alirezarezvani/claude-skills       # registers as "claude-code-skills"
claude plugin marketplace add ComposioHQ/awesome-claude-plugins  # registers as "awesome-claude-plugins"
```

Full catalogs are recorded at:
- `.hermes/skills/claude-skills/` — `claude-code-skills` marketplace (306 skills across 11 domains)
- `.hermes/skills/awesome-claude-plugins/` — `awesome-claude-plugins` marketplace (24 plugins)

## Installed plugins (36)

### From `claude-code-skills`

```bash
claude plugin install engineering-skills@claude-code-skills
claude plugin install engineering-advanced-skills@claude-code-skills
claude plugin install product-skills@claude-code-skills
claude plugin install marketing-skills@claude-code-skills
claude plugin install ra-qm-skills@claude-code-skills
claude plugin install pm-skills@claude-code-skills
claude plugin install c-level-skills@claude-code-skills
claude plugin install business-growth-skills@claude-code-skills
claude plugin install finance-skills@claude-code-skills
claude plugin install self-improving-agent@claude-code-skills
claude plugin install security-guidance@claude-code-skills   # renamed from skill-security-auditor
claude plugin install pw@claude-code-skills                  # renamed from playwright-pro
```

| Plugin | What it's for |
|---|---|
| `engineering-skills` | 24 core engineering role skills (architecture, frontend, backend, QA, DevOps, security, AI/ML, data eng) |
| `engineering-advanced-skills` | 25 POWERFUL-tier engineering skills (agent design, RAG, MCP servers, CI/CD, observability, chaos eng, feature flags, secrets) |
| `product-skills` | Product management toolkit (RICE, OKRs, UX research, design systems, competitive teardown, SaaS scaffolder) |
| `marketing-skills` | 43 marketing skills (content, SEO, CRO, channels, growth, pricing, analytics) |
| `ra-qm-skills` | Regulatory affairs & quality management (ISO 13485, MDR, FDA, ISO 27001, GDPR, CAPA, risk mgmt) |
| `pm-skills` | Project management (Jira, Confluence, Atlassian admin, scrum, senior PM) |
| `c-level-skills` | Full C-suite advisory (CEO/CTO/COO/CPO/CMO/CFO/CRO/CISO/CHRO + boardroom simulation) |
| `business-growth-skills` | Customer success, sales engineering, revenue ops, contract/proposal writing |
| `finance-skills` | Financial analyst + SaaS metrics coach |
| `self-improving-agent` | Curates Claude Code auto-memory into CLAUDE.md/rules/skills |
| `security-guidance` | PreToolUse hook flagging risky patterns (command injection, XSS, SQLi, eval) before Edit/Write completes |
| `pw` | Production-grade Playwright testing toolkit (generate, fix, migrate, BrowserStack/TestRail) |

### From `awesome-claude-plugins`

```bash
for p in connect-apps frontend-design artifacts-builder theme-factory canvas-design senior-frontend \
         frontend-developer commit create-pr pr-review changelog-generator ship code-review \
         test-writer-fixer debugger bug-fix backend-architect mcp-builder agent-sdk-dev perf \
         audit-project documentation-generator security-guidance developer-growth-analysis; do
  claude plugin install "$p@awesome-claude-plugins"
done
```

| Plugin | What it's for |
|---|---|
| `connect-apps` | Connect Claude to 500+ apps (Gmail, Slack, GitHub, Notion, ...) |
| `frontend-design` | Distinctive, production-grade UI avoiding generic AI aesthetics |
| `artifacts-builder` | Complex HTML artifacts with React, Tailwind, shadcn/ui |
| `theme-factory` | 10 professional themes for slides/docs/reports/landing pages |
| `canvas-design` | Museum-quality visual art (PNG/PDF) |
| `senior-frontend` | React/Next.js/TypeScript patterns, bundle analysis |
| `frontend-developer` | Frontend development specialist agent |
| `commit` | Smart git commits, conventional commit format |
| `create-pr` | Automated PR creation with templates |
| `pr-review` | Comprehensive PR reviews |
| `changelog-generator` | Git commits → user-friendly changelogs |
| `ship` | Full PR workflow, commit to production |
| `code-review` | Code review with best practices |
| `test-writer-fixer` | Writes/fixes unit tests |
| `debugger` | Advanced debugging assistant |
| `bug-fix` | Analyzes and fixes bugs |
| `backend-architect` | Backend architecture & system design |
| `mcp-builder` | Build MCP servers for LLM integrations |
| `agent-sdk-dev` | Claude Agent SDK development helper |
| `perf` | Performance analysis and optimization |
| `audit-project` | Full project audit (quality, deps, security) |
| `documentation-generator` | Generates docs/README/API docs from code |
| `security-guidance` | Security best practices, OWASP, vuln detection (name collision with the `claude-code-skills` plugin of the same name — disambiguated by `@marketplace`) |
| `developer-growth-analysis` | Analyzes coding patterns, suggests learning resources |

## Skipped / not installed

- `skill-security-auditor@claude-code-skills`, `playwright-pro@claude-code-skills`, `content-creator@claude-code-skills` — these exact names don't exist in the current `claude-code-skills` catalog; installed as `security-guidance` and `pw` instead (see table above), and no equivalent was found for `content-creator`.

## Making this persist automatically

Since installs are per-container/per-machine, the durable way to get these
"in every chat" for a given Claude Code on the web environment is a
`SessionStart` hook (see the `session-start-hook` skill) that re-runs the
marketplace-add and plugin-install commands above at the start of each
session. Ask to set that up if you want it automated rather than run manually.
