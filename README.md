# claude-code

## connect-apps-plugin

A Claude Code plugin that helps users discover, connect, and troubleshoot
third-party app integrations (connectors) such as Slack, GitHub, Google
Drive, or Linear.

Contents:

- `.claude-plugin/plugin.json` — plugin manifest
- `skills/connect-app/SKILL.md` — auto-triggered skill for connector setup
- `commands/connect-app.md` — explicit `/connect-app [app name]` command

### Try it locally

```
claude --plugin-dir ./connect-apps-plugin
```
