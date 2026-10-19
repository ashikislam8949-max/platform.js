import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke", "inbox"],
  cases: [
    {
      id: "list_inboxes",
      description: "Asks for bot inbox lists → list_bot_inboxes.",
      async test(t) {
        await t.send("Show my bot inbox lists. List every AgentMail inbox.");
        t.succeeded();
        t.calledTool("list_bot_inboxes");
        t.notCalledTool("parse_ua");
      },
    },
    {
      id: "missing_key_message",
      description: "Without a key, still calls the tool (auth error is ok).",
      async test(t) {
        await t.send("List bot inboxes now.");
        t.succeeded();
        t.calledTool("list_bot_inboxes");
        t.check(t.reply, includes(/inbox|AgentMail|API[ _]?KEY|key/i));
      },
    },
  ],
});
