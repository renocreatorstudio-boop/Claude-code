# awesome-claude-plugins marketplace reference

Local reference for the [`ComposioHQ/awesome-claude-plugins`](https://github.com/ComposioHQ/awesome-claude-plugins)
Claude Code plugin marketplace (registered locally as `awesome-claude-plugins`).

This directory does **not** vendor the marketplace's actual plugin content —
that lives upstream and is fetched by `claude plugin marketplace add` /
`claude plugin install`. It only records the manifest (`marketplace.json`,
copied verbatim from the upstream `.claude-plugin/marketplace.json`) so this
repo has a durable pointer to what's in use.

## Add the marketplace

```
claude plugin marketplace add ComposioHQ/awesome-claude-plugins
```

## Installed plugins (all 24)

| Plugin | Category | Description |
|---|---|---|
| `connect-apps` | integrations | Connect Claude to 500+ apps — Gmail, Slack, GitHub, Notion, and more |
| `frontend-design` | frontend | Create distinctive, production-grade interfaces avoiding generic AI aesthetics |
| `artifacts-builder` | frontend | Build complex HTML artifacts with React, Tailwind CSS, and shadcn/ui |
| `theme-factory` | frontend | 10 professional themes for slides, docs, reports, and landing pages |
| `canvas-design` | frontend | Create museum-quality visual art in PNG and PDF formats |
| `senior-frontend` | frontend | React/Next.js/TypeScript patterns with bundle analysis and optimization |
| `frontend-developer` | frontend | Frontend development specialist agent |
| `commit` | git | Smart git commits using conventional commit format |
| `create-pr` | git | Automates pull request creation with proper templates |
| `pr-review` | git | Comprehensive PR reviews with detailed feedback |
| `changelog-generator` | git | Transform git commits into user-friendly changelogs |
| `ship` | git | Complete PR workflow from commit to production |
| `code-review` | quality | Comprehensive code review with best practices |
| `test-writer-fixer` | quality | Automatically write and fix unit tests |
| `debugger` | quality | Advanced debugging assistant |
| `bug-fix` | quality | Analyzes and fixes bugs in your codebase |
| `backend-architect` | backend | Backend architecture patterns and system design |
| `mcp-builder` | backend | Build high-quality MCP servers for LLM integrations |
| `agent-sdk-dev` | backend | Claude Agent SDK development helper |
| `perf` | devops | Performance analysis and optimization |
| `audit-project` | devops | Full project audit for quality and issues |
| `documentation-generator` | docs | Generate comprehensive documentation from code |
| `security-guidance` | security | Security best practices and vulnerability detection |
| `developer-growth-analysis` | productivity | Analyze coding patterns and get personalized learning resources |

Note: `security-guidance` also exists as a plugin in the `claude-code-skills`
marketplace (see `../claude-skills/README.md`) — both are installed side by
side, disambiguated by their `plugin@marketplace` id (`security-guidance@awesome-claude-plugins`
vs `security-guidance@claude-code-skills`).

## Source

- Marketplace repo: `ComposioHQ/awesome-claude-plugins`
- Owner: Composio (`support@composio.dev`)
- Local marketplace name: `awesome-claude-plugins`
- Recorded: 2026-08-21
