import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function request(
  body: string,
  {
    origin = "https://kubar.tech",
    ip = "203.0.113.10",
    contentLength,
  }: { origin?: string; ip?: string; contentLength?: number } = {},
) {
  const headers = new Headers({
    "content-type": "application/json",
    origin,
    "x-forwarded-for": ip,
  });

  if (contentLength !== undefined) {
    headers.set("content-length", String(contentLength));
  }

  return new NextRequest("https://kubar.tech/api/contact", {
    method: "POST",
    headers,
    body,
  });
}

describe("contact route hardening", () => {
  it("rejects cross-origin submissions", async () => {
    const response = await POST(
      request("{}", { origin: "https://attacker.example", ip: "203.0.113.11" }),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects an oversized request before parsing it", async () => {
    const response = await POST(
      request("{}", { contentLength: 10_001, ip: "203.0.113.12" }),
    );

    expect(response.status).toBe(413);
  });

  it("accepts a honeypot submission without sending email", async () => {
    const response = await POST(
      request(
        JSON.stringify({
          fullName: "Automated Sender",
          email: "bot@example.com",
          phone: "",
          companyName: "Example",
          category: "other",
          website: "https://spam.example",
        }),
        { ip: "203.0.113.13" },
      ),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("throttles repeated submissions from the same client", async () => {
    const ip = "203.0.113.14";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(request("not-json", { ip }));
      expect(response.status).toBe(400);
    }

    const blocked = await POST(request("not-json", { ip }));
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("retry-after"))).toBeGreaterThan(0);
  });
});
