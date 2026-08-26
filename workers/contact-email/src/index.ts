import type { ContactEmailMessage } from "../../../src/lib/contact-queue";

interface ContactEmailWorkerEnv {
  EMAIL: SendEmail;
}

function isContactEmailMessage(value: unknown): value is ContactEmailMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Partial<ContactEmailMessage>;
  return (
    message.version === 1 &&
    typeof message.requestId === "string" &&
    typeof message.submittedAt === "string" &&
    !!message.email &&
    typeof message.email === "object"
  );
}

export default {
  async queue(batch, env) {
    for (const message of batch.messages) {
      if (!isContactEmailMessage(message.body)) {
        console.error(
          JSON.stringify({
            event: "contact_email_invalid_payload",
            messageId: message.id,
            attempt: message.attempts,
          }),
        );
        message.ack();
        continue;
      }

      try {
        await env.EMAIL.send(message.body.email);
        console.info(
          JSON.stringify({
            event: "contact_email_sent",
            requestId: message.body.requestId,
            messageId: message.id,
            attempt: message.attempts,
          }),
        );
        message.ack();
      } catch (error) {
        console.error(
          JSON.stringify({
            event: "contact_email_delivery_failed",
            requestId: message.body.requestId,
            messageId: message.id,
            attempt: message.attempts,
            errorType: error instanceof Error ? error.name : "UnknownError",
          }),
        );
        message.retry({
          delaySeconds: Math.min(900, 30 * 2 ** message.attempts),
        });
      }
    }
  },
} satisfies ExportedHandler<ContactEmailWorkerEnv, ContactEmailMessage>;
