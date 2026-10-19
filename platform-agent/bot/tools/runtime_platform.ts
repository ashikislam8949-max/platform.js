import { defineTool } from "@cursor/bdk/tools";
import * as z from "zod/v4";
import { runtimePlatform } from "../lib/platform.js";

export default defineTool({
  description:
    "Return the platform.js detection result for this Node runtime (no UA string required).",
  effect: "read",
  execution: "server",
  inputSchema: z.object({}),
  async execute() {
    return runtimePlatform();
  },
});
