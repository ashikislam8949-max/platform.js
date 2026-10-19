import cursorGrokBotAgents from "@cursor/bdk/extensions/cursor-grokbot-agents";

/**
 * Grok Bot agents this BDK agent may consult.
 * Primary bot is "Grok". Extra names must match bots on the serve host account.
 */
export default cursorGrokBotAgents({
  agents: [
    {
      name: "Grok",
      description:
        "Default Grok Bot — platform.js questions, UA parsing judgment, and general follow-ups.",
    },
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
