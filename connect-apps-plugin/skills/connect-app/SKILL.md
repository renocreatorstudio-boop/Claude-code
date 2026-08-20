---
description: Discover, connect, and troubleshoot third-party app integrations (connectors) such as Slack, GitHub, Google Drive, or Linear. Use when the user wants to "connect an app", "add a connector", "link my Slack/Google Drive/GitHub", asks what integrations are available, or a task needs a connector that isn't set up yet.
argument-hint: "[app name]"
---

Help the user connect a third-party app to Claude.

1. **Identify the target app.** If `$ARGUMENTS` names one, use it. Otherwise ask which app they want to connect, or infer it from the surrounding task (e.g. a task that needs calendar access implies a calendar connector).

2. **Check current state first.** If a connector-listing tool is available in this session, use it to see what's already connected before asking the user anything — don't make them repeat information the session already has.

3. **If the app is already connected**, confirm that and move on to what the user actually wants to do with it. Don't re-run setup for something that's already working.

4. **If it isn't connected**, check whether a connector-suggestion tool is available and use it to find the right one rather than guessing at a name. Then walk the user through connecting it:
   - Point them to Settings → Connectors on claude.ai (https://claude.ai/settings/connectors) for connectors managed there.
   - If the integration is instead an MCP server the user wants to add locally to a project, guide them through adding it to `.mcp.json` instead — that's a project-level setup, not an account-level connector.
   - Never invent a connector name or URL; if you're not sure the target app has a supported connector, say so plainly instead of guessing.

5. **After connecting**, confirm the connection worked (e.g. list connectors again, or do a small read-only check with the new tool) before relying on it for the user's actual task.

6. **If connecting fails or access is denied**, relay the exact error/reason back to the user rather than retrying blindly — most failures require an action only they can take (re-authorizing in claude.ai settings, an admin granting access, etc.).
