import { slackChannel } from "@cursor/bdk/channels/slack";

export default slackChannel({
  envPrefix: "PLATFORM_AGENT",
  suggestedPromptsTitle: "Ask platform-agent",
  suggestedPrompts: [
    {
      title: "Parse a UA",
      message:
        "Parse this User-Agent and tell me browser, OS, and layout:\nMozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    {
      title: "iPad example",
      message:
        "What does platform.js say about this UA?\nMozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3",
    },
    {
      title: "How to use parse()",
      message: "How do I install platform.js and call platform.parse() in Node?",
    },
    {
      title: "Spoofed UA",
      message:
        "Which browser is this really?\nMozilla/5.0 (Macintosh; Intel Mac OS X 10.7.2; en; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 11.52",
    },
  ],
});
