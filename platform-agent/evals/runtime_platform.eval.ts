import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke", "runtime_platform"],
  cases: [
    {
      id: "node_runtime",
      description: "Report this Node runtime via runtime_platform.",
      async test(t) {
        await t.send("What platform is this agent process running on?");
        t.succeeded();
        t.calledTool("runtime_platform");
        t.notCalledTool("parse_ua");
        t.check(t.reply, includes(/Node(\.?js)?/i));
      },
    },
  ],
});
