# claude-code-skills marketplace reference

Local reference for the [`alirezarezvani/claude-skills`](https://github.com/alirezarezvani/claude-skills)
Claude Code plugin marketplace (registered locally as `claude-code-skills`).

This directory does **not** vendor the marketplace's actual skill content — that
lives upstream and is fetched by `claude plugin marketplace add` /
`claude plugin install`. It only records the catalog metadata (skill names,
descriptions, paths) and which plugin bundles are installed, so this repo has
a durable pointer to what's in use.

## Add the marketplace

```
claude plugin marketplace add alirezarezvani/claude-skills
```

## Installed plugin bundles

| Plugin | Domain | Status |
|---|---|---|
| `engineering-skills` | engineering-team | installed |
| `engineering-advanced-skills` | engineering | installed |
| `product-skills` | product-team | installed |
| `marketing-skills` | marketing-skill | installed |
| `ra-qm-skills` | ra-qm-team | installed |
| `pm-skills` | project-management | installed |
| `c-level-skills` | c-level-advisor | installed |
| `business-growth-skills` | business-growth | installed |
| `finance-skills` | finance | installed |
| `self-improving-agent` | engineering-team | installed |
| `security-guidance` | engineering | installed (renamed from `skill-security-auditor`) |
| `pw` | engineering-team | installed (renamed from `playwright-pro`) |

`content-creator` (marketing-skill domain) has no direct install — it is a
deprecated redirect skill inside `marketing-skills`, not a standalone plugin.

## Catalog

`catalog.json` in this directory holds the `engineering` domain's full
name/description/path listing as received from the marketplace, plus a note
on the other 10 domains present in the same catalog dump:
`engineering-team`, `product-team`, `marketing-skill`, `c-level-advisor`,
`project-management`, `ra-qm-team`, `business-growth`, `finance`,
`productivity`, `marketing`, `research` — 306 skills total across all domains.

## Source

- Marketplace repo: `alirezarezvani/claude-skills`
- Local marketplace name: `claude-code-skills`
- Recorded: 2026-08-21
