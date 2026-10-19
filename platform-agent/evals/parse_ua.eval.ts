import { defineEval, includes } from "@cursor/bdk/evals";
import { loadJson } from "@cursor/bdk/evals/loaders";

type UaFixture = {
  ua: string;
  expect: {
    name: string;
    layout?: string;
    product?: string;
    manufacturer?: string;
    osFamily?: string;
    descriptionIncludes: string;
  };
};

async function fixture(id: string): Promise<UaFixture> {
  const all = await loadJson<Record<string, UaFixture>>("fixtures/ua.json");
  const f = all[id];
  if (!f) throw new Error(`missing fixture ${id}`);
  return f;
}

export default defineEval({
  tags: ["smoke", "parse_ua"],
  cases: [
    {
      id: "chrome_mac",
      description: "Parse Chrome on macOS via parse_ua.",
      async test(t) {
        const f = await fixture("chrome_mac");
        await t.send(`What browser and OS is this UA?\n${f.ua}`);
        t.succeeded();
        t.calledTool("parse_ua", { input: { ua: f.ua } });
        t.notCalledTool("runtime_platform");
        t.check(t.reply, includes(/Chrome/i));
        t.check(t.reply, includes(/OS X|macOS|Mac/i));
      },
    },
    {
      id: "ipad_safari",
      description: "Parse Safari on iPad; surface product.",
      async test(t) {
        const f = await fixture("ipad_safari");
        await t.send(`Identify the browser, product, and OS for this UA:\n${f.ua}`);
        t.succeeded();
        t.calledTool("parse_ua", { input: { ua: f.ua } });
        t.check(t.reply, includes(/Safari/i));
        t.check(t.reply, includes(/iPad/i));
        t.check(t.reply, includes(/iOS/i));
      },
    },
    {
      id: "opera_spoof",
      description: "Trust parse_ua name when UA also mentions Firefox.",
      async test(t) {
        const f = await fixture("opera_spoof");
        await t.send(
          `Which browser is this really? Quote the platform.js name field.\n${f.ua}`,
        );
        t.succeeded();
        t.calledTool("parse_ua", {
          input: { ua: f.ua },
          output: (value) =>
            typeof value === "object" &&
            value !== null &&
            (value as { name?: string }).name === "Opera",
        });
        t.check(t.reply, includes(/Opera/i));
        t.check(t.reply, includes(/Firefox/i));
      },
    },
  ],
});
