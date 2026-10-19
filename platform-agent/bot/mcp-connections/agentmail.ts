import { defineConnection } from "@cursor/bdk/connections";

/**
 * AgentMail MCP — list_inboxes and related bot mailbox tools.
 * Requires AGENTMAIL_API_KEY from the AgentMail Console.
 * https://mcp.agentmail.to/mcp
 */
export default defineConnection({
  url: "https://mcp.agentmail.to/mcp",
  headers: {
    Authorization: "Bearer ${AGENTMAIL_API_KEY}",
  },
  advertiseTools: true,
});
