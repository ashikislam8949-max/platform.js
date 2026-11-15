const API_BASE = "https://api.agentmail.to/v0";

export type AgentMailError = {
  ok: false;
  error: string;
  message: string;
  status?: number;
};

function apiKey(): string | undefined {
  const key = process.env.AGENTMAIL_API_KEY?.trim();
  return key || undefined;
}

export async function agentmailFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | AgentMailError> {
  const key = apiKey();
  if (!key) {
    return {
      ok: false,
      error: "missing_api_key",
      message:
        "Set AGENTMAIL_API_KEY (Bearer token from the AgentMail Console) in .env.local or deployment secrets.",
    };
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    const detail =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : text || res.statusText;
    return {
      ok: false,
      error: "agentmail_http_error",
      message: detail,
      status: res.status,
    };
  }

  return body as T;
}

export function qs(params: Record<string, string | number | boolean | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}
