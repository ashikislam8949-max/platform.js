import cursorGrokBotAgents from "@cursor/bdk/extensions/cursor-grokbot-agents";

/**
 * Allowlist of Grok Bot agents this BDK agent may consult.
 * Names must match bots on the serve host's Cursor / Grok Bot account.
 * Edit this list to match your workspace bots.
 */
export default cursorGrokBotAgents({
  agents: [
    {
      name: "Platform Expert",
      description:
        "Deep platform.js / UA detection specialist — edge cases, spoofed agents, OS quirks.",
    },
    {
      name: "Browser Compat",
      description:
        "Browser compatibility and when to prefer feature detection over UA sniffing.",
    },
  ],
});
