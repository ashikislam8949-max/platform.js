import { defineTool } from "@cursor/bdk/tools";
import * as z from "zod/v4";
import { parseUa } from "../lib/platform.js";

export default defineTool({
  description:
    "Parse a user-agent string with platform.js and return structured browser, OS, layout, and product fields.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    ua: z
      .string()
      .min(1)
      .describe("Raw User-Agent string to parse with platform.js."),
  }),
  async execute({ ua }) {
    return parseUa(ua);
  },
});
