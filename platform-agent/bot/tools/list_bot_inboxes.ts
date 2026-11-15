import { defineTool } from "@cursor/bdk/tools";
import * as z from "zod/v4";
import { agentmailFetch, qs } from "../lib/agentmail.js";

type InboxRow = {
  inbox_id: string;
  email: string;
  display_name?: string;
  status?: string;
  pod_id?: string;
  created_at?: string;
  updated_at?: string;
};

type ListInboxesResponse = {
  count: number;
  inboxes: InboxRow[];
  limit?: number;
  next_page_token?: string;
};

export default defineTool({
  description:
    "List AgentMail bot inboxes (email addresses) for this account. Use when the user asks for bot inbox lists, available inboxes, or mailboxes.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    limit: z.number().int().min(1).max(100).optional().describe("Max inboxes to return."),
    pageToken: z.string().optional().describe("Pagination token from a prior response."),
  }),
  async execute({ limit, pageToken }) {
    const result = await agentmailFetch<ListInboxesResponse>(
      `/inboxes${qs({ limit, page_token: pageToken })}`,
    );
    if (result && typeof result === "object" && "ok" in result && result.ok === false) {
      return result;
    }
    const data = result as ListInboxesResponse;
    return {
      ok: true,
      count: data.count,
      nextPageToken: data.next_page_token ?? null,
      inboxes: (data.inboxes ?? []).map((inbox) => ({
        inboxId: inbox.inbox_id,
        email: inbox.email,
        displayName: inbox.display_name ?? null,
        status: inbox.status ?? "active",
        podId: inbox.pod_id ?? null,
        createdAt: inbox.created_at ?? null,
        updatedAt: inbox.updated_at ?? null,
      })),
    };
  },
});
