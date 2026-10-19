import { defineAgent } from "@cursor/bdk";

export default defineAgent({
  model: {
    id: "grok-4.5",
    params: [
      { id: "effort", value: "high" },
      { id: "fast", value: "true" },
    ],
  },
  hosting: {
    egressDomains: ["api.agentmail.to", "mcp.agentmail.to"],
  },
});
