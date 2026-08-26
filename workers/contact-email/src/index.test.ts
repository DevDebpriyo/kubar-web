import { afterEach, describe, expect, it, vi } from "vitest";
import type { ContactEmailMessage } from "../../../src/lib/contact-queue";
import worker from "./index";

const payload: ContactEmailMessage = {
  version: 1,
  requestId: "request-123",
  submittedAt: "2026-08-26T00:00:00.000Z",
  email: {
    from: "website@mail.kubar.tech",
    to: "outreach@kubar.tech",
    replyTo: "visitor@example.com",
    subject: "Contact request",
    text: "Contact request body",
  },
};

function createBatch(body: unknown, attempts = 1) {
  const ack = vi.fn();
  const retry = vi.fn();
  const message = {
    id: "message-123",
    timestamp: new Date("2026-08-26T00:00:00.000Z"),
    body,
    attempts,
    ack,
    retry,
  };
  const batch = {
    queue: "kubar-contact-email",
    messages: [message],
    ackAll: vi.fn(),
    retryAll: vi.fn(),
    metadata: {
      metrics: { backlogCount: 0, backlogBytes: 0 },
    },
  } as unknown as MessageBatch<ContactEmailMessage>;

  return { ack, batch, retry };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("contact email queue consumer", () => {
  it("sends and acknowledges a valid message", async () => {
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    const send = vi.fn().mockResolvedValue({ messageId: "email-123" });
    const { ack, batch, retry } = createBatch(payload);

    await worker.queue?.(
      batch,
      { EMAIL: { send } },
    );

    expect(send).toHaveBeenCalledWith(payload.email);
    expect(ack).toHaveBeenCalledOnce();
    expect(retry).not.toHaveBeenCalled();
  });

  it("retries a failed delivery with exponential backoff", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const send = vi.fn().mockRejectedValue(new Error("temporary failure"));
    const { ack, batch, retry } = createBatch(payload, 2);

    await worker.queue?.(
      batch,
      { EMAIL: { send } },
    );

    expect(ack).not.toHaveBeenCalled();
    expect(retry).toHaveBeenCalledWith({ delaySeconds: 120 });
  });

  it("acknowledges an invalid payload without attempting delivery", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const send = vi.fn();
    const { ack, batch, retry } = createBatch({ version: 2 });

    await worker.queue?.(
      batch,
      { EMAIL: { send } },
    );

    expect(send).not.toHaveBeenCalled();
    expect(ack).toHaveBeenCalledOnce();
    expect(retry).not.toHaveBeenCalled();
  });
});
