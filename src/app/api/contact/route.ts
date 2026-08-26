import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import type { ContactEmailMessage } from "@/lib/contact-queue";

/* ─── Configurable recipient email ──────────────────────────── */
const RECIPIENT_EMAIL =
  process.env.CONTACT_FORM_RECIPIENT_EMAIL || "outreach@kubar.tech";
const SENDER_EMAIL =
  process.env.CONTACT_FORM_SENDER_EMAIL || "website@mail.kubar.tech";

const MAX_REQUEST_BYTES = 10_000;
const PRODUCTION_ORIGINS = new Set([
  "https://kubar.tech",
  "https://www.kubar.tech",
]);
const DEVELOPMENT_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function jsonResponse(body: object, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientIdentifier(request: NextRequest): string {
  return request.headers.get("cf-connecting-ip")?.trim() || "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const normalizedOrigin = new URL(origin).origin;
    return (
      PRODUCTION_ORIGINS.has(normalizedOrigin) ||
      (process.env.NODE_ENV === "development" &&
        DEVELOPMENT_ORIGINS.has(normalizedOrigin))
    );
  } catch {
    return false;
  }
}

async function readBodyWithLimit(request: NextRequest): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    receivedBytes += value.byteLength;
    if (receivedBytes > MAX_REQUEST_BYTES) {
      await reader.cancel();
      return null;
    }
    body += decoder.decode(value, { stream: true });
  }

  return body + decoder.decode();
}

/* ─── Request body shape ────────────────────────────────────── */
interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  category: string;
  website?: string;
}

/* ─── Category display labels ───────────────────────────────── */
const categoryLabels: Record<string, string> = {
  bank: "Bank",
  fintech: "Fintech",
  nbfc: "NBFC",
  b2b_marketplace: "B2B Marketplace",
  b2b_platform: "B2B Platform",
  erp: "ERP",
  other: "Other",
};

function escapeHTML(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

/* ─── Build a premium HTML email ────────────────────────────── */
function buildEmailHTML(data: ContactFormData): string {
  const categoryDisplay =
    categoryLabels[data.category] || data.category || "Not specified";
  const fullName = escapeHTML(data.fullName);
  const email = escapeHTML(data.email);
  const phone = escapeHTML(data.phone || "Not provided");
  const companyName = escapeHTML(data.companyName);
  const category = escapeHTML(categoryDisplay);
  const firstName = escapeHTML(data.fullName.split(" ")[0] || data.fullName);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#04040c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" style="background:#04040c;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="max-width:600px;background:#0a0a14;border-radius:16px;border:1px solid rgba(212,146,12,0.2);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(212,146,12,0.15) 0%,rgba(59,130,246,0.08) 100%);padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#f0b429;letter-spacing:-0.02em;">
                📬 New Contact Form Submission
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5);">
                Submitted via kubar.tech/contact
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <!-- Full Name -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Full Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:600;">
                      ${fullName}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Email -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Email Address
                    </p>
                    <a href="mailto:${email}" style="font-size:16px;color:#3b82f6;font-weight:500;text-decoration:none;">
                      ${email}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Phone -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Phone Number
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">
                      ${phone}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Company Name -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Company Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">
                      ${companyName}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Category -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(212,146,12,0.06);border-radius:12px;border:1px solid rgba(212,146,12,0.15);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(212,146,12,0.7);font-weight:600;">
                      Organization Category
                    </p>
                    <p style="margin:0;font-size:16px;color:#f0b429;font-weight:600;">
                      ${category}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply CTA -->
              <table role="presentation" width="100%" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your inquiry to Kubar Labs" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#f5bc35 0%,#d4920c 100%);border-radius:8px;color:#080602;font-size:14px;font-weight:600;text-decoration:none;">
                      Reply to ${firstName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">
                This email was sent from the Kubar Labs contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── POST handler ──────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    if (!isSameOrigin(request)) {
      return jsonResponse({ error: "Invalid request origin" }, 403);
    }

    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return jsonResponse({ error: "Unsupported content type" }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413);
    }

    const identifier = getClientIdentifier(request);
    const { env } = await getCloudflareContext({ async: true });
    const edgeRateLimit = await env.CONTACT_RATE_LIMITER.limit({
      key: identifier,
    });
    if (!edgeRateLimit.success) {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": "60" },
      );
    }

    const rawBody = await readBodyWithLimit(request);
    if (rawBody === null) {
      return jsonResponse({ error: "Request body is too large" }, 413);
    }

    let body: Partial<ContactFormData>;
    try {
      body = JSON.parse(rawBody) as Partial<ContactFormData>;
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    if (
      typeof body.fullName !== "string" ||
      typeof body.email !== "string" ||
      (body.phone !== undefined && typeof body.phone !== "string") ||
      typeof body.companyName !== "string" ||
      typeof body.category !== "string"
    ) {
      return jsonResponse({ error: "Invalid form data" }, 400);
    }

    if (body.website) {
      return jsonResponse({ success: true });
    }

    const data: ContactFormData = {
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      companyName: body.companyName.trim(),
      category: body.category,
    };

    // Basic validation
    if (!data.fullName || !data.email || !data.companyName || !data.category) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
    if (!emailRegex.test(data.email) || /[\r\n]/.test(data.email)) {
      return jsonResponse({ error: "Invalid email address" }, 400);
    }

    const hasControlCharacters = /[\u0000-\u001f\u007f]/;
    const hasInvalidPhoneCharacters = /[^\d+().\-\s]/;
    if (
      data.fullName.length < 2 ||
      data.fullName.length > 100 ||
      data.email.length > 254 ||
      (data.phone?.length ?? 0) > 40 ||
      (data.phone ? hasInvalidPhoneCharacters.test(data.phone) : false) ||
      data.companyName.length < 2 ||
      data.companyName.length > 160 ||
      hasControlCharacters.test(data.fullName) ||
      hasControlCharacters.test(data.companyName) ||
      !categoryLabels[data.category]
    ) {
      return jsonResponse({ error: "Invalid form data" }, 400);
    }

    // Build email
    const categoryDisplay =
      categoryLabels[data.category] || data.category || "Not specified";

    const mailOptions: EmailMessageBuilder = {
      from: { email: SENDER_EMAIL, name: "Kubar Labs Contact Form" },
      to: RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `New Contact: ${data.fullName} from ${data.companyName} [${categoryDisplay}]`,
      html: buildEmailHTML(data),
      text: `New Contact Form Submission\n\nFull Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nCompany: ${data.companyName}\nCategory: ${categoryDisplay}\n\nSubmitted via kubar.tech/contact`,
    };

    const queueMessage: ContactEmailMessage = {
      version: 1,
      requestId,
      submittedAt: new Date().toISOString(),
      email: mailOptions,
    };

    await env.CONTACT_EMAIL_QUEUE.send(queueMessage);
    console.info(
      JSON.stringify({ event: "contact_submission_queued", requestId }),
    );

    return jsonResponse({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "contact_submission_failed",
        requestId,
        errorType: error instanceof Error ? error.name : "UnknownError",
      }),
    );

    // In development, return success anyway so the UI flow works when the
    // remote Email Service binding is unavailable.
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "DEV MODE: Email sending failed. Returning success for UI testing."
      );
      return jsonResponse(
        {
          success: true,
          message: "Message received (dev mode - email not actually sent)",
          dev: true,
        },
      );
    }

    return jsonResponse(
      { error: "Failed to send message. Please try again." },
      500,
    );
  }
}
