#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web / remote environments — plugin installs
# here are per-container and don't persist, so re-run them at every startup.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

marketplaces=(
  "alirezarezvani/claude-skills"
  "ComposioHQ/awesome-claude-plugins"
)

for m in "${marketplaces[@]}"; do
  claude plugin marketplace add "$m" || true
done

plugins=(
  "engineering-skills@claude-code-skills"
  "engineering-advanced-skills@claude-code-skills"
  "product-skills@claude-code-skills"
  "marketing-skills@claude-code-skills"
  "ra-qm-skills@claude-code-skills"
  "pm-skills@claude-code-skills"
  "c-level-skills@claude-code-skills"
  "business-growth-skills@claude-code-skills"
  "finance-skills@claude-code-skills"
  "self-improving-agent@claude-code-skills"
  "security-guidance@claude-code-skills"
  "pw@claude-code-skills"
  "connect-apps@awesome-claude-plugins"
  "frontend-design@awesome-claude-plugins"
  "artifacts-builder@awesome-claude-plugins"
  "theme-factory@awesome-claude-plugins"
  "canvas-design@awesome-claude-plugins"
  "senior-frontend@awesome-claude-plugins"
  "frontend-developer@awesome-claude-plugins"
  "commit@awesome-claude-plugins"
  "create-pr@awesome-claude-plugins"
  "pr-review@awesome-claude-plugins"
  "changelog-generator@awesome-claude-plugins"
  "ship@awesome-claude-plugins"
  "code-review@awesome-claude-plugins"
  "test-writer-fixer@awesome-claude-plugins"
  "debugger@awesome-claude-plugins"
  "bug-fix@awesome-claude-plugins"
  "backend-architect@awesome-claude-plugins"
  "mcp-builder@awesome-claude-plugins"
  "agent-sdk-dev@awesome-claude-plugins"
  "perf@awesome-claude-plugins"
  "audit-project@awesome-claude-plugins"
  "documentation-generator@awesome-claude-plugins"
  "security-guidance@awesome-claude-plugins"
  "developer-growth-analysis@awesome-claude-plugins"
)

for p in "${plugins[@]}"; do
  claude plugin install "$p" || true
done

# Skills-dir plugins (cloned directly into ~/.claude/skills, not via a
# marketplace) — auto-load as <name>@skills-dir next session.
mkdir -p ~/.claude/skills
if [ ! -d ~/.claude/skills/prompt-master ]; then
  git clone https://github.com/nidhinjs/prompt-master.git ~/.claude/skills/prompt-master
fi
