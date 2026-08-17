import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Configurable recipient email ──────────────────────────── */
const RECIPIENT_EMAIL =
  process.env.CONTACT_FORM_RECIPIENT_EMAIL || "outreach@kubar.tech";

const MAX_REQUEST_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

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
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(identifier: string, now = Date.now()) {
  if (rateLimitStore.size > 5_000) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return { allowed: true, resetAt };
  }

  current.count += 1;

  if (current.count > RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetAt: current.resetAt };
  }

  return { allowed: true, resetAt: current.resetAt };
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

/* ─── Request body shape ────────────────────────────────────── */
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
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
    const rateLimit = checkRateLimit(identifier);
    if (!rateLimit.allowed) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
      );
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
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
      typeof body.phone !== "string" ||
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
      phone: body.phone.trim(),
      companyName: body.companyName.trim(),
      category: body.category,
    };

    // Basic validation
    if (!data.fullName || !data.email || !data.companyName || !data.category) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return jsonResponse({ error: "Invalid email address" }, 400);
    }

    if (
      data.fullName.length > 100 ||
      data.email.length > 254 ||
      data.phone.length > 40 ||
      data.companyName.length > 160 ||
      !categoryLabels[data.category]
    ) {
      return jsonResponse({ error: "Invalid form data" }, 400);
    }

    // Create transporter — uses env vars for SMTP config
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    // Build email
    const categoryDisplay =
      categoryLabels[data.category] || data.category || "Not specified";

    const mailOptions = {
      from: `"Kubar Labs Contact Form" <${process.env.SMTP_USER || "noreply@kubar.tech"}>`,
      to: RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `New Contact: ${data.fullName} from ${data.companyName} [${categoryDisplay}]`,
      html: buildEmailHTML(data),
      text: `New Contact Form Submission\n\nFull Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nCompany: ${data.companyName}\nCategory: ${categoryDisplay}\n\nSubmitted via kubar.tech/contact`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return jsonResponse({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);

    // In development, return success anyway so the UI flow works
    // (SMTP credentials won't be set up yet)
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "DEV MODE: Email sending failed (likely missing SMTP credentials). Returning success for UI testing."
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
