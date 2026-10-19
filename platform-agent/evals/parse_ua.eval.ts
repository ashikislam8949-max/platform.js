import { defineEval, includes } from "@cursor/bdk/evals";

const CHROME_MAC_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export default defineEval({
  tags: ["smoke", "parse_ua"],
  cases: [
    {
      id: "chrome_mac",
      description: "Parse a Chrome-on-macOS user agent via parse_ua.",
      async test(t) {
        await t.send(`What browser and OS is this UA?\n${CHROME_MAC_UA}`);
        t.succeeded();
        t.calledTool("parse_ua", {
          input: { ua: CHROME_MAC_UA },
        });
        t.notCalledTool("runtime_platform");
        t.check(t.reply, includes(/Chrome/i));
        t.check(t.reply, includes(/OS X|macOS|Mac/i));
      },
    },
  ],
});
