import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { edgeLimitMock, getCloudflareContextMock, sendEmailMock } = vi.hoisted(() => ({
  edgeLimitMock: vi.fn(),
  getCloudflareContextMock: vi.fn(),
  sendEmailMock: vi.fn(),
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: getCloudflareContextMock,
}));

import { POST } from "./route";

const validSubmission = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+91 98765 43210",
  companyName: "Analytical Engines",
  category: "fintech",
};

type RequestOptions = {
  origin?: string;
  ip?: string;
  contentLength?: number;
  contentType?: string | null;
};

function uniqueClient() {
  return `test-client-${crypto.randomUUID()}`;
}

function request(
  body: string,
  {
    origin = "https://kubar.tech",
    ip = uniqueClient(),
    contentLength,
    contentType = "application/json",
  }: RequestOptions = {},
) {
  const headers = new Headers({
    origin,
    "x-forwarded-for": ip,
  });

  if (contentType !== null) {
    headers.set("content-type", contentType);
  }

  if (contentLength !== undefined) {
    headers.set("content-length", String(contentLength));
  }

  return new NextRequest("https://kubar.tech/api/contact", {
    method: "POST",
    headers,
    body,
  });
}

function jsonRequest(body: unknown, options?: RequestOptions) {
  return request(JSON.stringify(body), options);
}

beforeEach(() => {
  getCloudflareContextMock.mockReset();
  edgeLimitMock.mockReset();
  sendEmailMock.mockReset();
  edgeLimitMock.mockResolvedValue({ success: true });
  sendEmailMock.mockResolvedValue({ messageId: "test-message" });
  getCloudflareContextMock.mockResolvedValue({
    env: {
      EMAIL: { send: sendEmailMock },
      CONTACT_RATE_LIMITER: {
        limit: edgeLimitMock,
      },
    },
  });
});

describe("contact route hardening", () => {
  it("rejects cross-origin submissions", async () => {
    const response = await POST(
      request("{}", { origin: "https://attacker.example" }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid request origin",
    });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("requires a JSON content type", async () => {
    const response = await POST(
      request(JSON.stringify(validSubmission), { contentType: "text/plain" }),
    );

    expect(response.status).toBe(415);
    await expect(response.json()).resolves.toEqual({
      error: "Unsupported content type",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(request("{not-json"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid JSON" });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized declared request before parsing it", async () => {
    const response = await POST(
      request("{}", { contentLength: 10_001 }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Request body is too large",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized actual body without trusting content-length", async () => {
    const response = await POST(request("x".repeat(10_001)));

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Request body is too large",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects a missing form field", async () => {
    const missingFullName = {
      email: validSubmission.email,
      phone: validSubmission.phone,
      companyName: validSubmission.companyName,
      category: validSubmission.category,
    };
    const response = await POST(jsonRequest(missingFullName));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid form data",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects empty required fields", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, companyName: "   " }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required fields",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects invalid field types", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, phone: null }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid form data",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email address", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid email address",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects an unsupported category", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, category: "unsupported" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid form data",
    });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("accepts a honeypot submission without sending email", async () => {
    const response = await POST(
      jsonRequest({
        ...validSubmission,
        website: "https://spam.example",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects requests blocked by the Cloudflare edge limiter", async () => {
    edgeLimitMock.mockResolvedValueOnce({ success: false });

    const response = await POST(jsonRequest(validSubmission));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      error: "Too many requests. Please try again later.",
    });
    expect(response.headers.get("retry-after")).toBe("60");
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("sends a valid submission through Cloudflare Email Service", async () => {
    const response = await POST(jsonRequest(validSubmission));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: "Message sent successfully",
    });
    expect(getCloudflareContextMock).toHaveBeenCalledOnce();
    expect(sendEmailMock).toHaveBeenCalledOnce();
    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: validSubmission.email,
        subject:
          "New Contact: Ada Lovelace from Analytical Engines [Fintech]",
      }),
    );
  });

  it("returns a generic server error when email delivery fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    sendEmailMock.mockRejectedValueOnce(new Error("Email delivery rejected"));

    try {
      const response = await POST(jsonRequest(validSubmission));

      expect(response.status).toBe(500);
      await expect(response.json()).resolves.toEqual({
        error: "Failed to send message. Please try again.",
      });
      expect(sendEmailMock).toHaveBeenCalledOnce();
      expect(consoleError).toHaveBeenCalledOnce();
    } finally {
      consoleError.mockRestore();
    }
  });

  it("throttles repeated submissions from the same client", async () => {
    const ip = uniqueClient();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(request("not-json", { ip }));
      expect(response.status).toBe(400);
    }

    const blocked = await POST(request("not-json", { ip }));
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });
});
