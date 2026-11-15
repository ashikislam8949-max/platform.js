---
name: bot-inbox-lists
description: >-
  List AgentMail bot inboxes and their send/receive/reply allow or block
  lists when the user asks about bot inbox lists or mailbox policy.
---

# Bot inbox lists

## List inboxes

1. Call `list_bot_inboxes`.
2. Reply with email, inboxId, status, and display name for each row.
3. If `missing_api_key`, tell the user to set `AGENTMAIL_API_KEY`.

## List allow/block policy

1. Need an `inboxId` from `list_bot_inboxes` first.
2. Call `list_bot_inbox_lists` with `direction` (`send` | `receive` | `reply`)
   and `listType` (`allow` | `block`).
3. Summarize entries (email or domain). Empty list → say so clearly.

## Prefer authored tools

Use `list_bot_inboxes` / `list_bot_inbox_lists` before raw MCP names.
Escalate to advertised AgentMail MCP tools only for create/send flows
the authored tools do not cover.
