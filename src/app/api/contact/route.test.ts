import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { edgeLimitMock, getCloudflareContextMock, queueSendMock } = vi.hoisted(() => ({
  edgeLimitMock: vi.fn(),
  getCloudflareContextMock: vi.fn(),
  queueSendMock: vi.fn(),
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
    "cf-connecting-ip": ip,
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
  queueSendMock.mockReset();
  edgeLimitMock.mockResolvedValue({ success: true });
  queueSendMock.mockResolvedValue(undefined);
  getCloudflareContextMock.mockResolvedValue({
    env: {
      CONTACT_EMAIL_QUEUE: { send: queueSendMock },
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
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("requires a JSON content type", async () => {
    const response = await POST(
      request(JSON.stringify(validSubmission), { contentType: "text/plain" }),
    );

    expect(response.status).toBe(415);
    await expect(response.json()).resolves.toEqual({
      error: "Unsupported content type",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(request("{not-json"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid JSON" });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized declared request before parsing it", async () => {
    const response = await POST(
      request("{}", { contentLength: 10_001 }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Request body is too large",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized actual body without trusting content-length", async () => {
    const response = await POST(request("x".repeat(10_001)));

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Request body is too large",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
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
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects empty required fields", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, companyName: "   " }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required fields",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects invalid field types", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, phone: null }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid form data",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email address", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid email address",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects an unsupported category", async () => {
    const response = await POST(
      jsonRequest({ ...validSubmission, category: "unsupported" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid form data",
    });
    expect(queueSendMock).not.toHaveBeenCalled();
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
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("rejects requests blocked by the Cloudflare edge limiter", async () => {
    edgeLimitMock.mockResolvedValueOnce({ success: false });

    const response = await POST(jsonRequest(validSubmission));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      error: "Too many requests. Please try again later.",
    });
    expect(response.headers.get("retry-after")).toBe("60");
    expect(queueSendMock).not.toHaveBeenCalled();
  });

  it("queues a valid submission for email delivery", async () => {
    const response = await POST(jsonRequest(validSubmission));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: "Message sent successfully",
    });
    expect(getCloudflareContextMock).toHaveBeenCalledOnce();
    expect(edgeLimitMock).toHaveBeenCalledWith({
      key: expect.stringMatching(/^test-client-/),
    });
    expect(queueSendMock).toHaveBeenCalledOnce();
    expect(queueSendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        version: 1,
        requestId: expect.any(String),
        submittedAt: expect.any(String),
        email: expect.objectContaining({
          replyTo: validSubmission.email,
          subject:
            "New Contact: Ada Lovelace from Analytical Engines [Fintech]",
        }),
      }),
    );
  });

  it("returns a generic server error when queueing fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    queueSendMock.mockRejectedValueOnce(new Error("Queue unavailable"));

    try {
      const response = await POST(jsonRequest(validSubmission));

      expect(response.status).toBe(500);
      await expect(response.json()).resolves.toEqual({
        error: "Failed to send message. Please try again.",
      });
      expect(queueSendMock).toHaveBeenCalledOnce();
      expect(consoleError).toHaveBeenCalledOnce();
    } finally {
      consoleError.mockRestore();
    }
  });

  it("accepts an omitted optional phone number", async () => {
    const withoutPhone = {
      fullName: validSubmission.fullName,
      email: validSubmission.email,
      companyName: validSubmission.companyName,
      category: validSubmission.category,
    };
    const response = await POST(jsonRequest(withoutPhone));

    expect(response.status).toBe(200);
    expect(queueSendMock).toHaveBeenCalledOnce();
  });
});
