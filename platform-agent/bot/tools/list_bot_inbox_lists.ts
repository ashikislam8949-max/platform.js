import { defineTool } from "@cursor/bdk/tools";
import * as z from "zod/v4";
import { agentmailFetch, qs } from "../lib/agentmail.js";

const direction = z.enum(["send", "receive", "reply"]);
const listType = z.enum(["allow", "block"]);

type ListEntriesResponse = {
  count?: number;
  entries?: Array<{
    entry: string;
    entry_type?: string;
    direction?: string;
    list_type?: string;
    reason?: string;
    created_at?: string;
    read_only?: boolean;
  }>;
  next_page_token?: string;
};

export default defineTool({
  description:
    "List AgentMail allow/block list entries for a bot inbox (send, receive, or reply). Use for inbox list policy / who can mail this bot.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    inboxId: z.string().min(1).describe("AgentMail inbox_id from list_bot_inboxes."),
    direction: direction.describe("List direction: send, receive, or reply."),
    listType: listType.describe("allow or block."),
    limit: z.number().int().min(1).max(100).optional(),
    pageToken: z.string().optional(),
  }),
  async execute(input) {
    const { inboxId, direction: dir, listType: type, limit, pageToken } = input;
    const path = `/inboxes/${encodeURIComponent(inboxId)}/lists/${dir}/${type}${qs({
      limit,
      page_token: pageToken,
    })}`;
    const result = await agentmailFetch<ListEntriesResponse>(path);
    if (result && typeof result === "object" && "ok" in result && result.ok === false) {
      return result;
    }
    const data = result as ListEntriesResponse;
    return {
      ok: true,
      inboxId,
      direction: dir,
      listType: type,
      count: data.count ?? data.entries?.length ?? 0,
      nextPageToken: data.next_page_token ?? null,
      entries: (data.entries ?? []).map((row) => ({
        entry: row.entry,
        entryType: row.entry_type ?? null,
        reason: row.reason ?? null,
        createdAt: row.created_at ?? null,
        readOnly: row.read_only ?? false,
      })),
    };
  },
});
